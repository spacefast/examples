/**
 * Address and URL vetting for a server that fetches whatever a stranger pastes.
 *
 * The threat is SSRF: this handler runs inside our infrastructure, so a URL
 * pointing at `127.0.0.1`, a container's sibling service, or a cloud metadata
 * endpoint would let a visitor read things they can't reach themselves. Every
 * check below is applied to the URL the visitor sent AND, separately, to each
 * redirect hop, because "public URL that 302s to 169.254.169.254" is the
 * standard bypass.
 */

/** Only these two schemes ever reach the network. */
const ALLOWED_PROTOCOLS = new Set(["http:", "https:"]);

/**
 * Hostname suffixes that never name something on the public internet.
 * `.local` is mDNS, `.internal` is the convention every cloud uses for its
 * private zone, and `.localhost` resolves to loopback by RFC 6761.
 */
const BLOCKED_SUFFIXES = [".local", ".internal", ".localhost", ".home.arpa"];

const BLOCKED_HOSTNAMES = new Set([
  "localhost",
  "metadata",
  "metadata.google.internal",
  "instance-data",
]);

export type GuardFailure =
  | "invalid_url"
  | "unsupported_scheme"
  | "blocked_host"
  | "blocked_address"
  | "unresolvable_host";

export class BlockedUrlError extends Error {
  readonly reason: GuardFailure;

  constructor(reason: GuardFailure, message: string) {
    super(message);
    this.name = "BlockedUrlError";
    this.reason = reason;
  }
}

function parseIpv4(value: string): number[] | null {
  const parts = value.split(".");
  if (parts.length !== 4) return null;
  const octets: number[] = [];
  for (const part of parts) {
    if (!/^\d{1,3}$/.test(part)) return null;
    const octet = Number(part);
    if (octet > 255) return null;
    octets.push(octet);
  }
  return octets;
}

/**
 * IPv4 ranges that are not the public internet. Written as explicit checks
 * rather than a CIDR library so the reasoning stays readable in review.
 */
function isPrivateIpv4(octets: number[]): boolean {
  const [a, b, c] = octets as [number, number, number, number];
  if (a === 0) return true; // 0.0.0.0/8 "this network"
  if (a === 10) return true; // private
  if (a === 127) return true; // loopback
  if (a === 169 && b === 254) return true; // link-local, incl. cloud metadata
  if (a === 172 && b >= 16 && b <= 31) return true; // private
  if (a === 192 && b === 168) return true; // private
  // 192.0.0.0/24 only — IETF protocol assignments. NOT the whole 192.0/16:
  // 192.0.79.0/24 is Automattic, and blocking it once cost this example a
  // working demo URL.
  if (a === 192 && b === 0 && c === 0) return true;
  if (a === 100 && b >= 64 && b <= 127) return true; // carrier-grade NAT
  if (a === 198 && (b === 18 || b === 19)) return true; // benchmarking
  if (a >= 224) return true; // multicast, reserved, broadcast
  return false;
}

function expandIpv6(value: string): number[] | null {
  const zoneless = value.split("%")[0] ?? value;
  if (!/^[0-9a-f:.]+$/i.test(zoneless)) return null;

  const halves = zoneless.split("::");
  if (halves.length > 2) return null;

  const toGroups = (chunk: string): number[] | null => {
    if (chunk === "") return [];
    const groups: number[] = [];
    for (const piece of chunk.split(":")) {
      if (piece.includes(".")) {
        // Trailing IPv4 form, e.g. ::ffff:192.168.0.1
        const octets = parseIpv4(piece);
        if (!octets) return null;
        groups.push((octets[0] << 8) | octets[1], (octets[2] << 8) | octets[3]);
        continue;
      }
      if (!/^[0-9a-f]{1,4}$/i.test(piece)) return null;
      groups.push(Number.parseInt(piece, 16));
    }
    return groups;
  };

  const head = toGroups(halves[0] ?? "");
  const tail = halves.length === 2 ? toGroups(halves[1] ?? "") : [];
  if (!head || !tail) return null;

  if (halves.length === 2) {
    const fill = 8 - head.length - tail.length;
    if (fill < 0) return null;
    return [...head, ...Array<number>(fill).fill(0), ...tail];
  }
  return head.length === 8 ? head : null;
}

function isPrivateIpv6(groups: number[]): boolean {
  const [g0, g1] = groups as [number, number, ...number[]];

  // ::1 loopback and :: unspecified
  if (groups.every((group, index) => (index === 7 ? group <= 1 : group === 0))) return true;
  // IPv4-mapped (::ffff:a.b.c.d) and IPv4-compatible — judge the embedded v4.
  const isV4Mapped = groups.slice(0, 5).every((group) => group === 0) && g1 === 0;
  if (isV4Mapped && (groups[5] === 0xffff || groups[5] === 0)) {
    const embedded = [groups[6]! >> 8, groups[6]! & 0xff, groups[7]! >> 8, groups[7]! & 0xff];
    return isPrivateIpv4(embedded);
  }
  if ((g0 & 0xfe00) === 0xfc00) return true; // fc00::/7 unique local
  if ((g0 & 0xffc0) === 0xfe80) return true; // fe80::/10 link-local
  if ((g0 & 0xff00) === 0xff00) return true; // ff00::/8 multicast
  if (g0 === 0x2002) return true; // 6to4 — tunnels to an arbitrary v4
  if (g0 === 0x0064 && g1 === 0xff9b) return true; // NAT64
  return false;
}

