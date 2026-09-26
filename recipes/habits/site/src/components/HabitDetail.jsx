import { useCallback, useState } from "react";
import Modal from "./Modal.jsx";
import Heatmap from "./Heatmap.jsx";
import MonthCalendar from "./MonthCalendar.jsx";
import { paletteHex } from "../lib/color.js";
import {
  currentStreak,
  longestStreak,
  completionRate,
  countDone,
  targetLabel,
} from "../lib/stats.js";
import { prettyDate } from "../lib/date.js";

export default function HabitDetail({
  habit,
  weekStart,
  onClose,
  onToggleDay,
  onEdit,
  onDelete,
}) {
  const accent = paletteHex(habit.color);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const getLevel = useCallback((key) => (habit.done[key] ? 4 : 0), [habit.done]);
  const describe = useCallback(
    (key) => `${prettyDate(key)} — ${habit.done[key] ? "done" : "not done"}`,
    [habit.done]
  );

  const stats = [
    { label: "Current streak", value: currentStreak(habit), unit: "days", flame: true },
    { label: "Longest streak", value: longestStreak(habit), unit: "days" },
    { label: "30-day rate", value: Math.round(completionRate(habit) * 100), unit: "%" },
    { label: "Total done", value: countDone(habit), unit: "days" },
  ];

  return (
    <Modal title={habit.name} onClose={onClose} labelledBy="detail-title">
      <div className="detail" style={{ "--accent": accent }}>
        <header className="detail__head">
          <div className="detail__id">
            <span className="detail__emoji" aria-hidden="true">
              {habit.emoji}
            </span>
            <div>
              <h2 id="detail-title">{habit.name}</h2>
              <p className="detail__target">{targetLabel(habit)}</p>
            </div>
          </div>
          <button className="iconbtn" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </header>

        <dl className="detail__stats">
          {stats.map((s) => (
            <div key={s.label}>
              <dt>{s.label}</dt>
              <dd>
                {s.value}
                <span className="detail__unit">{s.unit}</span>
                {s.flame && s.value >= 3 && <span aria-hidden="true"> 🔥</span>}
              </dd>
            </div>
          ))}
        </dl>

        <section className="detail__section">
          <h3>Last 12 months</h3>
          <p className="detail__hint">Tap any square to toggle that day.</p>
          <div className="detail__heat">
            <Heatmap
              getLevel={getLevel}
              accentHex={accent}
              weekStart={weekStart}
              onCellClick={onToggleDay}
              describe={describe}
            />
          </div>
        </section>

        <section className="detail__section">
          <h3>Calendar</h3>
          <MonthCalendar
            habit={habit}
            accent={accent}
            weekStart={weekStart}
            onToggleDay={onToggleDay}
          />
        </section>

        <footer className="detail__foot">
          <button className="btn btn--ghost" onClick={onEdit}>
            Edit habit
          </button>
          {confirmDelete ? (
            <span className="detail__confirm">
              Delete forever?
              <button className="btn btn--danger" onClick={onDelete}>
                Yes, delete
              </button>
              <button className="btn btn--ghost" onClick={() => setConfirmDelete(false)}>
                Cancel
              </button>
            </span>
          ) : (
            <button className="btn btn--danger-ghost" onClick={() => setConfirmDelete(true)}>
              Delete
            </button>
          )}
        </footer>
      </div>
    </Modal>
  );
}
