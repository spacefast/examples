// A believable sprint for a small product team building "Orbit", a mobile
// habit-and-focus app. Realistic titles, owners, priorities, and threads —
// no lorem ipsum. Dates are generated relative to today so the board always
// looks current.

export const MEMBERS = [
  { id: "m_dani", name: "Dani Okafor", role: "PM", initials: "DO", color: "#6d5efc", avatar: "https://picsum.photos/seed/tasklane-dani/96/96" },
  { id: "m_mara", name: "Mara Lindqvist", role: "Design", initials: "ML", color: "#c084fc", avatar: "https://picsum.photos/seed/tasklane-mara/96/96" },
  { id: "m_theo", name: "Theo Park", role: "Frontend", initials: "TP", color: "#38bdf8", avatar: "https://picsum.photos/seed/tasklane-theo/96/96" },
  { id: "m_ines", name: "Inés Vidal", role: "Backend", initials: "IV", color: "#34d399", avatar: "https://picsum.photos/seed/tasklane-ines/96/96" },
  { id: "m_sam", name: "Sam Greer", role: "Growth", initials: "SG", color: "#f472b6", avatar: "https://picsum.photos/seed/tasklane-sam/96/96" },
];

function day(offset) {
  const d = new Date();
  d.setHours(12, 0, 0, 0);
  d.setDate(d.getDate() + offset);
  return d.toISOString();
}

let _n = 0;
const uid = (p) => `${p}_${(_n++).toString(36)}${Date.now().toString(36).slice(-3)}`;

