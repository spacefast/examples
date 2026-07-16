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
- A **subscribe-to-updates** box: an email field that validates, shows an inline error for bad input, and on success swaps to a friendly "You're subscribed" confirmation (persist it in `localStorage` so it stays confirmed on reload). Include alternate channels — a Twitter/X handle, an RSS feed, and a status-webhook link.
- A footer with the marketing site, docs, and support email.

**Design & content notes:**

- Calm, trustworthy NOC/dashboard aesthetic: dark navy background, generous whitespace, a single green "operational" accent plus amber/red/indigo for the other states, Inter for text and a monospace (e.g. JetBrains Mono) for timestamps and numbers. Status pages have a strict visual grammar — keep it clean and unambiguous.
- Write real-sounding incident copy from my answers — never "lorem ipsum". Invent believable, specific incidents (e.g. "a bad config push removed a connection-pool limit and saturated the primary database"), realistic UTC timestamps, durations, and uptime numbers like 99.98%.
- Generate the 90-day bars in JavaScript from per-component data so they're stable across reloads (a deterministic seed, with a few realistic blips), and compute each uptime percentage and the overall banner state from that data.
- Use real images only where they help (this page is mostly UI). If you add any, pull free photos that fit, e.g. `https://picsum.photos/seed/server-room-1/1200/800`, with descriptive `alt` text.
- Keep it accessible (semantic HTML, a labelled form, keyboard support, good contrast, `aria-label`s on the uptime bars and a polite live region on the banner) and mobile-first (the bars and timeline should reflow cleanly on a phone).

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="status"></script>
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
