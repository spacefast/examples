# Zero Perfect

The smallest full-stack Spacefast Zero app that walks the complete runtime
path: database-backed queries and mutations, guest and Gravatar auth, Cast
realtime, client-side routes, and an HTTP endpoint.

```sh
bun install
sf dev
sf build
sf publish
```

Open `/` for the realtime todo list and `/status` to call `GET /api/status`.

Important files:

- `sf.jsonc` declares the Zero runtime with its server and client entries.
- `server/index.ts` holds the table, queries, mutations, and the endpoint.
- `client/index.tsx` is the Preact app with its routes.
- `shared/` is pure TypeScript both halves import.

This is a Zero project root, not a prebuilt output directory: `sf publish`
compiles the capsule and attaches its server artifact to the version.
