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
- A mailing-list signup (first name + email) that validates and shows a friendly "You're on the list" confirmation, and remembers the visitor on return via localStorage.
- A short "About" blurb in the band's voice with the member lineup.
- A "Booking & press" contact block with email addresses and social links.

**Design & content notes:**

- Moody, coastal, gig-poster mood: a near-black base, a deep teal, and one warm amber accent; a big serif display face (e.g. Fraunces) for headings and a clean sans (e.g. Inter) for body.
- Use realistic content based on my answers — never "lorem ipsum". Invent believable show dates, song descriptions, and bios if I leave gaps.
- Use real images. Pull free photos that fit, e.g.
  `https://picsum.photos/seed/indie-band-1/1200/800` (vary the seed) or Pexels, and add
  descriptive `alt` text.
- No build step — a single `index.html` with a linked CSS and JS file that opens straight in a browser. Make the player actually work (real `<audio>` element); persist the mailing-list state in localStorage.
- Keep it accessible (semantic HTML, labelled form fields, keyboard support including space-to-play, and good contrast).

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="band"></script>
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
