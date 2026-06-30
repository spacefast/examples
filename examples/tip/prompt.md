# Even Split — build it yourself

Copy everything below the line into your AI agent (Claude, ChatGPT, Codex, Cursor,
or any agent that can write files and run a command). It will ask you a few quick
questions, build the site, and publish it live to Spacefast.

---

Build me a **fast bill-and-tip splitter** — a single-page calculator that takes a
restaurant bill, a tip percentage, and a number of people, and instantly shows a
clean per-person amount — as a self-contained static site (one `index.html` plus a
CSS and a JS file, no build step, no framework).

**First, ask me these questions and wait for my answers:**

1. What's your default tip percentage, and which presets should the buttons show (e.g. 15 / 18 / 20 / 25)?
2. What currency and locale should amounts use (e.g. USD `$`, EUR `€`)?
3. Should tip be calculated on the pre-tax or post-tax amount by default?
4. What's a typical party size to default to, and should it offer a "round up each person" option?

**Then build a complete, polished, responsive calculator with:**

- A **bill amount** field (the subtotal, before tax) with a big, easy-to-tap money input.
- A **tip selector**: preset percentage buttons plus a custom-percent input, with the active choice clearly highlighted.
- A **separate tax field**, so by default the tip is figured on the **pre-tax** bill — with a toggle to tip on the post-tax total instead.
- A **split-by-people** control: a − / + stepper *and* a slider, kept in sync, showing the count live.
- A **live breakdown** that updates on every keystroke: the big per-person number up top, then bill, tip, tax, and total on a receipt-style card.
- A **round-up-per-person** toggle that rounds each person to the next whole unit and shows the small extra "cushion" that lands on the tip.
- A **"Copy the split"** button that copies a tidy text summary to the clipboard, and a **"New bill"** reset.
- A short hero up top and a quick "why tip on the pre-tax bill" explainer below.

**Design & content notes:**

- Warm, friendly, "restaurant receipt" mood: cream/paper background, a confident
  green accent, a coral highlight, a monospace typeface for the dollar figures so
  numbers feel like a printed check. Serif display headings, clean sans body.
- Use realistic content based on my answers — never "lorem ipsum". Seed the
  calculator with a believable sample bill so it looks alive on first load.
- Use a real image. Pull a free photo that fits, e.g. from Unsplash
  (`https://source.unsplash.com/1200x800/?friends,dinner,restaurant,table`) or
  Pexels, with descriptive `alt` text.
- All the math runs in the browser — no backend, no account. Compute on every input
  change; format currency with `Intl.NumberFormat`.
- Keep it accessible: semantic HTML, real `<label>`s, a labelled radio group for the
  tip buttons, keyboard-operable stepper and slider, visible focus, and good contrast.

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="tip"></script>
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
