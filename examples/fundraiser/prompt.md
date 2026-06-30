# Help Fund the Maple Street Mural — build it yourself

Copy everything below the line into your AI agent (Claude, ChatGPT, Codex, Cursor,
or any agent that can write files and run a command). It will ask you a few quick
questions, build the site, and publish it live to Spacefast.

---

Build me a **one-page fundraising campaign site for a local cause** as a vanilla-JS app
(a single `index.html` plus a small CSS and JS file — no framework, no build step).

**First, ask me these questions and wait for my answers:**

1. What's the cause and who does it help? (Give me a name, a one-line summary, and a few sentences of story.)
2. What's the goal amount and how much is raised so far — and when does the campaign end?
3. What payment link should the "Donate" button use (Stripe / PayPal / GoFundMe / etc.)? If you don't have one yet, leave it as a demo button.
4. List a handful of real donors (name + amount, optional short note) to seed the donor wall, and a 4–6 line budget breakdown of where the money goes.

**Then build a complete, polished, responsive site with:**

- A **hero** with a striking community photo, the cause name, a short emotional lede, and the live fundraising widget pinned right there.
- An **animated progress bar** that fills from 0% to the current total on load, with the dollars raised, the goal, the percentage, the donor count, and the days left — all computed, not hard-coded into the markup.
- A **cause story** section in a warm, human voice, a pull-quote from an organizer, a "where the money goes" budget panel, and a small photo gallery.
- A **"ways to give"** row of suggested amounts (each one opens the donate form pre-filled).
- A **donate button + modal**: choose a preset or custom amount, enter a name and optional note, optionally give anonymously, then submit. On submit it validates, shows a thank-you state, bumps the running total and progress bar, and drops the new donor onto the wall instantly. Persist donations in `localStorage` so they survive a refresh.
- A **donor wall**: a grid of donor cards (colored initials avatar, name, note, amount), seeded with the real donors and growing as people give.
- A **share** section: a "copy link" button that actually copies and confirms, plus pre-filled X / Facebook / email share links.
- A footer with the org name, a contact email, and the nonprofit fine print.

**Design & content notes:**

- Warm, hand-made, community-grant mood: a cream paper base, a confident coral primary, a deep teal, and a harvest-gold accent. A characterful serif (e.g. Fraunces) for headings, a clean sans (e.g. Inter) for body. Soft rounded cards, a slightly tilted hero photo, gentle motion.
- Use realistic content based on my answers — never "lorem ipsum". Invent believable donor names, notes, and budget lines if I leave gaps.
- Use real images. Pull free photos that fit, e.g. from Unsplash
  (`https://source.unsplash.com/1200x800/?community,mural,painting`) or Pexels, and add
  descriptive `alt` text. Good search terms: community mural painting, volunteers neighborhood project.
- No build step — a single `index.html` with a linked CSS and JS file that opens straight in a browser. Make the progress bar and donor math real: derive everything from a small config object (goal, base raised, end date, seed donors) so the numbers stay honest. This is a demo, so no real payment is processed — wire the button to my payment link or leave a clearly-labeled demo state.
- Keep it accessible (semantic HTML, labelled form fields, an `aria` live region on the donor wall, keyboard support, Escape closes the modal, and good contrast). Respect `prefers-reduced-motion`.

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="fundraiser"></script>
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
