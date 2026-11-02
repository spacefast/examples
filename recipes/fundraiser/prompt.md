Build me a **one-page fundraising campaign site for a local cause** as a vanilla-JS app
(a single `index.html` plus a small CSS and JS file — no framework, no build step).

**Before you build, ask me these questions in one message and wait for my answers. If I skip anything, choose a sensible default and tell me what you chose:**

1. What's the cause and who does it help? (Give me a name, a one-line summary, and a few sentences of story.)
2. What's the goal amount and how much is raised so far — and when does the campaign end?
3. What payment link should the "Donate" button use (Stripe / PayPal / GoFundMe / etc.)? If you don't have one yet, leave it as a demo button.
4. List a handful of real donors (name + amount, optional short note) to seed the donor wall, and a 4–6 line budget breakdown of where the money goes.

**Then build a complete, polished, responsive site with:**

- A **hero** with a striking community photo, the cause name, a short emotional lede, and the fundraising summary pinned right there.
- An **animated progress bar** that fills from 0% to the current total on load, with the dollars raised, the goal, the percentage, the donor count, and the days left — all computed, not hard-coded into the markup.
- A **cause story** section in a warm, human voice, a pull-quote from an organizer, a "where the money goes" budget panel, and a small photo gallery.
- A **"ways to give"** row of suggested amounts (each one opens the donate form pre-filled).
- A donation button using my payment link. If I provide none, show a button labelled "Demo donation" and a preview modal. Say "Demo complete. No payment was made." Do not increase real campaign totals or add a donor without verified payment confirmation. Keep any simulated totals in a separate, clearly labelled demo.
- A **donor wall**: a grid of donor cards (colored initials avatar, name, note, amount), using confirmed donations only.
- A **share** section: a "copy link" button that actually copies and confirms, plus pre-filled X / Facebook / email share links.
- A footer with the org name, a contact email, and the nonprofit fine print.

**Design & content notes:**

- Warm, hand-made, community-grant mood: a cream paper base, a confident coral primary, a deep teal, and a harvest-gold accent. A characterful serif (e.g. Fraunces) for headings, a clean sans (e.g. Inter) for body. Soft rounded cards, a slightly tilted hero photo, gentle motion.
- Use only confirmed campaign totals, donors who consented to be named, organizer quotes, and budget details. Omit missing claims. A fictional campaign must be labelled as a demo throughout.
- Use real images. Pull free photos that fit, e.g.
  `https://picsum.photos/seed/community-mural-1/1200/800` (vary the seed) or Pexels, and add
  descriptive `alt` text. Good search terms: community mural painting, volunteers neighborhood project.
- No build step — a single `index.html` with a linked CSS and JS file that opens straight in a browser. Make the progress bar and donor math real: derive everything from a small config object (goal, base raised, end date, seed donors) so the numbers stay honest. Use my payment link for donations, or keep simulated donations clearly labelled as a demo.
- Keep it accessible (semantic HTML, labelled form fields, an `aria` live region on the donor wall, keyboard support, Escape closes the modal, and good contrast). Respect `prefers-reduced-motion`.

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="fundraiser"></script>
```

**When the site is ready, publish it to Spacefast:**

1. Use `./site` as the publish folder. For no-build projects, put only the finished public files in that dedicated folder. Confirm it has `index.html` at its root and no secrets, source files, `.git`, or `.spacefast` state.
2. Fetch https://spacefast.com/setup.md and follow its current direct API publishing instructions. Check for an existing Space before creating one, and follow the returned upload and polling steps.
3. Report success only when `data.next.action` is `done` and the intended version is serving. If more work is needed, report the returned next step.
4. For an anonymous publish, give me `data.claim.message` unchanged. It contains the private preview (`data.claim.url`), the owner's claim link (`data.claim.claimUrl`), and the deadline (`data.claim.expiresAt`). Keep both links private. Never print the separate `data.claim.key`.
5. Keep `data.space.id` and the returned credential securely for updates to the same Space. Follow the guide for credential recovery after claiming. Keep credentials and `.spacefast` state out of the published files, commits, and logs.

If the `sf` CLI is already installed, `sf publish ./site --wait` follows the same publishing flow. See [publishing](https://spacefast.com/docs/publish/) and [claiming a Space](https://spacefast.com/docs/anonymous-and-claim/).
