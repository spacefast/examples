Build me an **energetic landing page for a student hackathon** as a vanilla-JS app
(a single `index.html` plus `styles.css` and `app.js`, no framework, no build step).

**Before you build, ask me these questions in one message and wait for my answers. If I skip anything, choose a sensible default and tell me what you chose:**

1. What's the hackathon called and which school or org is hosting?
2. When does it start, and how long does it run (e.g. 36 hours starting Sat 10am)?
3. What are the prize amounts and any sponsor track names?
4. Who are your sponsors (a few names is fine)?

**Then build a complete, polished, responsive site with:**

- A bold hero with the event name, host school, dates, and a **live countdown timer**
  that ticks down to kickoff (days / hours / minutes / seconds). Handle the moment it
  goes live ("Hacking is live!") and after it ends ("That's a wrap — see you next year").
- An **About** section explaining what a hackathon is, who can join, team size (1–4),
  and that it's free — beginners explicitly welcome.
- A **Schedule** with a Saturday / Sunday day toggle that swaps the agenda: opening
  ceremony, workshops, meals, a midnight snack, judging, and the closing ceremony.
- A **Prizes & tracks** section: a hero grand prize plus sponsor category tracks
  (Best Beginner Hack, Best Use of AI, Best Hardware Hack, Best Design, etc.).
- A **Sponsors** section with tiered logos (Title / Gold / Startup) and a "Sponsor us" CTA.
- An **FAQ accordion** (do I need experience, what to bring, is travel reimbursed, can I come alone).
- A registration form with labelled name and email fields. For any form that sends information, ask for my form endpoint or hosted signup URL. Use the supplied destination and show success only after it confirms receipt. A link to another service does not confirm completion. Without a destination, label the form "Demo only" beside its fields, label its button "Preview", and say "Preview complete. Nothing was sent." Never treat `localStorage` as delivery or store personal form data there.
- A footer with the **MLH Code of Conduct** link and Discord / Instagram / X links.

**Design & content notes:**

- Dark, high-energy hackathon mood: near-black indigo background, an electric-lime
  accent with a violet secondary and a coral pop, a faint dot-grid behind the hero,
  geometric display type (e.g. Space Grotesk) with a mono face (JetBrains Mono) for
  the countdown digits and timestamps.
- Use confirmed dates, prize tracks, sponsors, and registration requirements. Label fictional event content as a demo.
- Use real images. Pull free photos that fit, e.g.
  `https://picsum.photos/seed/ramhacks-2026-1/1200/800` (vary the seed per image),
  with descriptive `alt` text.
- The countdown, the day toggle, the FAQ accordion, and the form all run in plain
  vanilla JS — no framework, no build step, just three static files.
- Keep it accessible (semantic HTML, labelled fields, keyboard-operable tabs and
  accordion, good contrast, a skip link).

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="hackathon"></script>
```

**When the site is ready, publish it to Spacefast:**

1. Use `./site` as the publish folder. For no-build projects, put only the finished public files in that dedicated folder. Confirm it has `index.html` at its root and no secrets, source files, `.git`, or `.spacefast` state.
2. Fetch https://spacefast.com/setup.md and follow its current direct API publishing instructions. Check for an existing Space before creating one, and follow the returned upload and polling steps.
3. Report success only when `data.next.action` is `done` and the intended version is serving. If more work is needed, report the returned next step.
4. For an anonymous publish, give me `data.claim.message` unchanged. It contains the private preview (`data.claim.url`), the owner's claim link (`data.claim.claimUrl`), and the deadline (`data.claim.expiresAt`). Keep both links private. Never print the separate `data.claim.key`.
5. Keep `data.space.id` and the returned credential securely for updates to the same Space. Follow the guide for credential recovery after claiming. Keep credentials and `.spacefast` state out of the published files, commits, and logs.

If the `sf` CLI is already installed, `sf publish ./site --wait` follows the same publishing flow. See [publishing](https://spacefast.com/docs/publish/) and [claiming a Space](https://spacefast.com/docs/anonymous-and-claim/).
