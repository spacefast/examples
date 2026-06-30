# Mia's 30th — build it yourself

Copy everything below the line into your AI agent (Claude, ChatGPT, Codex, Cursor,
or any agent that can write files and run a command). It will ask you a few quick
questions, build the site, and publish it live to Spacefast.

---

Build me a **themed party invite — a one-page site with the occasion, the details,
a map, and a real RSVP form** as an **Astro site** (a small static project, no SSR,
just `astro build` to a `dist/` folder).

**First, ask me these questions and wait for my answers:**

1. What's the occasion and who's hosting? (e.g. "Mia's 30th birthday", and the vibe — playful, black-tie, backyard cookout?)
2. What's the date, time, and venue? (full address so we can drop a real map)
3. What RSVP fields do you need? (e.g. guest count, +1 name, dietary needs, a song request — and whether you want a "can't make it" path with a note to the host)

**Then build a complete, polished, responsive site with:**

- A full-screen **hero**: the guest of honor's name big, the occasion, date/time and venue, a live **countdown** ticking down to the party, and a gentle confetti animation.
- A **details** section: the dress code shown front and centre, plus a tidy card grid for the practical stuff (food, drinks, gifts, weather plan) and a short personal note from the host.
- A **run-of-show timeline**: what happens when — doors, toast, dinner, cake, dancing, last song.
- A **map + directions** block: an embedded Google Map of the venue, an "open in Maps" button, and written directions (transit, parking/rideshare, how to find the door).
- A working **RSVP form** with: name + email (validated), an accept/decline choice, and — when accepting — guest count, a +1 name field that appears only when bringing someone, a dietary preference, and a song request. When declining, show a **"can't make it" path** with a box to leave the host a birthday note. On submit, show a friendly, personalized confirmation and remember the reply on return via `localStorage`.

**Design & content notes:**

- Festive late-night mood: a midnight-plum night sky, warm string-light glow, a neon magenta primary with a party-gold accent and a touch of electric cyan. A rounded display face (e.g. Unbounded) for headings and a clean sans (e.g. Plus Jakarta Sans) for body.
- Use realistic content based on my answers — never "lorem ipsum". Invent a believable schedule, dress-code note, and directions if I leave gaps.
- Use real images. Pull free photos that fit, e.g. `https://picsum.photos/seed/party-rooftop/1800/1200` (vary the seed) or Unsplash photos of festive party balloons, confetti, and a rooftop celebration with string lights, and add descriptive `alt` text.
- Keep all the content in one `src/data/party.ts` file so changing a single detail updates the whole page. Make the countdown and the RSVP form genuinely work; respect `prefers-reduced-motion` for the confetti.
- Keep it accessible (semantic HTML, labelled form fields, keyboard support, visible focus rings, and good contrast on the dark background).

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="party"></script>
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
