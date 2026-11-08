# WordPress + React SPA

A client-side reading app for any WordPress site: a Vite + React single-page
app that fetches posts from a public, CORS-enabled WordPress REST API in the
browser. No backend, no server-side rendering, no build-time content.

```sh
bun install
bun run dev
sf publish
```

The CLI detects Vite, runs `bun run build`, and publishes `dist/`.

Two views, wired with a small hash router so every post is deep-linkable:

- **List** (`#/`): a card grid with featured image, title, excerpt, author,
  date, and reading time. A debounced search box uses the REST API's `search`
  parameter; Newer/Older pagination follows the `X-WP-TotalPages` header.
- **Article** (`#/post/:id`): title, byline, hero image, and the post body,
  sanitized with DOMPurify before it is injected.

Every async path has a real state: skeletons while loading, an empty state, and
a recoverable error panel. A light/dark toggle persists in `localStorage`.

Important files:

- `src/config.js` holds the API base URL, title, tagline, and page size. The
  default is `https://wordpress.org/news/wp-json/wp/v2`.
- `public/_redirects` contains `/*  /index.html  200`, the SPA fallback. Vite
  copies `public/` into `dist/`, so deep links resolve on Spacefast.
