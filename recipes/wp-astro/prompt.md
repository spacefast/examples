Build me a **headless WordPress blog** as an **Astro site** that fetches posts from a public WordPress REST API **at build time** and renders them to static HTML. WordPress stays the place I write; Astro is the renderer; Spacefast hosts the result. No server, no PHP, and no database run when a visitor loads the page.

**Before you build, ask me these questions in one message and wait for my answers. If I skip anything, choose a sensible default and tell me what you chose:**

1. What's the WordPress site you want to pull from? Give me the site URL — I'll use its REST API at `<url>/wp-json/wp/v2` (any public WordPress.org-hosted or self-hosted site works; if you're not sure, use `https://wordpress.org/news`).
2. What should the blog be called (the title in the header and browser tab)?
3. Which categories, authors, or content types should be featured or excluded?
4. What's the accent color (a hex like `#0b6e4f`), and should the visual tone feel
   like a newspaper, magazine, or personal blog?

**Then build a complete, polished, responsive site with:**

- A small build-time data layer that fetches `/<api>/posts?_embed&per_page=12` once, during `astro build`, and normalizes each post (title, date, author, featured image, categories, rendered HTML) into a tidy shape the pages consume. Use `?_embed` so the author and featured image come back in the same request — no N+1 follow-ups.
- A blog index: a full-width lead story followed by a responsive grid of post cards, each with featured image, category tags, title, excerpt, author + avatar, date, and reading time.
- A static page per post (`/<slug>/`) generated with `getStaticPaths`: title, category tags, author + avatar, date, reading time, a featured-image banner, and the post's rendered HTML styled as clean editorial "prose" (headings, figures, blockquotes, lists, code).
- A short header strip that explains: **"Content from WordPress, rendered statically with Astro, hosted on Spacefast."** plus a small "Source: <site>" link.
- A footer crediting the WordPress REST API source, Astro, and Spacefast.

**Design & content notes:**

- Editorial-magazine feel: a serif display face for headings (a system serif stack is fine — no heavy web fonts needed), a clean sans for body, generous whitespace, warm off-white background, and the one accent color used for tags, links, and buttons.
- Real content only — every post comes from the live WordPress API, never "lorem ipsum".
- **Handle missing featured images** with a tasteful placeholder (a soft tinted panel with the post's first initial), not a broken image. Some WordPress posts have no featured image — prefer the `_embedded` featured media, fall back to `jetpack_featured_media_url` if present, otherwise show the placeholder.
- Keep WordPress's rendered HTML safe to drop in, and make sure images inside post content keep their aspect ratio (`height: auto`) so nothing stretches.
- Use Astro's static output (`astro build` → `dist/`). No SSR adapter, no runtime fetch.
- Keep it accessible: semantic HTML, a skip link, alt text on images, labelled landmarks, visible focus states, and good contrast (auto-pick black/white text on the accent).

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="wp-astro"></script>
```

**When the site is ready, publish it to Spacefast:**

1. Use `./dist` as the publish folder. For no-build projects, put only the finished public files in that dedicated folder. Confirm it has `index.html` at its root and no secrets, source files, `.git`, or `.spacefast` state.
2. Fetch https://spacefast.com/setup.md and follow its current direct API publishing instructions. Check for an existing Space before creating one, and follow the returned upload and polling steps.
3. Report success only when `data.next.action` is `done` and the intended version is serving. If more work is needed, report the returned next step.
4. For an anonymous publish, give me `data.claim.message` unchanged. It contains the private preview (`data.claim.url`), the owner's claim link (`data.claim.claimUrl`), and the deadline (`data.claim.expiresAt`). Keep both links private. Never print the separate `data.claim.key`.
5. Keep `data.space.id` and the returned credential securely for updates to the same Space. Follow the guide for credential recovery after claiming. Keep credentials and `.spacefast` state out of the published files, commits, and logs.

If the `sf` CLI is already installed, `sf publish ./dist --wait` follows the same publishing flow. See [publishing](https://spacefast.com/docs/publish/) and [claiming a Space](https://spacefast.com/docs/anonymous-and-claim/).
