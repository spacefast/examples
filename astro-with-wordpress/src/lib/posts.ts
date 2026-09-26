import {
  createWordPressClient,
  type WordPressPost,
} from "@spacefast/wordpress";

export type EditorialPost = WordPressPost & {
  content: { rendered: string };
  date: string;
  excerpt: { rendered: string };
  title: { rendered: string };
};

const hasConfiguredSource = Boolean(
  process.env.WORDPRESS_URL ||
    process.env.SPACEFAST_DATA_SOURCES ||
    process.env.SPACEFAST_DATASOURCES,
);

const client = hasConfiguredSource
  ? createWordPressClient()
  : createWordPressClient({ url: "https://wordpress.org/news" });

let postsPromise: Promise<EditorialPost[]> | undefined;

export function loadPosts() {
  postsPromise ??= client.posts
    .list<EditorialPost>({ perPage: 6, orderBy: "date" })
    .then(({ data }) => data);
  return postsPromise;
}

export function plainText(html: string) {
  return html
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&#8217;|&rsquo;/g, "’")
    .replace(/&#8211;|&ndash;/g, "–")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

export function readableDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
}
