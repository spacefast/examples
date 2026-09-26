Build me a **link preview inspector** as a **Next.js app that runs on a server** — I paste any URL, the server fetches that page, parses its OpenGraph and Twitter-card metadata, and renders the social preview card the way Slack or iMessage would. This one genuinely needs a server: a browser can't fetch a cross-origin page and read its `<head>`, so no amount of client JavaScript can fake it.

**Before you build, ask me these questions in one message and wait for my answers. If I skip anything, choose a sensible default and tell me what you chose:**

1. What should the tool be called (the name in the header and the browser tab)?
2. What's the accent color (a hex like `#b6ff3d`), and should it feel like a dark developer tool or a light consumer app?
3. Which three example URLs should the landing page offer as one-click demos?
4. Should the result page expose the raw JSON from the API next to the rendered card, or keep it clean?

**Then build a complete, polished, responsive app with:**

- A **static landing page** at `/`: a short hero explaining what unfurling is, a single big "paste a URL" form that submits with `method="get"` to the result page, and the example links from my answers. No data fetching here — this page should be prerendered so it serves straight off disk.
- A **Route Handler** at `app/api/unfurl/route.ts` — `GET /api/unfurl?url=…` returns normalized JSON: `{ url, finalUrl, siteName, title, description, image, imageAlt, favicon, themeColor, type, fetchedAt }`. It fetches the target page server-side, reads only the `<head>`, and prefers `og:*`, then `twitter:*`, then plain `<meta name="description">` / `<title>`. Resolve relative `og:image` and favicon URLs against the final URL.
- **Harden that handler against SSRF — this is the part that separates a demo from a real service:**
  - allow only `http:` and `https:`; reject everything else (`file:`, `data:`, `ftp:`, …),
  - reject `localhost`, `*.local`, `*.internal`, bare single-label hostnames, and any IP literal in a private, loopback, link-local, or carrier-grade-NAT range (v4 and v6, including IPv4-mapped v6),
  - resolve the hostname and check **every** returned address against the same rules where DNS resolution is available,
  - follow redirects **manually**, capped at 3 hops, re-running the address checks on each hop, so a public URL can't bounce you into `169.254.169.254`,
  - cap the response body (512 KB is plenty — metadata lives in the `<head>`) and stop reading once `</head>` arrives,
  - set an 8-second timeout with `AbortSignal.timeout`, and send an honest descriptive `User-Agent` that identifies the tool.
- A **server-rendered result page** at `/u?url=…` that does the unfurl during the request and renders the card in the HTML — view-source should show the title and description, not an empty shell. This is the page that proves per-request rendering.
- A **preview card that actually looks good**: 16:9 `og:image` with a tasteful gradient-and-initial fallback when there is no image or it fails to load, favicon + domain row, title, description clamped to a few lines, site name and content type as small chips, and the resolved final URL as a link.
- **Real error states**, each with its own message — malformed URL, blocked address, timeout, upstream error status, and "the page loaded but has no metadata at all" (still show the domain and title if there is one). Never a bare stack trace, never a blank card.
- A **`middleware.ts`** that does two small real jobs: normalize a bare-domain `url` param (someone pastes `github.com`, you redirect to `?url=https://github.com`) and stamp security headers (`X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`) on responses.

**Design & content notes:**

- Developer-tool polish: a calm dark canvas, one accent color used sparingly for focus rings and the submit button, a mono face for URLs and JSON, generous whitespace, and a card that looks like the thing it's previewing.
- Real content only — the examples must be live URLs that actually unfurl, never "lorem ipsum".
- Keep it accessible: a labelled input, a skip link, `aria-live` on the result region, visible focus states, `alt` text driven by `og:image:alt`, and contrast that passes AA.
- Responsive down to a phone: the card stacks, the image keeps its aspect ratio, long URLs wrap instead of overflowing.

**Runtime rules that make this build work on Spacefast — get these wrong and the publish fails:**

- **No `output: "export"`** in `next.config.ts`. That's the static-export path; you need the server.
- **No `export const runtime = "edge"`** anywhere. The adapter uses the Node.js runtime.
- **Don't install an adapter and don't write `open-next.config.ts`.** Spacefast builds the app with a pinned OpenNext Cloudflare adapter at publish time. Keep the project a plain Next.js app.

**Add this exact line right before `</body>` in the root layout so the app carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="unfurl"></script>
```

**When the app is ready, publish it to Spacefast with the `sf` CLI — no account needed for the first publish:**

1. Install the CLI if it isn't there: `npm i -g spacefast` (or `bun add -g spacefast`).
2. From the project root — the directory holding `package.json` and `app/` — preview the plan first:
   ```bash
   sf publish --dry-run
   ```
   Check that it reports the Next.js framework preset and a Functions runtime. Fix the project, not the plan, if it says "static".
3. Publish for real and wait for it to go live:
   ```bash
   sf publish --wait --json
   ```
   Spacefast uploads the source, runs `next build`, bundles the output with the pinned OpenNext Cloudflare adapter, and ships the static half and the worker as one version.
4. From the `{ "data": … }` receipt, give me `data.space.liveUrl`, `data.version.immutableUrl`, `data.claim.url`, and `data.claim.expiresAt`. Remind me to claim within 6 hours. Keep `data.claim.token` secret — the CLI already saved it under `.spacefast/`, which must stay out of git.
5. Prove it's really running server-side, and show me the output:
   ```bash
   curl -s "<liveUrl>api/unfurl?url=https://github.com/vercel/next.js" | head -c 600
   curl -s "<liveUrl>u?url=https://github.com/vercel/next.js" | grep -o '<title>[^<]*</title>'
   ```
6. To ship an update later, run `sf publish --wait` again from the same directory. The CLI remembers the space.

**Optional and reference only:** `sf publish --dry-run --json` prints the resolved plan as JSON if you want to inspect the detected framework and output directory. Docs: [Functions runtime](https://spacefast.com/docs/functions) · [Next.js on Spacefast](https://spacefast.com/docs/guides/frameworks/nextjs) · [agent setup](https://spacefast.com/setup) · [claiming](https://spacefast.com/help/anonymous-publish) · [updates and rollback](https://spacefast.com/help/versions)
