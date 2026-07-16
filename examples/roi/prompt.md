Build me a **B2B ROI / savings calculator landing page** — a marketing page where a
visitor enters a couple of numbers about their team and instantly sees how much my
product would save them, with a chart and a "email me the report" lead-capture CTA —
as a **vanilla-JS app** (a single `index.html` plus a small CSS and JS file, no
framework and no build step).

**Before you build, ask me these questions in one message and wait for my answers. If I skip anything, choose a sensible default and tell me what you chose:**

1. What does your product save customers — time, money, or both — and what's the product called?
2. What are the 2–3 input variables a visitor types in, and the formula that turns them into savings? (e.g. "monthly support spend, team size, and ticket volume → we auto-resolve 42% of tickets at the current cost-per-ticket, minus a $49/agent fee")
3. What's the lead-capture CTA at the end — what do they get for handing over an email (a PDF report, a demo, a custom quote)?
4. Any brand details — product name, accent color, a one-line value prop, and a customer quote I can show?

**Then build a complete, polished, responsive site with:**

- A compact hero: value-prop headline, sub-copy, three proof stats, and a "calculate my savings" button that scrolls to the tool.
- The **calculator** as the centerpiece: a two-column layout with the inputs on the left (each a labelled number field paired with a synced range slider) and a live results panel on the right.
- A **live results panel** that recomputes on every keystroke or slider drag: a big headline "net savings, year one" number, plus a stat grid (net savings / month, hours or units reclaimed, payback period, return multiple).
- A **before/after bar chart** (cost today vs cost with the product) and a **cumulative-savings area chart** across 12 months — both drawn in inline SVG, no chart library, animated when values change.
- A "where the savings come from" section: three numbered steps that explain the model honestly, so the number feels earned, not hand-wavy.
- A **gated lead-capture CTA**: a name + work-email + company form that validates the email, and on submit hides the fields and shows a friendly success state ("report's on its way to …") that echoes the visitor's computed savings. A "run another scenario" link resets it.
- A social-proof strip (customer logos + one testimonial with a headshot) and a footer.

**Design & content notes:**

- Modern B2B SaaS look: a light slate background, white cards with soft shadows, a
  confident indigo→violet brand gradient, and a single emerald accent reserved for
  savings/positive numbers. Use a geometric display face (e.g. Sora) for headings and
  Inter for body. Round the corners, keep generous whitespace.
- Use realistic content based on my answers — never "lorem ipsum". Invent believable
  customer names, a testimonial, and sensible default input values (a typical
  mid-market team) so the page looks alive on first load.
- Make the math real and defensible: clamp the inputs to sane ranges, format currency
  with `Intl.NumberFormat`, animate the result numbers, and keep the assumptions
  (deflection rate, per-seat price) visible near the inputs with a "reset to a typical
  team" link.
- Use real images. Pull free photos that fit, e.g.
  `https://picsum.photos/seed/roi-1/1200/800` (vary the seed), and add descriptive `alt` text. Give
  each image an `onerror` fallback so it never shows a broken icon.
- No build step — a single `index.html` with a linked CSS and JS file that opens
  straight in a browser. Draw both charts as inline SVG with no external libraries.
- Keep it accessible: semantic HTML, a `<label>` for every field, an `aria-live`
  results region, keyboard-operable sliders, visible focus states, and good contrast.
  Respect `prefers-reduced-motion` for the number tweens and chart animation.

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="roi"></script>
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
