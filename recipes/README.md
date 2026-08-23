# Recipes

This directory powers the public Spacefast recipe gallery. A recipe is a prompt
an agent can customize, the finished site that proves the prompt, and metadata
for displaying both together.

```text
recipes/<slug>/
  prompt.md   # copy-paste instructions for an agent
  meta.json   # title, summary, setup questions, live URL, and publish mode
  site/       # the finished static or Zero project
  README.md   # implementation notes and live link
```

Start with [`TEMPLATE.md`](./TEMPLATE.md) and
[`meta.example.json`](./meta.example.json). The directory name, metadata slug,
badge attribute, and default Spacefast space slug must agree.

Run the catalog checks from the repository root:

```sh
bun test scripts/catalog.test.mjs
```

On `master`, GitHub Actions rebuilds the public manifest and publishes only the
recipe outputs whose `site/` files changed.
