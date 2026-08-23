# Server-rendered Next.js on Spacefast

This App Router project deliberately needs a runtime: the home page reads a
request cookie, `/api/pulse` is a route handler, and note pages are rendered on
demand.

```sh
sf dev
sf build
sf publish
```

For Next.js 16.2+, the Spacefast CLI automatically:

1. injects the first-party Next deployment adapter for the build,
2. packages the application through OpenNext,
3. separates immutable files from runtime routes, and
4. publishes the resulting worker and assets together.

The adapter is bundled with the CLI; this project does not need platform glue
in `next.config` or an `@spacefast/next-adapter` dependency.
