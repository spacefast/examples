# Migrate from Vercel

This project keeps its `vercel.json` while moving the deploy to Spacefast.

```sh
npm install
sf build
sf publish
```

The CLI imports:

- `buildCommand` and `outputDirectory`,
- redirects and rewrites into the built `_redirects`,
- response headers into the built `_headers`, and
- valid cron entries into the built `sf.jsonc`.

The two request handlers live in Spacefast's `functions/` file router. Vercel
Functions, middleware, and image-optimization configuration are not silently
translated; projects using those keys receive an explicit compatibility report.

After `sf build`, inspect the archive or run `sf publish --dry-run --json` to
see the imported settings and rule counts.
