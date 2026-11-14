Build me a **mobile-first "link in bio" page for a food creator** as a single,
self-contained HTML file with CSS (no build step, no framework).

**Before you build, ask me these questions in one message and wait for my answers. If I skip anything, choose a sensible default and tell me what you chose:**

1. What's your name, what do you make/create, and a one-line bio?
2. What's the single most important thing you want visitors to click right now (the primary CTA)?
3. List 4–6 links you want as buttons, with their labels and URLs.
4. Which social platforms should show, and do you have a recent video to feature?

**Then build a complete, polished, responsive one-pager with:**

- A centered profile header: round avatar (with a tasteful gradient ring), name with a small verified check, handle, a short bio, and a couple of topic "tags".
- One **highlighted primary CTA** card at the top that stands out from everything else (e.g. "Get my free meal-prep guide") with a kicker, title, and one-line subtitle.
- A vertical **stack of tappable link buttons** — each with a small thumbnail or icon, a title, a meta line, and a chevron. Add small "New" / "Pre-order" pills where it helps.
- A **featured latest video/reel** card: a 16:9 thumbnail with a play button overlay, a title, and a short caption, linking out.
- A row of **social icons** (Instagram, TikTok, YouTube, Pinterest — whichever I pick) as inline SVG, no icon library.
- A newsletter signup with a labelled email field. For any form that sends information, ask for my form endpoint or hosted signup URL. Use the supplied destination and show success only after it confirms receipt. A link to another service does not confirm completion. Without a destination, label the form "Demo only" beside its fields, label its button "Preview", and say "Preview complete. Nothing was sent." Never treat `localStorage` as delivery or store personal form data there.
- A subtle **footer** with a contact email.

**Design & content notes:**

- Warm, appetizing, editorial mood: cream background, a terracotta accent with a sage secondary, a serif display face (e.g. Fraunces) for headings and a clean sans (e.g. Inter) for body. Soft cards with gentle shadows and rounded corners; tasteful hover lift and a subtle entrance animation.
- Mobile-first: it should feel made for a phone — a single narrow column, big tap targets, then look great centered on desktop too.
- Write the bio and link descriptions from my answers. Omit follower counts unless I provide them.
- Use real images. Pull free food photos that fit from Unsplash, e.g. `https://images.unsplash.com/...` (food creator portrait, healthy meal-prep bowls, hands plating food, cozy kitchen herbs) or `https://picsum.photos/seed/food-links-1/240/240`, each with descriptive `alt` text.
- Keep it accessible (semantic HTML, a labelled email field, keyboard support, good contrast, `prefers-reduced-motion`). No build step — one `index.html`.

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="links"></script>
```

**When the site is ready, publish it to Spacefast:**

1. Use `./site` as the publish folder. For no-build projects, put only the finished public files in that dedicated folder. Confirm it has `index.html` at its root and no secrets, source files, `.git`, or `.spacefast` state.
2. Fetch https://spacefast.com/setup.md and follow its current direct API publishing instructions. Check for an existing Space before creating one, and follow the returned upload and polling steps.
3. Report success only when `data.next.action` is `done` and the intended version is serving. If more work is needed, report the returned next step.
4. For an anonymous publish, give me `data.claim.message` unchanged. It contains the private preview (`data.claim.url`), the owner's claim link (`data.claim.claimUrl`), and the deadline (`data.claim.expiresAt`). Keep both links private. Never print the separate `data.claim.key`.
5. Keep `data.space.id` and the returned credential securely for updates to the same Space. Follow the guide for credential recovery after claiming. Keep credentials and `.spacefast` state out of the published files, commits, and logs.

If the `sf` CLI is already installed, `sf publish ./site --wait` follows the same publishing flow. See [publishing](https://spacefast.com/docs/publish/) and [claiming a Space](https://spacefast.com/docs/anonymous-and-claim/).
