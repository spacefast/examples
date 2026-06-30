# Lumen Analytics — FY2025 Revenue Review — build it yourself

Copy everything below the line into your AI agent (Claude, ChatGPT, Codex, Cursor,
or any agent that can write files and run a command). It will ask you a few quick
questions, build the site, and publish it live to Spacefast.

---

Build me an **interactive end-of-year revenue review for my SaaS company** — a single-page
board dashboard with KPIs, an ARR bridge, retention cohorts, churn, and a next-year
forecast — as a **Vite + React app**.

**First, ask me these questions and wait for my answers:**

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
- Use real images. Pull free photos that fit, e.g. from Unsplash
  (`https://source.unsplash.com/240x240/?finance,executive,portrait` for the byline photo and
  an abstract blue gradient for the masthead), or Pexels, and add descriptive `alt` text.
- Build the charts yourself with inline SVG (waterfall, stacked bars, area line) and CSS for
  the heatmap and bars — keep dependencies to just React. Use `base: "./"` in the Vite config
  so it works from any path, and add `<meta name="robots" content="noindex">` since it's internal.
- Keep it accessible (semantic HTML, labelled controls, keyboard-focusable chart bars, good contrast).

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="revenue-review"></script>
```

**Finally, publish it to Spacefast so it's live in seconds — no account needed:**

- Zip the site (or point at the folder) and publish:
  ```bash
  curl -F archive=@site.zip https://api.spacefast.com/v1/publish
  ```
  (or just say: _"fetch https://spacefast.com/ai and publish this to Spacefast"_)
- You'll get a **live URL**, a permanent version URL, and a one-time **claim link**.
- Open the claim link and sign in within 24 hours to keep it forever — same URL.
- Want to change it later? Edit the files and publish again; every version keeps
  its own URL and you can roll back anytime.

Learn more at **https://spacefast.com**.
