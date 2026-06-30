# Beacon ROI Calculator — build it yourself

Copy everything below the line into your AI agent (Claude, ChatGPT, Codex, Cursor,
or any agent that can write files and run a command). It will ask you a few quick
questions, build the site, and publish it live to Spacefast.

---

Build me a **B2B ROI / savings calculator landing page** — a marketing page where a
visitor enters a couple of numbers about their team and instantly sees how much my
product would save them, with a chart and a "email me the report" lead-capture CTA —
as a **vanilla-JS app** (a single `index.html` plus a small CSS and JS file, no
framework and no build step).

**First, ask me these questions and wait for my answers:**

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
- Use real images. Pull free photos that fit, e.g. from Unsplash
  (`https://source.unsplash.com/1200x800/?business,analytics,chart`) or
  `https://picsum.photos/seed/roi-1/1200/800`, and add descriptive `alt` text. Give
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
