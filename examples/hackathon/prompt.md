# RamHacks 2026 — build it yourself

Copy everything below the line into your AI agent (Claude, ChatGPT, Codex, Cursor,
or any agent that can write files and run a command). It will ask you a few quick
questions, build the site, and publish it live to Spacefast.

---

Build me an **energetic landing page for a student hackathon** as a vanilla-JS app
(a single `index.html` plus `styles.css` and `app.js`, no framework, no build step).

**First, ask me these questions and wait for my answers:**

1. What's the hackathon called and which school or org is hosting?
2. When does it start, and how long does it run (e.g. 36 hours starting Sat 10am)?
3. What are the prize amounts and any sponsor track names?
4. Who are your sponsors (a few names is fine)?

**Then build a complete, polished, responsive site with:**

- A bold hero with the event name, host school, dates, and a **live countdown timer**
  that ticks down to kickoff (days / hours / minutes / seconds). Handle the moment it
  goes live ("Hacking is live!") and after it ends ("That's a wrap — see you next year").
- An **About** section explaining what a hackathon is, who can join, team size (1–4),
  and that it's free — beginners explicitly welcome.
- A **Schedule** with a Saturday / Sunday day toggle that swaps the agenda: opening
  ceremony, workshops, meals, a midnight snack, judging, and the closing ceremony.
- A **Prizes & tracks** section: a hero grand prize plus sponsor category tracks
  (Best Beginner Hack, Best Use of AI, Best Hardware Hack, Best Design, etc.).
- A **Sponsors** section with tiered logos (Title / Gold / Startup) and a "Sponsor us" CTA.
- An **FAQ accordion** (do I need experience, what to bring, is travel reimbursed, can I come alone).
- A **Register** banner with a short form (name + email) that validates and shows a
  friendly "You're in!" success state.
- A footer with the **MLH Code of Conduct** link and Discord / Instagram / X links.

**Design & content notes:**

- Dark, high-energy hackathon mood: near-black indigo background, an electric-lime
  accent with a violet secondary and a coral pop, a faint dot-grid behind the hero,
  geometric display type (e.g. Space Grotesk) with a mono face (JetBrains Mono) for
  the countdown digits and timestamps.
- Use realistic content based on my answers — never "lorem ipsum". Invent believable
  schedule items, prize tracks, sponsor names, and FAQ answers.
- Use real images. Pull free photos that fit, e.g. from Unsplash
  (`https://source.unsplash.com/1600x900/?hackathon,students,coding`) or
  `https://picsum.photos/seed/ramhacks-2026-1/1200/800` (vary the seed per image),
  with descriptive `alt` text.
- The countdown, the day toggle, the FAQ accordion, and the form all run in plain
  vanilla JS — no framework, no build step, just three static files.
- Keep it accessible (semantic HTML, labelled fields, keyboard-operable tabs and
  accordion, good contrast, a skip link).

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="hackathon"></script>
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
