# Maple Street Community Garden — build it yourself

Copy everything below the line into your AI agent (Claude, ChatGPT, Codex, Cursor,
or any agent that can write files and run a command). It will ask you a few quick
questions, build the site, and publish it live to Spacefast.

---

Build me a **one-page website for my neighborhood community garden** as plain HTML &
CSS with a touch of vanilla JavaScript (no build step, no framework — just an
`index.html`, a stylesheet, and a small script).

**First, ask me these questions and wait for my answers:**

1. What's the garden's name and which neighborhood or street is it on?
2. What plot sizes do you rent and what's the annual fee for each?
3. How many volunteer hours are members expected to contribute (e.g. 2 hours/month)?
4. What's the best contact email or person for the waitlist?

**Then build a complete, polished, responsive one-pager with:**

- A full-bleed **hero**: the garden's name big over a sunny raised-beds photo, the
  neighborhood and "since {year}" as a tagline, and two buttons — "Join the plot
  waitlist" and "See plots & pricing".
- An **About** section: the garden's mission and a short origin story (an empty lot
  turned into beds), who tends it (volunteer-run, a steering committee), and a little
  stat strip (number of beds, member households, volunteer hours, % organic).
- A **Plots & pricing** section: a card per bed size (e.g. 4×4, 4×8, 4×12, plus a
  waist-high accessible bed) with dimensions, the annual fee, and a one-line pitch —
  flag the most popular — followed by an "every plot includes" list (water, shared
  tools, compost, seed library, gate access) and a quiet note about a scholarship
  fund.
- A **How to join** section: a 3-step explainer and a **waitlist signup form** (name,
  email, street/block, preferred bed size, optional note). On submit it validates and
  shows a friendly "You're on the list" success state — and remembers the visitor with
  `localStorage` so a return visit greets them. State the **48-hour response policy**.
- A **Volunteer workdays** section: explain the required hours, list the ways to
  contribute, and show a live "next drop-in workday" badge computed in the browser
  (e.g. the 2nd Saturday of the month, 9 am–12 pm).
- A **Garden rules** section: five or six friendly rule cards — organic-only, tend
  your plot, share the commons, be a good neighbor, water wisely, log your hours.
- An **Events** section: a dated list of seasonal events — a seed swap, a spring
  kickoff, summer potlucks, and a harvest festival — each with a date chip, time, and
  a sentence of flavor.
- A **Find us** section: address, gate-access notes (members keyed in, visitors
  welcome on workdays, accessible entrance), an embedded Google map, and a "Get
  directions" button.
- A **photo gallery** of the beds across the seasons as a responsive grid, where
  tapping a photo opens it larger in a lightbox (keyboard + arrow-key navigation, Esc
  to close).
- A **footer** with the address, email, quick links, and Instagram / email / map
  icons.

**Design & content notes:**

- Warm, growing mood: deep leaf-green and soil-brown with a terracotta accent and a
  touch of sun-gold, all on a cream-paper background. A friendly serif (e.g. Fraunces)
  for headings and the brand, a clean sans (e.g. Inter) for body. Small leaf/sprout
  flourishes are welcome.
- Use realistic content based on my answers — never "lorem ipsum". Invent believable
  bed descriptions, an origin story, plausible event dates, and a coordinator's name.
- Use real images. Pull free photos that fit, e.g. from Unsplash
  (`https://source.unsplash.com/1200x800/?community,garden,raised,beds`) or Pexels,
  with descriptive `alt` text. Good search terms: community garden raised beds
  vegetables volunteers; hands planting seedlings in soil close up; ripe tomatoes and
  leafy greens garden harvest; community potluck outdoor table garden.
- No build step — a single `index.html` plus a `styles.css` and a small `app.js`.
  Keep the JavaScript a progressive enhancement (the page must read fine if JS
  doesn't run); the only thing it persists is the visitor's own "I joined" flag.
- Keep it accessible (semantic HTML, labelled form fields, keyboard support for the
  form and lightbox, good contrast, respects reduced-motion).

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="garden"></script>
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
