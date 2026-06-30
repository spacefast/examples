# WordPress + React SPA — build it yourself

Copy everything below the line into your AI agent (Claude, ChatGPT, Codex, Cursor,
or any agent that can write files and run a command). It will ask you a few quick
questions, build the site, and publish it live to Spacefast.

---

Build me a **single-page reading app that pulls posts from a WordPress site over
its public REST API** as a **Vite + React app** (client-side only — the browser
fetches the content at runtime, no backend, no server-side rendering).

**First, ask me these questions and wait for my answers:**

1. What's the WordPress REST API base URL? (e.g. `https://your-site.com/wp-json/wp/v2`.
   If you don't have one, use the always-on public demo `https://wordpress.org/news/wp-json/wp/v2`.)
2. What should the app be called, and what's a one-line tagline?
3. Light theme, dark theme, or a toggle that remembers my choice?

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

**Finally, publish it to Spacefast so it's live in seconds — no account needed:**

- Build first (`npm run build`), then zip the `dist/` folder (or point at it) and publish:
  ```bash
  curl -F archive=@site.zip https://api.spacefast.com/v1/publish
  ```
  (or just say: _"fetch https://spacefast.com/ai and publish this to Spacefast"_)
- You'll get a **live URL**, a permanent version URL, and a one-time **claim link**.
- Open the claim link and sign in within 24 hours to keep it forever — same URL.
- Want to change it later? Edit the files and publish again; every version keeps
  its own URL and you can roll back anytime.

Learn more at **https://spacefast.com**.
