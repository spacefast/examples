Build me a **public status page for my API / hosting product** — the kind of page linked from a footer and watched during an outage (think Stripe, Slack, or OpenAI status) — as a single self-contained static site (`index.html` + `styles.css` + `app.js`, no build step, no framework).

**Before you build, ask me these questions in one message and wait for my answers. If I skip anything, choose a sensible default and tell me what you chose:**

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
- A subscribe-to-updates box with a labelled email field and inline validation. Include my actual alternate channels, such as RSS or a status feed. For any form that sends information, ask for my form endpoint or hosted signup URL. Use the supplied destination and show success only after it confirms receipt. A link to another service does not confirm completion. Without a destination, label the form "Demo only" beside its fields, label its button "Preview", and say "Preview complete. Nothing was sent." Never treat `localStorage` as delivery or store personal form data there.
- A footer with the marketing site, docs, and support email.

**Design & content notes:**

- Calm, trustworthy NOC/dashboard aesthetic: dark navy background, generous whitespace, a single green "operational" accent plus amber/red/indigo for the other states, Inter for text and a monospace (e.g. JetBrains Mono) for timestamps and numbers. Status pages have a strict visual grammar — keep it clean and unambiguous.
- Use actual incident records and monitoring data when available. Otherwise label the banner, uptime charts, and incident history "Sample data, not live monitoring." Never present generated uptime as a measured reliability claim.
- Generate the 90-day bars in JavaScript from per-component data so they're stable across reloads (a deterministic seed, with a few realistic blips), and compute each uptime percentage and the overall banner state from that data.
- Use real images only where they help (this page is mostly UI). If you add any, pull free photos that fit, e.g. `https://picsum.photos/seed/server-room-1/1200/800`, with descriptive `alt` text.
- Keep it accessible (semantic HTML, a labelled form, keyboard support, good contrast, `aria-label`s on the uptime bars and a polite live region on the banner) and mobile-first (the bars and timeline should reflow cleanly on a phone).

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="status"></script>
```

**When the site is ready, publish it to Spacefast:**

1. Use `./site` as the publish folder. For no-build projects, put only the finished public files in that dedicated folder. Confirm it has `index.html` at its root and no secrets, source files, `.git`, or `.spacefast` state.
2. Fetch https://spacefast.com/setup.md and follow its current direct API publishing instructions. Check for an existing Space before creating one, and follow the returned upload and polling steps.
3. Report success only when `data.next.action` is `done` and the intended version is serving. If more work is needed, report the returned next step.
4. For an anonymous publish, give me `data.claim.message` unchanged. It contains the private preview (`data.claim.url`), the owner's claim link (`data.claim.claimUrl`), and the deadline (`data.claim.expiresAt`). Keep both links private. Never print the separate `data.claim.key`.
5. Keep `data.space.id` and the returned credential securely for updates to the same Space. Follow the guide for credential recovery after claiming. Keep credentials and `.spacefast` state out of the published files, commits, and logs.

If the `sf` CLI is already installed, `sf publish ./site --wait` follows the same publishing flow. See [publishing](https://spacefast.com/docs/publish/) and [claiming a Space](https://spacefast.com/docs/anonymous-and-claim/).
