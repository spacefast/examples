# Spacefast examples

Small, complete projects for learning Spacefast, testing framework support, and
moving an existing site without starting over.

Every directory is independent. Clone the repository, enter one example, and
let the CLI detect the framework, install dependencies, build, and publish:

```sh
cd astro-with-wordpress
sf dev
sf publish
```

Use `sf build` when you only want to prove the deployable artifact locally.

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
| [`recipes/`](./recipes/) | Canonical prompts, metadata, live outputs, and the public recipe feed |
| [`kitchen-sink/`](./kitchen-sink/) | Zero, Pages, PHP, JavaScript, TypeScript, auth, mail, and routing in one project |
| [`migrate-from-cloudflare-pages/`](./migrate-from-cloudflare-pages/) | Wrangler build settings and Pages convention files |
| [`migrate-from-vercel/`](./migrate-from-vercel/) | `vercel.json` build, redirects, rewrites, headers, and cron import |
| [`migrate-from-netlify/`](./migrate-from-netlify/) | A full Netlify project, including Functions, plugins, contexts, forms, and the explicit ports they require |

Each example README calls out the important files, the expected build output,
and any product boundary that cannot be translated automatically.

## Recipes integration

`recipes/` is the source of truth for [spacefast.com/recipes](https://spacefast.com/recipes).
Each recipe contains its copy-paste prompt, gallery metadata, runnable output,
and live URL. GitHub Actions compiles those records into the historical public
feed at <https://spacefast.github.io/examples/manifest.json> and publishes only
changed recipe outputs.

Do not duplicate recipe prompts in another package or repository. Framework
examples teach an integration; recipes are user-facing starting points that an
agent can customize and publish.

## Validation

The pull-request workflow builds every top-level project through `sf build`,
runs the Zero app tests, validates every recipe output, and builds the recipe
manifest. That exercises the same framework detection and migration import path
used by `sf publish`, without creating a live version.
