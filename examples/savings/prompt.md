Build me a **savings-goal calculator** as a vanilla-JS app (a single static site —
`index.html`, `styles.css`, `app.js` — no build step, no framework).

**Before you build, ask me these questions in one message and wait for my answers. If I skip anything, choose a sensible default and tell me what you chose:**

1. What are you saving for and how much do you need (e.g. $20,000 for a house down payment)?
2. By when do you want to reach it, and how much do you already have saved?
3. What annual interest/return rate should we assume (e.g. 4% HYSA, 7% investments)?
4. What currency, and a name/title for the goal to show on the page?

**Then build a complete, polished, responsive site with:**

- A short hero: the headline promise ("Know exactly what to save each month"), a one-line
  explainer, and a warm savings photo (coins jar with a plant, or a piggy bank).
- A **goal form**: target amount, "already saved" starting balance, a target month,
  an expected-annual-return picker (0% cash / ~4.5% HYSA / ~7% investing / custom), and a
  currency selector.
- A **headline result card** that solves the one number that matters — the **required
  monthly contribution** — plus the per-week equivalent, the months remaining, total you'll
  contribute, and total interest earned. Round the monthly figure up to a clean auto-pay number.
- A **compound-growth area chart** (inline SVG): the balance climbing toward a dashed goal
  line, with the lighter band showing contributions and a glow on top showing interest. Add a
  hover readout for any month.
- A **"where the final balance comes from"** stacked bar: head start vs contributions vs interest.
- A **what-if explorer** with sliders for monthly amount and annual return that keep the target
  fixed and tell me the new date I'd actually hit the goal (faster/slower than my deadline).
- A **year-by-year milestone table**: contributed, interest, balance, and % toward the goal at
  the end of each year, with the final row marked as the goal.
- A short "why" section and a footer with a "not financial advice / runs in your browser" note.
- A **"Copy my plan"** button that puts a clean text summary on the clipboard.

**Design & content notes:**

- Calm, trustworthy fintech mood: warm paper background, deep-teal ink, a confident green for
  growth and a soft gold for interest. A serif display face (e.g. Fraunces) for headings, a clean
  sans (Inter) for body, and a monospace (Space Mono) for the numbers.
- Get the math exactly right. Contributions are end-of-month and interest compounds monthly:
  `FV = PV·(1+i)^n + PMT·((1+i)^n − 1)/i`, where `i` is the monthly rate and `n` the number of
  months. Solve that for `PMT` to get the required monthly contribution; invert it (solve for `n`)
  for the what-if "when would I hit it" date. Handle the easy edge cases too: a 0% rate, a start
  balance that already meets the goal, and interest alone reaching the goal before the deadline.
- Use realistic content based on my answers — never "lorem ipsum". Use my goal name, amounts, and
  currency throughout, and format money with `Intl.NumberFormat`.
- Use real images. Pull free photos that fit, e.g.
  `https://picsum.photos/seed/savings-jar-1/1200/800` (vary the seed) or Pexels, and add descriptive
  `alt` text.
- Persist my inputs in `localStorage` so my plan is still here when I come back, and recompute
  everything live as I type or drag.
- Keep it accessible (semantic HTML, labelled fields, keyboard-friendly sliders and buttons, good
  contrast) and mobile-first.

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="savings"></script>
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
