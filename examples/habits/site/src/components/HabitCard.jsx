import { useCallback } from "react";
import Heatmap from "./Heatmap.jsx";
import { paletteHex } from "../lib/color.js";
import {
  currentStreak,
  longestStreak,
  completionRate,
  targetLabel,
} from "../lib/stats.js";

export default function HabitCard({
  habit,
  weekStart,
  onOpen,
  onToggleToday,
  todayKey,
}) {
  const accent = paletteHex(habit.color);
  const done = !!habit.done[todayKey];
  const cur = currentStreak(habit);
  const best = longestStreak(habit);
  const rate = Math.round(completionRate(habit) * 100);

  const getLevel = useCallback((key) => (habit.done[key] ? 4 : 0), [habit.done]);

  return (
    <article
      className="habitcard"
      style={{ "--accent": accent }}
      onClick={onOpen}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen();
        }
      }}
      aria-label={`Open ${habit.name} details`}
    >
      <div className="habitcard__top">
        <div className="habitcard__id">
          <span className="habitcard__emoji" aria-hidden="true">
            {habit.emoji}
          </span>
          <div>
            <h3 className="habitcard__name">{habit.name}</h3>
            <p className="habitcard__target">{targetLabel(habit)}</p>
          </div>
        </div>
        <button
          type="button"
          className={`todaytoggle${done ? " todaytoggle--on" : ""}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleToday();
          }}
          aria-pressed={done}
          aria-label={done ? `Mark ${habit.name} not done today` : `Mark ${habit.name} done today`}
        >
          {done ? "✓ Done" : "Mark today"}
        </button>
      </div>

      <dl className="statrow">
        <div>
          <dt>Current</dt>
          <dd>
            <span className="statrow__num">{cur}</span>
            <span className="statrow__unit">{cur === 1 ? "day" : "days"}</span>
            {cur >= 3 && <span aria-hidden="true"> 🔥</span>}
          </dd>
        </div>
        <div>
          <dt>Longest</dt>
          <dd>
            <span className="statrow__num">{best}</span>
            <span className="statrow__unit">days</span>
          </dd>
        </div>
        <div>
          <dt>30-day</dt>
          <dd>
            <span className="statrow__num">{rate}</span>
            <span className="statrow__unit">%</span>
          </dd>
        </div>
      </dl>

      <div className="habitcard__heat" onClick={(e) => e.stopPropagation()}>
        <Heatmap
          getLevel={getLevel}
          accentHex={accent}
          weekStart={weekStart}
          weeks={20}
        />
      </div>
    </article>
  );
}
