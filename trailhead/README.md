# Trailhead: Next.js static export with @spacefast/image

A photo-led hiking guide: an index of six real trails and a generated page for
each. It is the Next.js static export example: `output: "export"`,
`generateStaticParams`, Site Accelerator images through `@spacefast/image`, and
`_redirects` / `_headers` shipped as files.

```sh
bun install
bun run dev
sf publish
```

The CLI detects Next.js, runs `bun run build`, and publishes `out/`: a root
`index.html`, a directory per route, `404.html`, and the convention files
(`_redirects`, `_headers`, `sf.jsonc`) copied from `public/`.

## Important files

| Platform feature | Where |
| --- | --- |
| `output: "export"` + `trailingSlash: true` | `next.config.ts` |
| `spacefastNextImageConfig` from `@spacefast/image/next` | `next.config.ts` |
| Loader file Next bundles with the client | `lib/spacefast-image-loader.ts` |
| `generateStaticParams` for per-trail routes | `app/trails/[slug]/page.tsx` |
| `siteAcceleratorUrl()` for OG cards | `app/layout.tsx`, `app/trails/[slug]/page.tsx` |
| `_redirects` (four 301s) | `public/_redirects` |
| `_headers` (security + immutable asset cache) | `public/_headers` |
| `sf.jsonc` name, meta, 404 fallback | `public/sf.jsonc` |

Every `next/image` source is an absolute `https://images.unsplash.com/...` URL,
which is what makes the loader do anything; relative `public/` paths pass
through untouched. The built HTML proves it:

```
$ grep -o 'https://i0.wp.com[^" ]*' out/trails/laugavegur/index.html | head -1
https://i0.wp.com/images.unsplash.com/photo-1726533870778-8be51bf99bb1?quality=80&strip=all&w=640
```

## Implementation notes

- `data/trails.ts` is the one data file; the index, detail pages,
  `generateStaticParams`, and OG cards all read from it.
- Distances and elevations are stored once as metric numbers; `lib/units.ts`
  renders both unit systems from them so they cannot drift.
- One hand-written stylesheet, no web fonts, nothing fetched at build time, so
  the build is hermetic.
- Figures use `aspect-ratio: 3 / 2` with `object-fit: cover`, so nothing shifts
  as photos land.
