// The reaction vocabulary, shared by the server capsule, the client island, and
// the build-time renderer that draws the placeholder buttons. One list, so a new
// emoji cannot be half-added.

export const REACTIONS = [
  { emoji: "👏", label: "Applause" },
  { emoji: "🔥", label: "Fire" },
  { emoji: "🤯", label: "Mind blown" },
  { emoji: "❤️", label: "Love this" },
] as const;

export type Reaction = (typeof REACTIONS)[number];
export type ReactionEmoji = Reaction["emoji"];

/** Per-emoji tallies for one article. Always every emoji, so the UI never jumps. */
export type ReactionCounts = Record<string, number>;

export type ReactionState = {
  slug: string;
  counts: ReactionCounts;
  total: number;
  /** What this visitor picked, or null. One reaction per person per article. */
  mine: string | null;
};

export function isReactionEmoji(value: unknown): value is ReactionEmoji {
  return REACTIONS.some((reaction) => reaction.emoji === value);
}

/**
 * Article slugs come off the wire, so they get the same treatment everywhere:
 * lowercase, and only the characters WordPress puts in a permalink.
 */
export function cleanSlug(value: unknown): string {
  return typeof value === "string"
    ? value
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9-]/g, "")
        .slice(0, 120)
    : "";
}

export function emptyCounts(): ReactionCounts {
  return Object.fromEntries(REACTIONS.map((reaction) => [reaction.emoji, 0]));
}

export function emptyState(slug: string): ReactionState {
  return { slug, counts: emptyCounts(), total: 0, mine: null };
}

/** Tally rows into the shape both the island and `/api/reactions` return. */
export function tallyReactions(
  slug: string,
  rows: readonly { emoji: string; ownerId: string }[],
  viewerId: string,
): ReactionState {
  const counts = emptyCounts();
  let total = 0;
  let mine: string | null = null;
  for (const row of rows) {
    if (!isReactionEmoji(row.emoji)) continue;
    counts[row.emoji] = (counts[row.emoji] ?? 0) + 1;
    total += 1;
    if (row.ownerId === viewerId) mine = row.emoji;
  }
  return { slug, counts, total, mine };
}
