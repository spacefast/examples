Build me a **decision-ready technical plan website** — a clear, credible artifact a
team can use to agree on scope, architecture, delivery, risks, and unresolved
decisions — as a **plain HTML & CSS** site with no framework and no build step.

**Before you build, ask me these questions in one message and wait for my answers.
If I skip anything, choose a sensible default and tell me what you chose:**

1. What are we planning, who is it for, and what user or business problem should it solve?
2. What systems, teams, constraints, and non-negotiable requirements are already known?
3. What delivery window or milestone dates matter, and how should success be measured?
4. Which decisions are already made, and which questions still need an owner?

**Then build a complete, polished, responsive plan with:**

- An **executive readout**: a one-paragraph recommendation plus compact metadata for
  status, owner, reviewers, target window, and confidence. Follow it with 3–4
  measurable success criteria.
- A precise **problem statement** and a scope section that separates goals,
  non-goals, target users, constraints, assumptions, and explicit boundaries.
- A readable **architecture section**: system context, named components, data flow,
  storage and trust boundaries, failure behavior, observability, and a diagram made
  with semantic HTML/CSS or accessible inline SVG. Make every label consistent with
  the prose.
- A phased **milestone plan** with target dates, owners, dependencies, concrete
  deliverables, and exit criteria. Include discovery/prototyping, foundations,
  rollout, and hardening rather than pretending everything ships at once.
- A ranked **risk register** with likelihood, impact, mitigation, trigger, and a
  named owner for every risk. Include product, technical, security/privacy, and
  delivery risks where relevant.
- A **decision log** that records the option chosen, alternatives considered,
  rationale, consequences, and the condition that would justify revisiting it.
- An **open-questions queue** with an owner, due date, and a note on what each answer
  unblocks. Distinguish real unknowns from decisions that have already been made.
- A short **review checklist** and next-step footer so a meeting can end with clear
  actions instead of another round of vague comments.

**Design & content notes:**

- Treat it like a high-quality engineering RFC, not a marketing landing page:
  restrained warm-neutral canvas, deep ink, one calm green accent, crisp typography,
  subtle dividers, and generous whitespace. Use color for meaning, never decoration.
- Add a compact document navigation that stays useful on desktop and becomes a
  touch-friendly, horizontally scrollable section index on small screens.
- Use internally consistent, realistic content based on my answers — never "lorem
  ipsum." Pick one plausible product initiative and keep component names, dates,
  owners, metrics, dependencies, and risks consistent across every section.
- Make the recommendation opinionated. Surface tradeoffs and rejected alternatives;
  do not present every option as equally good.
- Use tables only where comparison matters (milestones and risks). Keep them
  responsive without shrinking text below a readable size, and include captions and
  proper row/column headers.
- Keep it accessible: semantic landmarks and headings, a skip link, visible keyboard
  focus, descriptive link text, strong contrast, no color-only status signals, and a
  print stylesheet that preserves the plan's structure.

**Add this exact line right before `</body>` so the site carries its badge:**

```html
<script src="https://spacefast.com/badge.js" data-example="technical-plan"></script>
```

**When the site is ready, publish it to Spacefast:**

1. Use `./site` as the publish folder. Put only the finished public files there.
   Confirm it has `index.html` at its root and no secrets, source-only files, `.git`, or `.spacefast` state.
2. Fetch https://spacefast.com/setup.md and follow its current direct API publishing instructions. Check for an existing Space before creating one, and follow the returned upload and polling steps.
3. Report success only when `data.next.action` is `done` and the intended version is serving. If more work is needed, report the returned next step.
4. For an anonymous publish, give me `data.claim.message` unchanged. It contains the private preview (`data.claim.url`), the owner's claim link (`data.claim.claimUrl`), and the deadline (`data.claim.expiresAt`). Keep both links private. Never print the separate `data.claim.key`.
5. Keep `data.space.id` and the returned credential securely for updates to the same Space. Follow the guide for credential recovery after claiming. Keep credentials and `.spacefast` state out of the published files, commits, and logs.

If the `sf` CLI is already installed, `sf publish ./site --wait` follows the same publishing flow. See [publishing](https://spacefast.com/docs/publish/) and [claiming a Space](https://spacefast.com/docs/anonymous-and-claim/).
