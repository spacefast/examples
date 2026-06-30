---
title: The Underrated `<details>` Element
description: An accordion, a disclosure widget, a whole FAQ — with open/close state, keyboard support, and accessibility baked in, and not one line of JavaScript. The platform has been quietly carrying us.
pubDate: 2026-04-16
tags: ['html', 'frontend', 'code']
---

I once reviewed a pull request that added a 140-line React component, a piece of
state, an `aria-expanded` attribute, a keyboard handler, and a focus trap — to
build a thing that opens and closes when you click it. A disclosure widget.

The platform has shipped exactly that, for free, since roughly 2011. It's called
`<details>`, and I'd bet most of us have never typed it.

## The whole thing

```html
<details>
  <summary>What's your refund policy?</summary>
  <p>
    Full refund within 30 days, no questions asked. After that, store credit for
    another 30. We'll never make you sit through a retention call.
  </p>
</details>
```

That's a complete, accessible disclosure widget. It opens and closes on click.
It works with the keyboard — `Enter` and `Space` toggle it, because the
`<summary>` is a real focusable control. Screen readers announce its expanded
state correctly, because the semantics are built in rather than bolted on with
ARIA. You wrote zero JavaScript and zero attributes.

## It styles like a normal element

The old knock on `<details>` was that it looked like a 1998 form control. Not
anymore. You can take the default triangle off and style the marker however you
like.

```css
details {
  border: 1px solid var(--line);
  border-radius: 0.6rem;
  padding: 0 1rem;
}

/* Remove the default disclosure triangle... */
summary {
  list-style: none;
  cursor: pointer;
  padding: 1rem 0;
  font-weight: 600;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
summary::-webkit-details-marker {
  display: none;
}

/* ...and draw your own that rotates when open. */
summary::after {
  content: '+';
  font-size: 1.4rem;
  transition: transform 0.2s ease;
}
details[open] summary::after {
  transform: rotate(45deg);
}
```

The magic selector there is `details[open]`. The element exposes its state as an
attribute in the DOM, so your CSS can react to open/close *without you managing
any state at all*. That's the part people miss: the state is already there to
style against.

## A real FAQ, and an exclusive accordion

Stack a few and you have a FAQ. Give them a shared `name` and the browser
enforces "only one open at a time" — a true accordion, still with no script:

```html
<!-- The shared name makes these mutually exclusive. -->
<details name="faq">
  <summary>Do I need an account?</summary>
  <p>No. You can publish first and claim the URL afterwards.</p>
</details>

<details name="faq">
  <summary>Can I use my own domain?</summary>
  <p>Yes — point a CNAME and it's live in a minute.</p>
</details>
```

## When you *do* need JavaScript

Sometimes you genuinely need to react to the toggle — to lazy-load an image, say,
or fire analytics. There's a clean event for that, and it's far less code than
reimplementing the whole widget:

```js
document.querySelectorAll('details').forEach((d) => {
  d.addEventListener('toggle', () => {
    if (d.open) console.log('opened', d.querySelector('summary').textContent);
  });
});
```

> The best component is the one you didn't have to write, can't ship a bug in,
> and the browser maintains for you forever.

I'm not anti-framework. But before you reach for one to build a thing that opens
and closes, check whether the platform already did it — accessibly, with
keyboard support, in four lines of HTML. More often than you'd think, the answer
is yes, and the most senior move on the table is to delete the component you were
about to write.
