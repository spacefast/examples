# Zero Perfect

A minimal full-stack Spacefast Zero app that proves the complete runtime path:
database-backed queries and mutations, guest and Gravatar auth, Cast realtime,
client-side routes, and an HTTP endpoint.

## Run it

```sh
cd site
bun install
sf dev
```

Open `/` for the realtime todo list and `/status` to call `GET /api/status`.

Publish from `site/` with `sf publish`. Unlike static recipes, the recipe
workflow publishes this Zero project root so the CLI can compile and attach its
server artifact.

Live: <https://zero-perfect.view.fast/>
