// Workflow lanes, in board order.
export const COLUMNS = [
  { id: "backlog", name: "Backlog", hint: "Ideas & not-yet-scoped" },
  { id: "todo", name: "To Do", hint: "Ready to pick up" },
  { id: "in_progress", name: "In Progress", hint: "Being worked on" },
  { id: "review", name: "In Review", hint: "Needs a second set of eyes" },
  { id: "done", name: "Done", hint: "Shipped this cycle" },
];

export const PRIORITIES = {
  urgent: { id: "urgent", name: "Urgent", rank: 0, color: "#f43f5e" },
  high: { id: "high", name: "High", rank: 1, color: "#fb923c" },
  medium: { id: "medium", name: "Medium", rank: 2, color: "#eab308" },
  low: { id: "low", name: "Low", rank: 3, color: "#64748b" },
};

export const PRIORITY_ORDER = ["urgent", "high", "medium", "low"];

export const LABELS = {
  design: { id: "design", name: "Design", color: "#c084fc" },
  frontend: { id: "frontend", name: "Frontend", color: "#38bdf8" },
  backend: { id: "backend", name: "Backend", color: "#34d399" },
  bug: { id: "bug", name: "Bug", color: "#f87171" },
  research: { id: "research", name: "Research", color: "#fbbf24" },
  growth: { id: "growth", name: "Growth", color: "#f472b6" },
  infra: { id: "infra", name: "Infra", color: "#a3a3a3" },
};

export const LABEL_ORDER = [
  "design",
  "frontend",
  "backend",
  "bug",
  "research",
  "growth",
  "infra",
];
