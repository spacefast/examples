# Unfurl — link preview inspector

Paste a URL, get the preview card. The server fetches the page, parses its
OpenGraph and Twitter-card metadata, and renders the card Slack or iMessage
would show.

**Live:** <https://unfurl.view.fast/> · **Recipe:** [`prompt.md`](./prompt.md)

This is the repo's first **Functions runtime** example. It exists because
unfurling genuinely cannot be faked client-side: a browser can't fetch a
cross-origin page and read its `<head>` — CORS stops it — so the work has to
happen on a server. One small app exercises a Route Handler, per-request SSR,
middleware, and the static-first/worker-miss split at once.

## What runs where

| Path | Rendering | Served by |
| --- | --- | --- |
| `/` | Prerendered at build time | Disk. The worker never wakes. |
| `/u?url=…` | SSR, per request | Worker |
| `/api/unfurl?url=…` | Route Handler | Worker |
| `middleware.ts` | Every non-asset request | Worker |
| `/_next/static/*` | Build output | Disk |

`next build` confirms the split:

```
Route (app)
┌ ○ /
├ ○ /_not-found
├ ƒ /api/unfurl
└ ƒ /u

ƒ Proxy (Middleware)

○  (Static)   prerendered as static content
ƒ  (Dynamic)  server-rendered on demand
```

## Key files

| File | What it holds |
| --- | --- |
| [`site/lib/guard.ts`](./site/lib/guard.ts) | SSRF defense: scheme allowlist, private/loopback/link-local/CGNAT blocking for v4 and v6 (including IPv4-mapped), DNS resolution checks, bare-domain normalization. |
| [`site/lib/unfurl.ts`](./site/lib/unfurl.ts) | The fetch itself: manual redirect walk (3 hops, every hop re-vetted), 512 KB body cap read off the stream, 8 s timeout, content-type check. |
| [`site/lib/parse.ts`](./site/lib/parse.ts) | Dependency-free `<head>` scanner. `og:*` → `twitter:*` → plain HTML, entity decoding, relative-URL resolution, best-icon selection. |
| [`site/app/api/unfurl/route.ts`](./site/app/api/unfurl/route.ts) | `GET /api/unfurl?url=…` → normalized JSON, or `{ error: { code, message } }`. |
| [`site/app/u/page.tsx`](./site/app/u/page.tsx) | The SSR page. Renders the card in the HTML and offers the raw JSON in a `<details>`. |
| [`site/app/page.tsx`](./site/app/page.tsx) | The static landing page. No data fetching, so Next prerenders it. |
| [`site/middleware.ts`](./site/middleware.ts) | Normalizes a bare-domain `url` param with a 308, stamps security headers. |
| [`site/sf.jsonc`](./site/sf.jsonc) | Optional entry pin: `runtime.kind: "functions"`, `entry: ".open-next/worker.js"`. |

## Build and publish

Everything runs from `site/`, with bun.

```bash
cd site
bun install
bun run dev          # http://localhost:3000
bun run build        # verify the static/dynamic split above
```

Publish with the CLI. The static curl flow the other recipes use does not
apply here — a Functions project needs the build step:

```bash
cd site
sf publish --dry-run    # preview the plan
sf publish --wait --json
```

### What the platform does at publish time

`sf publish` runs the whole thing locally (`"mode": "local"` in the dry-run
plan) and you do not install or configure any of it:

1. Detects the Next.js app from `package.json` + a lockfile, and resolves
   `bun install --frozen-lockfile` / `bun run build`.
2. Runs `next build` with the Spacefast Next adapter injected via
   `NEXT_ADAPTER_PATH`, which reports the resolved output mode and writes
   `.spacefast/build.json` — the route table, each route's render class, and
   its RSC companion path.
3. On Next 16.3+ with a canonical `"build": "next build"` script, rewrites the
   build to `npm run build -- --webpack`, because the OpenNext packager reads
   the Webpack `.nft.json` trace that Turbopack doesn't emit. **Don't
   customize the build script** — a wrapper opts out of this fix.
