// ─────────────────────────────────────────────────────────────────────────────
// The headless-WordPress data layer.
//
// Everything here runs once, at build time, inside `astro build`. We hit the
// WordPress REST API with `?_embed` so a single request returns each post *and*
// its author, featured image, and categories — no N+1 follow-up calls. The raw
// WP shapes are messy (rendered HTML in title/excerpt, optional embeds), so we
// normalise each post into a small, predictable `Post` object the pages consume.
// ─────────────────────────────────────────────────────────────────────────────

import { WP_API_BASE, POST_LIMIT } from '../config';

export interface Post {
  id: number;
  slug: string;
  title: string;
  date: Date;
  excerptHtml: string;
  contentHtml: string;
  author: { name: string; avatar?: string };
  image?: { url: string; alt: string };
  categories: string[];
  readingMinutes: number;
}

// A WordPress post with `?_embed` data attached. We only type the fields we use.
interface WpPost {
  id: number;
  slug: string;
  date: string;
  title: { rendered: string };
  excerpt: { rendered: string };
  content: { rendered: string };
  jetpack_featured_media_url?: string;
  _embedded?: {
    author?: Array<{ name?: string; avatar_urls?: Record<string, string> }>;
    'wp:featuredmedia'?: Array<{ source_url?: string; alt_text?: string }>;
    'wp:term'?: Array<Array<{ taxonomy?: string; name?: string }>>;
  };
}

/** Strip HTML tags and decode the handful of entities WordPress emits in titles. */
function plain(html: string): string {
  return html
    .replace(/<[^>]+>/g, '')
    .replace(/&#8217;|&#8216;/g, '’')
    .replace(/&#8220;|&#8221;/g, '"')
    .replace(/&#8211;|&#8212;/g, '—')
    .replace(/&hellip;|&#8230;/g, '…')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function readingMinutes(html: string): number {
  const words = plain(html).split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

function normalise(p: WpPost): Post {
  const embedded = p._embedded ?? {};
  const author = embedded.author?.[0];
  const media = embedded['wp:featuredmedia']?.[0];

  // Prefer the embedded featured image; fall back to Jetpack's mirror; otherwise
  // the post simply has no image and the UI renders a tasteful placeholder.
  const imageUrl = media?.source_url ?? p.jetpack_featured_media_url;

  // `wp:term` is an array of taxonomies (categories, tags, …). Pull category names.
  const categories =
    embedded['wp:term']
      ?.flat()
      .filter((t) => t?.taxonomy === 'category' && t.name)
      .map((t) => t.name as string) ?? [];

  return {
    id: p.id,
    slug: p.slug,
    title: plain(p.title.rendered) || 'Untitled',
    date: new Date(p.date),
    excerptHtml: p.excerpt.rendered,
    contentHtml: p.content.rendered,
    author: {
      name: author?.name ?? 'WordPress',
      avatar: author?.avatar_urls?.['96'] ?? author?.avatar_urls?.['48'],
    },
    image: imageUrl ? { url: imageUrl, alt: media?.alt_text || plain(p.title.rendered) } : undefined,
    categories,
    readingMinutes: readingMinutes(p.content.rendered),
  };
}

let cache: Post[] | null = null;

/** Fetch + normalise all posts. Cached so index and post pages share one request. */
export async function getPosts(): Promise<Post[]> {
  if (cache) return cache;

  const url = `${WP_API_BASE}/posts?_embed&per_page=${POST_LIMIT}`;
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(
      `WordPress REST API returned ${res.status} for ${url}. ` +
        `Check WP_API_BASE in src/config.ts points at a public site's /wp-json/wp/v2.`,
    );
  }

  const raw = (await res.json()) as WpPost[];
  cache = raw.map(normalise);
  return cache;
}

export function formatDate(d: Date): string {
  return d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}
