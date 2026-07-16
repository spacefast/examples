# Spacefast Examples

Forty-seven real, buildable example websites — a band site, a calorie tracker, a
playable game, a restaurant menu, an internal sales dashboard, and more. Each one
is self-contained and ships with the exact prompt that produces it.

Every example exists to answer one question: _given the prompt, can any AI agent
build this site and publish it to Spacefast?_ They also power the public gallery
at [spacefast.com/examples](https://spacefast.com/examples).

## Layout

```text
examples/
  <slug>/
    prompt.md      ← the copy-paste prompt
    meta.json      ← gallery metadata and live URL
    site/          ← the built site or buildable project
    README.md      ← implementation notes and live link
```

This repository is the canonical source for the gallery. Prompts and metadata
are compiled into a public JSON feed by GitHub Actions:

<https://spacefast.github.io/examples/manifest.json>

The Spacefast website and the badges on the live examples read that feed. Do not
copy prompts or gallery metadata into another repository.

## The badge

Every published example loads the shared Spacefast badge. The panel is always
open, and the shared script reads the current prompt from the canonical feed:

```html
<script src="https://spacefast.com/badge.js" data-example="<slug>"></script>
```

Do not vendor `badge.js` or embed a prompt in an example build. Keeping the badge
shared means a prompt or badge improvement reaches every example without another
47-site publish.

## Publishing

GitHub Actions (`.github/workflows/publish.yml`) validates the full catalog,
publishes the JSON feed to GitHub Pages, and rebuilds and publishes changed
examples to their existing Spacefast spaces. It authenticates with the
team-owned `SPACEFAST_DEPLOY_KEY` repository secret. Static examples are
published as-is; examples with a `package.json` are built first.

To add an example: copy `TEMPLATE.md` into `examples/<slug>/prompt.md`, fill it in,
drop the site in `examples/<slug>/site/`, and add `meta.json` using
`meta.example.json` as the schema. Run `bun scripts/build-manifest.mjs` locally;
CI does the same validation and handles the rest.

The directory slug is also the Spacefast space slug by default. If that hostname
is reserved or the example deliberately publishes elsewhere, add `publish_slug`
to `meta.json` and make `live_url` match it. The gallery route and badge continue
to use the directory slug.
