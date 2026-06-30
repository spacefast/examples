# Plank — Changelog — build it yourself

Copy everything below the line into your AI agent (Claude, ChatGPT, Codex, Cursor,
or any agent that can write files and run a command). It will ask you a few quick
questions, build the site, and publish it live to Spacefast.

---

Build me a **product changelog** — a calm, dated "what's new" page in the Linear /
Stripe / Clerk style, with New / Improved / Fixed badges, tag filtering, and an RSS
feed — as a self-contained static site (one `index.html` plus a CSS and a JS file
and a `feed.xml`, no build step, no framework).

**First, ask me these questions and wait for my answers:**

1. What's the product name and a one-line description of what it does?
2. Give me 3–4 recent release notes — version, date, category (New / Improved / Fixed), and what changed.
3. What's your brand accent color?
4. Where should "subscribe to updates" point — an email signup URL, or just the RSS feed?

**Then build a complete, polished, responsive changelog with:**

- A **header**: product name, a one-line description, and Subscribe actions (an email
  prompt and an RSS link), with a sticky top bar.
- A **filter bar** that toggles the timeline by **New / Improved / Fixed** (plus
  "All"), highlights the active filter, and shows a live "showing X of Y" count.
- A **release timeline**, newest first: each entry has its date, a relative "x days
  ago" stamp, the version number, a colored category badge, a title, a short
  description (bullets are good), and — for the bigger releases — an inline
  screenshot or UI mockup.
- **Per-entry permalink anchors**: each release has an `id`, and a link icon that
  copies a deep link to the clipboard and shows a small "copied" toast.
- A **footer subscribe block**: an email field that shows a friendly "you're on the
  list" success state on submit (no backend), plus a prominent RSS link.
- A valid **`feed.xml`** (RSS 2.0) that mirrors the same entries, linked from the
  page `<head>` so feed readers discover it.

**Design & content notes:**

- Calm and restrained, like a well-run SaaS changelog: a near-white (or warm paper)
  background, a single confident accent color, a refined serif for headings and a
  clean sans for body, generous whitespace, and a subtle two-column timeline (date on
  the left, content on the right). Include a tasteful light/dark toggle that remembers
  the choice.
- Three quiet badge colors — a green for **New**, a blue for **Improved**, an amber
  for **Fixed** — used as small pills, never loud.
- Use realistic content based on my answers — never "lorem ipsum". Write believable
  release copy with real version numbers and dates; invent a couple more plausible
  past releases so the timeline looks lived-in.
- Use real images. For the per-release screenshots, prefer clean inline-SVG UI mockups
  of the product (they read as real product shots and stay crisp); for any photos, pull
  free images that fit, e.g. from Unsplash
  (`https://images.unsplash.com/...`) or `https://picsum.photos/seed/plank-changelog-1/1200/800`,
  with descriptive `alt` text.
- Persist the active filter to the URL (`?filter=new`) and `localStorage` so a shared
  link opens pre-filtered. Compute the "x days ago" stamps in JS from each entry's
  `datetime`. All of it runs in the browser — no backend, no account.
- Keep it accessible: semantic `<article>` entries, real `<label>`s, the filter as a
  labelled button group with `aria-pressed`, keyboard-operable controls, visible focus,
  and good contrast in both themes.

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="changelog"></script>
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
