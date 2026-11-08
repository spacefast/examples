import { assertFetchableUrl, BlockedUrlError, normalizeUserUrl } from "./guard";
import { parseMetadata } from "./parse";

/**
 * The one server-side operation this app exists for: fetch a stranger's URL,
 * read its `<head>`, and hand back a card's worth of metadata.
 *
 * Every limit here is deliberate. A visitor controls the target, so the target
 * controls how long we wait, how many bytes we read, and how far we chase a
 * redirect chain — unless we say otherwise.
 */

/** Metadata lives in the head; anything past this is someone else's payload. */
const MAX_BYTES = 512 * 1024;
/** Long enough for a slow origin, short enough that a hung host isn't ours. */
const TIMEOUT_MS = 8_000;
/** Enough for the usual http→https→www→canonical walk, not enough to loop. */
const MAX_REDIRECTS = 3;

const USER_AGENT =
  "Mozilla/5.0 (compatible; UnfurlBot/1.0; +https://unfurl.view.fast/) link-preview-fetcher";

export type UnfurlErrorCode =
  | "missing_url"
  | "invalid_url"
  | "unsupported_scheme"
  | "blocked_host"
  | "blocked_address"
  | "unresolvable_host"
  | "too_many_redirects"
  | "timeout"
  | "upstream_error"
  | "not_html"
  | "fetch_failed";

export class UnfurlError extends Error {
  readonly code: UnfurlErrorCode;
  readonly status: number;
  readonly detail: string | undefined;

  constructor(code: UnfurlErrorCode, message: string, status = 400, detail?: string) {
    super(message);
    this.name = "UnfurlError";
    this.code = code;
    this.status = status;
    this.detail = detail;
  }
}

export type UnfurlResult = {
  /** The URL as the visitor gave it, after whitespace and scheme normalization. */
  url: string;
  /** Where the redirect chain actually ended. */
  finalUrl: string;
  /** Hostname of `finalUrl`, without a `www.` prefix — what the card shows. */
  domain: string;
  status: number;
  title: string | null;
  description: string | null;
  siteName: string | null;
  image: string | null;
  imageAlt: string | null;
  favicon: string | null;
  themeColor: string | null;
  type: string | null;
  canonical: string | null;
  /** True when the page parsed but carried nothing worth putting on a card. */
  empty: boolean;
  fetchedAt: string;
};

function blockedToUnfurl(error: BlockedUrlError): UnfurlError {
  const status = error.reason === "invalid_url" || error.reason === "unsupported_scheme" ? 400 : 403;
  return new UnfurlError(error.reason, error.message, error.reason === "unresolvable_host" ? 404 : status);
}

/**
 * Read at most `MAX_BYTES`, and stop as soon as `</head>` has gone by.
 *
 * Reading the stream by hand rather than calling `response.text()` is the
 * point: `text()` would buffer whatever the origin sends, which is exactly the
 * resource a hostile target would spend.
 */
async function readHead(response: Response): Promise<string> {
  const body = response.body;
  if (!body) return "";

  const reader = body.getReader();
  const decoder = new TextDecoder("utf-8", { fatal: false });
  let html = "";
  let bytes = 0;

  try {
    while (bytes < MAX_BYTES) {
      const { done, value } = await reader.read();
      if (done) break;
      bytes += value.byteLength;
      html += decoder.decode(value, { stream: true });
      if (/<\/head\s*>/i.test(html)) break;
    }
    html += decoder.decode();
  } finally {
    // Releases the connection whether we finished early or bailed out.
    await reader.cancel().catch(() => {});
  }
  return html;
}

/**
 * Walk redirects by hand so each hop is vetted before it is followed.
 *
 * `redirect: "follow"` would hand the whole chain to the platform, and the
 * platform does not know that `169.254.169.254` is off limits.
 */
async function fetchWithVettedRedirects(start: URL): Promise<Response> {
  let target = start;

  for (let hop = 0; hop <= MAX_REDIRECTS; hop += 1) {
    let response: Response;
    try {
      response = await fetch(target, {
        method: "GET",
        redirect: "manual",
        signal: AbortSignal.timeout(TIMEOUT_MS),
        headers: {
          "user-agent": USER_AGENT,
          accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
          "accept-language": "en-US,en;q=0.9",
        },
      });
    } catch (error) {
      const name = (error as Error | undefined)?.name;
      if (name === "TimeoutError" || name === "AbortError") {
        throw new UnfurlError("timeout", `${target.hostname} didn't answer within 8 seconds.`, 504);
      }
      throw new UnfurlError(
        "fetch_failed",
        `Couldn't reach ${target.hostname}.`,
        502,
        (error as Error | undefined)?.message,
      );
    }

    const location = response.headers.get("location");
    if (response.status >= 300 && response.status < 400 && location) {
      await response.body?.cancel().catch(() => {});
      if (hop === MAX_REDIRECTS) {
        throw new UnfurlError("too_many_redirects", "That URL redirects too many times.", 502);
      }
      let next: URL;
      try {
        next = new URL(location, target);
      } catch {
        throw new UnfurlError("invalid_url", `${target.hostname} redirected somewhere invalid.`);
      }
      try {
        // The whole reason for the manual walk: vet the hop, not just the start.
        target = await assertFetchableUrl(next.toString());
      } catch (error) {
        if (error instanceof BlockedUrlError) throw blockedToUnfurl(error);
        throw error;
      }
      continue;
    }

    return response;
  }

  throw new UnfurlError("too_many_redirects", "That URL redirects too many times.", 502);
}

/** Fetch `rawUrl` and return everything the preview card needs. */
export async function unfurl(rawUrl: string): Promise<UnfurlResult> {
  const normalized = normalizeUserUrl(rawUrl);
  if (!normalized) {
    throw new UnfurlError("missing_url", "Give me a URL to unfurl.");
  }

  let start: URL;
  try {
    start = await assertFetchableUrl(normalized);
  } catch (error) {
    if (error instanceof BlockedUrlError) throw blockedToUnfurl(error);
    throw error;
  }

  const response = await fetchWithVettedRedirects(start);

  if (!response.ok) {
    await response.body?.cancel().catch(() => {});
    throw new UnfurlError(
      "upstream_error",
      `${start.hostname} answered ${response.status}.`,
      response.status === 404 ? 404 : 502,
    );
  }

  const contentType = response.headers.get("content-type") ?? "";
  if (contentType !== "" && !/\b(?:x?html|xml)\b/i.test(contentType)) {
    await response.body?.cancel().catch(() => {});
    throw new UnfurlError(
      "not_html",
      `That URL is ${contentType.split(";")[0]?.trim() || "not a web page"}, not a web page.`,
      415,
    );
  }

  const finalUrl = new URL(response.url || start.toString());
  const html = await readHead(response);
  const metadata = parseMetadata(html, finalUrl);

  return {
    url: normalized,
    finalUrl: finalUrl.toString(),
    domain: finalUrl.hostname.replace(/^www\./, ""),
    status: response.status,
    ...metadata,
    empty: !metadata.title && !metadata.description && !metadata.image,
    fetchedAt: new Date().toISOString(),
  };
}
