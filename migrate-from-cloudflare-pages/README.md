# Migrate from Cloudflare Pages

This is a complete static Cloudflare Pages project that can be published to
Spacefast without deleting its existing platform files.

```sh
npm install
sf build
sf publish
```

Spacefast reads `wrangler.toml`, detects the build command and
`pages_build_output_dir`, then carries `_redirects` and `_headers` from the
finished output into the version. The repository can remain deployable on both
platforms during a DNS cutover.

Cloudflare Workers and bindings are a separate migration. If `wrangler.toml`
contains `main`, KV, R2, D1, Durable Objects, services, queues, or Worker-first
asset routing, `sf publish` reports those boundaries instead of pretending they
were converted.
