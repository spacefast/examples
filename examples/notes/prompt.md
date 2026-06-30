# Glasshouse — build it yourself

Copy everything below the line into your AI agent (Claude, ChatGPT, Codex, Cursor,
or any agent that can write files and run a command). It will ask you a few quick
questions, build the site, and publish it live to Spacefast.

---

Build me a **digital garden — a small website of interlinked notes that grows over
time, with wiki-style links, automatic backlinks, a link graph, search, and
"planted / growing / evergreen" growth tags** as an **Astro site** (real project,
content collections, `astro build` to static HTML — no server, no database).

**First, ask me these questions and wait for my answers:**

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
- **Status tags** — every note wears one of 🌱 *planted* / 🌿 *growing* / 🌲
  *evergreen*, colour-coded everywhere it appears, with a legend explaining what
  each stage means.

**Design & content notes:**

- A warm, "greenhouse" mood: a cream paper background, a deep forest-green ink, and
  three living accent colours for the statuses (amber for planted, green for
  growing, pine-teal for evergreen). A friendly serif (e.g. Fraunces) for display
  type, a clean sans (e.g. Inter) for reading. Calm, bookish, a little botanical.
- Write **real, thoughtful notes** based on my topic and titles — a few honest
  paragraphs each, with the `[[links]]` woven naturally into the prose. Never
  "lorem ipsum". If I leave gaps, invent believable, on-topic notes.
- Use real images. Pull a free greenhouse/light photo for the hero, e.g. from
  Unsplash (`https://source.unsplash.com/1600x900/?plants,greenhouse,light`) or
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
