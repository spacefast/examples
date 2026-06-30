# WordPress + React SPA

A polished, client-side reading app for any WordPress site. It's a Vite + React
single-page app that fetches posts straight from a public, CORS-enabled WordPress
REST API in the browser — no backend, no server-side rendering, no build-time
content. This is the "headless WordPress" pattern: keep editing in WordPress, ship
a fast custom front end.

The app has two views wired up with a tiny hash router so every post is
deep-linkable:

- **List** (`#/`) — a responsive card grid showing each post's featured image,
  title, excerpt, author, date, and estimated reading time, led by a larger
  featured card for the newest post. A debounced search box queries the REST API's
  `search` parameter, and Newer/Older pagination follows the `X-WP-TotalPages`
  response header.
- **Article** (`#/post/:id`) — the title, author avatar and byline, a hero image
  with its caption, and the full post body. The rendered HTML is sanitized with
  DOMPurify before it's injected, so nothing in the feed can run script.

Every async path has a real state: skeleton cards while loading, a friendly empty
state for no results, and a recoverable error panel with a working "Try again"
button for when the API is slow or offline. There's a light/dark toggle that
defaults to the OS preference and persists in `localStorage`.

Everything that makes it "your" site lives in **`src/config.js`**: the API base
URL, the app title and tagline, and the page size. Point `API_BASE` at your own
`https://your-site.com/wp-json/wp/v2` and the whole app re-skins itself. The
default is `https://wordpress.org/news/wp-json/wp/v2`, an always-on public
WordPress install (the classic `demo.wp-api.org` demo is frequently offline).

## Run it

```bash
npm install     # or: bun install
npm run dev      # local dev server
npm run build    # static output in dist/
```

## Publishing notes

Because it's a single-page app, `public/_redirects` contains `/*  /index.html  200`.
Vite copies `public/` into `dist/`, so the SPA fallback ships with the build and
deep links like `/#/post/123` resolve correctly on Spacefast. Publish the `dist/`
folder.

Built with Vite + React. Content via the WordPress REST API. Made to publish on
[Spacefast](https://spacefast.com).
