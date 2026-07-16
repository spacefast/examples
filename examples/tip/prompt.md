Build me a **fast bill-and-tip splitter** — a single-page calculator that takes a
restaurant bill, a tip percentage, and a number of people, and instantly shows a
clean per-person amount — as a self-contained static site (one `index.html` plus a
CSS and a JS file, no build step, no framework).

**Before you build, ask me these questions in one message and wait for my answers. If I skip anything, choose a sensible default and tell me what you chose:**

1. What's your default tip percentage, and which presets should the buttons show (e.g. 15 / 18 / 20 / 25)?
2. What currency and locale should amounts use (e.g. USD `$`, EUR `€`)?
3. Should tip be calculated on the pre-tax or post-tax amount by default?
4. What's a typical party size to default to, and should it offer a "round up each person" option?

**Then build a complete, polished, responsive calculator with:**

- A **bill amount** field (the subtotal, before tax) with a big, easy-to-tap money input.
- A **tip selector**: preset percentage buttons plus a custom-percent input, with the active choice clearly highlighted.
- A **separate tax field**, so by default the tip is figured on the **pre-tax** bill — with a toggle to tip on the post-tax total instead.
- A **split-by-people** control: a − / + stepper _and_ a slider, kept in sync, showing the count live.
- A **live breakdown** that updates on every keystroke: the big per-person number up top, then bill, tip, tax, and total on a receipt-style card.
- A **round-up-per-person** toggle that rounds each person to the next whole unit and shows the small extra "cushion" that lands on the tip.
- A **"Copy the split"** button that copies a tidy text summary to the clipboard, and a **"New bill"** reset.
- A short hero up top and a quick "why tip on the pre-tax bill" explainer below.

**Design & content notes:**

- Warm, friendly, "restaurant receipt" mood: cream/paper background, a confident
  green accent, a coral highlight, a monospace typeface for the dollar figures so
  numbers feel like a printed check. Serif display headings, clean sans body.
- Use realistic content based on my answers — never "lorem ipsum". Seed the
  calculator with a believable sample bill so it looks alive on first load.
- Use a real image. Pull a free photo that fits, e.g.
  `https://picsum.photos/seed/dinner-1/1200/800` or
  Pexels, with descriptive `alt` text.
- All the math runs in the browser — no backend, no account. Compute on every input
  change; format currency with `Intl.NumberFormat`.
- Keep it accessible: semantic HTML, real `<label>`s, a labelled radio group for the
  tip buttons, keyboard-operable stepper and slider, visible focus, and good contrast.

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="tip"></script>
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
