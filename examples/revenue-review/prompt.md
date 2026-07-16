Build me an **interactive end-of-year revenue review for my SaaS company** — a single-page
board dashboard with KPIs, an ARR bridge, retention cohorts, churn, and a next-year
forecast — as a **Vite + React app**.

**Before you build, ask me these questions in one message and wait for my answers. If I skip anything, choose a sensible default and tell me what you chose:**

1. What's your company name and what does the product do?
2. What's your current ARR (or MRR) and net revenue retention, roughly?
3. What plan tiers and customer segments do you sell to?
4. What fiscal period should this cover (e.g. calendar 2025, FY ending June)?

**Then build a complete, polished, responsive dashboard with:**

- A masthead with the company name, the fiscal period, a "Confidential / Board materials"
  tag, and a "Prepared by" byline with a small photo.
- An **executive summary strip**: ARR, Net Revenue Retention, gross logo churn, blended ACV,
  and CAC payback months — each with a value, a YoY delta chip, and a one-line note.
- An **ARR bridge / waterfall**: Starting ARR + New + Expansion − Contraction − Churned =
  Ending ARR. The gains and losses must actually sum to the ending number — float the bars
  off the running total and connect them.
- An **MRR movement** chart: a stacked bar per month (new + expansion up, contraction +
  churned down), with an optional "net new" line overlay. The twelve months should net to
  the year's ARR change.
- A **cohort retention heatmap**: rows are signup cohorts, columns are months-since-signup,
  cells are net revenue retention % — red below 100, green above, with hover tooltips.
- A **revenue mix** panel with a toggle between "by plan tier" and "by customer segment",
  shown as labelled horizontal bars with ARR, share %, customer count and ACV.
- A **churn analysis**: a ranked list of stated churn reasons (summing to 100%) next to a
  "logos at risk" table (account, segment, ARR, health score, renewal date, reason).
- A **FY-next forecast** with a **base / bull / bear** scenario toggle that swaps a quarterly
  ARR area chart, the projected ending ARR, the YoY growth, and the key assumptions.

**Design & content notes:**

- Dark analyst-dashboard mood: near-black navy background, soft panels with hairline borders,
  one accent per series (blue / violet for gains, amber / red for losses, green for balance),
  a clean sans for text and a monospace for every number. Calm, precise, board-ready — not flashy.
- The numbers have to reconcile. Pick a starting ARR and a set of new / expansion /
  contraction / churned figures that actually add up to your ending ARR, and derive NRR and
  gross retention from them. Invent believable account names for the at-risk table.
- Use realistic content based on my answers — never "lorem ipsum".
- Use real images. Pull free photos that fit, e.g.
  `https://picsum.photos/seed/byline-1/240/240` for the byline photo (and
  an abstract blue gradient for the masthead), or Pexels, and add descriptive `alt` text.
- Build the charts yourself with inline SVG (waterfall, stacked bars, area line) and CSS for
  the heatmap and bars — keep dependencies to just React. Use `base: "./"` in the Vite config
  so it works from any path, and add `<meta name="robots" content="noindex">` since it's internal.
- Keep it accessible (semantic HTML, labelled controls, keyboard-focusable chart bars, good contrast).

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="revenue-review"></script>
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
