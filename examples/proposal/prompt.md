# Proposal for Acme Co. — build it yourself

Copy everything below the line into your AI agent (Claude, ChatGPT, Codex, Cursor,
or any agent that can write files and run a command). It will ask you a few quick
questions, build the site, and publish it live to Spacefast.

---

Build me a **personalized, one-page sales proposal site** — a "prepared for {client}"
page with scope, timeline, pricing tiers, and a working accept/sign button — as an
**Astro site** (a real, minimal Astro project I can build with `bun run build`).

**First, ask me these questions and wait for my answers:**

1. What's your service and the client name? (e.g. "a brand & website refresh, for Acme Co.")
2. What are the pricing tiers/options, with prices? (give me 2–3, and which one is recommended)
3. What are the scope bullets and the timeline (phases and rough weeks)?
4. Who's it from and what are the dates? (your studio name, the contact you're sending to, proposal date, and a "valid until" date)

**Then build a complete, polished, responsive site with:**

- A **cover** that reads "Prepared for {client}", with the project title, who it's
  prepared by and for, the date and proposal number, and three headline outcome
  stat cards.
- A short **intro letter** in the studio's voice, signed by a named person.
- A **scope of work** section: a grid of workstream cards, each with a one-line
  summary and a checklist of concrete, fixed-scope deliverables.
- A **timeline**: a vertical, gated timeline of phases — each with a week range, a
  short blurb, and the milestone that ends the phase.
- **Pricing tiers**: 2–3 selectable cards with price, cadence, feature checklist,
  and a "Recommended" badge on the middle one. Clicking a tier selects it and
  updates the accept form below.
- An **accept & sign** section: an agreement summary that reflects the selected
  tier (tier name, total, and a 40% deposit line that recomputes), and a sign form
  with full name, work email, a typed e-signature that must match the name, and an
  "I agree to the terms" checkbox. On submit it validates, shows a success state
  ("Thank you, {first name} — accepted!") with a signed receipt and reference
  number, and persists the acceptance in `localStorage` so it survives a refresh.
- A short **FAQ** and a **footer** with studio contact details.

**Design & content notes:**

- Premium, paper-light "studio proposal" mood: a warm off-white page, deep navy
  ink, and one confident amber accent. A characterful serif display face (e.g.
  **Fraunces**) for headings, a clean sans (**Inter**) for body, and a mono
  (**IBM Plex Mono**) for every figure and reference number.
- A dark navy cover and a dark navy accept/sign section bookend the light reading
  sections, with a subtle reading-progress bar at the top.
- Use realistic content based on my answers — never "lorem ipsum". Invent
  believable scope bullets, milestones, and terms if I leave gaps.
- Use real images. Pull free photos that fit, e.g. from Unsplash
  (`https://source.unsplash.com/1200x800/?business,handshake,meeting`) or Pexels,
  and add descriptive `alt` text. Use a calm, professional handshake/office photo
  behind the cover, dimmed for contrast.
- Keep all the content in a single `src/data/proposal.ts` so swapping clients,
  scope, and pricing is a one-file edit; the markup reads from it.
- It's a real Astro project: `bun install && bun run build` must produce a `dist/`.
  Keep it fully static — no SSR, no adapters. The only client-side JS is a small
  inline script for tier selection and the accept/sign interaction.
- Mark the page `noindex` (a proposal isn't for search engines), and pair it with
  Spacefast's space password so only your client can open it.
- Keep it accessible (semantic HTML, labelled form fields, keyboard support, good
  contrast, and `prefers-reduced-motion` respected).

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="proposal"></script>
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
