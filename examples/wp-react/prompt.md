Build me a **single-page reading app that pulls posts from a WordPress site over
its public REST API** as a **Vite + React app** (client-side only — the browser
fetches the content at runtime, no backend, no server-side rendering).

**Before you build, ask me these questions in one message and wait for my answers. If I skip anything, choose a sensible default and tell me what you chose:**

1. What's the WordPress REST API base URL? (e.g. `https://your-site.com/wp-json/wp/v2`.
   If you don't have one, use the always-on public demo `https://wordpress.org/news/wp-json/wp/v2`.)
2. What should the app be called, and what's a one-line tagline?
3. Which categories, authors, or post types should be searchable or featured?
4. Light theme, dark theme, or a toggle that remembers my choice?

**Then build a complete, polished, responsive reading app with:**

- A **post list** view: a responsive grid of cards, each with the post's title,
  a short excerpt, the author, the date, an estimated reading time, and the
  featured image (read from the `_embedded` data so it's one request, not many).
  Lead with one larger "featured" card for the newest post.
- A **post detail** view: the title, the author (avatar + name), the date and
  reading time, the featured image with its caption, and the full rendered post
  body. Render the post HTML with `dangerouslySetInnerHTML`, but **sanitize it
  first** (use DOMPurify) so nothing in the feed can run script.
- **Client-side routing** so each post has its own URL. A hash router
  (`#/` for the list, `#/post/:id` for a post) keeps deep links working on any
  static host. Back/forward and refresh must land on the right view.
- A **search box** that queries the API's `search` parameter (debounced), and
  simple **pagination** (Newer / Older) driven by the `X-WP-TotalPages` header.
- Real **loading, empty, and error states**: skeleton cards while a request is in
  flight, a friendly "no results" message, and a recoverable error panel with a
  working "Try again" button for when the API is slow or down. The app must never
  show a blank white screen.

**Design & content notes:**

- A calm, editorial reading look: a serif face (Georgia / Iowan) for headlines and
  article body for readability, a clean system sans for UI, generous line-height,
  and one restrained accent color. Cards lift gently on hover; images fade in.
- Honor my light/dark choice. If I asked for a toggle, default to the OS preference
  and persist my pick in `localStorage`.
- The content is real — it comes live from the WordPress REST API at runtime, so
  there's no "lorem ipsum" to write. For any post without a featured image, show a
  tasteful gradient placeholder instead of a broken image.
- Keep everything configurable from one small `src/config.js` (API base URL, app
  title, tagline, page size) so I can point it at a different WordPress site by
  changing one line.
- Because this is a single-page app, add a **SPA fallback** so deep links resolve:
  put a `_redirects` file in `public/` containing `/*  /index.html  200` (Vite
  copies `public/` into the build output, so it lands in `dist/`).
- Mobile-first and accessible: semantic HTML, a skip link, labelled inputs,
  keyboard support, visible focus styles, good contrast, and `alt` text from the
  WordPress media data. Respect `prefers-reduced-motion`.
- Build it with Vite (`npm create vite@latest` / `react` template), then
  `npm run build` to produce the static `dist/` you'll publish.

**Add this exact line right before `</body>` in `index.html` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="wp-react"></script>
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
