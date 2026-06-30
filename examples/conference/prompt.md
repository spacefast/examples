# DevHorizon 2026 — build it yourself

Copy everything below the line into your AI agent (Claude, ChatGPT, Codex, Cursor,
or any agent that can write files and run a command). It will ask you a few quick
questions, build the site, and publish it live to Spacefast.

---

Build me a **marketing-and-schedule site for a one-day, single-track web development
conference** as an **Astro site** (static output, no SSR, no backend).

**First, ask me these questions and wait for my answers:**

1. What's the conference name, tagline, and one-line theme?
2. What date is it, and in which city / at which venue?
3. Name 4–6 speakers with their talk titles (and companies, if you have them).
4. What are your ticket tiers and prices (e.g. Early Bird $199 / Standard $299)?

**Then build a complete, polished, responsive site with:**

- A full-bleed hero with the conference name, tagline, date, city/venue, a live
  countdown to the first talk, and a "Get tickets" call to action.
- An "About" section: the format, who it's for, and what to expect.
- A "Speakers" grid with photos, names, companies, and talk titles — each card
  expands to reveal the talk abstract.
- A "Schedule" — a single-track vertical timeline of talks, breaks, lunch, and the
  after-party, with times, speakers, and short notes.
- "Tickets" — Early Bird / Standard / Team pricing cards with feature lists, a
  highlighted "most popular" tier, and a sold-out state for early bird.
- "Venue & travel" — the venue with address and a map link, how to get there, and a
  few nearby hotels at different price points.
- "Sponsors" — a tiered logo wall (Platinum / Gold / Community) with a "Become a
  sponsor" link.
- "FAQ" plus a short "Code of Conduct" panel.
- A footer with social links and a newsletter signup that shows a friendly success
  message on submit.

**Design & content notes:**

- Modern, technical, confident: a near-black background, an electric teal→violet
  gradient as the one signature accent, a geometric display face for headings
  (e.g. Space Grotesk), a clean sans for body (Inter), and a mono face
  (JetBrains Mono) for labels, times, and the countdown.
- Use realistic content based on my answers — never "lorem ipsum". Invent believable
  talk titles, abstracts, session times, hotel names, and sponsor names.
- Use real images. Pull free photos that fit — e.g. `https://picsum.photos/seed/<unique-seed>/1200/800`
  (vary the seed per image) or Unsplash direct URLs fitting "conference keynote
  speaker on stage", "tech conference audience in auditorium", "networking coffee
  break", and "modern convention center glass exterior" — each with descriptive
  `alt` text.
- Keep all content in a single `src/data/conf.ts` file so any detail is easy to
  change. Build the countdown, the mobile nav, the speaker-card expand, and the
  newsletter signup as small inline scripts — no heavy dependencies.
- Mobile-first and accessible: semantic HTML, labelled form fields, good contrast,
  keyboard support, and a visible focus style.

**Add this exact line right before `</body>` (in your layout) so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="conference"></script>
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
