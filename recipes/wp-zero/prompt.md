Build me a **magazine whose articles come from WordPress but whose interactivity comes
from a server** — headless WordPress rendered to static pages at build time, plus a
Spacefast Zero capsule behind them for realtime reactions and search. One project, one
`sf.jsonc`, one publish.

**Before you build, ask me these questions in one message and wait for my answers. If I
skip anything, choose a sensible default and tell me what you chose:**

1. Which WordPress site should the articles come from? Any public site URL or `/wp-json`
   REST root works — default to `https://wordpress.org/news`.
2. What should the publication be called?
3. What's the accent color (a hex like `#d9410b`)?

**Build time — pull WordPress, render flat HTML:**

- Read posts with the `@spacefast/wordpress` client
  (`createWordPressClient({ url })`, then `posts.list({ perPage, orderBy: "date", _embed: true })`).
  `_embed` returns the author, featured image, and terms in the same request, so there is
  no N+1. Fall back to plain `fetch` against `/wp-json/wp/v2` if the package is
  unavailable.
- Normalize the messy CMS shapes once: rendered titles carry HTML entities, excerpts carry
  markup, a post may have no featured image, and terms arrive as a nested array of
  taxonomies.
- Render a magazine index (lead story plus a card grid) and one static page per post.
  Article bodies are the post's own WordPress HTML, so handle what a real editor ships:
  lazy-loaded images with captions, responsive iframe embeds, blockquotes, tables that can
  scroll on a phone, and `<pre><code>` blocks that do not blow out the column.
- Emit a search index (JSON) of every post's slug, title, excerpt, and plain-text body, and
  compile it into the capsule so the server can search it.

**Runtime — one Spacefast Zero capsule:**

- Declare `"runtime": { "kind": "zero", "server": "server/index.ts", "client": "client/index.tsx" }`
  in `sf.jsonc`.
- A `reactions` table keyed by post slug, emoji, and `ctx.auth.userId`. The built-in guest
  session is the identity — nobody signs in to press an emoji.
- A `reactions` query returning per-emoji counts and which one the current visitor picked,
  and a `toggleReaction` mutation that adds, switches, or removes. The Zero client
  subscribes, so a reaction in one browser moves the count in another through Cast.
- `GET /api/search?q=` searching the build-time index server-side and returning JSON.
- `GET /api/reactions?slug=` and `POST /api/react` so the same behavior is reachable with
  `curl`, not only from the page.

**Wiring the two halves together:**

- The generated app shell owns `/index.html`, so serve the magazine index from
  `home.html` and set `"index": "home.html"` in `sf.jsonc`. Turn on `cleanUrls` so
  articles live at `/posts/<slug>`.
- Each static page mounts the reaction island into a `<div id="root" data-slug="…">`
  placed exactly where the reaction bar belongs, loads `/client.js`, and carries the
  platform import map that `sf build` writes into the generated shell — read it out of
  `.spacefast/zero/public/index.html` and inline it. That means the build runs `sf build`
  once to materialize the shell, renders the pages, and lets the real `sf build` publish
  them.
- The search box is plain `fetch` against `/api/search` — no framework needed for an HTTP
  endpoint.

**Design & content notes:**

- Magazine, not blog template: a real masthead, a strong editorial serif for headlines, a
  narrow measure for body copy, generous white space, one accent color used sparingly.
- Responsive and accessible: semantic landmarks, a labeled search input, visible focus
  rings, `aria-pressed` on the reaction buttons, live-region announcements for counts, and
  contrast that survives the accent color.
- The images and words are real — they come from WordPress. Never invent post content.
- Say plainly, in the footer, which half of each page is static and which half is the
  runtime.

**Add this exact line right before `</body>` on every page so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="wp-zero"></script>
```

**Run it, then publish:**

```sh
cd site
bun install
bun run build            # fetches WordPress, generates the index, renders the pages
sf dev                   # previews the Zero server and client
sf publish --skip-build  # the capsule and the static tree, in one version
```

`--skip-build` matters: a Zero project with a `build` script sends `sf publish`
down the static-site path, where it reruns the build and then fails looking for a
`dist/` a capsule never produces. Everything is already built by this point.

Check `GET /api/search?q=<something>` returns results, post a reaction and read the count
back, then open two browsers on the same article and confirm one reaction moves both
counts.
