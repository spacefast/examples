# Astro + Spacefast Zero

An Astro blog whose every post carries a realtime comment thread and emoji
reactions, published as one Space. Astro renders the essays at build time; a
Spacefast Zero capsule owns the conversation underneath them.

```sh
bun install
bun run dev        # astro dev on :4321; pages, layout, redirect parity
bun run build      # astro build → stage capsule → sf build dist
bun run runtime    # sf dev --dir dist; the capsule's database and endpoints
sf publish dist --wait
```

`sf publish` is given `dist`, not the project root; see below.

## The composition

A Zero Space publishes a project root: the CLI walks it, compiles `server/`
into the version's runtime artifact, and publishes everything else as content.
Astro refuses to build into its own project root. So the two are stacked:
**`dist/` is both Astro's build output and the Zero project root.**
`astro build` fills it, `scripts/stage-capsule.mjs` copies `sf.jsonc`,
`server/`, and `shared/` in beside the pages, and `sf build dist` compiles the
capsule and assembles the publish tree under `dist/.spacefast/zero/public/`.

The trick that makes this work is in `sf.jsonc`: `runtime.client` names
`client/index.tsx` and that file does not exist. A capsule with no client entry
is server-only, generates no app shell, and so nothing claims `index.html`;
Astro's homepage survives. The live half of the page is a Preact island Astro
bundles itself, importing `useQuery`/`useMutation`/`useAuth` from
`@spacefast/zero/client`. It takes exactly one prop: the post slug.

## Important files

| Surface | Where |
| --- | --- |
| Astro static build, content collection, island | `src/` |
| `@spacefast/astro` integration, `mode: "static"`, inline redirects | `astro.config.mjs` |
| On-disk `_headers`, merged with the inline rules into `dist/` | `_headers` |
| Zero schema, indexes, queries, mutations, `GET`/`POST /api/comments` | `server/index.ts` |
| Pure TypeScript both halves import | `shared/comments.ts` |
| Space config and the server-only runtime declaration | `sf.jsonc` |
| Copies the capsule into `dist/` after `astro build` | `scripts/stage-capsule.mjs` |

## Notes

- `sf dev` serves the capsule and its endpoints, not the Astro pages; the two
  local servers are separate. Its output prints a private URL with a capability
  token that doubles as a bearer token for `curl` against `/api/comments`.
- `astro build` empties `dist/`, which also removes the `.spacefast/` link state
  the CLI writes there. Publish with `--space` after a rebuild.
- Every build ships the Zero platform bundle even though the pages never load
  it; the island bundles its own copy of the client through Vite.
