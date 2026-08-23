import { todayKey, toKey, addDays, fromKey, diffDays } from "./date.js";

// A habit's `done` is a plain object: { "YYYY-MM-DD": true }.
export function isDone(habit, key) {
  return !!habit.done[key];
}

export function countDone(habit) {
  return Object.keys(habit.done).length;
}

// Current streak: consecutive completed days ending today. If today isn't done
// yet, the streak is still "alive" from yesterday — so it counts back from
// yesterday and marking today simply extends it.
export function currentStreak(habit) {
  const tk = todayKey();
  let cursor = isDone(habit, tk) ? fromKey(tk) : addDays(fromKey(tk), -1);
  let streak = 0;
  while (isDone(habit, toKey(cursor))) {
    streak += 1;
    cursor = addDays(cursor, -1);
  }
  return streak;
}

// Longest streak ever: walk the sorted set of completed days and find the
// longest run of consecutive calendar days.
export function longestStreak(habit) {
  const keys = Object.keys(habit.done).sort();
  if (keys.length === 0) return 0;
  let best = 1;
  let run = 1;
  for (let i = 1; i < keys.length; i += 1) {
    if (diffDays(keys[i - 1], keys[i]) === 1) {
      run += 1;
      best = Math.max(best, run);
    } else {
      run = 1;
    }
  }
  return best;
}

// Completion rate over the trailing `window` days, measured against the habit's
// target. Daily habits expect 1/day; "X times per week" habits expect X per
// rolling 7-day span. Returns a 0..1 fraction.
export function completionRate(habit, windowDays = 30) {
  const target = expectedInWindow(habit, windowDays);
  if (target <= 0) return 0;
  let hits = 0;
  let cursor = fromKey(todayKey());
  for (let i = 0; i < windowDays; i += 1) {
    if (isDone(habit, toKey(cursor))) hits += 1;
    cursor = addDays(cursor, -1);
  }
  return Math.min(1, hits / target);
}

function expectedInWindow(habit, windowDays) {
  if (habit.frequency.type === "weekly") {
    return (windowDays / 7) * habit.frequency.timesPerWeek;
  }
  return windowDays;
}

// How many times the habit has been completed in the current calendar week
// (used for "X times per week" targets).
export function doneThisWeek(habit, weekStartDate) {
  let hits = 0;
  let cursor = new Date(weekStartDate);
  for (let i = 0; i < 7; i += 1) {
    if (isDone(habit, toKey(cursor))) hits += 1;
    cursor = addDays(cursor, 1);
  }
  return hits;
}

export function targetLabel(habit) {
  if (habit.frequency.type === "weekly") {
    const n = habit.frequency.timesPerWeek;
    return `${n}× / week`;
  }
  return "Every day";
}
