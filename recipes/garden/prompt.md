Build me a **one-page website for my neighborhood community garden** as plain HTML &
CSS with a touch of vanilla JavaScript (no build step, no framework — just an
`index.html`, a stylesheet, and a small script).

**Before you build, ask me these questions in one message and wait for my answers. If I skip anything, choose a sensible default and tell me what you chose:**

1. What's the garden's name and which neighborhood or street is it on?
2. What plot sizes do you rent and what's the annual fee for each?
3. How many volunteer hours are members expected to contribute (e.g. 2 hours/month)?
4. What's the best contact email or person for the waitlist?

**Then build a complete, polished, responsive one-pager with:**

- A full-bleed **hero**: the garden's name big over a sunny raised-beds photo, the
  neighborhood and "since {year}" as a tagline, and two buttons — "Join the plot
  waitlist" and "See plots & pricing".
- An **About** section: the garden's mission and a short origin story (an empty lot
  turned into beds), who tends it (volunteer-run, a steering committee), and a little
  stat strip (number of beds, member households, volunteer hours, % organic).
- A **Plots & pricing** section: a card per bed size (e.g. 4×4, 4×8, 4×12, plus a
  waist-high accessible bed) with dimensions, the annual fee, and a one-line pitch —
  flag the most popular — followed by an "every plot includes" list (water, shared
  tools, compost, seed library, gate access) and a quiet note about a scholarship
  fund.
- A waitlist signup form with name, email, street, preferred bed size, and an optional note. Show a response-time policy only if I provide one. For any form that sends information, ask for my form endpoint or hosted signup URL. Use the supplied destination and show success only after it confirms receipt. A link to another service does not confirm completion. Without a destination, label the form "Demo only" beside its fields, label its button "Preview", and say "Preview complete. Nothing was sent." Never treat `localStorage` as delivery or store personal form data there.
- A **Volunteer workdays** section: explain the required hours, list the ways to
  contribute, and show a live "next drop-in workday" badge computed in the browser
  (e.g. the 2nd Saturday of the month, 9 am–12 pm).
- A **Garden rules** section: five or six friendly rule cards — organic-only, tend
  your plot, share the commons, be a good neighbor, water wisely, log your hours.
- An **Events** section: a dated list of seasonal events — a seed swap, a spring
  kickoff, summer potlucks, and a harvest festival — each with a date chip, time, and
  a sentence of flavor.
- A **Find us** section: address, gate-access notes (members keyed in, visitors
  welcome on workdays, accessible entrance), an embedded Google map, and a "Get
  directions" button.
- A **photo gallery** of the beds across the seasons as a responsive grid, where
  tapping a photo opens it larger in a lightbox (keyboard + arrow-key navigation, Esc
  to close).
- A **footer** with the address, email, quick links, and Instagram / email / map
  icons.

**Design & content notes:**

- Warm, growing mood: deep leaf-green and soil-brown with a terracotta accent and a
  touch of sun-gold, all on a cream-paper background. A friendly serif (e.g. Fraunces)
  for headings and the brand, a clean sans (e.g. Inter) for body. Small leaf/sprout
  flourishes are welcome.
- Use my supplied plot descriptions, history, events, fees, and coordinator details. Ask about missing dates instead of inventing them.
- Use real images. Pull free photos that fit, e.g.
  `https://picsum.photos/seed/community-garden-1/1200/800` (vary the seed) or Pexels,
  with descriptive `alt` text. Good search terms: community garden raised beds
  vegetables volunteers; hands planting seedlings in soil close up; ripe tomatoes and
  leafy greens garden harvest; community potluck outdoor table garden.
- No build step — a single `index.html` plus a `styles.css` and a small `app.js`.
  Keep the JavaScript a progressive enhancement (the page must read fine if JS
  doesn't run); the only thing it persists is the visitor's own "I joined" flag.
- Keep it accessible (semantic HTML, labelled form fields, keyboard support for the
  form and lightbox, good contrast, respects reduced-motion).

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="garden"></script>
```

**When the site is ready, publish it to Spacefast:**

1. Use `./site` as the publish folder. For no-build projects, put only the finished public files in that dedicated folder. Confirm it has `index.html` at its root and no secrets, source files, `.git`, or `.spacefast` state.
2. Fetch https://spacefast.com/setup.md and follow its current direct API publishing instructions. Check for an existing Space before creating one, and follow the returned upload and polling steps.
3. Report success only when `data.next.action` is `done` and the intended version is serving. If more work is needed, report the returned next step.
4. For an anonymous publish, give me `data.claim.message` unchanged. It contains the private preview (`data.claim.url`), the owner's claim link (`data.claim.claimUrl`), and the deadline (`data.claim.expiresAt`). Keep both links private. Never print the separate `data.claim.key`.
5. Keep `data.space.id` and the returned credential securely for updates to the same Space. Follow the guide for credential recovery after claiming. Keep credentials and `.spacefast` state out of the published files, commits, and logs.

If the `sf` CLI is already installed, `sf publish ./site --wait` follows the same publishing flow. See [publishing](https://spacefast.com/docs/publish/) and [claiming a Space](https://spacefast.com/docs/anonymous-and-claim/).
