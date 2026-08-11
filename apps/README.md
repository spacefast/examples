# Runnable apps

These are direct platform references rather than prompt-driven gallery recipes.
Each directory is one deployable Spacefast app with `sf.jsonc` at its root.

- `comments/` is the smallest complete Zero comments app: realtime SQL,
  request-aware Akismet, Gravatar, transactional email, and `ImageResponse`.
- `kitchen-sink/` is the broad integration app: custom Pages, a large Zero
  capsule, native PHP, TypeScript and JavaScript Functions, OpenGraph, Akismet,
  email, auth, routing, headers, and theme configuration in one publish.

Run an app from its own directory:

```sh
bun install
sf dev
sf publish
```
