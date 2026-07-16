Build me a **one-page website for my neighborhood ramen shop** as plain HTML & CSS
with a touch of vanilla JavaScript (no build step, no framework — just an
`index.html`, a stylesheet, and a small script).

**Before you build, ask me these questions in one message and wait for my answers. If I skip anything, choose a sensible default and tell me what you chose:**

1. What's the shop's name and one-line vibe (e.g. "rich 18-hour tonkotsu, counter seating")?
2. What's your signature ramen plus 3–4 other menu items with prices?
3. What neighborhood/address are you in and what are your weekly hours?
4. Phone number and any Instagram or reservation link?

**Then build a complete, polished, responsive one-pager with:**

- A full-bleed hero: a big steaming bowl of tonkotsu behind the shop name, a short
  appetizing tagline, and two buttons — "View the menu" and "Find us & hours".
- A **menu** section grouped into Ramen, Small Plates / Gyoza, and Rice Bowls &
  Drinks, each item with a name, a one-line description, and a price (use a dotted
  leader line between name and price like a real menu). Star the house favorite and
  pull the signature bowl out into a featured card with its own photo. Include a
  small "build your bowl" toppings list with add-on prices.
- An **"Our Story"** section about the broth — who the chef is, how long the
  tonkotsu simmers, why the room feels the way it does — with a photo and a signature.
- A **photo gallery** of dishes and the room as a responsive grid, where tapping a
  photo opens it larger in a lightbox (keyboard + arrow-key navigation, Esc to close).
- A **Hours + Location** section: a styled hours table that highlights _today_ and
  shows a live "Open now / Closed now · opens at…" badge computed in the browser, the
  full address, an embedded Google map, and a "Get directions" button.
- A **footer** with phone, email, a "walk-ins only / call ahead for big parties"
  reservations note, and Instagram / TikTok / map links.

**Design & content notes:**

- Warm izakaya mood: near-black charcoal-brown, washi-paper cream, one bold
  persimmon-red accent and a soft lantern-gold. An elegant serif (e.g. Shippori
  Mincho) for headings and the brand, a clean sans (e.g. Inter) for body. A small
  kanji/lantern flourish is welcome.
- Use realistic content based on my answers — never "lorem ipsum". Invent believable
  dish descriptions, a chef backstory, and plausible hours.
- Use real images. Pull free photos that fit, e.g.
  `https://picsum.photos/seed/ramen-1/1200/800` (vary the seed) or Pexels, with
  descriptive `alt` text. Good search terms: tonkotsu ramen bowl chashu soft egg
  overhead; steaming ramen bowl dark moody close up; pork gyoza dumplings on plate;
  japanese ramen shop interior wood counter lanterns.
- No build step — a single `index.html` plus a `styles.css` and a small `app.js`.
  Keep the JavaScript a progressive enhancement (the page must read fine if JS
  doesn't run) and persist nothing — it's a static site.
- Keep it accessible (semantic HTML, labelled controls, keyboard support for the
  menu and lightbox, good contrast, respects reduced-motion).

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="menu"></script>
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
