# Spacefast Recipes

Forty-eight polished, copy-paste recipes — for a band site, a calorie tracker, a
playable game, a restaurant menu, a technical plan, and more. Each recipe ships
with the live website its prompt produces.

Every recipe exists to answer one question: _given the prompt, can any AI agent
build my version and publish it to Spacefast?_ They power the public recipe gallery
at [spacefast.com/recipes](https://spacefast.com/recipes).

## Layout

```text
examples/
  <slug>/
    prompt.md      ← the copy-paste prompt
    meta.json      ← gallery metadata and live URL
    site/          ← the built site or buildable project
    README.md      ← implementation notes and live link
```

This historically named repository is the canonical source for Recipes. Prompts and metadata
are compiled into a public JSON feed by GitHub Actions:

<https://spacefast.github.io/examples/manifest.json>

The Spacefast website and the badges on live recipe outputs read that feed. Do not
copy prompts or gallery metadata into another repository.

## The badge

Every published recipe output loads the shared Spacefast badge. The panel is always
open, and the shared script reads the current prompt from the canonical feed:

```html
<script src="https://spacefast.com/badge.js" data-recipe="<slug>"></script>
```

Do not vendor `badge.js` or embed a prompt in a recipe build. Keeping the badge
shared means a prompt or badge improvement reaches every output without another
site publish. Already-published sites may retain the historical `data-example`
attribute; the shared badge accepts both.

## Publishing

GitHub Actions (`.github/workflows/publish.yml`) validates the full catalog,
publishes the JSON feed to GitHub Pages, and rebuilds and publishes changed
recipe outputs to their existing Spacefast spaces. It authenticates with the
team-owned `SPACEFAST_DEPLOY_KEY` repository secret. Static recipe outputs are
published as-is; recipes with a `package.json` are built first.

To add a recipe: copy `TEMPLATE.md` into `examples/<slug>/prompt.md`, fill it in,
drop the site in `examples/<slug>/site/`, and add `meta.json` using
`meta.example.json` as the schema. Run `bun scripts/build-manifest.mjs` locally;
CI does the same validation and handles the rest.

The directory slug is also the Spacefast space slug by default. If that hostname
is reserved or the recipe deliberately publishes elsewhere, add `publish_slug`
to `meta.json` and make `live_url` match it. The recipe route and badge continue
to use the directory slug.
