Build me a **typographic home and archive for my curated weekly newsletter** as a
small set of plain HTML & CSS pages (no build step, no framework). It should list
every numbered issue with a one-line blurb and render past issues as clean, readable
web pages with a prominent subscribe form.

**Before you build, ask me these questions in one message and wait for my answers. If I skip anything, choose a sensible default and tell me what you chose:**

1. What's the newsletter's name and a one-line tagline?
2. What topic or niche does it cover?
3. Who's the author, and what's their short bio?
4. Give me 2–3 recent issue titles with a sentence of what each covered.

**Then build a complete, polished, responsive site with:**

- A **home page**: a short "what it is" intro, a featured/sample issue card, and an
  email subscribe form. Make the value obvious in one screen.
- An **issue archive**: a reverse-chronological list of numbered issues, each with
  its number, date, title, and a one-line summary. Make the rows feel like a real
  back catalogue (a dozen or so), linking to the full issues you write out.
- **Issue pages** (write out the recent ones in full): a numbered, dated header, a
  short intro/essay, a "hand-picked links" list with a sentence on each, and a
  "Tool of the week" callout. Add prev/next navigation between issues.
- An **about page** with the author's photo, bio, the why-behind-the-letter, and a
  couple of honest stats (issues sent, readers, cadence).
- A **subscribe page** with the email capture front-and-centre plus a short, plain
  "fine print" (cadence, privacy, how to leave).

**Design & content notes:**

- Editorial and typography-led: a warm paper background, near-black ink, one
  restrained accent colour, a characterful serif for display (e.g. Fraunces or
  Newsreader), a readable serif for body, and a small mono for labels and dates.
  Think Dense Discovery / The Browser — generous whitespace, real reading hierarchy,
  numbered issues, a drop cap on issue pages.
- Write real, specific copy from my answers — never "lorem ipsum". Invent believable
  issue titles, link blurbs, and a plausible issue number and dates.
- Use real images. Pull free photos that fit, e.g. from Picsum
  (`https://picsum.photos/seed/newsletter-issue-1/1200/800`, varying the seed), for the
  sample issue, issue headers, and an author portrait — all with descriptive `alt`
  text matching: minimal desk workspace flatlay, stack of design books on a table,
  abstract textured paper background, author portrait at desk window light.
- A subscribe form with a labelled email field and inline validation. For any form that sends information, ask for my form endpoint or hosted signup URL. Use the supplied destination and show success only after it confirms receipt. A link to another service does not confirm completion. Without a destination, label the form "Demo only" beside its fields, label its button "Preview", and say "Preview complete. Nothing was sent." Never treat `localStorage` as delivery or store personal form data there.
- Keep it accessible (semantic HTML, a skip link, labelled fields, keyboard support,
  good contrast).

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="newsletter"></script>
```

**When the site is ready, publish it to Spacefast:**

1. Use `./site` as the publish folder. For no-build projects, put only the finished public files in that dedicated folder. Confirm it has `index.html` at its root and no secrets, source files, `.git`, or `.spacefast` state.
2. Fetch https://spacefast.com/setup.md and follow its current direct API publishing instructions. Check for an existing Space before creating one, and follow the returned upload and polling steps.
3. Report success only when `data.next.action` is `done` and the intended version is serving. If more work is needed, report the returned next step.
4. For an anonymous publish, give me `data.claim.message` unchanged. It contains the private preview (`data.claim.url`), the owner's claim link (`data.claim.claimUrl`), and the deadline (`data.claim.expiresAt`). Keep both links private. Never print the separate `data.claim.key`.
5. Keep `data.space.id` and the returned credential securely for updates to the same Space. Follow the guide for credential recovery after claiming. Keep credentials and `.spacefast` state out of the published files, commits, and logs.

If the `sf` CLI is already installed, `sf publish ./site --wait` follows the same publishing flow. See [publishing](https://spacefast.com/docs/publish/) and [claiming a Space](https://spacefast.com/docs/anonymous-and-claim/).
