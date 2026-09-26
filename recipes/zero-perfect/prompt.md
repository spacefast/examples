Build me a small full-stack todo app with Spacefast Zero and Preact.

Use the Zero capsule model rather than a separate API server:

- Define a `todos` table with text, completion state, and an owner ID.
- Scope reads to `ctx.auth.userId` and expose them through a `todos` query.
- Add todos through an `addTodo` mutation after trimming and limiting the text.
- Show updates in realtime through the Zero client and Cast.
- Support the built-in guest session and Gravatar sign-in/sign-out controls.
- Add client routes for the todo list and `/status`.
- Back `/status` with a `GET /api/status` Zero endpoint that returns `ok`.
- Keep shared input cleanup and types in a pure TypeScript module.
- Keep the app compact and accessible, with a labeled input, visible focus states,
  useful empty/loading states, and responsive layout.

Use this exact Spacefast badge in the generated document:

```html
<script src="https://spacefast.com/badge.js" data-example="zero-perfect"></script>
```

Run it locally with `sf dev`, verify both routes and a realtime todo update, then
publish the project root with `sf publish`.
