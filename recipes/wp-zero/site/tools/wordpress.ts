// The only file that talks to WordPress.
//
// `@spacefast/wordpress` is a read-only client for public WordPress content. On
// a Spacefast repository build it discovers the site you configured under
// Settings → Data sources with no arguments at all; here we pass an explicit
// `url` so the example runs anywhere, including a laptop with no space linked.
//
// `_embed` is the whole trick: WordPress inlines the author, the featured image,
// and the terms into the same response, so twelve posts cost one request instead
// of thirty-seven. The client passes unknown query keys straight through, which
// is what makes that possible.
//
// Everything below the fetch is normalization. WordPress hands back rendered
// HTML in fields that look like plain text, optional embeds, and terms nested
// one array deeper than you expect. Do that work once, here, so the renderer
// only ever sees an `Article`.

import { createWordPressClient, type WordPressPost } from "@spacefast/wordpress";

import { POST_LIMIT, WORDPRESS_URL } from "./config";

export type Article = {
  id: number;
  slug: string;
  title: string;
  date: Date;
  /** WordPress's own excerpt HTML, already unwrapped from its `<p>`. */
  excerpt: string;
  /** The post body, exactly as WordPress rendered it, then made responsive. */
  contentHtml: string;
  /** Plain text of the body, for the search index. */
  plainText: string;
  author: { name: string; avatar: string | null };
  image: { url: string; alt: string } | null;
  categories: string[];
  tags: string[];
  readingMinutes: number;
  /** The canonical post on the WordPress site, so credit stays with the source. */
  sourceUrl: string;
};

type Embedded = {
  author?: { name?: string; avatar_urls?: Record<string, string> }[];
  "wp:featuredmedia"?: { source_url?: string; alt_text?: string }[];
  "wp:term"?: { taxonomy?: string; name?: string }[][];
};

const ENTITIES: Record<string, string> = {
  "&amp;": "&",
  "&lt;": "<",
  "&gt;": ">",
  "&quot;": '"',
  "&#039;": "'",
  "&#39;": "'",
  "&apos;": "'",
  "&nbsp;": " ",
  "&hellip;": "…",
  "&#8211;": "–",
  "&#8212;": "—",
  "&#8216;": "‘",
  "&#8217;": "’",
  "&#8220;": "“",
  "&#8221;": "”",
  "&#8230;": "…",
  "&#215;": "×",
  "&#160;": " ",
};

/**
 * Strip tags and decode the entities WordPress puts in "plain" fields.
 *
 * Tags become a space so `<p>one</p><p>two</p>` does not read as "onetwo", which
 * then leaves a gap wherever an inline tag hugged punctuation — `an <a>link</a>.`
 * would come out as "an link ." That last pass closes it.
 */
export function plain(html: string): string {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&#?[a-z0-9]+;/gi, (entity) => ENTITIES[entity.toLowerCase()] ?? entity)
    .replace(/\s+/g, " ")
    .replace(/\s+([,.;:!?%)\]])/g, "$1")
    .replace(/([([])\s+/g, "$1")
    .trim();
}

/**
 * Make a real editor's HTML survive a narrow column.
 *
 * Everything here is a response to something wordpress.org/news actually ships:
 * inline `width`/`height` attributes that break a fluid layout, `<iframe>`
 * embeds with fixed pixel sizes, wide tables, and eager-loading images far below
 * the fold. Wrappers are added rather than content rewritten — the words and the
 * markup stay the editor's.
 */
export function makeContentResponsive(html: string): string {
  return (
    html
      // Images: lazy, async, and no hard pixel dimensions to fight the layout.
      // One pass per tag, because a single `<img width height>` needs both
      // attributes removed and a plain global replace can only match one.
      .replace(/<img\b[^>]*>/gi, (tag) => {
        let out = tag.replace(/\s(width|height)="\d+"/gi, "");
        if (!/\bloading=/i.test(out)) out = out.replace(/^<img/i, '<img loading="lazy"');
        if (!/\bdecoding=/i.test(out)) out = out.replace(/^<img/i, '<img decoding="async"');
        return out;
      })
      // Embeds (YouTube, Vimeo, X, WordPress.tv) get an aspect-ratio wrapper.
      .replace(
        /<iframe\b([^>]*)><\/iframe>/gi,
        (_match, attrs: string) =>
          `<div class="embed"><iframe${attrs.replace(/\s(width|height)="[^"]*"/gi, "")} loading="lazy"></iframe></div>`,
      )
      // Tables scroll sideways on a phone instead of blowing out the page.
      .replace(/<table\b/gi, '<div class="table-scroll"><table')
      .replace(/<\/table>/gi, "</table></div>")
      // WordPress's own block wrappers we would rather style ourselves.
      .replace(/\sstyle="[^"]*"/gi, "")
  );
}

function readingMinutes(text: string): number {
  return Math.max(1, Math.round(text.split(/\s+/).filter(Boolean).length / 220));
}

function normalize(post: WordPressPost): Article {
  const embedded = (post as { _embedded?: Embedded })._embedded ?? {};
  const author = embedded.author?.[0];
  const media = embedded["wp:featuredmedia"]?.[0];
  const terms = embedded["wp:term"]?.flat() ?? [];

  const title = plain(post.title?.rendered ?? "") || "Untitled";
  const rawContent = post.content?.rendered ?? "";
  const plainText = plain(rawContent);

  // Jetpack mirrors the featured image on WordPress.com-connected sites; it is a
  // useful fallback when the embed is missing but a CDN copy exists.
  const imageUrl =
    media?.source_url ?? (post as { jetpack_featured_media_url?: string }).jetpack_featured_media_url;

  return {
    id: post.id,
    slug: post.slug,
    title,
    date: new Date(post.date ?? Date.now()),
    // WordPress excerpts trail off with "Continue reading …" or a bare "[…]".
    // Neither belongs in a standfirst or a card.
    excerpt: plain(post.excerpt?.rendered ?? "")
      .replace(/\s*Continue reading.*$/i, "")
      .replace(/[\s,;:]*\[?(?:…|\.\.\.)\]?\s*$/, "…"),
    contentHtml: makeContentResponsive(rawContent),
    plainText,
    author: {
      name: author?.name ? plain(author.name) : "The newsroom",
      avatar: author?.avatar_urls?.["96"] ?? author?.avatar_urls?.["48"] ?? null,
    },
    image: imageUrl ? { url: imageUrl, alt: media?.alt_text || title } : null,
    categories: terms
      .filter((term) => term?.taxonomy === "category" && term.name)
      .map((term) => plain(term.name as string)),
    tags: terms
      .filter((term) => term?.taxonomy === "post_tag" && term.name)
      .map((term) => plain(term.name as string)),
    readingMinutes: readingMinutes(plainText),
    sourceUrl: post.link ?? "",
  };
}

export async function fetchArticles(): Promise<{ articles: Article[]; restBaseUrl: string }> {
  const wp = createWordPressClient({ url: WORDPRESS_URL });

  const { data, pagination } = await wp.posts.list({
    perPage: POST_LIMIT,
    orderBy: "date",
    _embed: true,
  });

  if (data.length === 0) {
    throw new Error(
      `${wp.restBaseUrl} returned no posts. Check WORDPRESS_URL in tools/config.ts points at a public WordPress site.`,
    );
  }

  console.log(
    `WordPress: ${data.length} of ${pagination.total ?? "?"} posts from ${wp.restBaseUrl}`,
  );
  return { articles: data.map(normalize), restBaseUrl: wp.restBaseUrl };
}
