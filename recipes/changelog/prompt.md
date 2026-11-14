Build me a **product changelog** — a calm, dated "what's new" page in the Linear /
Stripe / Clerk style, with New / Improved / Fixed badges, tag filtering, and an RSS
feed — as a self-contained static site (one `index.html` plus a CSS and a JS file
and a `feed.xml`, no build step, no framework).

**Before you build, ask me these questions in one message and wait for my answers. If I skip anything, choose a sensible default and tell me what you chose:**

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
- A footer subscribe block linking to my email signup URL, plus a prominent RSS link. If I provide no email signup URL, show only RSS.
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
- Write release notes only for the versions, dates, and changes I provide. For a fictional sample product, label the timeline as demo content.
- Use real images. For the per-release screenshots, prefer clean inline-SVG UI mockups
  of the product (they read as real product shots and stay crisp); for any photos, pull
  free images that fit, e.g. from Unsplash
  (`https://images.unsplash.com/...`) or `https://picsum.photos/seed/product-changelog-1/1200/800`,
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

**When the site is ready, publish it to Spacefast:**

1. Use `./site` as the publish folder. For no-build projects, put only the finished public files in that dedicated folder. Confirm it has `index.html` at its root and no secrets, source files, `.git`, or `.spacefast` state.
2. Fetch https://spacefast.com/setup.md and follow its current direct API publishing instructions. Check for an existing Space before creating one, and follow the returned upload and polling steps.
3. Report success only when `data.next.action` is `done` and the intended version is serving. If more work is needed, report the returned next step.
4. For an anonymous publish, give me `data.claim.message` unchanged. It contains the private preview (`data.claim.url`), the owner's claim link (`data.claim.claimUrl`), and the deadline (`data.claim.expiresAt`). Keep both links private. Never print the separate `data.claim.key`.
5. Keep `data.space.id` and the returned credential securely for updates to the same Space. Follow the guide for credential recovery after claiming. Keep credentials and `.spacefast` state out of the published files, commits, and logs.

If the `sf` CLI is already installed, `sf publish ./site --wait` follows the same publishing flow. See [publishing](https://spacefast.com/docs/publish/) and [claiming a Space](https://spacefast.com/docs/anonymous-and-claim/).
