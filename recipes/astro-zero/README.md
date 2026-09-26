# Marginalia — Astro + Spacefast Zero

An Astro blog whose every post carries a realtime comment thread and emoji
reactions, published as **one** space. Astro renders the essays at build time;
a Spacefast Zero capsule owns the conversation underneath them.

Live: <https://astro-zero.view.fast/>

## The composition

A Zero space publishes a *project root*, not a folder of files: the CLI walks
that root, compiles `server/` into the version's runtime artifact, and publishes
everything else as content. Astro, meanwhile, refuses to build into its own
project root. So the two are stacked rather than merged: **`site/dist/` is both
Astro's build output and the Zero project root.** `astro build` fills it,
`scripts/stage-capsule.mjs` copies `sf.jsonc`, `server/` and `shared/` in beside
the pages, and `sf build dist` compiles the capsule and assembles the publish
tree.

The one trick that makes this work is in `sf.jsonc`: `runtime.client` names
`client/index.tsx` and **that file does not exist**. A Zero capsule with no
client entry is server-only — it generates no app shell, so nothing claims
`index.html` and Astro's homepage survives. (Create `client/index.tsx` and the
generated shell shadows it — the build log says
`Warning: index.html is not published`.) The
live half of the page is instead a Preact island that Astro bundles itself,
importing `useQuery`/`useMutation`/`useAuth` straight from `@spacefast/zero/client`.
The client discovers the runtime from the page's own origin, so the island takes
exactly one prop: the post slug.

```
site/
  src/                     Astro: pages, layouts, Markdown collection, island
  server/index.ts          capsule: tables, queries, mutations, /api/comments
  shared/comments.ts       pure TS both halves import (limits, cleanup, types)
  sf.jsonc                 space config + zero runtime declaration
  scripts/stage-capsule.mjs
  dist/                    astro build output == the published Zero project root
```

## What it exercises

| Surface | Where |
| --- | --- |
| Astro static build, content collections, islands | `src/` |
| `@spacefast/astro` integration, `mode: "static"` | `astro.config.mjs` |
| Merged `_redirects` / `_headers` (inline + on-disk `_headers`) | `astro.config.mjs`, `_headers` |
| Zero schema, indexes, queries, mutations | `server/index.ts` |
| Realtime invalidation over Cast (`ctx.invalidate`) | `addComment`, `toggleReaction` |
| Guest identity, no signup | `ctx.auth` / `useAuth()` |
| HTTP endpoints (`GET`/`POST /api/comments`) | `server/index.ts` |

`/latest` and `/comments` are redirects declared inline in `astro.config.mjs`;
the security and cache headers come from the `_headers` file next to it. The
integration merges both, mirrors them in `astro dev`, and writes the compiled
files into `dist/`.

## Run it

```sh
cd site
bun install

bun run dev        # astro dev on :4321 — pages, layout, copy, redirect parity
bun run build      # astro build → stage capsule → sf build dist
bun run runtime    # sf dev --dir dist — the capsule's database and endpoints
```

`bun run runtime` reads `dist/`, so it needs a `bun run build` first.

`sf dev` starts the **capsule** dev server. It has no static-file lane, so it
serves the runtime and its endpoints but not the Astro pages — the two local
servers are separate today. Verify the runtime through its endpoints; `sf dev`
prints a private URL containing a capability token, which is also accepted as a
bearer token:

```sh
CAP=<the token after #zero-dev-capability= in sf dev's output>
curl -H "Authorization: Bearer $CAP" \
  'http://127.0.0.1:4173/api/comments?post=emoji-are-punctuation-now'

curl -X POST -H "Authorization: Bearer $CAP" -H 'content-type: application/json' \
  -d '{"post":"emoji-are-punctuation-now","author":"Ada","body":"Read it twice."}' \
  http://127.0.0.1:4173/api/comments
```

## Publish

```sh
cd site
bun install
bun run build
sf publish dist --wait
```

`sf publish` is given `dist`, not `site` — that directory is the project root
holding `sf.jsonc`. Live, the same endpoints need no token:

```sh
curl 'https://<your-space>.view.fast/api/comments?post=emoji-are-punctuation-now'
```

## For CI

The stock Zero recipe lane (`bun install && sf build`, then publish `site/`) does
**not** work here: `sf build` on a Zero project compiles the capsule and stops —
it never runs a framework build, even when `package.json` has one. This recipe
needs:

```sh
cd recipes/astro-zero/site
bun install --frozen-lockfile
bun run build                                  # astro build → stage → sf build dist
test -f dist/.spacefast/zero/public/index.html
# then publish the directory recipes/astro-zero/site/dist
```

## Notes and known edges

- Every build ships the Zero platform bundle (`/_spacefast/platform/…`,
  `client.js`, `zero.css`) even though the pages never load it — the island
  bundles its own copy of the client through Vite. It is inert weight in the
  version, not on the wire.
- `astro build` empties `dist/`, which also removes the `.spacefast/` state the
  CLI writes there. Publish with `--space` (or re-link) after a rebuild.
- The island's loading state keys off the reactions query rather than the
  comments query: `useQuery` returns `[]` before its first value arrives, so an
  empty comment list cannot tell you whether the thread is empty or still
  asking. The reactions query always resolves to one row per emoji, which makes
  its length an honest "the runtime answered" signal.
