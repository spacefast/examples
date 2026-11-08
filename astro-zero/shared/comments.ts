/**
 * The rules both sides agree on.
 *
 * Imported by `server/index.ts` and by the browser island, so a comment that
 * looks acceptable in the form is the same comment the capsule will accept.
 * Pure string work only: shared code runs on the server too, so it never
 * touches a browser global.
 */

export const MAX_NAME_LENGTH = 40;
export const MAX_BODY_LENGTH = 600;
export const MAX_SLUG_LENGTH = 120;
export const COMMENT_PAGE_SIZE = 200;

/** The whole reaction vocabulary. Four is a scale; twenty is a keyboard. */
export const REACTIONS = ["👏", "🤯", "🫠", "🔥"] as const;

export type ReactionEmoji = (typeof REACTIONS)[number];

export type Comment = {
  id: string;
  postSlug: string;
  authorName: string;
  body: string;
  authorId: string;
  createdAt: string;
  updatedAt: string;
};

export type ReactionTally = {
  emoji: ReactionEmoji;
  count: number;
  /** Whether the reader asking holds this one. */
  mine: boolean;
};

function collapseWhitespace(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

export function cleanName(value: string): string {
  return collapseWhitespace(value).slice(0, MAX_NAME_LENGTH);
}

/** Keeps paragraph breaks, drops the rest of the whitespace theatre. */
export function cleanBody(value: string): string {
  return value
    .replace(/\r\n/g, "\n")
    .split("\n\n")
    .map((paragraph) => collapseWhitespace(paragraph))
    .filter((paragraph) => paragraph !== "")
    .join("\n\n")
    .slice(0, MAX_BODY_LENGTH);
}

export function cleanSlug(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, "")
    .slice(0, MAX_SLUG_LENGTH);
}

export function isReaction(value: string): value is ReactionEmoji {
  return (REACTIONS as readonly string[]).includes(value);
}

/** The name shown when a guest never typed one. */
export function displayNameFor(name: string, fallback: string): string {
  return cleanName(name) || cleanName(fallback) || "Anonymous";
}
