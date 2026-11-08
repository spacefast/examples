/**
 * A small, tolerant scanner for the handful of tags that make a preview card.
 *
 * Deliberately not a DOM parser: we need six attributes out of a `<head>` we
 * stopped reading at 512 KB, from pages whose markup is frequently invalid.
 * A dependency-free scanner keeps the worker bundle small and never throws on
 * malformed input — the worst case is a missing field, which the card already
 * has a fallback for.
 */

const NAMED_ENTITIES: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  hellip: "…",
  mdash: "—",
  ndash: "–",
  rsquo: "’",
  lsquo: "‘",
  ldquo: "“",
  rdquo: "”",
  middot: "·",
};

export function decodeEntities(value: string): string {
  return value.replace(/&(#x?[0-9a-f]+|[a-z][a-z0-9]*);/gi, (match, body: string) => {
    if (body.startsWith("#")) {
      const codePoint = body[1]?.toLowerCase() === "x"
        ? Number.parseInt(body.slice(2), 16)
        : Number.parseInt(body.slice(1), 10);
      if (!Number.isFinite(codePoint) || codePoint < 0 || codePoint > 0x10ffff) return match;
      try {
        return String.fromCodePoint(codePoint);
      } catch {
        return match;
      }
    }
    return NAMED_ENTITIES[body.toLowerCase()] ?? match;
  });
}

function collapse(value: string): string {
  return decodeEntities(value).replace(/\s+/g, " ").trim();
}

type Tag = { name: string; attributes: Record<string, string> };

/** Pull every `<meta>`, `<title>` and `<link>` out of the head region. */
function scanTags(html: string): { tags: Tag[]; title: string | null } {
  // Everything that matters lives before </head>; stopping there also keeps a
  // page that inlines a whole app's JSON from costing us a full scan.
  const headEnd = html.search(/<\/head\s*>/i);
  const head = headEnd === -1 ? html.slice(0, 512_000) : html.slice(0, headEnd);

  const tags: Tag[] = [];
  const tagPattern = /<(meta|link)\b([^>]*)>/gi;
  let match: RegExpExecArray | null;
  while ((match = tagPattern.exec(head)) !== null) {
    const attributes: Record<string, string> = {};
    const attributePattern = /([a-z_:][\w:.-]*)\s*=\s*("([^"]*)"|'([^']*)'|([^\s"'>]+))/gi;
    let attribute: RegExpExecArray | null;
    while ((attribute = attributePattern.exec(match[2] ?? "")) !== null) {
      const key = attribute[1]!.toLowerCase();
      attributes[key] = attribute[3] ?? attribute[4] ?? attribute[5] ?? "";
    }
    tags.push({ name: match[1]!.toLowerCase(), attributes });
  }

  const titleMatch = /<title[^>]*>([\s\S]*?)<\/title\s*>/i.exec(head);
  return { tags, title: titleMatch ? collapse(titleMatch[1] ?? "") || null : null };
}

export type ParsedMetadata = {
  title: string | null;
  description: string | null;
  siteName: string | null;
  image: string | null;
  imageAlt: string | null;
  favicon: string | null;
  themeColor: string | null;
  type: string | null;
  canonical: string | null;
};

/**
 * Read the card fields out of raw HTML.
 *
 * Precedence per field is OpenGraph, then Twitter cards, then the plain HTML
 * equivalent — the same order Slack and iMessage use, so what you see here is
 * what you'd get when you paste the link into a chat app.
 */
export function parseMetadata(html: string, baseUrl: URL): ParsedMetadata {
  const { tags, title: documentTitle } = scanTags(html);

  const properties = new Map<string, string>();
  const names = new Map<string, string>();
  const icons: Array<{ href: string; size: number; rel: string }> = [];
  let canonical: string | null = null;

  for (const tag of tags) {
    if (tag.name === "meta") {
      const content = tag.attributes.content;
      if (content === undefined || content === "") continue;
      const property = tag.attributes.property?.toLowerCase();
      const name = tag.attributes.name?.toLowerCase();
      // First occurrence wins: pages that repeat og:image list the primary one
      // first, and later duplicates are usually per-locale or per-variant.
      if (property && !properties.has(property)) properties.set(property, content);
      if (name && !names.has(name)) names.set(name, content);
      continue;
    }

    const rel = tag.attributes.rel?.toLowerCase() ?? "";
    const href = tag.attributes.href;
    if (!href) continue;
    if (rel === "canonical") {
      canonical ??= href;
      continue;
    }
    if (/\bicon\b/.test(rel)) {
      // "32x32" or "16x16 32x32" — take the largest declared square.
      const declared = tag.attributes.sizes ?? "";
      const size = Math.max(
        0,
        ...[...declared.matchAll(/(\d+)x(\d+)/gi)].map((entry) => Number(entry[1])),
      );
      icons.push({ href, size, rel });
    }
  }

  const pick = (...keys: string[]): string | null => {
    for (const key of keys) {
      const value = properties.get(key) ?? names.get(key);
      if (value !== undefined && value.trim() !== "") return collapse(value);
    }
    return null;
  };

  const absolute = (value: string | null): string | null => {
    if (!value) return null;
    try {
      const resolved = new URL(value, baseUrl);
      return resolved.protocol === "http:" || resolved.protocol === "https:"
        ? resolved.toString()
        : null;
    } catch {
      return null;
    }
  };

  // Prefer an SVG or the largest declared raster icon; fall back to the
  // well-known path every site still serves.
  const bestIcon =
    icons
      .toSorted((left, right) => {
        const svg = (icon: { href: string }) => (/\.svg(\?|#|$)/i.test(icon.href) ? 1 : 0);
        return svg(right) - svg(left) || right.size - left.size;
      })
      .at(0)?.href ?? "/favicon.ico";

  return {
    title: pick("og:title", "twitter:title") ?? documentTitle,
    description: pick("og:description", "twitter:description", "description"),
    siteName: pick("og:site_name", "application-name"),
    image: absolute(pick("og:image:secure_url", "og:image:url", "og:image", "twitter:image")),
    imageAlt: pick("og:image:alt", "twitter:image:alt"),
    favicon: absolute(bestIcon),
    themeColor: pick("theme-color"),
    type: pick("og:type"),
    canonical: absolute(canonical),
  };
}
