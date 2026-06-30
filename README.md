# Spacefast Examples

Thirty real, buildable example websites — a band site, a calorie tracker, a
playable game, a restaurant menu, an internal sales dashboard, and more. Each one
is **self-contained** (no shared components) and ships with the exact **prompt**
that produces it.

Every example exists to answer one question: _given the prompt, can any AI agent
build this exact site and publish it to Spacefast?_ They double as the public
gallery at **[spacefast.com/examples](https://spacefast.com/examples)**.

## Layout

```
examples/
  <slug>/
    prompt.md      ← the copy-paste prompt (asks you setup questions, then builds + publishes)
    meta.json      ← name, vertical, tech, setup questions, live URL
    site/          ← the built site (plain files, or a buildable project)
    README.md      ← what it is + the live link
```

No shared packages, no monorepo tooling, no cross-imports. Each `examples/<slug>/`
is its own little world so you can copy one folder and have a complete project.

## The badge

Every published example loads the Spacefast badge, a small floating
"Published on Spacefast" pill that links back to that example's build-your-own
page:

```html
<script src="https://spacefast.com/badge.js" data-example="<slug>"></script>
```

## Publishing

CI (`.github/workflows/publish.yml`) builds each example and publishes it to
Spacefast at its slug, using a `SPACEFAST_DEPLOY_KEY` repo secret. Static examples
are published as-is; examples with a `package.json` are built first and the build
output is published.

To add an example: copy `TEMPLATE.md` into `examples/<slug>/prompt.md`, fill it in,
drop the built site in `examples/<slug>/site/`, and add `meta.json`. CI does the rest.
