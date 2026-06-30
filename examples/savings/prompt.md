# Milestone — build it yourself

Copy everything below the line into your AI agent (Claude, ChatGPT, Codex, Cursor,
or any agent that can write files and run a command). It will ask you a few quick
questions, build the site, and publish it live to Spacefast.

---

Build me a **savings-goal calculator** as a vanilla-JS app (a single static site —
`index.html`, `styles.css`, `app.js` — no build step, no framework).

**First, ask me these questions and wait for my answers:**

1. What are you saving for and how much do you need (e.g. $20,000 for a house down payment)?
2. By when do you want to reach it, and how much do you already have saved?
3. What annual interest/return rate should we assume (e.g. 4% HYSA, 7% investments)?
4. What currency, and a name/title for the goal to show on the page?

**Then build a complete, polished, responsive site with:**

- A short hero: the headline promise ("Know exactly what to save each month"), a one-line
  explainer, and a warm savings photo (coins jar with a plant, or a piggy bank).
- A **goal form**: target amount, "already saved" starting balance, a target month,
  an expected-annual-return picker (0% cash / ~4.5% HYSA / ~7% investing / custom), and a
  currency selector.
- A **headline result card** that solves the one number that matters — the **required
  monthly contribution** — plus the per-week equivalent, the months remaining, total you'll
  contribute, and total interest earned. Round the monthly figure up to a clean auto-pay number.
- A **compound-growth area chart** (inline SVG): the balance climbing toward a dashed goal
  line, with the lighter band showing contributions and a glow on top showing interest. Add a
  hover readout for any month.
- A **"where the final balance comes from"** stacked bar: head start vs contributions vs interest.
- A **what-if explorer** with sliders for monthly amount and annual return that keep the target
  fixed and tell me the new date I'd actually hit the goal (faster/slower than my deadline).
- A **year-by-year milestone table**: contributed, interest, balance, and % toward the goal at
  the end of each year, with the final row marked as the goal.
- A short "why" section and a footer with a "not financial advice / runs in your browser" note.
- A **"Copy my plan"** button that puts a clean text summary on the clipboard.

**Design & content notes:**

- Calm, trustworthy fintech mood: warm paper background, deep-teal ink, a confident green for
  growth and a soft gold for interest. A serif display face (e.g. Fraunces) for headings, a clean
  sans (Inter) for body, and a monospace (Space Mono) for the numbers.
- Get the math exactly right. Contributions are end-of-month and interest compounds monthly:
  `FV = PV·(1+i)^n + PMT·((1+i)^n − 1)/i`, where `i` is the monthly rate and `n` the number of
  months. Solve that for `PMT` to get the required monthly contribution; invert it (solve for `n`)
  for the what-if "when would I hit it" date. Handle the easy edge cases too: a 0% rate, a start
  balance that already meets the goal, and interest alone reaching the goal before the deadline.
- Use realistic content based on my answers — never "lorem ipsum". Use my goal name, amounts, and
  currency throughout, and format money with `Intl.NumberFormat`.
- Use real images. Pull free photos that fit, e.g. from Unsplash
  (`https://source.unsplash.com/1200x800/?savings,coins,jar,plant`) or Pexels, and add descriptive
  `alt` text.
- Persist my inputs in `localStorage` so my plan is still here when I come back, and recompute
  everything live as I type or drag.
- Keep it accessible (semantic HTML, labelled fields, keyboard-friendly sliders and buttons, good
  contrast) and mobile-first.

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="savings"></script>
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
