# Margins — build it yourself

Copy everything below the line into your AI agent (Claude, ChatGPT, Codex, Cursor,
or any agent that can write files and run a command). It will ask you a few quick
questions, build the site, and publish it live to Spacefast.

---

Build me a **writing / dev blog** as an **Astro site** — a real, minimal Astro
project with Markdown content collections, syntax-highlighted code, and an RSS
feed (run `bun install && bun run build` at the end and confirm `dist/` exists).

**First, ask me these questions and wait for my answers:**

1. What's the blog name and its topic / voice? (e.g. "Margins — calm notes on
   web craft")
2. Give me 3 sample post titles you'd like to start with.
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
- Use real images. Pull free photos that fit, e.g. from Unsplash
  (`https://source.unsplash.com/1200x800/?writing,desk,coffee`) or
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

**Finally, publish it to Spacefast so it's live in seconds — no account needed:**

- Zip the site (or point at the folder) and publish:
  ```bash
  curl -F archive=@site.zip https://api.spacefast.com/v1/publish
  ```
  (or just say: _"fetch https://spacefast.com/ai and publish this to Spacefast"_)
- You'll get a **live URL**, a permanent version URL, and a one-time **claim link**.
- Open the claim link and sign in within 24 hours to keep it forever — same URL.
- Want to change it later? Edit the files and publish again; every version keeps
  its own URL and you can roll back anytime.

Learn more at **https://spacefast.com**.
