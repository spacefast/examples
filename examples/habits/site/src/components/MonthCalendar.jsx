import { useState } from "react";
import {
  toKey,
  todayKey,
  monthShort,
  weekdayShort,
  today,
} from "../lib/date.js";

// A single-month calendar. Click any day up to today to toggle it.
export default function MonthCalendar({ habit, accent, weekStart, onToggleDay }) {
  const now = today();
  const [view, setView] = useState({
    year: now.getFullYear(),
    month: now.getMonth(),
  });

  const first = new Date(view.year, view.month, 1);
  const daysInMonth = new Date(view.year, view.month + 1, 0).getDate();
  const lead = (first.getDay() - weekStart + 7) % 7;
  const tk = todayKey();

  const cells = [];
  for (let i = 0; i < lead; i += 1) cells.push(null);
  for (let d = 1; d <= daysInMonth; d += 1) {
    cells.push(new Date(view.year, view.month, d));
  }

  const headers = [0, 1, 2, 3, 4, 5, 6].map((i) => weekdayShort((weekStart + i) % 7));

  const canGoNext =
    view.year < now.getFullYear() ||
    (view.year === now.getFullYear() && view.month < now.getMonth());

  function shift(delta) {
    setView((v) => {
      const m = v.month + delta;
      const date = new Date(v.year, m, 1);
      return { year: date.getFullYear(), month: date.getMonth() };
    });
  }

  return (
    <div className="month" style={{ "--accent": accent }}>
      <div className="month__nav">
        <button type="button" className="iconbtn" onClick={() => shift(-1)} aria-label="Previous month">
          ‹
        </button>
        <span className="month__label">
          {monthShort(view.month)} {view.year}
        </span>
        <button
          type="button"
          className="iconbtn"
          onClick={() => shift(1)}
          disabled={!canGoNext}
          aria-label="Next month"
        >
          ›
        </button>
      </div>
      <div className="month__grid month__grid--head" aria-hidden="true">
        {headers.map((h, i) => (
          <span key={i} className="month__wd">
            {h}
          </span>
        ))}
      </div>
      <div className="month__grid">
        {cells.map((date, i) => {
          if (!date) return <span key={`x${i}`} className="month__cell month__cell--empty" />;
          const key = toKey(date);
          const done = !!habit.done[key];
          const isToday = key === tk;
          const isFuture = date > now;
          return (
            <button
              key={key}
              type="button"
              className={`month__cell${done ? " month__cell--done" : ""}${
                isToday ? " month__cell--today" : ""
              }`}
              disabled={isFuture}
              onClick={() => onToggleDay(key)}
              aria-pressed={done}
              aria-label={`${monthShort(view.month)} ${date.getDate()} — ${done ? "done" : "not done"}`}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}
