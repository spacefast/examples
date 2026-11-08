# WordPress + Spacefast Zero

A magazine whose words come from WordPress at build time and whose live parts
come from a Spacefast Zero capsule at request time: one project, one
`sf.jsonc`, one publish. `wp-astro` is headless WordPress rendered statically
and `zero-perfect` is the Zero runtime on its own; this example puts both on
the same page.

```sh
bun install
bun run build   # fetch WordPress → search index → app shell → static pages
bun test        # content normalization, search ranking, reaction tallies
sf dev          # the Zero server and client; publish to see the pages
sf publish
```

Point it at another WordPress site with `WORDPRESS_URL=https://example.com bun run build`.
The publication name, accent, and post count live in `tools/config.ts`.

## How it fits together

```
  BUILD TIME                                   REQUEST TIME
  ──────────                                   ────────────
  wordpress.org/news
        │  @spacefast/wordpress
        │  posts.list({ _embed: true })
        ▼
   Article[]  ──┬──▶  home.html              ──▶  served as a flat file
                │     posts/<slug>.html      ──▶  served as a flat file
                │     search-index.json      ──▶  served as a flat file
                │
                └──▶  shared/search-index.ts ──▶  compiled into the capsule
                                                      │
                                                      ├─ GET  /api/search?q=
                                                      ├─ GET  /api/reactions?slug=
                                                      ├─ POST /api/react
                                                      ├─ query    reactions   (realtime)
                                                      └─ mutation toggleReaction
```

Every article page is a real file; view source and the words are there. Two
things on it are alive:

- **Reactions.** `<div id="root" data-slug="…">` is where `client/index.tsx`
  mounts. `useQuery("reactions", slug)` subscribes rather than polls, so a
  reaction in one browser moves the count in another over Cast.
- **Search.** The masthead's search box is plain `fetch` against `/api/search`.
  The index it searches was compiled from WordPress at build time and lives
  inside the capsule, so typing downloads a handful of results, not a corpus.

## Important files

- `sf.jsonc` sets `"index": "home.html"`, `cleanUrls`, and the Zero runtime block.
- `tools/` is build-time only and may use Node built-ins: `config.ts`,
  `wordpress.ts` (the only file that talks to WordPress, through
  `@spacefast/wordpress`), `render.ts`, and the orchestrator `build.ts`.
- `server/index.ts` is the capsule: one table, a realtime query, a mutation,
  and three HTTP endpoints. The `POST` endpoint is a write, so it can touch the
  database and it broadcasts; a reaction posted with `curl` moves an open
  browser's count.
- `client/index.tsx` is the reaction island.
- `shared/` holds `reactions.ts`, `search.ts`, and the generated `search-index.ts`.
- `test/build.test.ts` covers CMS-HTML normalization, ranking, and tallies.

`home.html`, `posts/`, `search-index.json`, and `shared/search-index.ts` are
generated and gitignored. Regenerate them, never edit them.

## Things that are easy to get wrong

1. **The generated app shell owns `/index.html`.** A Zero capsule with a client
   entry always emits its own `index.html`, so the magazine index ships as
   `home.html` and `sf.jsonc` makes it the homepage.
2. **`sf build` and `sf publish` run `bun run build` first**, because it is the
   package's build script, then compile the capsule and publish the rendered
   pages beside it. Inside that script, `tools/build.ts` runs
   `sf build --skip-build` once to materialize the app shell; `--skip-build` is
   what keeps the CLI from running the build script again from inside itself.
3. **Static pages need the platform import map.** `/client.js` imports `preact`
   and `@spacefast/zero/client` as bare specifiers, resolved by the import map
   the CLI writes into its generated shell. `tools/build.ts` lifts that map out
   of the shell and renders every page around it; see `readImportMap()`.
4. **`sf dev` previews the capsule, not the site.** It serves the app shell for
   every path. Use it for the server and the client; publish to see the
   magazine.

Exercising the runtime against a published Space:

```sh
curl "$BASE/api/search?q=release&limit=3"
curl -c jar -b jar -X POST "$BASE/api/react" -H 'content-type: application/json' \
  -d '{"slug":"open-weight","emoji":"🔥"}'
```

Keep the cookie jar: the guest identity lives in a cookie, so without it every
request is a new reader.
