Build me a **portfolio site for my brand &amp; web design studio** as a vanilla-JS app
(no build step, no framework — just `index.html`, `styles.css`, and a little `app.js`).

**Before you build, ask me these questions in one message and wait for my answers. If I skip anything, choose a sensible default and tell me what you chose:**

1. What's the studio name and your one-line positioning?
2. What disciplines do you offer (branding, web, motion, packaging)?
3. Name 3–4 projects and their clients to feature as work.
4. What's the contact email and where are you based?

**Then build a complete, polished, responsive site with:**

- A bold, full-bleed statement hero — a big confident headline (e.g. "We build brands
  people remember"), a one-line studio description, two calls to action, and a few
  proof-point stats (founded year, brands shipped, team size).
- A **Selected work** section: a project grid where each card has a cover image,
  discipline tags, project name, and a one-line description. Add filter chips
  (All / Branding / Web / Motion) that **toggle the grid in JavaScript**, with a
  graceful empty state.
- A **featured case study** highlight on a dark band — short narrative, a few result
  stats, a client quote, and a **before/after** image you can toggle in JS.
- A **Services** list (brand identity, web design &amp; build, art direction, motion),
  numbered, each with a short description and a tag of sub-deliverables.
- An **About / studio philosophy** section with a couple of paragraphs in the studio's
  voice and a small team grid (photo, name, role).
- A **client logo strip** as a row of wordmarks.
- A contact form with name, email, project type, and message, with inline validation. For any form that sends information, ask for my form endpoint or hosted signup URL. Use the supplied destination and show success only after it confirms receipt. A link to another service does not confirm completion. Without a destination, label the form "Demo only" beside its fields, label its button "Preview", and say "Preview complete. Nothing was sent." Never treat `localStorage` as delivery or store personal form data there.
- A footer with the studio email, social links, and location.

**Design &amp; content notes:**

- Editorial boutique-studio mood: warm paper/cream background, near-black ink, and one
  bold accent (a vermilion/coral). Pair a high-contrast serif display (Fraunces) for
  headlines with a clean grotesque (Space Grotesk) for body. Generous whitespace, a
  thin running marquee of disciplines, subtle hover lifts and image zooms — no slop.
- Use the projects, clients, results, team details, and quotes I provide. Omit client proof without approved facts and attribution. Label fictional case studies as sample work.
- Use real images. Pull free photos that fit, e.g. from
  `https://picsum.photos/seed/northbound-studio-1/1200/800` (vary the seed per image)
  or fitting Unsplash photos of branding mockup flatlays, a design-studio workspace,
  bold typographic posters, and packaging — all with descriptive `alt` text.
- Keep it accessible (semantic HTML, labelled form fields, good contrast, keyboard
  support, a skip link) and mobile-first with a working hamburger menu. Keep filters and before/after controls in plain JS. Use the contact destination rule above.

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="studio"></script>
```

**When the site is ready, publish it to Spacefast:**

1. Use `./site` as the publish folder. For no-build projects, put only the finished public files in that dedicated folder. Confirm it has `index.html` at its root and no secrets, source files, `.git`, or `.spacefast` state.
2. Fetch https://spacefast.com/setup.md and follow its current direct API publishing instructions. Check for an existing Space before creating one, and follow the returned upload and polling steps.
3. Report success only when `data.next.action` is `done` and the intended version is serving. If more work is needed, report the returned next step.
4. For an anonymous publish, give me `data.claim.message` unchanged. It contains the private preview (`data.claim.url`), the owner's claim link (`data.claim.claimUrl`), and the deadline (`data.claim.expiresAt`). Keep both links private. Never print the separate `data.claim.key`.
5. Keep `data.space.id` and the returned credential securely for updates to the same Space. Follow the guide for credential recovery after claiming. Keep credentials and `.spacefast` state out of the published files, commits, and logs.

If the `sf` CLI is already installed, `sf publish ./site --wait` follows the same publishing flow. See [publishing](https://spacefast.com/docs/publish/) and [claiming a Space](https://spacefast.com/docs/anonymous-and-claim/).
