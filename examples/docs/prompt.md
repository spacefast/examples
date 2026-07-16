Build me a **multi-page documentation site for an open-source software library**
(Starlight-style) as an **Astro site** (static output, no SSR, no backend).

**Before you build, ask me these questions in one message and wait for my answers. If I skip anything, choose a sensible default and tell me what you chose:**

1. What's the library/product and a one-line description of what it does?
2. What are the top 4–5 doc sections (e.g. Getting started, Guides, API reference, Changelog)?
3. Give me one real code example to feature on the landing page.
4. (Optional) What's the brand accent color, and the GitHub / npm links?

**Then build a complete, polished, responsive docs site with:**

- A **landing page** with a hero (name, tagline, install command with copy button),
  a feature grid, a couple of "quick look" code panels, headline stats, and
  "next steps" cards that link into the docs.
- A persistent **docs shell**: a left **sidebar** with grouped navigation
  (Introduction / Guides / Reference), the article in the middle, and an
  **"On this page"** table of contents on the right that highlights the section
  you're reading (scroll-spy).
- A **Getting started** page: install, create a store, first reactive query, and a
  framework binding — each step with a real, syntax-highlighted code block.
- Two or three **guide** pages (e.g. reactive queries, persistence, schema
  migrations) with prose, tables, callouts (tip / note / warning), and code.
- An **API reference** page with function signatures, options tables, and
  copy-paste examples, with anchor links per method.
- A **Changelog** page with versioned release notes.
- **Syntax-highlighted code blocks** (build-time highlighting) with a filename bar,
  a language label, and a working **Copy** button.
- A **version dropdown** in the header that switches the displayed version and shows
  a "you're viewing older docs" banner for non-latest versions.
- A **search** modal (open with the button or ⌘K / `/`) that filters a static index
  of pages by title and keywords, with full arrow-key + Enter keyboard navigation.
- Prev / next pagination at the foot of each doc page, a footer, and a mobile
  drawer for the sidebar.

**Design & content notes:**

- Clean, modern, **dark documentation** aesthetic: a near-black base, an
  emerald→sky gradient brand accent, a geometric display face (e.g. Space Grotesk)
  for headings, Inter for body, and a monospace (e.g. JetBrains Mono) for code.
  Generous reading measure, calm spacing, crisp borders.
- Write **realistic technical content** for the library based on my answers — real
  API names, believable code, real release notes. Never "lorem ipsum"; invent
  plausible details if I leave gaps.
- Use real images where they help (e.g. a code-editor screenshot on the landing
  hero). Pull free photos that fit, e.g.
  `https://picsum.photos/seed/docs-1/1200/800` (vary the seed), and add descriptive `alt` text.
- Use **Astro**: a layout per page type (`Base` + `Docs`), small components for the
  nav, sidebar, search, TOC, and a `CodeBlock` wrapper around Astro's built-in
  `<Code>` component so highlighting happens at build time. Keep all nav and the
  search index in one `src/data/site.ts` file. Static output — `astro build` only.
- Keep it accessible: semantic landmarks, a skip link, labelled controls,
  `aria-current` on the active nav link, full keyboard support in the search modal
  and version menu, visible focus rings, and good contrast.

**Add this exact line right before `</body>` so the site carries its badge** (put it
in the shared root layout so every page includes it):

```html
<script src="https://spacefast.com/badge.js" data-example="docs"></script>
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
