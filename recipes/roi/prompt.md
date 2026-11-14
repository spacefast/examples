Build me a **B2B ROI / savings calculator landing page** — a marketing page where a
visitor enters a couple of numbers about their team and instantly sees how much my
product would save them, with a chart and a "email me the report" lead-capture CTA —
as a **vanilla-JS app** (a single `index.html` plus a small CSS and JS file, no
framework and no build step).

**Before you build, ask me these questions in one message and wait for my answers. If I skip anything, choose a sensible default and tell me what you chose:**

1. What does your product save customers — time, money, or both — and what's the product called?
2. What are the 2–3 input variables a visitor types in, and the formula that turns them into savings? (e.g. "monthly support spend, team size, and ticket volume → we auto-resolve 42% of tickets at the current cost-per-ticket, minus a $49/agent fee")
3. What's the lead-capture CTA at the end — what do they get for handing over an email (a PDF report, a demo, a custom quote)?
4. Any brand details — product name, accent color, a one-line value prop, and a customer quote I can show?

**Then build a complete, polished, responsive site with:**

- A compact hero: value-prop headline, sub-copy, three proof stats, and a "calculate my savings" button that scrolls to the tool.
- The **calculator** as the centerpiece: a two-column layout with the inputs on the left (each a labelled number field paired with a synced range slider) and a live results panel on the right.
- A **live results panel** that recomputes on every keystroke or slider drag: a big headline "net savings, year one" number, plus a stat grid (net savings / month, hours or units reclaimed, payback period, return multiple).
- A **before/after bar chart** (cost today vs cost with the product) and a **cumulative-savings area chart** across 12 months — both drawn in inline SVG, no chart library, animated when values change.
- A "where the savings come from" section: three numbered steps that explain the model honestly, so the number feels earned, not hand-wavy.
- A lead form with name, work email, and company, alongside the calculated savings. Offer a local report download when no email delivery service is configured. Say "Download your estimate" instead of claiming an email was sent. For any form that sends information, ask for my form endpoint or hosted signup URL. Use the supplied destination and show success only after it confirms receipt. A link to another service does not confirm completion. Without a destination, label the form "Demo only" beside its fields, label its button "Preview", and say "Preview complete. Nothing was sent." Never treat `localStorage` as delivery or store personal form data there.
- A social-proof strip (customer logos + one testimonial with a headshot) and a footer.

**Design & content notes:**

- Modern B2B SaaS look: a light slate background, white cards with soft shadows, a
  confident indigo→violet brand gradient, and a single emerald accent reserved for
  savings/positive numbers. Use a geometric display face (e.g. Sora) for headings and
  Inter for body. Round the corners, keep generous whitespace.
- Use my formula and sourced customer claims. Omit logos and testimonials without permission and exact quotes. Label default inputs as examples and show the assumptions behind every estimate.
- Make the math real and defensible: clamp the inputs to sane ranges, format currency
  with `Intl.NumberFormat`, animate the result numbers, and keep the assumptions
  (deflection rate, per-seat price) visible near the inputs with a "reset to a typical
  team" link.
- Use real images. Pull free photos that fit, e.g.
  `https://picsum.photos/seed/roi-1/1200/800` (vary the seed), and add descriptive `alt` text. Give
  each image an `onerror` fallback so it never shows a broken icon.
- No build step — a single `index.html` with a linked CSS and JS file that opens
  straight in a browser. Draw both charts as inline SVG with no external libraries.
- Keep it accessible: semantic HTML, a `<label>` for every field, an `aria-live`
  results region, keyboard-operable sliders, visible focus states, and good contrast.
  Respect `prefers-reduced-motion` for the number tweens and chart animation.

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="roi"></script>
```

**When the site is ready, publish it to Spacefast:**

1. Use `./site` as the publish folder. For no-build projects, put only the finished public files in that dedicated folder. Confirm it has `index.html` at its root and no secrets, source files, `.git`, or `.spacefast` state.
2. Fetch https://spacefast.com/setup.md and follow its current direct API publishing instructions. Check for an existing Space before creating one, and follow the returned upload and polling steps.
3. Report success only when `data.next.action` is `done` and the intended version is serving. If more work is needed, report the returned next step.
4. For an anonymous publish, give me `data.claim.message` unchanged. It contains the private preview (`data.claim.url`), the owner's claim link (`data.claim.claimUrl`), and the deadline (`data.claim.expiresAt`). Keep both links private. Never print the separate `data.claim.key`.
5. Keep `data.space.id` and the returned credential securely for updates to the same Space. Follow the guide for credential recovery after claiming. Keep credentials and `.spacefast` state out of the published files, commits, and logs.

If the `sf` CLI is already installed, `sf publish ./site --wait` follows the same publishing flow. See [publishing](https://spacefast.com/docs/publish/) and [claiming a Space](https://spacefast.com/docs/anonymous-and-claim/).
