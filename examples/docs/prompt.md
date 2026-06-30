# Ledger — Docs — build it yourself

Copy everything below the line into your AI agent (Claude, ChatGPT, Codex, Cursor,
or any agent that can write files and run a command). It will ask you a few quick
questions, build the site, and publish it live to Spacefast.

---

Build me a **multi-page documentation site for an open-source software library**
(Starlight-style) as an **Astro site** (static output, no SSR, no backend).

**First, ask me these questions and wait for my answers:**

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
  hero). Pull free photos that fit, e.g. from Unsplash
  (`https://source.unsplash.com/1200x800/?code,editor,terminal`) or
  `https://picsum.photos/seed/docs-1/1200/800`, and add descriptive `alt` text.
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
