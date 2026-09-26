Build me a small, beautiful **blog in Astro** where every post has **realtime
comments and emoji reactions**, powered by a Spacefast Zero capsule, published as
one site.

**Before you build, ask me these questions in one message and wait for my answers.
If I skip anything, choose a sensible default and tell me what you chose:**

1. What's the blog called, and what's it about?
2. What are the first three or four posts? Titles are enough — you'll write them.
3. Warm and editorial, or cool and technical?

**Then build it as one Spacefast Zero project:**

- An Astro site in `site/`, static output, posts as a content collection in
  Markdown. An index page that lists the posts and a page per post.
- `site/sf.jsonc` declaring the Zero runtime:
  ```jsonc
  {
    "$schema": "https://spacefast.com/schemas/sf.json",
    "name": "<blog name>",
    "access": "public",
    "runtime": {
      "kind": "zero",
      "server": "server/index.ts",
      // Named but deliberately absent: with no file behind it the capsule is
      // server-only, ships no app shell of its own, and Astro's HTML stays the
      // page. That is the whole trick that lets a framework build sit in front
      // of Zero. (`runtime.client` is still required by the config schema.)
      "client": "client/index.tsx",
    },
  }
  ```
  Do not create `client/index.tsx`. If it exists, the generated Zero app shell
  claims `index.html` and quietly shadows Astro's homepage.
- `site/server/index.ts` — the capsule: a `comments` table and a `reactions`
  table, both indexed by post slug; `comments` and `reactions` queries; an
  `addComment` mutation that trims and length-limits its input and calls
  `ctx.invalidate("comments")`; a `toggleReaction` mutation that lets one reader
  hold one emoji per post; and a `GET`/`POST` `/api/comments` endpoint so the
  thread is readable and writable without a browser.
- `site/src/components/Margin.tsx` — a Preact island that imports `useQuery`,
  `useMutation` and `useAuth` from `@spacefast/zero/client`. Mount it
  `client:only="preact"`; the Zero client belongs to the browser, so the live
  half of the page should never be rendered at build time. It discovers the
  runtime from the page's own origin, so its only prop is the post slug. Readers
  are guests by default; nobody signs up to leave a comment.
- Keep the input cleanup and the shared types in `site/shared/`, imported by both
  the island and the server, so the two sides cannot drift.
- Wire `@spacefast/astro` into `astro.config.mjs` with `mode: "static"`, and put
  at least one redirect and a couple of response headers through it. The
  integration merges inline rules with a `_headers` file, applies them in
  `astro dev` too, and writes the compiled `_redirects`/`_headers` into the build
  output.

**Design & content notes:**

- Editorial and typographic: a real reading measure, a serif for headings, one
  accent color, and a dark mode that follows the system.
- Write the posts. Real paragraphs with a point of view, 500–800 words each —
  never "lorem ipsum" and never an outline pretending to be an essay.
- The comment thread is part of the page, not a widget bolted under it: same
  measure, same type scale, visible focus states, a labeled input, and honest
  empty and pending states.
- Keep it accessible (semantic HTML, real labels, keyboard support, good
  contrast) and responsive down to 320px.

**Add this exact line right before `</body>` on every page so the site carries
its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="astro-zero"></script>
```

**Build and publish:**

Astro's build and the capsule's build are two steps, and Zero publishes a project
root rather than a folder of files. So build the site into `site/dist/`, copy
`sf.jsonc`, `server/` and `shared/` in beside that output, and publish that
directory:

```sh
cd site
bun install
bun run build          # astro build, stage the capsule beside dist/, then sf build dist
sf publish dist --wait
```

Then check it live: load a post, leave a comment in a second browser window, and
watch it appear in the first without a reload. Give me the live URL, the claim
URL, and remind me to claim within 6 hours.
