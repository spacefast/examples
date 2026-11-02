Build me a **quiet, dignified memorial tribute page for someone I've lost** as a
plain HTML & CSS site (a single `index.html`, no framework and no build step).

**Before you build, ask me these questions in one message and wait for my answers. If I skip anything, choose a sensible default and tell me what you chose:**

1. Whose memorial is this — their full name, the years (born–passed), and a short epitaph or line they lived by?
2. Share a short life story (a paragraph or two is plenty) and 5–6 photos or moments worth featuring.
3. What service or celebration details should I include — date, time, place, reception, live stream, and any donation request in lieu of flowers?
4. Should visitors be able to leave memories, and if so should entries stay on
   this device, be sent somewhere for review, or link to an existing guestbook?

**Then build a complete, polished, responsive site with:**

- A serene **hero**: a framed portrait, their name, the years, and the epitaph centered beneath a thin gold rule.
- A **life story** section: flowing prose with a drop cap and one pull-quote, followed by a simple vertical timeline of life milestones.
- A **photo gallery**: a responsive grid of photographs that open in a click-to-enlarge lightbox with captions, keyboard navigation (arrow keys, Escape), and previous/next buttons.
- A **service & celebration** block: cards for the memorial service, the reception, and a live-stream note (date, time, address, and a "directions" link each), plus an "in lieu of flowers" donation card.
- A memory wall with memories supplied by the family. Let visitors save a name and memory on this device with a note beside the form: "Memories saved here stay in this browser. They are not shared with the family or other visitors." Confirm with "Saved in this browser only." Link to a shared guestbook if I provide one.
- A soft footer with the name, the years, and a single candle motif.

**Design & content notes:**

- Tone is everything: warm and calm, never clinical. Use an ivory/cream base, soft sage green and a muted gold accent, and deep warm-charcoal text. Pair an elegant serif display face (e.g. Cormorant Garamond) for headings with a readable serif (e.g. EB Garamond) for body text.
- Render the portrait and gallery photographs in soft black-and-white so any source images feel like timeless family archives.
- Use only the life details, photographs, quotes, and memories supplied or approved by the family. Leave missing details out. Never invent a memory or life event.
- Use real images. Pull free photos that fit, e.g. from picsum (`https://picsum.photos/seed/memorial-1/1200/800?grayscale`, varying the seed) or Unsplash (`soft floral arrangement`, `candle warm memorial light`), and add descriptive `alt` text.
- No build step — a single `index.html` with embedded CSS and a small script. Make the lightbox and the memory-wall form genuinely work; persist memories in `localStorage`.
- Keep it accessible (semantic HTML, labelled form fields, keyboard support, focus management in the lightbox, good contrast) and respect `prefers-reduced-motion`.

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="memorial"></script>
```

**When the site is ready, publish it to Spacefast:**

1. Use `./site` as the publish folder. For no-build projects, put only the finished public files in that dedicated folder. Confirm it has `index.html` at its root and no secrets, source files, `.git`, or `.spacefast` state.
2. Fetch https://spacefast.com/setup.md and follow its current direct API publishing instructions. Check for an existing Space before creating one, and follow the returned upload and polling steps.
3. Report success only when `data.next.action` is `done` and the intended version is serving. If more work is needed, report the returned next step.
4. For an anonymous publish, give me `data.claim.message` unchanged. It contains the private preview (`data.claim.url`), the owner's claim link (`data.claim.claimUrl`), and the deadline (`data.claim.expiresAt`). Keep both links private. Never print the separate `data.claim.key`.
5. Keep `data.space.id` and the returned credential securely for updates to the same Space. Follow the guide for credential recovery after claiming. Keep credentials and `.spacefast` state out of the published files, commits, and logs.

If the `sf` CLI is already installed, `sf publish ./site --wait` follows the same publishing flow. See [publishing](https://spacefast.com/docs/publish/) and [claiming a Space](https://spacefast.com/docs/anonymous-and-claim/).
