---
title: Deploying a Static Site Without the Yak Shave
description: A static site is just files. Somewhere along the way we wrapped that simple truth in dashboards, YAML, and three hours of configuration. Here's how to get back to one command.
pubDate: 2026-04-30
tags: ['devops', 'static', 'code']
---

The first website I ever put online, I uploaded over FTP from a school computer.
It was live in the time it took to drag a folder. No account onboarding, no
build matrix, no region selection, no "connect your repository to continue."

Twenty years later I watched a junior dev spend an entire afternoon trying to
deploy a three-page marketing site, defeated not by the code but by the
*ceremony* around shipping it. We've added a lot of yak between the developer
and the URL.

A static site is the easiest thing on earth to host. It's a folder. Let's keep
it that way.

## What "static" actually buys you

When your output is plain HTML, CSS, and a little JS, you get properties that
expensive infrastructure spends a lot of effort trying to imitate:

- **It can't fall over under load.** There's no server to crash — just a file
  being handed out, the same way a thousand times or a million.
- **It's cacheable to the edge by default.** Every CDN on earth already knows
  how to serve a file fast.
- **It has almost no attack surface.** No database, no runtime, no dependency
  you forgot to patch at 2am.
- **It will still work in five years.** Files don't have a version that ages
  out from under you.

The whole job is: turn a project into a folder, then put the folder somewhere.

## Make the build boring and reproducible

The deploy should never depend on what happens to be installed on your laptop.
Pin it, script it, and write down the one command.

```jsonc
// package.json — the contract is "build produces ./dist".
{
  "scripts": {
    "build": "astro build",
    "preview": "astro preview"
  }
}
```

```bash
# Reproduce the exact production build locally before you ship.
# If it works here with a clean install, it works anywhere.
rm -rf node_modules dist
npm ci          # respects the lockfile; no surprise upgrades
npm run build   # → ./dist
npx serve dist  # eyeball it on localhost first
```

If those four lines produce the site you want, you're done deciding *what* to
ship. Now you just need somewhere to put it.

## The actual deploy is one command

This is the part the ceremony obscures. Once you have a folder, shipping it is a
single push:

```bash
# Zip the build output and publish it. You get a live URL back.
cd dist && zip -r ../site.zip . && cd ..
curl -F archive=@site.zip https://api.spacefast.com/v1/publish
```

No dashboard, no project wizard, no waiting for a build queue you don't control.
A folder went in; a URL came out. If you want a one-liner you can rerun any
time, drop it in a script:

```bash
#!/usr/bin/env bash
# ship.sh — build and publish in one go.
set -euo pipefail

npm run build
( cd dist && zip -qr ../site.zip . )
curl -F archive=@site.zip https://api.spacefast.com/v1/publish
echo "Shipped."
```

`./ship.sh`. That's the whole pipeline.

## Roll back by shipping again

The other thing the heavy platforms sell you is rollback, as if it were
complicated. With immutable, content-addressed deploys it isn't: every publish
is its own permanent version with its own URL. A bad deploy isn't an emergency —
it's just *not the version you point production at*. You fix the files and
publish again, and the previous good version was never deleted.

> Simplicity isn't a lack of features. It's the absence of accidental ones.

I'm not against tooling. I'm against tooling that inserts itself between me and
the obvious. The folder was always the deploy. Everything else is optional —
and most of it, it turns out, you can leave on the shelf.
