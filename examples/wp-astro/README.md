# Headless WordPress + Astro

A polished editorial blog that runs **WordPress headlessly**: the posts live in a real
WordPress install and are pulled from its public REST API **at build time**, then
rendered to flat static HTML by Astro. There is no server, no PHP, and no database when
a visitor loads a page — WordPress is just the editor, Astro is the renderer, and
Spacefast serves the output.

The data layer (`src/lib/wp.ts`) makes a single `?_embed` request so each post comes back
with its author, featured image, and categories attached, then normalizes the messy
WordPress shapes (rendered HTML in titles, optional embeds, entity escapes) into a small,
predictable `Post` object. `src/pages/index.astro` renders a full-width lead story plus a
responsive grid of post cards; `src/pages/[slug].astro` uses `getStaticPaths` to bake one
static page per post with its rendered HTML styled as editorial prose. Posts with no
featured image fall back to `jetpack_featured_media_url` and finally to a tasteful tinted
placeholder — never a broken image.

The three things you'd change are isolated in `src/config.ts`: the WordPress REST API base,
the blog title, and the accent color (everything else stays a calm editorial neutral, and
on-accent text auto-picks black or white for contrast). The demo source is
`https://wordpress.org/news`. Build it with `npm install && npm run build` (output in
`dist/`) and publish that folder to Spacefast.

**Live:** _not yet published_

Build your own with the prompt in [`prompt.md`](./prompt.md).
