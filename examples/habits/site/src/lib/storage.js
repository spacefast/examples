import { seedState } from "./seed.js";

const KEY = "tally.v1";

export function loadState() {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) {
      const seeded = seedState();
      saveState(seeded);
      return seeded;
    }
    const parsed = JSON.parse(raw);
    // Light migration / defaults guard.
    return {
      title: parsed.title || "My Habits",
      weekStart: parsed.weekStart ?? 1,
      theme: parsed.theme || "dark",
      habits: Array.isArray(parsed.habits) ? parsed.habits : [],
    };
  } catch {
    return seedState();
  }
}

export function saveState(state) {
  try {
    localStorage.setItem(KEY, JSON.stringify(state));
  } catch {
    /* storage full or blocked — app still works in-memory for the session */
  }
}

export function resetState() {
  localStorage.removeItem(KEY);
}
