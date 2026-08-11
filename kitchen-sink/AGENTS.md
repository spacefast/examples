# Kitchen sink repository

- The repository root is the one deployable Space. Its Zero capsule, native PHP actions, and
  TypeScript and JavaScript Functions publish together from one `sf.jsonc`.
- Keep the visible site editorial and minimal. The kitchen sink belongs behind the page, not in the
  visual hierarchy.
- Client code lives in `client/`; server code lives in `server/`; shared pure TypeScript lives in
  `shared/`.
- Use `@spacefast/zero/client` only from client code and `@spacefast/zero/server` only from server
  code.
- Queries own reads. Mutations own SQL writes and realtime invalidation.
- Read identity from `ctx.auth` on the server. Read server variables through `ctx.env`; never expose
  secret values to the client.
- Do not import Node built-ins from capsule code.
- Keep Markdown rendering structural. Never inject rendered strings as HTML.
