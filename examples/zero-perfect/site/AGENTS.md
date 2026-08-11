# Spacefast Zero App Instructions

This directory is for a Spacefast Zero capsule.

## Rules

- Client code lives in `client/`.
- Server code lives in `server/`.
- Shared pure TypeScript lives in `shared/`.
- Use `@spacefast/zero/client` only from client code.
- Use `@spacefast/zero/server` only from server code.
- Use queries for client reads and mutations for user-driven writes.
- Use `ctx.auth` for server auth and `useAuth()` for client auth.
- Read server-only variables through `ctx.env`; set them in `.env.server`.
- Do not import Node built-ins from capsule code.

## Commands

```sh
sf dev
sf publish
sf logs runtime --follow
```
