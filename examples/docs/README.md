# Ledger — Docs

A multi-page documentation site for **Ledger**, a fictional open-source library — "a tiny,
type-safe reactive store for TypeScript." It's a realistic, Starlight-style docs experience:
a marketing landing page that leads with the install command, a feature grid, and quick-look
code panels, then a full documentation shell with a grouped left **sidebar** (Introduction /
Guides / Reference), the article in the middle, and an **"On this page"** table of contents on
the right that scroll-spies the section you're reading.

The content is real and believable: a **Getting started** page that walks from `npm install`
to a first reactive query and a React hook; three **guides** (reactive queries, persistence
with IndexedDB/localStorage, and schema migrations) full of prose, tables, and tip/note/warning
callouts; an **API reference** with function signatures, options tables, and per-method anchor
links; and a versioned **Changelog**. Every code block is syntax-highlighted at build time via
Astro's built-in `<Code>` component and carries a filename bar, a language label, and a working
**Copy** button.

The header has a **version dropdown** that switches the displayed version and raises an
"older docs" banner for non-latest versions, plus a **search** modal you open with the button
or **⌘K** / `/` — it filters a static index by title and keywords with full arrow-key + Enter
navigation. Everything is keyboard-accessible (skip link, `aria-current`, focus rings, a mobile
sidebar drawer), and the whole thing builds to static HTML with `astro build` — no backend.

## Tech

- **Astro 7**, static output — no SSR, no adapters, no runtime backend.
- Build-time syntax highlighting via Astro's Shiki-powered `<Code>` component.
- All navigation and the search index live in one `src/data/site.ts` file.
- Two layouts (`Base`, `Docs`) plus small components: `TopNav`, `Sidebar`, `Search`,
  `CodeBlock`, `Footer`.

## Develop

```bash
cd site
bun install      # or npm install
bun run dev      # local dev server
bun run build    # static build → dist/
```

## Publish to Spacefast

```bash
cd site && bun run build
cd dist && zip -r ../site.zip .
curl -F archive=@../site.zip https://api.spacefast.com/v1/publish
```

You'll get a live URL, a permanent version URL, and a one-time claim link. See
[`prompt.md`](./prompt.md) to regenerate or personalize this site with your own library.
