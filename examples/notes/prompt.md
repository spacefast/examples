Build me a **digital garden — a small website of interlinked notes that grows over
time, with wiki-style links, automatic backlinks, a link graph, search, and
"planted / growing / evergreen" growth tags** as an **Astro site** (real project,
content collections, `astro build` to static HTML — no server, no database).

**Before you build, ask me these questions in one message and wait for my answers. If I skip anything, choose a sensible default and tell me what you chose:**

1. What's the topic area of the notes? (e.g. note-taking & memory, a course you're
   taking, your field of work, a hobby — anything you want to think out loud about.)
2. Give me 4–5 starter note titles and, for each, which of the others it should
   link to. (Don't overthink it — I'll wire the `[[links]]` for you.)
3. Should the garden be fully public, or shared privately behind a password?
4. What should the garden be called, and who's tending it? (A name and an author.)

**Then build a complete, polished, responsive site with:**

- **Interlinked notes** — each note is a Markdown file with a title, a growth
  status, a planted date, a last-tended date, and a short summary. Inside the body,
  references to other notes use `[[Wiki Link]]` syntax (with optional
  `[[Real Title|alias text]]`), rewritten into real internal links at build time.
- **A backlinks panel** on every note — a "Linked from" section listing every other
  note that points at this one, computed automatically by walking all notes (not
  hand-maintained). Show a "Links out" panel too.
- **An index + link graph** on the home page — a force-directed map of all notes and
  the links between them, laid out at build time and rendered as static SVG, with
  hover/tap highlighting of a note's neighbourhood. Plus a full text index grouped
  by growth status.
- **Search** — an instant client-side search box that matches note titles,
  summaries, and body text and shows a ranked dropdown. Support `/` to focus it and
  `Esc` to dismiss.
- **Status tags** — every note wears one of 🌱 _planted_ / 🌿 _growing_ / 🌲
  _evergreen_, colour-coded everywhere it appears, with a legend explaining what
  each stage means.

**Design & content notes:**

- A warm, "greenhouse" mood: a cream paper background, a deep forest-green ink, and
  three living accent colours for the statuses (amber for planted, green for
  growing, pine-teal for evergreen). A friendly serif (e.g. Fraunces) for display
  type, a clean sans (e.g. Inter) for reading. Calm, bookish, a little botanical.
- Write **real, thoughtful notes** based on my topic and titles — a few honest
  paragraphs each, with the `[[links]]` woven naturally into the prose. Never
  "lorem ipsum". If I leave gaps, invent believable, on-topic notes.
- Use real images. Pull a free greenhouse/light photo for the hero, e.g.
  `https://picsum.photos/seed/greenhouse-1/1600/900` or
  Pexels, with descriptive `alt` text. (Notes themselves stay text-first.)
- Use **Astro content collections** for the notes, a small remark plugin to turn
  `[[wiki links]]` into real links at build time, and a build-time pass to compute
  backlinks and the graph layout. Everything renders to static HTML — no runtime
  server.
- Keep it accessible (semantic HTML, labelled search field, keyboard support, good
  contrast, and the graph readable as an SVG with an `aria-label`).

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="notes"></script>
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
