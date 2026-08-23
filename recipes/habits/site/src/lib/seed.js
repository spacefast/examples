import { today, addDays, toKey } from "./date.js";

// Generates a believable year of history the first time the app loads, so the
// heatmaps look lived-in instead of empty. Each habit gets its own rhythm:
// a baseline probability, a weekend bump or dip, and a guaranteed recent
// streak so the "current streak" number lands on something motivating.
function buildHistory({ days = 364, base, weekendDelta = 0, recentStreak = 0 }) {
  const done = {};
  const t = today();
  for (let i = days; i >= 0; i -= 1) {
    const d = addDays(t, -i);
    const isWeekend = d.getDay() === 0 || d.getDay() === 6;
    const p = Math.min(0.96, Math.max(0.04, base + (isWeekend ? weekendDelta : 0)));
    if (Math.random() < p) done[toKey(d)] = true;
  }
  // Force a clean, unbroken recent streak ending yesterday (today is left for
  // the user to check off and feel the streak grow).
  for (let i = 1; i <= recentStreak; i += 1) {
    done[toKey(addDays(t, -i))] = true;
  }
  return done;
}

export function seedState() {
  return {
    title: "Alex's Habits",
    weekStart: 1, // Monday
    theme: "dark",
    habits: [
      {
        id: "h_workout",
        name: "Workout",
        emoji: "🏋️",
        color: "sunset",
        frequency: { type: "weekly", timesPerWeek: 4 },
        createdAt: toKey(addDays(today(), -364)),
        done: buildHistory({ base: 0.55, weekendDelta: 0.18, recentStreak: 3 }),
      },
      {
        id: "h_read",
        name: "Read 20 pages",
        emoji: "📚",
        color: "violet",
        frequency: { type: "daily" },
        createdAt: toKey(addDays(today(), -364)),
        done: buildHistory({ base: 0.78, weekendDelta: -0.05, recentStreak: 9 }),
      },
      {
        id: "h_meditate",
        name: "Meditate",
        emoji: "🧘",
        color: "ocean",
        frequency: { type: "daily" },
        createdAt: toKey(addDays(today(), -364)),
        done: buildHistory({ base: 0.7, recentStreak: 5 }),
      },
      {
        id: "h_water",
        name: "Drink water",
        emoji: "💧",
        color: "green",
        frequency: { type: "daily" },
        createdAt: toKey(addDays(today(), -364)),
        done: buildHistory({ base: 0.86, recentStreak: 14 }),
      },
    ],
  };
}
