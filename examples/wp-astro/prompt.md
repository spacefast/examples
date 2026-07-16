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

**When the site is ready, publish it to Spacefast with the direct API — no account, install, or extra instructions needed:**

1. Use `./dist` as the publish folder. For no-build projects, put only the finished public files in that dedicated folder. Confirm it has `index.html` at its root and no secrets, source files, `.git`, or `.spacefast` state.
2. First publish: send every file as multipart form data. This Bash/Zsh block preserves relative paths and works for one file or a whole folder:
   ```bash
   PUBLISH_ROOT=./dist
   publish_files=()
   while IFS= read -r -d "" file; do
     relative=${file#"$PUBLISH_ROOT"/}
     publish_files+=(-F "files=@$file;filename=$relative")
   done < <(find "$PUBLISH_ROOT" -type f -print0)
   curl -sS "${publish_files[@]}" "https://api.spacefast.com/v1/publish?wait=1"
   ```
3. From the `{ "data": ... }` receipt, give me `data.space.liveUrl`, `data.version.immutableUrl`, `data.claim.url`, and `data.claim.expiresAt`. Remind me to claim within 6 hours. Keep `data.claim.token` secret.
4. Save `data.space.id` and `data.claim.token` locally (for example in an ignored, mode-600 `.spacefast/state.json`). For a quick update, rebuild the `publish_files` array above and publish to the same space:
   ```bash
   SPACEFAST_SPACE_ID=<saved-space-id>
   SPACEFAST_TOKEN=<saved-claim-token-or-access-token>
   curl -sS -H "Authorization: Bearer $SPACEFAST_TOKEN" \
     -F "spaceId=$SPACEFAST_SPACE_ID" "${publish_files[@]}" \
     "https://api.spacefast.com/v1/publish?wait=1"
   ```
   If an update after claiming returns `space_claimed_credential_available`, exchange the saved claim token once at `POST https://api.spacefast.com/v1/anonymous-claim/exchange`, save `data.credential.accessToken`, and retry with that access token.

**Optional shortcuts and reference only:** if the `sf` CLI is already installed, `sf publish ./dist --wait` does the same job. A zip of the publish folder is also supported, but neither the CLI nor a zip is required. Docs: [direct agent/API publishing](https://spacefast.com/docs/agents) · [files and folders](https://spacefast.com/docs/publishing) · [claiming](https://spacefast.com/docs/anonymous-publish) · [updates and rollback](https://spacefast.com/docs/rollback)
