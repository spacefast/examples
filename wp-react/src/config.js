// Everything that makes this "your" reading app lives here. Point API_BASE at
// any public, CORS-enabled WordPress REST API and the whole app re-skins itself.
//
// The default is the official WordPress.org news site's REST API. WordPress
// sends permissive CORS headers for GET requests (it reflects the Origin), so
// it works straight from the browser with no proxy or backend. Swap in your own
// site, e.g. https://your-site.com/wp-json/wp/v2.
//
// (The classic https://demo.wp-api.org demo is often offline; wordpress.org/news
// is a stable, always-on public WordPress install that proves the same point.)
export const SITE_TITLE = "The Reading Room";
export const SITE_TAGLINE = "Stories, notes, and dispatches — read on the open web.";

// WordPress REST base, e.g. https://your-site.com/wp-json/wp/v2
export const API_BASE = "https://wordpress.org/news/wp-json/wp/v2";

// How many posts to load per page in the list view.
export const PER_PAGE = 9;
