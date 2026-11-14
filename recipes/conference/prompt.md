Build me a **marketing-and-schedule site for a one-day, single-track web development
conference** as an **Astro site** (static output, no SSR, no backend).

**Before you build, ask me these questions in one message and wait for my answers. If I skip anything, choose a sensible default and tell me what you chose:**

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
- A footer with social links and a link to my newsletter signup page, if I provide one.

**Design & content notes:**

- Modern, technical, confident: a near-black background, an electric teal→violet
  gradient as the one signature accent, a geometric display face for headings
  (e.g. Space Grotesk), a clean sans for body (Inter), and a mono face
  (JetBrains Mono) for labels, times, and the countdown.
- Use confirmed speakers, dates, ticket availability, venues, and sponsors. For a fictional conference, label the site and its schedule as demo content.
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

**When the site is ready, publish it to Spacefast:**

1. Use `./dist` as the publish folder. For no-build projects, put only the finished public files in that dedicated folder. Confirm it has `index.html` at its root and no secrets, source files, `.git`, or `.spacefast` state.
2. Fetch https://spacefast.com/setup.md and follow its current direct API publishing instructions. Check for an existing Space before creating one, and follow the returned upload and polling steps.
3. Report success only when `data.next.action` is `done` and the intended version is serving. If more work is needed, report the returned next step.
4. For an anonymous publish, give me `data.claim.message` unchanged. It contains the private preview (`data.claim.url`), the owner's claim link (`data.claim.claimUrl`), and the deadline (`data.claim.expiresAt`). Keep both links private. Never print the separate `data.claim.key`.
5. Keep `data.space.id` and the returned credential securely for updates to the same Space. Follow the guide for credential recovery after claiming. Keep credentials and `.spacefast` state out of the published files, commits, and logs.

If the `sf` CLI is already installed, `sf publish ./dist --wait` follows the same publishing flow. See [publishing](https://spacefast.com/docs/publish/) and [claiming a Space](https://spacefast.com/docs/anonymous-and-claim/).
