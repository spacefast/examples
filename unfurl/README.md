# Unfurl: link previews on the Functions runtime

Paste a URL, get the preview card. The server fetches the page, parses its
OpenGraph and Twitter-card metadata, and renders the card Slack or iMessage
would show. Unfurling cannot be faked client-side (CORS stops a browser from
reading a cross-origin `<head>`), so this proves a real server: a Next.js Route
Handler, per-request SSR, and middleware on the Spacefast Functions runtime.

```sh
bun install
bun run dev      # http://localhost:3000
sf publish
```

## What runs where

| Path | Rendering | Served by |
| --- | --- | --- |
| `/` | Prerendered at build time | Disk; the worker never wakes |
| `/u?url=…` | SSR, per request | Worker |
| `/api/unfurl?url=…` | Route Handler | Worker |
| `middleware.ts` | Every non-asset request | Worker |
| `/_next/static/*` | Build output | Disk |

## Important files

| File | What it holds |
| --- | --- |
| `lib/guard.ts` | SSRF defense: scheme allowlist, private/loopback/link-local/CGNAT blocking for v4 and v6 (including IPv4-mapped), DNS checks, bare-domain normalization. |
| `lib/unfurl.ts` | The fetch: manual redirect walk (3 hops, every hop re-vetted), 512 KB body cap, 8 s timeout, content-type check. |
| `lib/parse.ts` | Dependency-free `<head>` scanner: `og:*` → `twitter:*` → plain HTML, entity decoding, relative-URL resolution. |
| `app/api/unfurl/route.ts` | `GET /api/unfurl?url=…` → normalized JSON, or `{ error: { code, message } }`. |
| `app/u/page.tsx` | The SSR page; renders the card in the HTML. |
| `middleware.ts` | Normalizes a bare-domain `url` param with a 308 and stamps security headers. |
| `sf.jsonc` | Optional pin: `runtime.kind: "functions"`, `entry: ".open-next/worker.js"`. Turns a broken build into a loud `config_runtime_entry_missing` instead of a silent static publish. |

## How the publish works

`sf publish` detects the Next.js app, runs `next build` with the Spacefast Next
adapter injected, bundles the standalone output with a pinned OpenNext adapter
into `.open-next/`, and uploads the static half and the worker as one version.
`bun run build` on its own is only a sanity build.

Rules that break the build:

- No `output: "export"` in `next.config.ts`; this app needs a server.
- No `export const runtime = "edge"` anywhere; the adapter uses Node.js.
- Do not install `@opennextjs/cloudflare` or write `open-next.config.ts`; the
  CLI pins and runs the adapter.
- Keep `"build": "next build"` verbatim.

An unclaimed Space may only reach a short list of trusted hosts, so until the
Space is claimed most unfurls come back as a 403 from the target site.
