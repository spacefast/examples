# WordPress + Spacefast Zero

A magazine whose **words come from WordPress at build time** and whose **live
parts come from a Spacefast Zero capsule at request time** — in one project, one
`sf.jsonc`, one publish.

`wp-astro` shows headless WordPress rendered statically. `zero-perfect` shows the
Zero runtime on its own. This is the one where both are on the same page.

Live: <https://wp-zero.view.fast/>

## The architecture, in words

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

Every article page is a real file — view source and the words are there, no
JavaScript required. Two things on it are alive:

- **Reactions.** `<div id="root" data-slug="…">` sits where the reaction bar
  belongs. `sf build` compiles `client/index.tsx` into `/client.js`, which mounts
  there. `useQuery("reactions", slug)` subscribes rather than polls, so a
  reaction in one browser moves the count in another over Cast.
- **Search.** The masthead's search box is plain `fetch` against `/api/search` —
  no framework, because an HTTP endpoint doesn't need one. The index it searches
  was compiled from WordPress at build time and lives inside the capsule, so
  typing downloads a handful of results instead of a corpus.

## Run it

```sh
cd site
bun install
bun run build     # fetch WordPress → search index → app shell → static pages
bun test          # content normalization, search ranking, reaction tallies
sf dev            # the Zero server and client
bun run publish   # sf publish --skip-build: capsule + static tree, one version
```

Point it at a different WordPress site without editing anything:

```sh
WORDPRESS_URL=https://example.com bun run build
```

Everything else — the publication name, the accent, how many posts to pull —
lives in `site/tools/config.ts`.

### Exercising the runtime

```sh
curl "$BASE/api/search?q=release&limit=3"
curl "$BASE/api/reactions?slug=open-weight"
curl -X POST "$BASE/api/react" -H 'content-type: application/json' \
  -d '{"slug":"open-weight","emoji":"🔥"}'
```

`POST /api/react` is declared `mode: "write"`, which is what lets it touch the
database *and* what makes it broadcast — a reaction posted from a terminal moves
an open browser's count without a refresh.

## Four things that are easy to get wrong

**1. `bun run build` must run before `sf build`.** It writes both halves of the
publish: `shared/search-index.ts` (which the capsule compiles in) and the static
pages (which the capsule publishes beside itself). CI runs them in that order.

**2. The generated app shell owns `/index.html`.** A Zero capsule with a client
entry always emits its own `index.html`, and an author file at that path is
dropped with a warning. So the magazine index ships as `home.html` and
`sf.jsonc` says `"index": "home.html"`. With `cleanUrls`, articles live at
`/posts/<slug>`.

**3. `sf publish` needs `--skip-build` here.** A Zero project with a `build`
script in `package.json` sends `sf publish` down the static-site path: it reruns
the build and then looks for a `dist/`, `build/`, or `out/` that a capsule never
produces, and fails with `No build output directory was detected`.
`bun run publish` is `sf publish --skip-build`, which is correct anyway —
`bun run build` already compiled the capsule and rendered the pages.

**4. Static pages need the platform import map.** `/client.js` imports `preact`
and `@spacefast/zero/client` as bare specifiers, resolved by the import map that
`sf build` writes into its generated shell — and only into that shell. Any other
page that wants the island has to carry the same map, before the module script.
So `tools/build.ts` runs `sf build` once to materialize the shell, lifts the map
out of it, and renders the pages around it. The real `sf build` afterwards picks
those pages up. See `readImportMap()` in `site/tools/build.ts`.

## Layout

```
site/
  sf.jsonc              index → home.html, cleanUrls, the Zero runtime block
  tools/                build-time only; may use Node built-ins
    config.ts             WordPress URL, publication name, accent
    wordpress.ts          the only file that talks to WordPress
    render.ts             Article[] → HTML
    build.ts              the orchestrator
  server/index.ts       the capsule: table, query, mutation, three endpoints
  client/index.tsx      the reaction island
  shared/
    reactions.ts          the emoji vocabulary and tallying, used by both sides
    search.ts             scoring, pure
    search-index.ts       GENERATED by the build
  assets/
    styles.css            one stylesheet; the accent arrives as a CSS variable
    search.js             the search box, no framework
  test/build.test.ts    CMS-HTML normalization, ranking, tallies
```

`home.html`, `posts/`, `search-index.json`, and `shared/search-index.ts` are
generated and gitignored — a content snapshot, not source. Regenerate them,
never edit them.

## Known rough edges

- **`sf dev` previews the capsule, not the site.** It serves the Zero app shell
  for every path, so the static pages do not appear there. Use it for the server
  and the client (`curl` the endpoints); publish to see the magazine.
- **`tools/` gets published.** A Zero capsule treats `client/`, `server/`,
  `shared/`, `package.json`, `README.md`, `AGENTS.md` and `test/` as project
  files and everything else as site content, so the build scripts ship as
  `/tools/*.ts`. Harmless in a public example; worth knowing if you copy the
  pattern into a private repo.
