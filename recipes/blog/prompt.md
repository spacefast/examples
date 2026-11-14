Build me a **writing / dev blog** as an **Astro site** — a real, minimal Astro
project with Markdown content collections, syntax-highlighted code, and an RSS
feed (run `bun install && bun run build` at the end and confirm `dist/` exists).

**Before you build, ask me these questions in one message and wait for my answers. If I skip anything, choose a sensible default and tell me what you chose:**

1. What's the blog name, its subject, and the voice you want readers to hear
   (e.g. practical field notes, reported essays, or personal commentary)?
2. Give me 3 sample post titles or themes you'd like to start with.
3. Is this a code-heavy dev blog, a collection of essays, or a mix of both?
4. What's the author name, one-line bio, and where can people follow you (GitHub,
   Mastodon, email)?

**Then build a complete, polished, responsive site with:**

- A **post index** on the homepage: a short personal intro, a row of clickable
  tag chips, and a clean reverse-chronological list of posts (date, title,
  one-line description, tags, reading time).
- **Article pages** with reading-first typography — a centered ~65-character
  measure, a serif body face, a clear title/dek/byline, and previous/next post
  links at the bottom.
- **Code highlighting** on every fenced code block (use Astro's built-in Shiki),
  plus nicely styled inline code, blockquotes, and lists.
- **Tag pages**: an "all tags" index with post counts, and a page per tag listing
  its posts.
- An **About page** with the author photo, bio, what the blog is about, and links
  to follow.
- An **RSS feed** at `/rss.xml` generated from the posts, linked from the
  document `<head>` so feed readers auto-discover it.
- Write **5–6 real posts** based on my topic — actual paragraphs and real code
  samples, never "lorem ipsum". Mix essays and code-heavy pieces per my answer.

**Design & content notes:**

- Minimal reading-typography mood: a warm paper light theme and a calm "ink"
  dark theme with a header toggle (remember the choice in `localStorage` and set
  it before first paint to avoid a flash). One restrained accent color. A serif
  for headings and article body (e.g. Newsreader), a clean sans for UI (e.g.
  Inter), and a monospace for code (e.g. JetBrains Mono).
- Use realistic content based on my answers — never "lorem ipsum". Invent
  believable post bodies, dates, and a bio if I leave gaps.
- Use real images. Pull free photos that fit, e.g.
  `https://picsum.photos/seed/blog-1/1200/800` (vary the seed), and add
  descriptive `alt` text.
- Use **Astro content collections**: a `posts` collection of Markdown files with
  a typed frontmatter schema (title, description, pubDate, tags, draft), and
  `getCollection` to build the index, article, tag, and RSS routes. Keep it
  static — nothing should run at request time beyond `astro build`.
- Keep it accessible (semantic HTML, a skip link, labelled controls, keyboard
  support, good contrast in both themes).

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="blog"></script>
```

**When the site is ready, publish it to Spacefast:**

1. Use `./dist` as the publish folder. For no-build projects, put only the finished public files in that dedicated folder. Confirm it has `index.html` at its root and no secrets, source files, `.git`, or `.spacefast` state.
2. Fetch https://spacefast.com/setup.md and follow its current direct API publishing instructions. Check for an existing Space before creating one, and follow the returned upload and polling steps.
3. Report success only when `data.next.action` is `done` and the intended version is serving. If more work is needed, report the returned next step.
4. For an anonymous publish, give me `data.claim.message` unchanged. It contains the private preview (`data.claim.url`), the owner's claim link (`data.claim.claimUrl`), and the deadline (`data.claim.expiresAt`). Keep both links private. Never print the separate `data.claim.key`.
5. Keep `data.space.id` and the returned credential securely for updates to the same Space. Follow the guide for credential recovery after claiming. Keep credentials and `.spacefast` state out of the published files, commits, and logs.

If the `sf` CLI is already installed, `sf publish ./dist --wait` follows the same publishing flow. See [publishing](https://spacefast.com/docs/publish/) and [claiming a Space](https://spacefast.com/docs/anonymous-and-claim/).
