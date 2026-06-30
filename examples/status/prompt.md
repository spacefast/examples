# Northwind API — System Status — build it yourself

Copy everything below the line into your AI agent (Claude, ChatGPT, Codex, Cursor,
or any agent that can write files and run a command). It will ask you a few quick
questions, build the site, and publish it live to Spacefast.

---

Build me a **public status page for my API / hosting product** — the kind of page linked from a footer and watched during an outage (think Stripe, Slack, or OpenAI status) — as a single self-contained static site (`index.html` + `styles.css` + `app.js`, no build step, no framework).

**First, ask me these questions and wait for my answers:**

1. What's the service or company name?
2. Which components or subsystems should be listed (e.g. API, Dashboard, Webhooks, CDN, Database)?
3. What's your brand accent color and support email?
4. Is there a current incident or upcoming maintenance to show, or should it read all-clear?

**Then build a complete, polished, responsive status page with:**

- A sticky header with the brand and a big **overall-status banner** ("All systems operational" / "Some systems degraded" / "Partial system outage") with a live "last updated" timestamp and a headline 90-day uptime figure. The banner color and wording should be derived from the worst component state, not hard-coded.
- A **components list** (one row per subsystem) where each row shows a colored status dot, the component name + short description, a status label, and a **90-day uptime bar graph** (90 thin cells, green for healthy with yellow/red/indigo for degraded/outage/maintenance days) plus the computed uptime percentage. Each cell has a tooltip with its date and state.
- An **active-incident block** with a posted-update **timeline** that reads newest-first through the standard lifecycle: Investigating → Identified → Monitoring → Resolved, each entry timestamped in UTC.
- A **scheduled maintenance** section with one or two upcoming windows (date chip, what's happening, and the maintenance window in UTC + a local timezone).
- A **past-incidents history** grouped by date, each incident with a severity pill, a duration, and its own compact resolution timeline.
- A **subscribe-to-updates** box: an email field that validates, shows an inline error for bad input, and on success swaps to a friendly "You're subscribed" confirmation (persist it in `localStorage` so it stays confirmed on reload). Include alternate channels — a Twitter/X handle, an RSS feed, and a status-webhook link.
- A footer with the marketing site, docs, and support email.

**Design & content notes:**

- Calm, trustworthy NOC/dashboard aesthetic: dark navy background, generous whitespace, a single green "operational" accent plus amber/red/indigo for the other states, Inter for text and a monospace (e.g. JetBrains Mono) for timestamps and numbers. Status pages have a strict visual grammar — keep it clean and unambiguous.
- Write real-sounding incident copy from my answers — never "lorem ipsum". Invent believable, specific incidents (e.g. "a bad config push removed a connection-pool limit and saturated the primary database"), realistic UTC timestamps, durations, and uptime numbers like 99.98%.
- Generate the 90-day bars in JavaScript from per-component data so they're stable across reloads (a deterministic seed, with a few realistic blips), and compute each uptime percentage and the overall banner state from that data.
- Use real images only where they help (this page is mostly UI). If you add any, pull free photos that fit, e.g. from Unsplash (`https://source.unsplash.com/1200x800/?server,data,center`), with descriptive `alt` text.
- Keep it accessible (semantic HTML, a labelled form, keyboard support, good contrast, `aria-label`s on the uptime bars and a polite live region on the banner) and mobile-first (the bars and timeline should reflow cleanly on a phone).

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="status"></script>
```

**Finally, publish it to Spacefast so it's live in seconds — no account needed:**

- Zip the site (or point at the folder) and publish:
  ```bash
  curl -F archive=@site.zip https://api.spacefast.com/v1/publish
  ```
  (or just say: _"fetch https://spacefast.com/ai and publish this to Spacefast"_)
- You'll get a **live URL**, a permanent version URL, and a one-time **claim link**.
- Open the claim link and sign in within 24 hours to keep it forever — same URL.
- Want to post an incident update later? Edit the files and publish again; every version keeps its own URL and you can roll back anytime.

Learn more at **https://spacefast.com**.
