Build me a **single-screen growth dashboard for my online store** — the kind a small
team pins to the office TV and glances at all day — as a self-contained static site
(one `index.html` plus a CSS and a JS file, no build step, no framework).

**Before you build, ask me these questions in one message and wait for my answers. If I skip anything, choose a sensible default and tell me what you chose:**

1. What's the brand name and what do you sell?
2. Which 4–6 metrics matter most to your team day to day?
3. What's your monthly revenue target?
4. What's your brand's primary accent color?

**Then build a complete, polished, responsive dashboard with:**

- A header bar with the brand, a "Live" pill, a ticking clock, and a "last updated"
  timestamp.
- A row of KPI tiles — revenue today, revenue MTD vs. target (with a progress bar),
  orders, average order value, and conversion rate — each with a sparkline and an
  up/down delta vs. yesterday.
- A revenue trend chart for the last 30 days: daily bars plus a 7-day moving-average
  line, with date labels.
- A "Traffic by source" donut (organic / paid / email / social / direct) with a
  legend showing sessions and share.
- A "Top products" table — five products with units sold and a revenue bar.
- A "Marketing channels" leaderboard with spend and ROAS, color-coded by performance.
- An "Email list" panel: total subscribers, new-today counter, and a daily-signups
  sparkline.
- Auto-refresh every several seconds: the numbers tick to new values with a subtle
  animation and the "last updated" stamp resets.

**Design & content notes:**

- "Wall TV" mood: dark, calm background; one warm accent color; a serif for big
  numbers and headings, a clean sans for labels; tabular figures so digits don't
  jiggle. Make it dense but legible from across the room.
- Build the charts with inline SVG (or a tiny CDN charting lib) — no heavy framework.
- Use realistic content based on my answers — never "lorem ipsum". Invent believable
  product names, channel names, and a month of revenue history with weekend dips and
  a couple of campaign spikes.
- Use real images for the product thumbnails. Pull free photos that fit, e.g.
  `https://picsum.photos/seed/<product>/80/80` (vary the seed per product), with
  descriptive `alt` text.
- Drive everything from a small data model at the top of the JS file, with clearly
  named functions, so it's easy to swap in a real analytics/commerce API later.
- Keep it accessible: semantic HTML, a skip link, labelled regions, good contrast,
  and respect `prefers-reduced-motion` (no animation when it's set).

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="dashboard"></script>
```

**When the site is ready, publish it to Spacefast:**

1. Use `./site` as the publish folder. For no-build projects, put only the finished public files in that dedicated folder. Confirm it has `index.html` at its root and no secrets, source files, `.git`, or `.spacefast` state.
2. Fetch https://spacefast.com/setup.md and follow its current direct API publishing instructions. Check for an existing Space before creating one, and follow the returned upload and polling steps.
3. Report success only when `data.next.action` is `done` and the intended version is serving. If more work is needed, report the returned next step.
4. For an anonymous publish, give me `data.claim.message` unchanged. It contains the private preview (`data.claim.url`), the owner's claim link (`data.claim.claimUrl`), and the deadline (`data.claim.expiresAt`). Keep both links private. Never print the separate `data.claim.key`.
5. Keep `data.space.id` and the returned credential securely for updates to the same Space. Follow the guide for credential recovery after claiming. Keep credentials and `.spacefast` state out of the published files, commits, and logs.

If the `sf` CLI is already installed, `sf publish ./site --wait` follows the same publishing flow. See [publishing](https://spacefast.com/docs/publish/) and [claiming a Space](https://spacefast.com/docs/anonymous-and-claim/).