export function seedTasks() {
  _n = 0;
  const t = [];
  const push = (task) =>
    t.push({
      labels: [],
      subtasks: [],
      comments: [],
      cover: null,
      createdAt: day(-21),
      ...task,
      id: uid("t"),
    });

  // ---- Done ----
  push({
    title: "Ship onboarding redesign to 100%",
    status: "done",
    priority: "high",
    assignee: "m_dani",
    labels: ["growth", "frontend"],
    due: day(-2),
    description:
      "Roll the new 3-step onboarding from the 50% holdout to everyone. Watch activation for 48h before closing.",
    subtasks: [
      { id: "s1", title: "Flip the flag to 100%", done: true },
      { id: "s2", title: "Confirm activation dashboard is green", done: true },
      { id: "s3", title: "Post results in #orbit-launch", done: true },
    ],
    comments: [
      { id: "c1", author: "m_sam", text: "Activation up 6.4pts vs the old flow. Calling it.", at: day(-2) },
    ],
  });
  push({
    title: "Fix crash on cold start (Android 13)",
    status: "done",
    priority: "urgent",
    assignee: "m_ines",
    labels: ["bug", "backend"],
    due: day(-5),
    description:
      "Null session token on cold start was throwing before the splash finished. Guard the token read and retry the refresh once.",
    subtasks: [
      { id: "s1", title: "Reproduce on Pixel 6a", done: true },
      { id: "s2", title: "Add retry + regression test", done: true },
    ],
    comments: [{ id: "c1", author: "m_theo", text: "Nice — crash-free sessions back to 99.9%.", at: day(-4) }],
  });

  // ---- In Review ----
  push({
    title: "Streak freeze: design + copy review",
    status: "review",
    priority: "medium",
    assignee: "m_mara",
    labels: ["design"],
    due: day(1),
    cover: "https://picsum.photos/seed/tasklane-streak/640/360",
    description:
      "Let people protect a streak with one free freeze per week. Need the empty state, the confirm sheet, and the post-freeze toast reviewed.",
    subtasks: [
      { id: "s1", title: "Confirm-sheet copy", done: true },
      { id: "s2", title: "Toast + haptics spec", done: true },
      { id: "s3", title: "Dark-mode contrast pass", done: false },
    ],
    comments: [
      { id: "c1", author: "m_dani", text: "Love it. One ask: make the '1 left this week' counter feel rewarding, not scarce.", at: day(0) },
    ],
  });
  push({
    title: "API: paginate the activity feed",
    status: "review",
    priority: "high",
    assignee: "m_ines",
    labels: ["backend"],
    due: day(0),
    description:
      "Feed returns the full history today and is slow past ~500 events. Add cursor pagination (limit 40) and keep ordering stable.",
    subtasks: [
      { id: "s1", title: "Cursor schema + endpoint", done: true },
      { id: "s2", title: "Client infinite-scroll wiring", done: false },
    ],
    comments: [{ id: "c1", author: "m_theo", text: "Pulling this into the client now — looks clean.", at: day(0) }],
  });

  // ---- In Progress ----
  push({
    title: "Build the weekly review screen",
    status: "in_progress",
    priority: "high",
    assignee: "m_theo",
    labels: ["frontend", "design"],
    due: day(2),
    cover: "https://picsum.photos/seed/tasklane-review/640/360",
    description:
      "Sunday recap: habits completed, best streak, focus minutes, and a single 'one thing to try next week' nudge. Animate the numbers in.",
    subtasks: [
      { id: "s1", title: "Static layout from Figma", done: true },
      { id: "s2", title: "Count-up animation", done: true },
      { id: "s3", title: "Wire real metrics", done: false },
      { id: "s4", title: "Empty state (first week)", done: false },
    ],
    comments: [
      { id: "c1", author: "m_mara", text: "Spacing on the stat tiles is 4px tight — bumped the spec.", at: day(-1) },
    ],
  });
  push({
    title: "Push notifications: quiet hours",
    status: "in_progress",
    priority: "medium",
    assignee: "m_ines",
    labels: ["backend", "infra"],
    due: day(4),
    description:
      "Respect a per-user quiet-hours window. Reminders inside the window get queued and sent at the next allowed minute.",
    subtasks: [
      { id: "s1", title: "Window model + timezone handling", done: true },
      { id: "s2", title: "Queue + delayed dispatch worker", done: false },
    ],
    comments: [],
  });
  push({
    title: "Audit empty states across the app",
    status: "in_progress",
    priority: "low",
    assignee: "m_mara",
    labels: ["design"],
    due: day(6),
    description:
      "Several screens drop to a blank list with no guidance. Catalog every empty state and propose a friendly default with one clear action.",
    subtasks: [
      { id: "s1", title: "Screenshot every empty screen", done: true },
      { id: "s2", title: "Draft default illustrations + copy", done: false },
    ],
    comments: [],
  });

  // ---- To Do ----
  push({
    title: "Add Apple Health import for sleep",
    status: "todo",
    priority: "high",
    assignee: "m_theo",
    labels: ["frontend", "research"],
    due: day(5),
    description:
      "Pull last-night sleep from HealthKit so the morning check-in can pre-fill. Read-only scope; ask permission with a clear value prop.",
    subtasks: [
      { id: "s1", title: "Confirm HealthKit entitlement", done: false },
      { id: "s2", title: "Permission priming screen", done: false },
    ],
    comments: [{ id: "c1", author: "m_dani", text: "Keep this read-only for v1 — no writing back to Health.", at: day(-1) }],
  });
  push({
    title: "Referral loop: 'invite a focus buddy'",
    status: "todo",
    priority: "medium",
    assignee: "m_sam",
    labels: ["growth"],
    due: day(8),
    cover: "https://picsum.photos/seed/tasklane-referral/640/360",
    description:
      "Both sides get a 1-week Pro trial when an invite is accepted. Needs a share sheet, a deep link, and an attribution event.",
    subtasks: [
      { id: "s1", title: "Define reward + abuse limits", done: false },
      { id: "s2", title: "Deep-link + attribution plan", done: false },
    ],
    comments: [],
  });
  push({
    title: "Settings: export my data (JSON)",
    status: "todo",
    priority: "low",
    assignee: "m_ines",
    labels: ["backend"],
    due: day(10),
    description:
      "Self-serve export of habits, check-ins, and notes as a single JSON file. Generate server-side and email a signed download link.",
    subtasks: [],
    comments: [],
  });

  // ---- Backlog ----
  push({
    title: "Explore widget for the home screen",
    status: "backlog",
    priority: "medium",
    assignee: "m_mara",
    labels: ["research", "design"],
    due: null,
    description:
      "A small widget showing today's habits and a tap-to-complete ring. Investigate the interaction limits before committing.",
    subtasks: [{ id: "s1", title: "Survey what's possible on each OS", done: false }],
    comments: [],
  });
  push({
    title: "Localize for German and Spanish",
    status: "backlog",
    priority: "low",
    assignee: "m_dani",
    labels: ["growth", "research"],
    due: null,
    description:
      "Top two non-English markets by waitlist. Extract strings, wire a translation provider, and pseudo-localize to catch layout breaks.",
    subtasks: [],
    comments: [],
  });
  push({
    title: "Investigate flaky sync on poor networks",
    status: "backlog",
    priority: "high",
    assignee: "m_ines",
    labels: ["bug", "infra"],
    due: null,
    description:
      "A few users report check-ins that silently fail to sync on the subway. Add offline queue + conflict resolution; reproduce with a throttled connection first.",
    subtasks: [],
    comments: [{ id: "c1", author: "m_sam", text: "Two App Store reviews mention this — worth bumping.", at: day(-3) }],
  });

  return t;
}
