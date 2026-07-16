Build me a **single-property listing microsite for a home that's for sale** as a
Vite + React app.

**Before you build, ask me these questions in one message and wait for my answers. If I skip anything, choose a sensible default and tell me what you chose:**

1. What's the property address, list price, and beds/baths/square footage?
2. What are 4–6 standout features (e.g. "chef's kitchen, ocean-view primary suite, pool")?
3. Who's the listing agent — name, brokerage, phone, email?
4. Roughly what neighborhood/lifestyle should the copy lean into?

**Then build a complete, polished, responsive site with:**

- A full-bleed hero with the address, city/state, list price, and a beds / baths /
  sqft / price-per-sqft stat row over a twilight exterior photo, plus "Schedule a
  tour" and "View photos" buttons.
- A short "story" intro paragraph that sells the home in the agent's voice.
- A "Highlights" grid (one card per standout feature, with a small icon).
- A photo gallery: a tiled grid where clicking any image opens a full-screen
  lightbox with caption, prev/next, and keyboard arrows + Esc.
- A "Facts & features" table (bedrooms, baths, lot size, year built, garage, HOA…).
- An **interactive mortgage estimator**: sliders for price, down-payment %, and
  interest rate, plus a 15/20/30-year toggle, that live-updates the estimated
  monthly payment with a principal / interest / tax / insurance breakdown.
- A simple SVG floor plan with a level switcher (main / upper / lower) next to a
  neighborhood blurb with a Walk Score and nearby points of interest.
- A "Schedule a tour" form (name, phone, email, preferred date + time, message)
  that shows a friendly confirmation state on submit, beside an agent contact card.
- A footer with an MLS-style detail block and a "deemed reliable but not
  guaranteed / Equal Housing Opportunity" disclaimer.

**Design & content notes:**

- Coastal-luxury, editorial mood: warm ivory/sand background, deep ocean-ink text,
  a single brass accent, a serif display face (Cormorant Garamond) over a clean
  sans (Inter). Generous whitespace, soft shadows, no clutter.
- Use realistic content based on my answers — never "lorem ipsum". Invent believable
  copy, room names, neighborhood landmarks, and an MLS number.
- Use real images. Pull free photos that fit, e.g. from Unsplash
  (`https://images.unsplash.com/photo-…?auto=format&fit=crop&w=1600&q=80`) or Pexels,
  for the exterior, living room, kitchen, primary suite, and pool, with descriptive
  `alt` text.
- Keep all the listing content in one `data.js` module so the site is easy to
  re-skin for another property. Persist nothing to a backend — the form and
  calculator are client-side only.
- Mortgage math: monthly P&I from the standard amortization formula; estimate tax
  (~1.18%/yr of price) and insurance (~0.35%/yr) so the total is realistic.
- Keep it accessible (semantic HTML, labelled form fields, keyboard support for the
  lightbox, good contrast) and mobile-first.

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="listing"></script>
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
