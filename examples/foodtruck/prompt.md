Build me a **mobile-first website for my food truck whose centerpiece is a weekly schedule that auto-highlights where the truck is parked today** as a vanilla-JS app (single `index.html` plus `styles.css` and `app.js` — no build step, no framework).

**Before you build, ask me these questions in one message and wait for my answers. If I skip anything, choose a sensible default and tell me what you chose:**

1. What's the truck's name and cuisine / signature item?
2. What are 3–5 menu items with prices?
3. Where will you be each day this week (day, place, hours)?
4. Instagram handle and a catering contact email?

**Then build a complete, polished, responsive site with:**

- A full-bleed hero with a truck photo, the name big, a tagline, and a **live "We're at … today" banner** that JavaScript fills in from the schedule (and shows "Open now / Opens at … / next stop on …" depending on the current day and time).
- A **"This week's route"** section: a list of day → location → hours, ordered so today comes first and today's row is visually highlighted. Each open day has a one-tap **Directions** link that opens Google Maps to that address. Day-off rows read as closed.
- A **Menu** grouped into tacos, burritos/bowls, sides, and drinks, each item with a price and a one-line description; mark veg options.
- A **Catering / private events** blurb with perks and a **quote-request form** that validates name + email and shows a friendly success state on submit (plus a `mailto:` and `tel:` fallback).
- A **gallery strip** of food/truck photos.
- A footer with contact info and Instagram / TikTok links.

**Design & content notes:**

- Bright, appetizing food-truck mood: warm cream paper background, a bold chili-red primary with gochujang-orange and sesame-gold accents, near-black warm ink for text. Big condensed display type (e.g. Anton) for headings, clean Inter for body.
- Use realistic content based on my answers — never "lorem ipsum". Invent believable LA-style stops, menu copy, and prices if I'm vague.
- Use real images. Pull free photos that fit, e.g. `https://picsum.photos/seed/kimchi-taco-truck-1/1200/800` (vary the seed per image), with descriptive `alt` text.
- Put the schedule as data in `app.js` (days indexed Sun=0…Sat=6, open/close as minutes from midnight) and compute "today" + "open now" client-side. Build the Google Maps links with `https://www.google.com/maps/dir/?api=1&destination=`.
- Keep it accessible (semantic HTML, labelled form fields, keyboard support, good contrast) and mobile-first.

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="foodtruck"></script>
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
