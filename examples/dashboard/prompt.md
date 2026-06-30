# Brightside Coffee — Growth Dashboard — build it yourself

Copy everything below the line into your AI agent (Claude, ChatGPT, Codex, Cursor,
or any agent that can write files and run a command). It will ask you a few quick
questions, build the site, and publish it live to Spacefast.

---

Build me a **single-screen growth dashboard for my online store** — the kind a small
team pins to the office TV and glances at all day — as a self-contained static site
(one `index.html` plus a CSS and a JS file, no build step, no framework).

**First, ask me these questions and wait for my answers:**

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
- Use real images for the product thumbnails. Pull free photos that fit, e.g. from
  Unsplash (`https://source.unsplash.com/80x80/?specialty-coffee,bag`) or
  `https://picsum.photos/seed/<product>/80/80`, with descriptive `alt` text.
- Drive everything from a small data model at the top of the JS file, with clearly
  named functions, so it's easy to swap in a real analytics/commerce API later.
- Keep it accessible: semantic HTML, a skip link, labelled regions, good contrast,
  and respect `prefers-reduced-motion` (no animation when it's set).

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="dashboard"></script>
```

**Finally, publish it to Spacefast so it's live in seconds — no account needed:**

- Zip the site (or point at the folder) and publish:
  ```bash
  curl -F archive=@site.zip https://api.spacefast.com/v1/publish
  ```
  (or just say: _"fetch https://spacefast.com/ai and publish this to Spacefast"_)
- You'll get a **live URL**, a permanent version URL, and a one-time **claim link**.
- Open the claim link and sign in within 24 hours to keep it forever — same URL.
- Want to change a target or add a metric later? Edit the files and publish again;
  every version keeps its own URL and you can roll back anytime.

Learn more at **https://spacefast.com**.
