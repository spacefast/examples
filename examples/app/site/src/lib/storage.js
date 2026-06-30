import { seedTasks } from "./seed.js";

const KEY = "tasklane.v1";

export function loadState() {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed && Array.isArray(parsed.tasks)) return parsed;
    }
  } catch {
    // ignore corrupt state and fall through to a fresh seed
  }
  const fresh = { tasks: seedTasks(), theme: "dark", view: "board" };
  saveState(fresh);
  return fresh;
}

export function saveState(state) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    // storage may be full or unavailable (private mode) — degrade gracefully
  }
}

export function resetState() {
  const fresh = { tasks: seedTasks(), theme: "dark", view: "board" };
  saveState(fresh);
  return fresh;
}
