import { useMemo, useCallback } from "react";
import Heatmap from "./Heatmap.jsx";
import { targetLabel } from "../lib/stats.js";
import { prettyDate } from "../lib/date.js";

// The top panel: today's checklist on the left, a combined "all habits"
// year heatmap on the right whose intensity is how many habits you finished
// each day.
export default function TodayPanel({
  habits,
  weekStart,
  todayKey,
  onToggleToday,
  onAdd,
}) {
  const total = habits.length;
  const doneCount = habits.filter((h) => h.done[todayKey]).length;
  const pct = total ? Math.round((doneCount / total) * 100) : 0;

  // Per-day count of completed habits across all habits.
  const dayCounts = useMemo(() => {
    const counts = {};
    for (const h of habits) {
      for (const key of Object.keys(h.done)) {
        counts[key] = (counts[key] || 0) + 1;
      }
    }
    return counts;
  }, [habits]);

  const getLevel = useCallback(
    (key) => {
      const c = dayCounts[key] || 0;
      if (c === 0 || total === 0) return 0;
      if (c >= total) return 4;
      const frac = c / total;
      if (frac >= 0.75) return 4;
      if (frac >= 0.5) return 3;
      if (frac >= 0.25) return 2;
      return 1;
    },
    [dayCounts, total]
  );

  const describe = useCallback(
    (key) => {
      const c = dayCounts[key] || 0;
      return `${prettyDate(key)} — ${c} of ${total} habit${total === 1 ? "" : "s"}`;
    },
    [dayCounts, total]
  );

  const headline =
    total === 0
      ? "Add a habit to begin"
      : doneCount === total
        ? "Perfect day — everything's done 🎉"
        : doneCount === 0
          ? "Nothing checked off yet"
          : `${doneCount} of ${total} done — keep going`;

  return (
    <section className="today card" aria-label="Today">
      <div className="today__checklist">
        <div className="today__heading">
          <div>
            <h2>Today</h2>
            <p className="today__headline">{headline}</p>
          </div>
          <ProgressRing pct={pct} />
        </div>

        <ul className="checklist">
          {habits.map((h) => {
            const done = !!h.done[todayKey];
            return (
              <li key={h.id}>
                <button
                  type="button"
                  className={`checkrow${done ? " checkrow--done" : ""}`}
                  onClick={() => onToggleToday(h.id)}
                  aria-pressed={done}
                >
                  <span className="checkrow__box" aria-hidden="true">
                    {done ? "✓" : ""}
                  </span>
                  <span className="checkrow__emoji" aria-hidden="true">
                    {h.emoji}
                  </span>
                  <span className="checkrow__text">
                    <span className="checkrow__name">{h.name}</span>
                    <span className="checkrow__target">{targetLabel(h)}</span>
                  </span>
                </button>
              </li>
            );
          })}
        </ul>

        <button className="btn btn--ghost today__add" onClick={onAdd}>
          + Add habit
        </button>
      </div>

      <div className="today__overview">
        <div className="today__overview-head">
          <h3>Your year</h3>
          <p>How many habits you finished each day</p>
        </div>
        <div className="today__heatwrap">
          <Heatmap
            getLevel={getLevel}
            accentHex="#26a641"
            weekStart={weekStart}
            describe={describe}
          />
        </div>
      </div>
    </section>
  );
}

function ProgressRing({ pct }) {
  const r = 26;
  const c = 2 * Math.PI * r;
  const offset = c - (pct / 100) * c;
  return (
    <div className="ring" role="img" aria-label={`${pct}% of today's habits done`}>
      <svg viewBox="0 0 64 64" width="64" height="64">
        <circle className="ring__track" cx="32" cy="32" r={r} />
        <circle
          className="ring__value"
          cx="32"
          cy="32"
          r={r}
          strokeDasharray={c}
          strokeDashoffset={offset}
          transform="rotate(-90 32 32)"
        />
      </svg>
      <span className="ring__label">{pct}%</span>
    </div>
  );
}
