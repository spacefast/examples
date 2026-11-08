# Broadsheet — WordPress + Spacefast Zero

Two halves in one project. Know which half you are editing.

## Build time (`tools/`)

- `tools/config.ts` holds the three settings: WordPress URL, publication name,
  accent.
- `tools/wordpress.ts` is the only file that talks to WordPress. It uses
  `@spacefast/wordpress` and normalizes the REST shapes into `Article`.
- `tools/render.ts` turns `Article[]` into HTML. No data fetching here.
- `tools/build.ts` orchestrates: fetch → write `shared/search-index.ts` →
  `sf build --skip-build` (to materialize the app shell) → render `home.html`
  and `posts/*.html`.
- Nothing under `tools/` is capsule code. It runs in Bun and may use Node
  built-ins.

## Runtime (`server/`, `client/`, `shared/`)

- Client code lives in `client/`, server code in `server/`, shared pure
  TypeScript in `shared/`.
- Use `@spacefast/zero/client` only from client code and `@spacefast/zero/server`
  only from server code.
- Queries own reads. Mutations own writes and realtime invalidation. A `POST`
  endpoint is a write and also broadcasts.
- `ctx.auth.userId` is the visitor identity. The guest session is the whole auth
  story here; nobody signs in to press an emoji.
- Do not import Node built-ins from capsule code.
- `shared/search-index.ts` is generated. Never hand-edit it.

## Rules that are easy to get wrong

- `sf build` and `sf publish` run `bun run build` (the package build script)
  before compiling the capsule. The script's own `sf build --skip-build` call
  must keep `--skip-build`, or the CLI runs the build script from inside itself.
- The generated app shell owns `/index.html`. The magazine index is `home.html`,
  wired up through `"index": "home.html"` in `sf.jsonc`.
- Static pages carry the platform import map copied out of the generated shell.
  If a page stops hydrating, that map is the first thing to check.

## Commands

```sh
bun install
bun run build
bun test
sf dev
sf publish
```
