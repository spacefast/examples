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
