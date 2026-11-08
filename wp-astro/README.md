# Headless WordPress + Astro

An editorial blog that runs WordPress headlessly: the posts live in a real
WordPress install and are pulled from its public REST API at build time, then
rendered to flat HTML by Astro. No server, PHP, or database at request time.

```sh
bun install
bun run dev
sf publish
```

The CLI detects Astro, runs `bun run build`, and publishes `dist/`.

Important files:

- `src/lib/wp.ts` makes one `?_embed` request so each post arrives with its
  author, featured image, and categories, then normalizes the WordPress shapes
  (rendered HTML in titles, optional embeds, entity escapes) into a small `Post`.
- `src/pages/index.astro` renders a lead story plus a card grid;
  `src/pages/[slug].astro` uses `getStaticPaths` to bake one page per post.
- `src/config.ts` holds the three things to change: the REST API base (the
  demo is `https://wordpress.org/news/wp-json/wp/v2`), the blog title, and the
  accent color.

Posts with no featured image fall back to `jetpack_featured_media_url` and then
to a tinted placeholder, never a broken image.
