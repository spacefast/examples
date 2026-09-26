Build me a **hiking trail guide** as a **Next.js static export** — an index of trails plus a generated page for each one, big photography, and no server anywhere in the request path. `next build` writes flat HTML to `out/`, and Spacefast serves it.

**Before you build, ask me these questions in one message and wait for my answers. If I skip anything, choose a sensible default and tell me what you chose:**

1. What should the guide be called, and what do the trails have in common — a region, a season, a kind of walking?
2. Which trails should it cover (4-6 is right)? If you have distances, elevation gain, and season notes, give them to me; otherwise research real trails and use their real numbers.
3. What's the accent color (a hex like `#2f6b4f`), and should it feel like a national-park field guide, a modern outdoor brand, or an editorial magazine?
4. Miles and feet, or kilometres and metres? And do any of these need a permit, a booking, or a shuttle I should call out?

**Then build a complete, polished, responsive site with:**

- A **trail index** at `/`: a full-bleed hero photo, a one-line promise, and a card grid — one card per trail with its photo, region, distance, elevation gain, typical season, and a difficulty badge. Sort so the easiest walk and the hardest objective are both easy to find.
- A **page per trail** at `/trails/<slug>/`, generated with `generateStaticParams` from a single typed data file. Each page carries: a hero photo, an at-a-glance stat block (distance, elevation gain, time, high point, trailhead, season, difficulty), the route broken into named sections with what actually happens on each, a permits-and-access block, and an honest "know before you go" list — the parts that bite people, not marketing.
- A short **"how this is built"** band explaining, in plain language, that the whole site is static HTML, images are transformed on the fly, and routing rules ship as files.
- A **custom 404** that apologises briefly and links back to the index.
- A footer crediting the photo source and the platform.

**Design & content notes:**

- Real trails, real numbers. Research them — distances, elevation gain, high points, permit systems, when the road or hut season opens. If a trail has a lottery or a shuttle or a river crossing, say so. Never "lorem ipsum", never invented statistics.
- Field-guide feel: a serif display face for headings, a clean sans for body, generous whitespace, and one accent color used for badges, links, and rules. System font stacks are fine — don't pull in heavy web fonts for a static site.
- Use real photos from Unsplash via **absolute** `https://images.unsplash.com/...` URLs, with `alt` text that describes what's actually in the frame.
- Keep it accessible: semantic landmarks, a skip link, visible focus states, real heading order, contrast that passes, and no text baked into images.

**Platform specifics — these are the point of the build:**

1. **Static export.** In `next.config.ts` set `output: "export"` and `trailingSlash: true`. `next build` writes `out/` with a root `index.html` and a directory per route. No API routes, no middleware, no `getServerSideProps`, no ISR.
2. **Accelerated images.** Install `@spacefast/image` and wire its Next loader so every remote photo is resized and re-encoded through the Site Accelerator instead of shipping a 4 MB original:

   ```ts
   // next.config.ts
   import { createRequire } from "node:module";
   import type { NextConfig } from "next";
   import { spacefastNextImageConfig } from "@spacefast/image/next";

   const require = createRequire(import.meta.url);

   const nextConfig: NextConfig = {
     output: "export",
     trailingSlash: true,
     images: {
       ...spacefastNextImageConfig,
       loaderFile: require.resolve("@spacefast/image/next-loader"),
     },
   };

   export default nextConfig;
   ```

   Then use `next/image` normally with absolute URLs, `width`/`height`, `sizes`, and `priority` on the hero. Only absolute URLs get accelerated — files in `public/` pass through untouched. When the build finishes, grep the HTML: the `src` and `srcset` values should be `https://i0.wp.com/...?quality=…&w=…` URLs.
3. **Routing rules as files.** Put `_redirects` and `_headers` in `public/` so they land at the root of `out/`. Give me at least one real 301 (an index path or a legacy URL shape that should not 404) and a sensible security-header block — `X-Content-Type-Options`, `Referrer-Policy`, `Permissions-Policy`, plus a long immutable `Cache-Control` on the hashed `/_next/static/*` assets.
4. Optionally add a small `public/sf.jsonc` with the space `name` and `meta` (title, description, image) so link previews look right.

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="trailhead"></script>
```

Put it in the root layout so every generated page gets it, and confirm it's in the built HTML — not injected by a client-side script tag helper, which would leave it out of the export.

**When the site is ready, publish it to Spacefast with the direct API — no account, install, or extra instructions needed:**

1. Build first (`bun run build` / `npm run build`), then use `./out` as the publish folder. Confirm it has `index.html` at its root, plus `_redirects` and `_headers`, and no secrets, source files, `.git`, or `.spacefast` state.
2. First publish: send every file as multipart form data. This Bash/Zsh block preserves relative paths and works for one file or a whole folder:
   ```bash
   PUBLISH_ROOT=./out
   publish_files=()
   while IFS= read -r -d "" file; do
     relative=${file#"$PUBLISH_ROOT"/}
     publish_files+=(-F "files=@$file;filename=$relative")
   done < <(find "$PUBLISH_ROOT" -type f -print0)
   curl -sS "${publish_files[@]}" "https://api.spacefast.com/v1/publish?wait=1"
   ```
3. From the `{ "data": ... }` receipt, give me `data.space.liveUrl`, `data.version.immutableUrl`, `data.claim.url`, and `data.claim.expiresAt`. Remind me to claim within 6 hours. Keep `data.claim.token` secret.
4. Save `data.space.id` and `data.claim.token` locally (for example in an ignored, mode-600 `.spacefast/state.json`). For a quick update, rebuild the `publish_files` array above and publish to the same space:
   ```bash
   SPACEFAST_SPACE_ID=<saved-space-id>
   SPACEFAST_TOKEN=<saved-claim-token-or-access-token>
   curl -sS -H "Authorization: Bearer $SPACEFAST_TOKEN" \
     -F "spaceId=$SPACEFAST_SPACE_ID" "${publish_files[@]}" \
     "https://api.spacefast.com/v1/publish?wait=1"
   ```
   If an update after claiming returns `space_claimed_credential_available`, exchange the saved claim token once at `POST https://api.spacefast.com/v1/anonymous-claim/exchange`, save `data.credential.accessToken`, and retry with that access token.
5. Then check the live site: `curl -sI <liveUrl>/trails/` should show your 301, and the trail pages' image URLs should point at `i0.wp.com`.

**Optional shortcuts and reference only:** if the `sf` CLI is already installed, `sf publish ./out --wait` does the same job. A zip of the publish folder is also supported, but neither the CLI nor a zip is required. Docs: [Next.js on Spacefast](https://spacefast.com/docs/guides/frameworks/nextjs) · [redirects](https://spacefast.com/docs/serve/redirects) · [headers and settings](https://spacefast.com/docs/serve/settings) · [agent setup](https://spacefast.com/setup) · [claiming](https://spacefast.com/help/anonymous-publish)
