# The Tidal Wolves — build it yourself

Copy everything below the line into your AI agent (Claude, ChatGPT, Codex, Cursor,
or any agent that can write files and run a command). It will ask you a few quick
questions, build the site, and publish it live to Spacefast.

---

Build me a **bold, full-bleed one-page website for my band** as a vanilla-JS app
(a single `index.html` plus a small CSS and JS file — no framework, no build step).

**First, ask me these questions and wait for my answers:**

1. What's your band name and genre, and the one-line vibe you want the hero to say?
2. What's your latest single or release, and where can people stream it (Spotify/Apple/Bandcamp links)?
3. List 3–5 upcoming shows (city, venue, date) — or say you have none yet and we'll show a "tour TBA" state.
4. Give me 2–3 merch items with names and prices, plus 3 song titles for the music section.

**Then build a complete, polished, responsive site with:**

- A full-bleed hero with the band photo, the band name big, a logo mark, and the latest-single tagline.
- A **sticky bottom audio player** that streams the new single — play/pause, a seek bar with elapsed/total time, and previous/next track buttons. Clicking any song in the music list loads it into the player.
- A "Music" section: the songs as a clickable tracklist, plus links out to Spotify / Apple Music / Bandcamp / YouTube.
- A "Tour" section: each show with city, venue, date, and a ticket button — including "Sold out" and "Few left" states.
- A merch shelf (vinyl, tee, tote) with photo, description, price, and a buy button.
- A mailing-list signup (first name + email) that validates and shows a friendly "You're on the list" confirmation, and remembers the visitor on return via localStorage.
- A short "About" blurb in the band's voice with the member lineup.
- A "Booking & press" contact block with email addresses and social links.

**Design & content notes:**

- Moody, coastal, gig-poster mood: a near-black base, a deep teal, and one warm amber accent; a big serif display face (e.g. Fraunces) for headings and a clean sans (e.g. Inter) for body.
- Use realistic content based on my answers — never "lorem ipsum". Invent believable show dates, song descriptions, and bios if I leave gaps.
- Use real images. Pull free photos that fit, e.g. from Unsplash
  (`https://source.unsplash.com/1200x800/?indie,folk,band,stage`) or Pexels, and add
  descriptive `alt` text.
- No build step — a single `index.html` with a linked CSS and JS file that opens straight in a browser. Make the player actually work (real `<audio>` element); persist the mailing-list state in localStorage.
- Keep it accessible (semantic HTML, labelled form fields, keyboard support including space-to-play, and good contrast).

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="band"></script>
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
