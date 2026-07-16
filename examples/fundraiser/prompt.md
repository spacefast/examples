Build me a **one-page fundraising campaign site for a local cause** as a vanilla-JS app
(a single `index.html` plus a small CSS and JS file — no framework, no build step).

**Before you build, ask me these questions in one message and wait for my answers. If I skip anything, choose a sensible default and tell me what you chose:**

1. What's the cause and who does it help? (Give me a name, a one-line summary, and a few sentences of story.)
2. What's the goal amount and how much is raised so far — and when does the campaign end?
3. What payment link should the "Donate" button use (Stripe / PayPal / GoFundMe / etc.)? If you don't have one yet, leave it as a demo button.
4. List a handful of real donors (name + amount, optional short note) to seed the donor wall, and a 4–6 line budget breakdown of where the money goes.

**Then build a complete, polished, responsive site with:**

- A **hero** with a striking community photo, the cause name, a short emotional lede, and the live fundraising widget pinned right there.
- An **animated progress bar** that fills from 0% to the current total on load, with the dollars raised, the goal, the percentage, the donor count, and the days left — all computed, not hard-coded into the markup.
- A **cause story** section in a warm, human voice, a pull-quote from an organizer, a "where the money goes" budget panel, and a small photo gallery.
- A **"ways to give"** row of suggested amounts (each one opens the donate form pre-filled).
- A **donate button + modal**: choose a preset or custom amount, enter a name and optional note, optionally give anonymously, then submit. On submit it validates, shows a thank-you state, bumps the running total and progress bar, and drops the new donor onto the wall instantly. Persist donations in `localStorage` so they survive a refresh.
- A **donor wall**: a grid of donor cards (colored initials avatar, name, note, amount), seeded with the real donors and growing as people give.
- A **share** section: a "copy link" button that actually copies and confirms, plus pre-filled X / Facebook / email share links.
- A footer with the org name, a contact email, and the nonprofit fine print.

**Design & content notes:**

- Warm, hand-made, community-grant mood: a cream paper base, a confident coral primary, a deep teal, and a harvest-gold accent. A characterful serif (e.g. Fraunces) for headings, a clean sans (e.g. Inter) for body. Soft rounded cards, a slightly tilted hero photo, gentle motion.
- Use realistic content based on my answers — never "lorem ipsum". Invent believable donor names, notes, and budget lines if I leave gaps.
- Use real images. Pull free photos that fit, e.g.
  `https://picsum.photos/seed/community-mural-1/1200/800` (vary the seed) or Pexels, and add
  descriptive `alt` text. Good search terms: community mural painting, volunteers neighborhood project.
- No build step — a single `index.html` with a linked CSS and JS file that opens straight in a browser. Make the progress bar and donor math real: derive everything from a small config object (goal, base raised, end date, seed donors) so the numbers stay honest. This is a demo, so no real payment is processed — wire the button to my payment link or leave a clearly-labeled demo state.
- Keep it accessible (semantic HTML, labelled form fields, an `aria` live region on the donor wall, keyboard support, Escape closes the modal, and good contrast). Respect `prefers-reduced-motion`.

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="fundraiser"></script>
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