4. Bundles the standalone tree with a pinned adapter:
   `@opennextjs/cloudflare@1.20.2 build --skipNextBuild
   --skipWranglerConfigCheck --dangerouslyUseUnsupportedNextVersion`, writing
   `.open-next/worker.js` and `.open-next/assets/`.
5. Materializes the verdict: prerendered pages become real files on disk,
   dynamic ones ride a cache seed, and the routing residue lands in generated
   `_redirects` / `_headers` sections.
6. Uploads the static half and the worker as **one version**, so they roll
   back together.

There is no `open-next.config.ts` in this project and no adapter in
`package.json` — that is deliberate, and adding either would fight the pinned
build.

### `sf.jsonc` placement

`sf.jsonc` goes at the **project root** — beside `package.json`, i.e. `site/`.
It is optional: the CLI auto-detects `.open-next/worker.js` after the build.
Pinning it makes a broken build fail loudly with
`config_runtime_entry_missing` instead of silently falling back to a static
publish.

## Rules that break the build if you get them wrong

- **No `output: "export"`** in `next.config.ts`. That is the static-export
  path; this app needs a server.
- **No `export const runtime = "edge"`** anywhere. The adapter uses the
  Node.js runtime.
- **Don't install `@opennextjs/cloudflare`** and don't write
  `open-next.config.ts`. Spacefast pins and runs the adapter for you.
- Keep `"build": "next build"` verbatim, per step 3 above.

## Verified locally

Against `bun run dev`, real URLs, real network:

```console
$ curl -sS "http://localhost:4321/api/unfurl?url=https://github.com/vercel/next.js"
{
  "url": "https://github.com/vercel/next.js",
  "finalUrl": "https://github.com/vercel/next.js",
  "domain": "github.com",
  "status": 200,
  "title": "GitHub - vercel/next.js: The React Framework",
  "description": "The React Framework. Contribute to vercel/next.js development by creating an account on GitHub.",
  "siteName": "GitHub",
  "image": "https://repository-images.githubusercontent.com/70107786/4602445c-10a2-4903-a360-c96d70531f67",
  "favicon": "https://github.githubassets.com/assets/pinned-octocat-093da3e6fa40.svg",
  "themeColor": "#1e2327",
  "type": "object",
  "empty": false
}
```

SSR proof — the card is in the HTML, not fetched by the client:

```console
$ curl -sS "http://localhost:4321/u?url=https%3A%2F%2Fgithub.com%2Fvercel%2Fnext.js" \
    | grep -oE '<h2>[^<]*</h2>'
<h2>GitHub - vercel/next.js: The React Framework</h2>
```

Middleware — bare domain normalized, headers stamped:

```console
$ curl -sS -o /dev/null -D - "http://localhost:4321/u?url=github.com"
HTTP/1.1 308 Permanent Redirect
location: /u?url=https%3A%2F%2Fgithub.com
referrer-policy: strict-origin-when-cross-origin
x-content-type-options: nosniff
x-unfurl-middleware: 1
```

SSRF guard — every one refused before a socket opens:

```console
$ curl -sS "…?url=http://localhost:8080/admin"
{"error":{"code":"blocked_host","message":"localhost is a private host."}}          # 403
$ curl -sS "…?url=http://169.254.169.254/latest/meta-data/"
{"error":{"code":"blocked_address","message":"169.254.169.254 is a private address."}}  # 403
$ curl -sS "…?url=http://[::ffff:127.0.0.1]/"
{"error":{"code":"blocked_address","message":"[::ffff:7f00:1] is a private address."}}  # 403
$ curl -sS "…?url=file:///etc/passwd"
{"error":{"code":"unsupported_scheme","message":"file: isn't supported — use http or https."}}  # 400
$ curl -sS "…?url=https://httpbin.org/image/png"
{"error":{"code":"not_html","message":"That URL is image/png, not a web page."}}    # 415
```

## Notes

- `sf publish --dry-run` shows `outputDirectory: out` and no Functions runtime.
  The runtime is resolved after `next build` runs, so the real publish is the
  source of truth for this path.
- `sf publish --skip-build` is not a shortcut for a Functions project. The
  OpenNext bundle is built by `sf publish` itself.
- A build stages its worker bundle under `__spacefast/`. `.gitignore` covers it.
