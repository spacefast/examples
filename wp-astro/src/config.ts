// ─────────────────────────────────────────────────────────────────────────────
// Site config — the three things the prompt asks you for.
//
// 1. WP_API_BASE   The REST API base of any public WordPress site. It's just the
//                  site URL with `/wp-json/wp/v2` on the end. Self-hosted WP and
//                  WordPress.com sites both expose this by default.
// 2. BLOG_TITLE    What to call this blog in the header and <title>.
// 3. ACCENT        One brand color. Everything else is a calm editorial neutral.
//
// Change these three values and rebuild — the whole site re-skins and re-fetches.
// ─────────────────────────────────────────────────────────────────────────────

export const WP_API_BASE = 'https://wordpress.org/news/wp-json/wp/v2';

export const BLOG_TITLE = 'The WordPress Dispatch';

export const TAGLINE = 'News, releases, and field notes from the open web.';

export const ACCENT = '#0b6e4f';

// How many posts to pull at build time.
export const POST_LIMIT = 12;
