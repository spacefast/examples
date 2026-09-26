---
title: Writing CSS That Outlives Frameworks
description: Frameworks come and go on a two-year cycle. The stylesheet you write today can still be working in a decade — if you lean on the cascade instead of fighting it.
pubDate: 2026-06-09
tags: ['css', 'frontend', 'code']
---

I've rewritten the same product in four different frontend frameworks over my
career. You know what survived every migration almost untouched? The CSS. Not
the CSS-in-JS, not the utility soup that assumed a specific build — the plain
stylesheet that described what things should look like.

That's not an accident. CSS is one of the few web technologies with a genuine
commitment to backward compatibility. Code you wrote in 2014 still runs. So if
you want your styling to outlive whatever you're rendering with this year, write
it like the platform is the framework.

## Design tokens are just custom properties

You don't need a library to have a design system. You need a `:root` and some
discipline.

```css
:root {
  /* Color: name the role, not the value. */
  --bg: #ffffff;
  --surface: #f6f6f7;
  --text: #1a1a1d;
  --text-muted: #6b6b73;
  --accent: #3b5bdb;

  /* A modular type scale, computed once. */
  --step-0: 1rem;
  --step-1: 1.25rem;
  --step-2: 1.563rem;
  --step-3: 1.953rem;

  /* Spacing on a consistent rhythm. */
  --space-2: 0.5rem;
  --space-4: 1rem;
  --space-8: 2rem;
}

@media (prefers-color-scheme: dark) {
  :root {
    --bg: #121214;
    --surface: #1c1c20;
    --text: #ececf0;
    --text-muted: #9a9aa3;
    --accent: #748ffc;
  }
}
```

Dark mode here is *five lines* because the components never hardcoded a color —
they referenced a role. Change the role, the whole UI follows. No theme
provider, no re-render, no JavaScript at all.

## Let the cascade do the layout it's good at

Most "I need a wrapper component for spacing" problems are really "I haven't met
the owl" problems. One rule handles vertical rhythm for an entire document:

```css
/* Every direct child gets space above it — except the first. */
.flow > * + * {
  margin-top: var(--flow-space, var(--space-4));
}
```

Drop `.flow` on an article and the paragraphs, headings, and lists space
themselves. Want a heading to breathe more? Set `--flow-space` on it locally.
The cascade is the spacing engine.

For the page skeleton, modern CSS removed the need for most of the wrappers we
used to nest:

```css
.layout {
  display: grid;
  /* A centered column that never touches the edges, with full-bleed
     children when they want it. */
  grid-template-columns:
    [full-start] minmax(var(--space-4), 1fr)
    [content-start] min(68ch, 100% - var(--space-8)) [content-end]
    minmax(var(--space-4), 1fr) [full-end];
}

.layout > * {
  grid-column: content;
}

.layout > .bleed {
  grid-column: full;
}
```

That's a responsive, centered, full-bleed-capable layout in one grid
declaration. No media queries. It would have taken three nested divs and a
clearfix in 2014.

## Components, scoped without a build

The newest tool in the box is `@scope`, and it does what people reached for
CSS-in-JS to get — locality — without leaving the stylesheet.

```css
@scope (.card) to (.card__body) {
  /* These rules only apply inside .card, and stop before .card__body,
     so nested cards and rich content don't leak styles into each other. */
  h2 {
    font-size: var(--step-2);
    color: var(--text);
  }

  a {
    color: var(--accent);
  }
}
```

## The test of time

> A good stylesheet reads like a description of the design, not a record of the
> fights you had with the framework.

When I open old CSS and it still makes sense — when the variable names tell me
what they're for and the selectors describe the page rather than some
component tree that no longer exists — that's the signal I got it right. The
framework was a rendering detail. The design lived in the cascade, where it
belonged, where it still works.
