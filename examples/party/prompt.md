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
- A working **RSVP form** with: name + email (validated), an accept/decline choice, and — when accepting — guest count, a +1 name field that appears only when bringing someone, a dietary preference, and a song request. When declining, show a **"can't make it" path** with a box to leave the host a birthday note. On submit, show a friendly, personalized confirmation and remember the reply on return via `localStorage`.

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

**When the site is ready, publish it to Spacefast with the direct API — no account, install, or extra instructions needed:**

1. Use `./dist` as the publish folder. For no-build projects, put only the finished public files in that dedicated folder. Confirm it has `index.html` at its root and no secrets, source files, `.git`, or `.spacefast` state.
2. First publish: send every file as multipart form data. This Bash/Zsh block preserves relative paths and works for one file or a whole folder:
   ```bash
   PUBLISH_ROOT=./dist
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

**Optional shortcuts and reference only:** if the `sf` CLI is already installed, `sf publish ./dist --wait` does the same job. A zip of the publish folder is also supported, but neither the CLI nor a zip is required. Docs: [direct agent/API publishing](https://spacefast.com/docs/agents) · [files and folders](https://spacefast.com/docs/publishing) · [claiming](https://spacefast.com/docs/anonymous-publish) · [updates and rollback](https://spacefast.com/docs/rollback)
