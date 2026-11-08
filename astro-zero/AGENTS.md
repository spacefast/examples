# Marginalia — Astro in front of a Spacefast Zero capsule

One project, two halves. Astro owns everything that is known at build time.
The Zero capsule owns everything that isn't. They meet at a post slug.

## Layout

- `src/` — the Astro site: pages, layouts, the Markdown content collection, and
  the Preact island in `src/components/`.
- `server/` — capsule server code. `shared/` — pure TypeScript both halves import.
- `sf.jsonc` — the space config, including the Zero runtime declaration.
- `dist/` — generated. It is both Astro's build output **and** the Zero project
  root that gets published.

## Rules

- Use `@spacefast/zero/client` only from client code (the island) and
  `@spacefast/zero/server` only from `server/`.
- Keep `shared/` pure: it is compiled into the capsule, so no browser globals,
  no Node built-ins, no imports outside `client/`, `server/`, `shared/`.
- Queries own reads. Mutations own writes, and call `ctx.invalidate(...)` with
  the query names they touched — that is what makes a second browser update.
- Read identity from `ctx.auth` on the server and `useAuth()` in the island.
  Readers are guests; there is no account.
- **Do not create `client/index.tsx`.** The capsule is intentionally
  server-only. The moment that file exists, the build generates a Zero app shell
  that claims `index.html` and silently shadows Astro's homepage.
- The island is mounted `client:only="preact"`. It is the live half of the page;
  it never renders at build time.

## Commands

```sh
bun install
bun run dev              # astro dev — pages, layout, copy (no runtime)
bun run build            # astro build → stage capsule → sf build dist
bun run runtime          # sf dev --dir dist — capsule endpoints and database
sf publish dist --wait
sf logs runtime --follow
```
