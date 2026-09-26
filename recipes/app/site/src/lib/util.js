import { MEMBERS } from "./seed.js";
import { PRIORITIES, LABELS } from "./constants.js";

export const memberById = (id) => MEMBERS.find((m) => m.id === id) || null;
export const priorityOf = (id) => PRIORITIES[id] || PRIORITIES.low;
export const labelOf = (id) => LABELS[id] || null;

export function newId(prefix = "id") {
  return `${prefix}_${Math.random().toString(36).slice(2, 9)}`;
}

// Friendly relative due-date label + an urgency bucket for color.
export function dueInfo(iso) {
  if (!iso) return null;
  const due = new Date(iso);
  const now = new Date();
  const d0 = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const d1 = new Date(due.getFullYear(), due.getMonth(), due.getDate());
  const days = Math.round((d1 - d0) / 86400000);

  let label;
  if (days === 0) label = "Today";
  else if (days === 1) label = "Tomorrow";
  else if (days === -1) label = "Yesterday";
  else if (days < 0) label = `${Math.abs(days)}d overdue`;
  else if (days <= 7) label = `In ${days}d`;
  else
    label = due.toLocaleDateString(undefined, { month: "short", day: "numeric" });

  const tone = days < 0 ? "overdue" : days <= 1 ? "soon" : "normal";
  return { label, tone, days };
}

export function formatDate(iso) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

export function timeAgo(iso) {
  if (!iso) return "";
  const diff = Date.now() - new Date(iso).getTime();
  const mins = Math.round(diff / 60000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.round(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.round(hrs / 24);
  if (days < 7) return `${days}d ago`;
  return formatDate(iso);
}

export function progressOf(task) {
  const subs = task.subtasks || [];
  if (!subs.length) return null;
  const done = subs.filter((s) => s.done).length;
  return { done, total: subs.length, pct: Math.round((done / subs.length) * 100) };
}
