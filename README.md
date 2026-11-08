# Spacefast examples

Small, complete projects for learning Spacefast, testing framework support, and
moving an existing site without starting over.

Every directory is independent. Clone the repository, enter one example, and
let the CLI detect the framework, install dependencies, build, and publish:

```sh
cd astro-with-wordpress
npm install
npm run dev     # the framework's own dev server
sf publish
```

Use `sf build` when you only want to prove the deployable artifact locally.
`sf dev` is the local server for Zero apps (`zero/`, `kitchen-sink/`,
`zero-perfect/`, `wp-zero/`); for everything else, use the framework's dev
server. `astro-zero/` needs both: Astro's dev server for the pages and
`sf dev --dir dist` for the capsule.

## Directory map

| Directory | What it proves |
| --- | --- |
| [`jekyll/`](./jekyll/) | Ruby/Bundler detection, Jekyll build, and `_site` output |
| [`gatsby/`](./gatsby/) | Gatsby detection and `public` output |
| [`zero/`](./zero/) | The smallest useful Spacefast Zero app |
| [`blog-with-custom-templates/`](./blog-with-custom-templates/) | Static publishing plus `_layout.html`, `_pages`, `theme.json`, and `sf.jsonc` |
| [`nextjs-static/`](./nextjs-static/) | A Next.js static export served entirely as files |
| [`nextjs/`](./nextjs/) | Server-rendered Next.js, route handlers, and automatic OpenNext packaging |
| [`astro-with-wordpress/`](./astro-with-wordpress/) | Astro built from WordPress through `@spacefast/wordpress` |
| [`functions-php/`](./functions-php/) | Native PHP Functions with JSON, form bodies, validation, and verified auth context |
| [`zero-perfect/`](./zero-perfect/) | A minimal Zero app: queries, mutations, guest and Google sign-in, realtime, routes, and an HTTP endpoint |
| [`wp-zero/`](./wp-zero/) | WordPress rendered to static pages at build time with a Zero capsule for realtime reactions and search |
| [`astro-zero/`](./astro-zero/) | Astro pages in front of a server-only Zero capsule, staged into `dist/` as one project root |
| [`wp-astro/`](./wp-astro/) | Headless WordPress pulled from the public REST API and rendered statically with Astro |
| [`wp-react/`](./wp-react/) | A Vite + React SPA reading WordPress posts in the browser, with the `_redirects` SPA fallback |
| [`unfurl/`](./unfurl/) | Next.js SSR, a route handler, and middleware on the Functions runtime |
| [`trailhead/`](./trailhead/) | A Next.js static export with `@spacefast/image` Site Accelerator images, `_redirects`, and `_headers` |
| [`kitchen-sink/`](./kitchen-sink/) | Zero, Pages, PHP, JavaScript, TypeScript, auth, mail, and routing in one project |
| [`migrate-from-cloudflare-pages/`](./migrate-from-cloudflare-pages/) | Wrangler build settings and Pages convention files |
| [`migrate-from-vercel/`](./migrate-from-vercel/) | `vercel.json` build, redirects, rewrites, headers, and cron import |
| [`migrate-from-netlify/`](./migrate-from-netlify/) | A full Netlify project, including Functions, plugins, contexts, forms, and the explicit ports they require |

Each example README calls out the important files, the expected build output,
and any product boundary that cannot be translated automatically.

## Validation

The pull-request workflow builds every top-level project through `sf build`
and runs the Zero app tests, without creating a live version.
`migrate-from-netlify` builds its prebuilt output, because `sf build` has no
flag to accept the Netlify features that still need a port.

Recipe prompts live in their own repository and are published separately.
