export type Post = {
  id: string;
  slug: string;
  title: string;
  dek: string;
  body: string;
  authorName: string;
  publishedAt: string;
  readingMinutes: string;
  featured: boolean;
  createdAt: string;
  updatedAt: string;
};

export type Comment = {
  id: string;
  postSlug: string;
  authorName: string;
  avatarUrl: string;
  body: string;
  ownerId: string;
  createdAt: string;
  updatedAt: string;
};

export type HomeData = {
  ready: boolean;
  posts: Post[];
  commentCount: number;
  reactionCount: number;
};

export type PostData = {
  post: Post | null;
  comments: Comment[];
  reactionCount: number;
};

export function cleanText(value: string, max = 160): string {
  return value.trim().replace(/\s+/g, " ").slice(0, max);
}

export function cleanMarkdown(value: string): string {
  return value.replace(/\r\n?/g, "\n").trim().slice(0, 30_000);
}

export function cleanSlug(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
}

export function cleanEmail(value: string): string {
  return value.trim().toLowerCase().slice(0, 240);
}
