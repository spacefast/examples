---
title: The Web Used to Be Lighter
description: A median web page now weighs more than the install size of the first Photoshop. Here's why that bothers me, and a few honest ways to claw the bytes back.
pubDate: 2026-06-18
tags: ['essays', 'performance', 'web']
---

I keep a folder of old bookmarks. Last week I opened one from 2009 — a personal
site with a couple of essays and a photo of the author's dog. It loaded before
my finger left the trackpad. No spinner, no skeleton, no cookie wall. Just text,
instantly.

Then I opened a site I shipped at work. Three seconds of grey rectangles
pulsing politely while 2.1 megabytes of JavaScript decided what to render. The
dog site was 180 kilobytes. Mine was eleven times heavier and said less.

I don't think we got worse at our jobs. I think the defaults got worse, and we
stopped noticing.

## Weight is a feature you ship to everyone

The median page weight has roughly doubled every few years, mostly in scripts.
We justify it one library at a time — a date picker here, an analytics bundle
there — and each addition is individually reasonable. The problem is that the
person on a five-year-old phone on a train doesn't experience your additions
individually. They experience the sum.

A useful gut check: **every kilobyte of JavaScript costs more than a kilobyte of
image**, because the browser has to download it, parse it, compile it, and run
it — often on the main thread, often before the user can do anything. Images
just draw.

## What I actually changed

Last quarter I spent two days doing nothing but removing things. Here's the
shape of it.

First, I measured before touching anything. You can't improve a number you
never wrote down.

```bash
# A 30-second budget check with no tooling beyond the browser.
# Open DevTools → Network, hard-reload, then read "transferred".
# Or, from CI, fail the build if the JS bundle crosses a line:

npx source-map-explorer dist/assets/*.js
```

Then I went after the three usual suspects.

```js
// Before: the whole library, eagerly, for one function.
import _ from 'lodash';
const slug = _.kebabCase(title);

// After: write the eight lines yourself and delete 70 KB.
const kebabCase = (s) =>
  s
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/[\s_]+/g, '-')
    .toLowerCase();

const slug = kebabCase(title);
```

Multiply that by every "I just need one helper" and you find whole megabytes
hiding in convenience.

The second win was loading less *up front*. A lot of script doesn't need to run
until the user scrolls to it or clicks something. The platform has a quiet,
underused tool for exactly this:

```js
// Defer the comment widget until it's actually near the viewport.
const slot = document.querySelector('#comments');

const io = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (!entry.isIntersecting) continue;
    import('./comments.js').then((m) => m.mount(slot));
    io.disconnect();
  }
});

io.observe(slot);
```

The comment widget is still there. It just stops taxing the 80% of readers who
never scroll that far.

## The boring conclusion

> Fast isn't a feature you bolt on at the end. It's a thousand small refusals.

I'm not nostalgic for 2009. I like CSS grid and `prefers-reduced-motion` and
being able to ship a site in an afternoon. But the dog site got one thing right
that we keep getting wrong: it respected the reader's time and the reader's
data plan as if they were the point. Because they are.

Weigh your pages. Write the number down. Then go delete something.
