import type { Metadata } from "next";

import { PreviewCard } from "@/components/PreviewCard";
import { unfurl, UnfurlError, type UnfurlResult } from "@/lib/unfurl";

/**
 * The SSR proof.
 *
 * Reading `searchParams` already makes this route dynamic; `force-dynamic`
 * says so out loud, because the whole point of the page is that it renders on
 * the server on every request. Curl it and the title, description, and image
 * URL are already in the HTML.
 */
export const dynamic = "force-dynamic";

type SearchParams = Promise<{ url?: string | string[] }>;

const ERROR_TITLES: Record<string, string> = {
  missing_url: "No URL given",
  invalid_url: "That doesn't look like a URL",
  unsupported_scheme: "Unsupported scheme",
  blocked_host: "Blocked host",
  blocked_address: "Blocked address",
  unresolvable_host: "Host not found",
  too_many_redirects: "Too many redirects",
  timeout: "The site timed out",
  upstream_error: "The site returned an error",
  not_html: "Not a web page",
  fetch_failed: "Couldn't reach that site",
};

const ERROR_TIPS: Record<string, string> = {
  blocked_host: "Private and internal hosts are refused so this server can't be used as a proxy.",
  blocked_address:
    "Private, loopback, and link-local addresses are refused so this server can't be used as a proxy.",
  unsupported_scheme: "Only http and https URLs are fetched.",
  timeout: "The fetch gives up after 8 seconds. Try again, or try a different page.",
  too_many_redirects: "Redirects are followed at most 3 hops, and every hop is re-checked.",
};

function firstParam(value: string | string[] | undefined): string {
  return (Array.isArray(value) ? value[0] : value) ?? "";
}

export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<Metadata> {
  const target = firstParam((await searchParams).url);
  if (!target) return { title: "Unfurl a link" };
  try {
    return { title: `${new URL(target).hostname.replace(/^www\./, "")} — unfurled` };
  } catch {
    return { title: "Unfurl a link" };
  }
}

export default async function Result({ searchParams }: { searchParams: SearchParams }) {
  const target = firstParam((await searchParams).url);

  let result: UnfurlResult | null = null;
  let failure: { code: string; message: string } | null = null;

  try {
    result = await unfurl(target);
  } catch (error) {
    failure =
      error instanceof UnfurlError
        ? { code: error.code, message: error.message }
        : { code: "fetch_failed", message: "Something went wrong unfurling that URL." };
  }

  return (
    <main className="page" id="main">
      <div className="result-head">
        <h1>{result ? `Preview of ${result.domain}` : "Couldn't unfurl that"}</h1>
        <a className="back-link" href="/">
          ← Unfurl another
        </a>
      </div>

      <div aria-live="polite">
        {result ? (
          result.empty ? (
            <div className="notice">
              <h2>No preview metadata</h2>
              <p>
                <code>{result.domain}</code> answered {result.status}, but the page carries no
                OpenGraph tags, no Twitter-card tags, and no title. Chat apps would show a bare link
                too.
              </p>
            </div>
          ) : (
            <PreviewCard result={result} />
          )
        ) : (
          <div className="notice">
            <h2>{ERROR_TITLES[failure?.code ?? "fetch_failed"] ?? "Couldn't unfurl that"}</h2>
            <p>{failure?.message}</p>
            {failure && ERROR_TIPS[failure.code] ? (
              <p className="notice-tip">{ERROR_TIPS[failure.code]}</p>
            ) : null}
          </div>
        )}
      </div>

      {result ? (
        <details className="raw">
          <summary>Raw JSON from GET /api/unfurl</summary>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </details>
      ) : null}

      <p className="rendered-note">
        This card was rendered on the server during this request — view source and the title and
        description are already in the HTML. The same data is available as JSON at{" "}
        <code>/api/unfurl?url=…</code>.
      </p>
    </main>
  );
}
