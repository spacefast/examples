Build me a **themed party invite — a one-page site with the occasion, the details,
a map, and a real RSVP form** as an **Astro site** (a small static project, no SSR,
just `astro build` to a `dist/` folder).

**Before you build, ask me these questions in one message and wait for my answers. If I skip anything, choose a sensible default and tell me what you chose:**

1. What's the occasion, who's hosting, and what mood should the invitation set
   (playful, black-tie, backyard cookout, or something else)?
2. What's the date, time, venue, full address, and weather backup plan?
3. What should guests know about dress, food, gifts, parking, or accessibility?
4. Where should RSVPs go, and which details should the form collect (guest count,
   +1 name, dietary needs, song request, or a note when someone can't attend)?

**Then build a complete, polished, responsive site with:**

- A full-screen **hero**: the guest of honor's name big, the occasion, date/time and venue, a live **countdown** ticking down to the party, and a gentle confetti animation.
- A **details** section: the dress code shown front and centre, plus a tidy card grid for the practical stuff (food, drinks, gifts, weather plan) and a short personal note from the host.
- A **run-of-show timeline**: what happens when — doors, toast, dinner, cake, dancing, last song.
- A **map + directions** block: an embedded Google Map of the venue, an "open in Maps" button, and written directions (transit, parking/rideshare, how to find the door).
- An RSVP form with name, email, accept or decline, guest count, an optional guest name, dietary needs, and a song request. Let declining guests leave the host a note. For any form that sends information, ask for my form endpoint or hosted signup URL. Use the supplied destination and show success only after it confirms receipt. A link to another service does not confirm completion. Without a destination, label the form "Demo only" beside its fields, label its button "Preview", and say "Preview complete. Nothing was sent." Never treat `localStorage` as delivery or store personal form data there.

**Design & content notes:**

- Festive late-night mood: a midnight-plum night sky, warm string-light glow, a neon magenta primary with a party-gold accent and a touch of electric cyan. A rounded display face (e.g. Unbounded) for headings and a clean sans (e.g. Plus Jakarta Sans) for body.
- Use realistic content based on my answers — never "lorem ipsum". Invent a believable schedule, dress-code note, and directions if I leave gaps.
- Use real images. Pull free photos that fit, e.g. `https://picsum.photos/seed/party-rooftop/1800/1200` (vary the seed) or Unsplash photos of festive party balloons, confetti, and a rooftop celebration with string lights, and add descriptive `alt` text.
- Keep all the content in one `src/data/party.ts` file so changing a single detail updates the whole page. Make the countdown and the RSVP form genuinely work; respect `prefers-reduced-motion` for the confetti.
- Keep it accessible (semantic HTML, labelled form fields, keyboard support, visible focus rings, and good contrast on the dark background).

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="party"></script>
```

**When the site is ready, publish it to Spacefast:**

1. Use `./dist` as the publish folder. For no-build projects, put only the finished public files in that dedicated folder. Confirm it has `index.html` at its root and no secrets, source files, `.git`, or `.spacefast` state.
2. Fetch https://spacefast.com/setup.md and follow its current direct API publishing instructions. Check for an existing Space before creating one, and follow the returned upload and polling steps.
3. Report success only when `data.next.action` is `done` and the intended version is serving. If more work is needed, report the returned next step.
4. For an anonymous publish, give me `data.claim.message` unchanged. It contains the private preview (`data.claim.url`), the owner's claim link (`data.claim.claimUrl`), and the deadline (`data.claim.expiresAt`). Keep both links private. Never print the separate `data.claim.key`.
5. Keep `data.space.id` and the returned credential securely for updates to the same Space. Follow the guide for credential recovery after claiming. Keep credentials and `.spacefast` state out of the published files, commits, and logs.

If the `sf` CLI is already installed, `sf publish ./dist --wait` follows the same publishing flow. See [publishing](https://spacefast.com/docs/publish/) and [claiming a Space](https://spacefast.com/docs/anonymous-and-claim/).
