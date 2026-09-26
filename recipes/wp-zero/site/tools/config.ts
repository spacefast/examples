// The three answers the recipe asks for. Change them, run `bun run build`, and
// the whole site re-fetches and re-skins.

/**
 * Any public WordPress site. The client accepts a site URL, a `/wp-json` root,
 * or a `/wp-json/wp/v2` root — it works out the rest. Self-hosted WordPress and
 * WordPress.com sites both expose this by default.
 *
 * Override for one build without editing this file: `WORDPRESS_URL=… bun run build`.
 */
export const WORDPRESS_URL = process.env.WORDPRESS_URL || "https://wordpress.org/news";

/** The publication. Used in the masthead, page titles, and the capsule name. */
export const SITE_NAME = "Broadsheet";

export const SITE_TAGLINE = "Dispatches from the open web, republished statically.";

/** One accent. Everything else is paper, ink, and a rule or two. */
export const ACCENT = "#d9410b";

/** How many posts to pull at build time. WordPress caps `per_page` at 100. */
export const POST_LIMIT = 18;

/** The recipe slug, for the shared Spacefast badge. */
export const BADGE_SLUG = "wp-zero";
