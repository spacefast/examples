Build me a **single-page website for my barbershop** as a plain HTML & CSS site (no
build step, no framework — just `index.html`, `styles.css`, and a little `script.js`).

**Before you build, ask me these questions in one message and wait for my answers. If I skip anything, choose a sensible default and tell me what you chose:**

1. What's the shop name and style (e.g. "old-school straight-razor, modern fades")?
2. What services and prices do you offer?
3. Who are your barbers and what's each one known for?
4. What's your address, hours, and online booking link (or phone)?

**Then build a complete, polished, responsive one-pager with:**

- A full-bleed hero with a shop-interior photo, the name big, a short tagline, and a
  prominent "Book a chair" button.
- A "Services & prices" section as a clean grid (cut, skin fade, beard trim,
  hot-towel straight-razor shave, full service, buzz, kids', senior), each with a
  price and a one-line description. Highlight one as the house favorite.
- A "Meet the barbers" section with a photo, name, chair number, specialty chips, and
  a short bio for each barber.
- A gallery of cuts and shop atmosphere (a tidy masonry-style grid).
- A "Hours & location" block: the week's hours with **today highlighted** and a live
  "Open now / Closed" status computed in JS, a walk-in policy note, address, phone,
  and transit directions.
- A booking form (name, phone, service, barber, preferred time) that validates and
  shows a friendly, personalized "You're on the books" success state — no backend.
- A footer with phone, directions, booking link, and socials.

**Design & content notes:**

- Masculine, classic-meets-modern barbershop mood: near-black charcoal background,
  warm cream paper, one brass/amber accent. Condensed uppercase display type
  (Oswald) for headings, clean sans (Inter) for body. Subtle hover lifts, no slop.
- Use realistic content based on my answers — never "lorem ipsum". Invent believable
  barber names, bios, prices, and a couple of real-sounding reviews.
- Use real images. Pull free photos that fit, e.g. grayscale shots from
  `https://picsum.photos/seed/ironclad-barbershop-1/1200/800?grayscale` (vary the
  seed per image) or fitting Unsplash photos of a barbershop interior, a fade
  in progress, a hot-towel shave, and a classic barber pole — all with descriptive
  `alt` text.
- Keep it accessible (semantic HTML, labelled form fields, good contrast, keyboard
  support, a skip link) and mobile-first with a working hamburger menu.

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="barber"></script>
```

**When the site is ready, publish it to Spacefast with the direct API — no account, install, or extra instructions needed:**

1. Use `./site` as the publish folder. For no-build projects, put only the finished public files in that dedicated folder. Confirm it has `index.html` at its root and no secrets, source files, `.git`, or `.spacefast` state.
2. First publish: send every file as multipart form data. This Bash/Zsh block preserves relative paths and works for one file or a whole folder:
   ```bash
   PUBLISH_ROOT=./site
   publish_files=()
   while IFS= read -r -d "" file; do
     relative=${file#"$PUBLISH_ROOT"/}
     publish_files+=(-F "files=@$file;filename=$relative")
   done < <(find "$PUBLISH_ROOT" -type f -print0)
   curl -sS "${publish_files[@]}" "https://api.spacefast.com/v1/publish?wait=1"
   ```
3. From the `{ "data": ... }` receipt, give me `data.space.liveUrl`, `data.version.immutableUrl`, `data.claim.url`, and `data.claim.expiresAt`. Remind me to claim within 6 hours. Keep `data.claim.token` secret.
4. Save `data.space.id` and `data.claim.token` locally (for example in an ignored, mode-600 `.spacefast/state.json`). For a quick update, rebuild the `publish_files` array above and publish to the same space:
   ```bash
   SPACEFAST_SPACE_ID=<saved-space-id>
   SPACEFAST_TOKEN=<saved-claim-token-or-access-token>
   curl -sS -H "Authorization: Bearer $SPACEFAST_TOKEN" \
     -F "spaceId=$SPACEFAST_SPACE_ID" "${publish_files[@]}" \
     "https://api.spacefast.com/v1/publish?wait=1"
   ```
   If an update after claiming returns `space_claimed_credential_available`, exchange the saved claim token once at `POST https://api.spacefast.com/v1/anonymous-claim/exchange`, save `data.credential.accessToken`, and retry with that access token.

**Optional shortcuts and reference only:** if the `sf` CLI is already installed, `sf publish ./site --wait` does the same job. A zip of the publish folder is also supported, but neither the CLI nor a zip is required. Docs: [direct agent/API publishing](https://spacefast.com/docs/agents) · [files and folders](https://spacefast.com/docs/publishing) · [claiming](https://spacefast.com/docs/anonymous-publish) · [updates and rollback](https://spacefast.com/docs/rollback)
