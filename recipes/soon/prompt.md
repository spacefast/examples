Build me a **single-screen "coming soon" teaser page** as a vanilla-JS app
(a single `index.html` plus a small CSS and JS file — no framework, no build step).

**Before you build, ask me these questions in one message and wait for my answers. If I skip anything, choose a sensible default and tell me what you chose:**

1. What's the product name, one-line promise, and intended audience?
2. What's the target launch date, and should the page show an exact date or a
   looser season/month?
3. Where should signups go, and what consent or privacy note belongs beside the
   form? (Give me the form endpoint or mailing-list URL, or say "demo only".)
4. Which contact and social links should appear, if any?

**Then build a complete, polished, responsive single screen with:**

- A small logo mark + product name, a confident serif headline, and the
  one-line promise underneath.
- A **live launch countdown** to the target date — days / hours / minutes /
  seconds, updating every second, with a tidy "Targeting <date>" line. When the
  date passes it should flip to a "We're live" state instead of going negative.
- An email capture with labelled fields and inline validation. Show a waitlist count only when I provide a verified count or a connected service returns it. Never increment it based only on local validation. For any form that sends information, ask for my form endpoint or hosted signup URL. Use the supplied destination and show success only after it confirms receipt. A link to another service does not confirm completion. Without a destination, label the form "Demo only" beside its fields, label its button "Preview", and say "Preview complete. Nothing was sent." Never treat `localStorage` as delivery or store personal form data there.
- An optional waitlist counter from verified data. Omit it when no source is supplied.
- A row of **social links** (X, GitHub, LinkedIn) plus a contact email.

**Design & content notes:**

- Calm, premium, pre-dawn mood: a near-black base with a soft animated
  gradient "aurora" (amber → violet → rose) glowing up from the horizon, a
  frosted-glass card, and a fine film grain. A serif display face (e.g. Fraunces)
  for the headline and a clean sans (e.g. Inter) for everything else.
- Write the product promise from my answers. Omit signup counts unless I provide verified data. Label a fictional product as a demo.
- This page can stand entirely on its CSS gradient atmosphere — no hero photo
  needed. If you do add imagery (e.g. an Open Graph preview), use real free
  photos that fit, e.g. `https://picsum.photos/seed/soon-og/1200/630`, with
  descriptive `alt` text.
- No build step — a single `index.html` with a linked CSS and JS file that opens
  straight in a browser. Drive the countdown from one editable `LAUNCH` date
  constant; make the form actually validate; use the signup destination rule above.
- Keep it accessible (semantic HTML, a labelled email field, a skip link,
  keyboard support, `aria-live` on the countdown and form status, good contrast,
  and a `prefers-reduced-motion` fallback that stills the animation).

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="soon"></script>
```

**When the site is ready, publish it to Spacefast:**

1. Use `./site` as the publish folder. For no-build projects, put only the finished public files in that dedicated folder. Confirm it has `index.html` at its root and no secrets, source files, `.git`, or `.spacefast` state.
2. Fetch https://spacefast.com/setup.md and follow its current direct API publishing instructions. Check for an existing Space before creating one, and follow the returned upload and polling steps.
3. Report success only when `data.next.action` is `done` and the intended version is serving. If more work is needed, report the returned next step.
4. For an anonymous publish, give me `data.claim.message` unchanged. It contains the private preview (`data.claim.url`), the owner's claim link (`data.claim.claimUrl`), and the deadline (`data.claim.expiresAt`). Keep both links private. Never print the separate `data.claim.key`.
5. Keep `data.space.id` and the returned credential securely for updates to the same Space. Follow the guide for credential recovery after claiming. Keep credentials and `.spacefast` state out of the published files, commits, and logs.

If the `sf` CLI is already installed, `sf publish ./site --wait` follows the same publishing flow. See [publishing](https://spacefast.com/docs/publish/) and [claiming a Space](https://spacefast.com/docs/anonymous-and-claim/).
