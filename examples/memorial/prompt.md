# Remembering Eleanor — build it yourself

Copy everything below the line into your AI agent (Claude, ChatGPT, Codex, Cursor,
or any agent that can write files and run a command). It will ask you a few quick
questions, build the site, and publish it live to Spacefast.

---

Build me a **quiet, dignified memorial tribute page for someone I've lost** as a
plain HTML & CSS site (a single `index.html`, no framework and no build step).

**First, ask me these questions and wait for my answers:**

1. Whose memorial is this — their full name, the years (born–passed), and a short epitaph or line they lived by?
2. Share a short life story (a paragraph or two is plenty) and 5–6 photos or moments worth featuring.
3. What service or celebration details should I include — date, time, place, reception, live stream, and any donation request in lieu of flowers?

**Then build a complete, polished, responsive site with:**

- A serene **hero**: a framed portrait, their name, the years, and the epitaph centered beneath a thin gold rule.
- A **life story** section: flowing prose with a drop cap and one pull-quote, followed by a simple vertical timeline of life milestones.
- A **photo gallery**: a responsive grid of photographs that open in a click-to-enlarge lightbox with captions, keyboard navigation (arrow keys, Escape), and previous/next buttons.
- A **service & celebration** block: cards for the memorial service, the reception, and a live-stream note (date, time, address, and a "directions" link each), plus an "in lieu of flowers" donation card.
- A **memory wall**: a few heartfelt seeded memories, and a form (name + message) that validates, shows a gentle thank-you confirmation, and saves new memories so they appear on the wall and persist on return via `localStorage`.
- A soft footer with the name, the years, and a single candle motif.

**Design & content notes:**

- Tone is everything: warm and calm, never clinical. Use an ivory/cream base, soft sage green and a muted gold accent, and deep warm-charcoal text. Pair an elegant serif display face (e.g. Cormorant Garamond) for headings with a readable serif (e.g. EB Garamond) for body text.
- Render the portrait and gallery photographs in soft black-and-white so any source images feel like timeless family archives.
- Use realistic content based on my answers — never "lorem ipsum". Write the life story, timeline, and seeded memories in a tender, human voice; invent believable details only to fill small gaps.
- Use real images. Pull free photos that fit, e.g. from picsum (`https://picsum.photos/seed/memorial-1/1200/800?grayscale`, varying the seed) or Unsplash (`soft floral arrangement`, `candle warm memorial light`), and add descriptive `alt` text.
- No build step — a single `index.html` with embedded CSS and a small script. Make the lightbox and the memory-wall form genuinely work; persist memories in `localStorage`.
- Keep it accessible (semantic HTML, labelled form fields, keyboard support, focus management in the lightbox, good contrast) and respect `prefers-reduced-motion`.

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="memorial"></script>
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
