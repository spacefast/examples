# Broadsheet — WordPress + Spacefast Zero

Two halves in one project. Know which half you are editing.

## Build time (`tools/`)

- `tools/config.ts` holds the three answers the recipe asks for: WordPress URL,
  publication name, accent.
- `tools/wordpress.ts` is the only file that talks to WordPress. It uses
  `@spacefast/wordpress` and normalizes the REST shapes into `Article`.
- `tools/render.ts` turns `Article[]` into HTML. No data fetching here.
- `tools/build.ts` orchestrates: fetch → write `shared/search-index.ts` →
  `sf build` (to materialize the app shell) → render `home.html` and
  `posts/*.html`.
- Nothing under `tools/` is capsule code. It runs in Bun and may use Node
  built-ins.

## Runtime (`server/`, `client/`, `shared/`)

- Client code lives in `client/`, server code in `server/`, shared pure
  TypeScript in `shared/`.
- Use `@spacefast/zero/client` only from client code and `@spacefast/zero/server`
  only from server code.
- Queries own reads. Mutations own writes and realtime invalidation. A `write`
  endpoint also broadcasts.
- `ctx.auth.userId` is the visitor identity. The guest session is the whole auth
  story here — nobody signs in to press an emoji.
- Do not import Node built-ins from capsule code.
- `shared/search-index.ts` is generated. Never hand-edit it.

## Rules that are easy to get wrong

- `bun run build` must run before `sf build`. It writes the capsule's search
  index and the static pages the capsule publishes beside itself.
- The generated app shell owns `/index.html`. The magazine index is `home.html`,
  wired up through `"index": "home.html"` in `sf.jsonc`.
- Static pages carry the platform import map copied out of the generated shell.
  If a page stops hydrating, that map is the first thing to check.
- Publish with `bun run publish` (`sf publish --skip-build`). A bare
  `sf publish` reruns the build script and then fails looking for a `dist/`.

## Commands

```sh
bun install
bun run build
bun test
sf dev
bun run publish
```
