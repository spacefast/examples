// Search is a pure function over a build-time index.
//
// The index is compiled from WordPress during `bun run build` and lands in
// `shared/search-index.ts`, so the capsule carries it and `/api/search` answers
// without a database round trip or a live call back to WordPress. Rebuild the
// site and the index moves with it — the same snapshot that produced the pages.

export type SearchDocument = {
  slug: string;
  title: string;
  excerpt: string;
  url: string;
  date: string;
  categories: string[];
  /** Lowercased title + excerpt + body text. The haystack, never displayed. */
  text: string;
};

export type SearchHit = {
  slug: string;
  title: string;
  excerpt: string;
  url: string;
  date: string;
  categories: string[];
  score: number;
};

const MAX_QUERY_LENGTH = 80;

export function cleanQuery(value: unknown): string {
  return typeof value === "string" ? value.trim().slice(0, MAX_QUERY_LENGTH) : "";
}

function tokenize(value: string): string[] {
  return value
    .toLowerCase()
    .split(/[^\p{Letter}\p{Number}]+/u)
    .filter((token) => token.length > 1);
}

/**
 * Every token has to appear somewhere, then the hit is scored by where it
 * appeared: a title match beats a category match beats a body match. Small,
 * predictable, and good enough for a magazine's worth of posts — which is the
 * point of shipping the index rather than a search service.
 */
export function searchDocuments(
  documents: readonly SearchDocument[],
  rawQuery: string,
  limit = 8,
): SearchHit[] {
  const tokens = tokenize(cleanQuery(rawQuery));
  if (tokens.length === 0) return [];

  const hits: SearchHit[] = [];
  // `entry`, not `document`: capsule code is lexically scanned for browser
  // globals, and a local named `document` in shared/ fails the build.
  for (const entry of documents) {
    const title = entry.title.toLowerCase();
    const categories = entry.categories.join(" ").toLowerCase();
    let score = 0;
    let matchedEvery = true;

    for (const token of tokens) {
      let tokenScore = 0;
      if (title.includes(token)) tokenScore += 10;
      if (categories.includes(token)) tokenScore += 4;
      if (entry.text.includes(token)) tokenScore += 1;
      if (tokenScore === 0) {
        matchedEvery = false;
        break;
      }
      score += tokenScore;
    }

    if (!matchedEvery) continue;
    // A whole-phrase title match is what people mean when they type two words.
    if (tokens.length > 1 && title.includes(tokens.join(" "))) score += 15;
    hits.push({
      slug: entry.slug,
      title: entry.title,
      excerpt: entry.excerpt,
      url: entry.url,
      date: entry.date,
      categories: entry.categories,
      score,
    });
  }

  return hits
    .sort((left, right) => right.score - left.score || left.title.localeCompare(right.title))
    .slice(0, Math.max(1, Math.min(limit, 25)));
}
