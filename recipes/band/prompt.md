Build me a **bold, full-bleed one-page website for my band** as a vanilla-JS app
(a single `index.html` plus a small CSS and JS file — no framework, no build step).

**Before you build, ask me these questions in one message and wait for my answers. If I skip anything, choose a sensible default and tell me what you chose:**

1. What's your band name and genre, and the one-line vibe you want the hero to say?
2. What's your latest single or release, and where can people stream it (Spotify/Apple/Bandcamp links)?
3. List 3–5 upcoming shows (city, venue, date) — or say you have none yet and we'll show a "tour TBA" state.
4. Give me 2–3 merch items with names and prices, plus 3 song titles for the music section.

**Then build a complete, polished, responsive site with:**

- A full-bleed hero with the band photo, the band name big, a logo mark, and the latest-single tagline.
- A **sticky bottom audio player** that streams the new single — play/pause, a seek bar with elapsed/total time, and previous/next track buttons. Clicking any song in the music list loads it into the player.
- A "Music" section: the songs as a clickable tracklist, plus links out to Spotify / Apple Music / Bandcamp / YouTube.
- A "Tour" section: each show with city, venue, date, and a ticket button — including "Sold out" and "Few left" states.
- A merch shelf (vinyl, tee, tote) with photo, description, price, and a buy button.
- A mailing-list signup with first name and email. For any form that sends information, ask for my form endpoint or hosted signup URL. Use the supplied destination and show success only after it confirms receipt. A link to another service does not confirm completion. Without a destination, label the form "Demo only" beside its fields, label its button "Preview", and say "Preview complete. Nothing was sent." Never treat `localStorage` as delivery or store personal form data there.
- A short "About" blurb in the band's voice with the member lineup.
- A "Booking & press" contact block with email addresses and social links.

**Design & content notes:**

- Moody, coastal, gig-poster mood: a near-black base, a deep teal, and one warm amber accent; a big serif display face (e.g. Fraunces) for headings and a clean sans (e.g. Inter) for body.
- Use my actual shows, songs, band members, and ticket links. Show "Tour dates to be announced" for missing dates. Never invent availability or artist history.
- Use real images. Pull free photos that fit, e.g.
  `https://picsum.photos/seed/indie-band-1/1200/800` (vary the seed) or Pexels, and add
  descriptive `alt` text.
- No build step — a single `index.html` with a linked CSS and JS file that opens straight in a browser. Make the player actually work (real `<audio>` element); use the signup destination rule above.
- Keep it accessible (semantic HTML, labelled form fields, keyboard support including space-to-play, and good contrast).

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="band"></script>
```

**When the site is ready, publish it to Spacefast:**

1. Use `./site` as the publish folder. For no-build projects, put only the finished public files in that dedicated folder. Confirm it has `index.html` at its root and no secrets, source files, `.git`, or `.spacefast` state.
2. Fetch https://spacefast.com/setup.md and follow its current direct API publishing instructions. Check for an existing Space before creating one, and follow the returned upload and polling steps.
3. Report success only when `data.next.action` is `done` and the intended version is serving. If more work is needed, report the returned next step.
4. For an anonymous publish, give me `data.claim.message` unchanged. It contains the private preview (`data.claim.url`), the owner's claim link (`data.claim.claimUrl`), and the deadline (`data.claim.expiresAt`). Keep both links private. Never print the separate `data.claim.key`.
5. Keep `data.space.id` and the returned credential securely for updates to the same Space. Follow the guide for credential recovery after claiming. Keep credentials and `.spacefast` state out of the published files, commits, and logs.

If the `sf` CLI is already installed, `sf publish ./site --wait` follows the same publishing flow. See [publishing](https://spacefast.com/docs/publish/) and [claiming a Space](https://spacefast.com/docs/anonymous-and-claim/).
