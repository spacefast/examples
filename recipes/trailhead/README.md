# Trailhead — Next.js static export on Spacefast

A photo-led hiking guide: an index of six real trails and a generated page for
each one. It exists to be the canonical **Next.js static export** example —
`output: "export"`, `generateStaticParams`, Site Accelerator images, and
`_redirects` / `_headers` shipped as files.

**Live:** <https://trailhead.view.fast/>

## Build and publish

```bash
cd site
bun install
bun run build          # → site/out/
sf publish out --wait  # or the direct multipart API, see ../prompt.md
```

`bun run build` writes `site/out/` with a root `index.html`, a directory per
route, `404.html`, and the three convention files (`_redirects`, `_headers`,
`sf.jsonc`) copied straight out of `public/`.

> **For CI:** the publish directory is `site/out`, not `site/dist` or
> `site/build`. Next's static export target is hard-coded to `out`.

## What it exercises

| Platform feature | Where |
| --- | --- |
| `output: "export"` + `trailingSlash: true` | `site/next.config.ts` |
| `generateStaticParams` for per-trail routes | `site/app/trails/[slug]/page.tsx` |
| `@spacefast/image` Next loader → `i0.wp.com` | `site/next.config.ts`, `site/lib/spacefast-image-loader.ts` |
| `siteAcceleratorUrl()` for OG cards | `site/app/layout.tsx`, `site/app/trails/[slug]/page.tsx` |
| `_redirects` (four 301s) | `site/public/_redirects` |
| `_headers` (security + immutable asset cache) | `site/public/_headers` |
| `sf.jsonc` name, meta, 404 fallback | `site/public/sf.jsonc` |

Every `next/image` source is an **absolute** `https://images.unsplash.com/...`
URL, which is what makes the loader do anything — relative `public/` paths pass
through untouched. The built HTML proves it:

```
$ grep -o 'https://i0.wp.com[^" ]*' out/trails/laugavegur/index.html | head -1
https://i0.wp.com/images.unsplash.com/photo-1726533870778-8be51bf99bb1?quality=80&strip=all&w=640
```

(That's the first entry of the `srcSet`; the full set runs 640w to 3840w, and the
OG card is a `resize=1200,630` crop from the same helper.)

## Known issue: the documented `next.config.ts` recipe does not build

The [Next.js guide](https://spacefast.com/docs/frameworks) says to
write:

```ts
import { spacefastNextImageConfig } from "@spacefast/image/next";
// ...
loaderFile: require.resolve("@spacefast/image/next-loader"),
```

Neither line works with `@spacefast/image@0.2.2`, on Next 15.5 or Next 16.3:

1. **`ERR_PACKAGE_PATH_NOT_EXPORTED`.** Next compiles `next.config.ts` to
   CommonJS, so the config's imports resolve under Node's `require` condition.
   The package's `exports` map declares only `types` and `import` for `.`,
   `./next` and `./next-loader`, so every reference from the config throws —
   static import, dynamic `await import()`, and `require.resolve` alike. A
   `require` or `default` condition in the package would fix all three.
2. **Absolute `loaderFile` paths break on Next 16.** Next joins `loaderFile`
   onto the project root, so the absolute path `require.resolve` returns becomes
   `/project/root/project/root/node_modules/...` and the build fails with
   "Specified images.loaderFile does not exist".

So this example inlines `spacefastNextImageConfig`'s two values (`loader:
"custom"`, `qualities`) and points `loaderFile` at a one-line local re-export,
`lib/spacefast-image-loader.ts`. The bundler resolves the bare specifier there,
which keeps pnpm / Yarn PnP / hoisted workspaces working — the same property
`require.resolve` was there to buy. `next.config.ts` says all of this in
comments; delete them when the package ships a `require` condition.

## Implementation notes

- **One data file.** `site/data/trails.ts` holds all six trails; the index, the
  detail pages, `generateStaticParams`, and the OG cards all read from it.
- **Numbers are stored once.** Distances and elevations are canonical metric
  numbers; `site/lib/units.ts` renders `"5.4 mi / 8.7 km"` from them, and the
  hero's totals are summed from the same fields, so the two unit systems cannot
  drift apart.
- **No CSS framework, no web fonts.** `app/globals.css` is one hand-written
  stylesheet driven by custom properties, including a warm dark mode behind
  `prefers-color-scheme`. Nothing is fetched at build time, so the build is
  hermetic.
- **No client JavaScript of our own.** Every page is server-rendered at build
  time; the only script in the HTML is the shared Spacefast badge, rendered as a
  plain `<script>` in the root layout. `next/script` would have injected it at
  runtime and left it out of the export.
- **Figures use one display ratio.** Sources are a mix of 3:2, 4:3 and portrait;
  `aspect-ratio: 3 / 2` with `object-fit: cover` reserves exactly the right box
  so nothing shifts as photos land.
- **Photo credits name Unsplash, not photographers.** Unsplash doesn't require
  attribution and the photographer for a bare `images.unsplash.com/photo-…` URL
  can't be verified from the URL alone. Crediting the source is honest;
  guessing names is not.

## Content

Six real trails: Angels Landing (Zion), Chain Lakes Loop (Mt Baker), Plain of
Six Glaciers (Banff), the Tongariro Alpine Crossing, the Tre Cime di Lavaredo
loop, and Iceland's Laugavegur. Distances, elevation gain, high points, seasons,
and permit systems are the published figures from the land managers. Conditions
and permit rules change — the footer says so.