/** True for any literal address that must never be fetched. */
export function isBlockedAddress(value: string): boolean {
  const bare = value.startsWith("[") && value.endsWith("]") ? value.slice(1, -1) : value;
  const v4 = parseIpv4(bare);
  if (v4) return isPrivateIpv4(v4);
  if (bare.includes(":")) {
    const v6 = expandIpv6(bare);
    // An address shaped like IPv6 that we cannot parse is refused, not allowed.
    return v6 ? isPrivateIpv6(v6) : true;
  }
  return false;
}

/** True when the hostname is a literal address rather than a name to resolve. */
function isAddressLiteral(hostname: string): boolean {
  const bare = hostname.startsWith("[") && hostname.endsWith("]") ? hostname.slice(1, -1) : hostname;
  return parseIpv4(bare) !== null || bare.includes(":");
}

/**
 * Resolve the hostname and refuse if ANY answer is private.
 *
 * `node:dns` is imported lazily and its absence is tolerated: this bundle also
 * runs on a Workers-style runtime where DNS is not exposed to user code. When
 * resolution is unavailable the literal and name checks above still stand, and
 * the redirect walk re-checks every hop — so a DNS-rebinding attacker gains a
 * page's `<head>`, never a private response body echoed back.
 */
async function assertResolvesPublicly(hostname: string): Promise<void> {
  let lookup: typeof import("node:dns/promises").lookup;
  try {
    ({ lookup } = await import("node:dns/promises"));
  } catch {
    return;
  }
  if (typeof lookup !== "function") return;

  let answers: Array<{ address: string }>;
  try {
    answers = await lookup(hostname, { all: true, verbatim: true });
  } catch (error) {
    const code = (error as NodeJS.ErrnoException | undefined)?.code;
    // A resolver that is simply unavailable in this runtime is not a verdict
    // about the hostname; a real NXDOMAIN is.
    if (code === "ENOTFOUND" || code === "EAI_AGAIN" || code === "ENODATA") {
      throw new BlockedUrlError("unresolvable_host", `Couldn't resolve ${hostname}.`);
    }
    return;
  }

  if (answers.length === 0) {
    throw new BlockedUrlError("unresolvable_host", `Couldn't resolve ${hostname}.`);
  }
  for (const answer of answers) {
    if (isBlockedAddress(answer.address)) {
      throw new BlockedUrlError(
        "blocked_address",
        `${hostname} resolves to a private address (${answer.address}).`,
      );
    }
  }
}

/**
 * Parse and vet one URL. Throws `BlockedUrlError` with a reason the UI can
 * turn into a specific message. Call this on the visitor's URL and again on
 * every redirect target.
 */
export async function assertFetchableUrl(raw: string): Promise<URL> {
  let url: URL;
  try {
    url = new URL(raw);
  } catch {
    throw new BlockedUrlError("invalid_url", `"${raw}" isn't a URL.`);
  }

  if (!ALLOWED_PROTOCOLS.has(url.protocol)) {
    throw new BlockedUrlError(
      "unsupported_scheme",
      `${url.protocol} isn't supported — use http or https.`,
    );
  }

  const hostname = url.hostname.toLowerCase();
  if (hostname === "") {
    throw new BlockedUrlError("invalid_url", "That URL has no hostname.");
  }
  if (BLOCKED_HOSTNAMES.has(hostname)) {
    throw new BlockedUrlError("blocked_host", `${hostname} is a private host.`);
  }
  if (BLOCKED_SUFFIXES.some((suffix) => hostname.endsWith(suffix))) {
    throw new BlockedUrlError("blocked_host", `${hostname} is a private host.`);
  }

  if (isAddressLiteral(hostname)) {
    if (isBlockedAddress(hostname)) {
      throw new BlockedUrlError("blocked_address", `${hostname} is a private address.`);
    }
    return url;
  }

  // A single-label name ("router", "gitlab") can only be an intranet host.
  if (!hostname.includes(".")) {
    throw new BlockedUrlError("blocked_host", `${hostname} isn't a public hostname.`);
  }

  await assertResolvesPublicly(hostname);
  return url;
}

/**
 * Best-effort normalization of what people actually paste: a bare domain, a
 * copied "https://example.com " with whitespace, or a `www.` prefix typed
 * without a scheme. Returns null when there is nothing to work with.
 */
export function normalizeUserUrl(raw: string): string | null {
  const trimmed = raw.trim();
  if (trimmed === "") return null;
  if (/^[a-z][a-z0-9+.-]*:/i.test(trimmed)) return trimmed;
  // No scheme: only upgrade something that at least looks like a hostname.
  if (!/^[^\s/?#]+\.[^\s/?#]+/.test(trimmed)) return null;
  return `https://${trimmed}`;
}
