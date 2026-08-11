# Spacefast Examples

The canonical home for Spacefast examples. It contains polished, copy-paste
recipes and runnable platform apps. Do not copy examples into the product
monorepo or create one-off repositories for them.

## Layout

```text
apps/
  comments/       ← minimal Zero comments app
  kitchen-sink/   ← one root app mixing Pages, Zero, PHP, TypeScript, and JavaScript
examples/
  <slug>/
    prompt.md      ← the copy-paste recipe prompt
    meta.json      ← gallery metadata and live URL
    site/          ← the built site or buildable project
    README.md      ← implementation notes and live link
```

The apps are direct, runnable references. Each app root contains its own
`sf.jsonc`; run `sf dev` or `sf publish` from that directory.

## Recipes

The recipes cover a band site, a calorie tracker, a playable game, a restaurant
menu, a technical plan, and more. Each recipe ships with the live website its
prompt produces.

Every recipe exists to answer one question: _given the prompt, can any AI agent
build my version and publish it to Spacefast?_ They power the public recipe gallery
at [spacefast.com/recipes](https://spacefast.com/recipes).

This historically named repository is the canonical source for Recipes. Prompts and metadata
are compiled into a public JSON feed by GitHub Actions:

<https://spacefast.github.io/examples/manifest.json>

The Spacefast website and the badges on live recipe outputs read that feed. Do not
copy prompts or gallery metadata into another repository.

## The badge

Every published recipe output loads the shared Spacefast badge. The panel is always
open, and the shared script reads the current prompt from the canonical feed:

```html
<script src="https://spacefast.com/badge.js" data-example="<slug>"></script>
```

Do not vendor `badge.js` or embed a prompt in a recipe build. Keeping the badge
shared means a prompt or badge improvement reaches every output without another
site publish. The catalog intentionally retains the historical `data-example`
attribute until the production shared badge deploys `data-recipe` support; this keeps
new and already-published outputs functional throughout the rollout.

## Publishing

GitHub Actions (`.github/workflows/publish.yml`) validates the full catalog,
publishes the JSON feed to GitHub Pages, and rebuilds and publishes changed
recipe outputs to their existing Spacefast spaces. It authenticates with the
team-owned `SPACEFAST_DEPLOY_KEY` repository secret. Static recipe outputs are
published as-is; recipes with a `package.json` are built first. A Spacefast Zero
project declares `"runtime": "zero"` in `meta.json`; the workflow compiles it
and publishes its `site/` project root so the server artifact is included.

To add a recipe: copy `TEMPLATE.md` into `examples/<slug>/prompt.md`, fill it in,
drop the site in `examples/<slug>/site/`, and add `meta.json` using
`meta.example.json` as the schema. Run `bun test scripts/catalog.test.mjs` locally;
CI runs the same catalog and output validation and handles the rest.

The directory slug is also the Spacefast space slug by default. If that hostname
is reserved or the recipe deliberately publishes elsewhere, add `publish_slug`
to `meta.json` and make `live_url` match it. The recipe route and badge continue
to use the directory slug.
