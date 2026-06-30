import { useEffect, useMemo, useState } from "react";
import { loadState, saveState } from "./lib/storage.js";
import { todayKey, longDate, today } from "./lib/date.js";
import Header from "./components/Header.jsx";
import TodayPanel from "./components/TodayPanel.jsx";
import HabitCard from "./components/HabitCard.jsx";
import HabitDetail from "./components/HabitDetail.jsx";
import HabitModal from "./components/HabitModal.jsx";
import SettingsModal from "./components/SettingsModal.jsx";

let idCounter = 0;
const newId = () => `h_${Date.now().toString(36)}_${(idCounter++).toString(36)}`;

export default function App() {
  const [state, setState] = useState(loadState);
  const [openHabitId, setOpenHabitId] = useState(null);
  const [editing, setEditing] = useState(null); // habit object or "new"
  const [showSettings, setShowSettings] = useState(false);

  // Persist on every change and keep the document theme in sync.
  useEffect(() => {
    saveState(state);
    document.documentElement.setAttribute("data-theme", state.theme);
  }, [state]);

  const tk = todayKey();

  const update = (patch) => setState((s) => ({ ...s, ...patch }));

  const setHabits = (fn) =>
    setState((s) => ({ ...s, habits: fn(s.habits) }));

  function toggleDay(habitId, key) {
    setHabits((habits) =>
      habits.map((h) => {
        if (h.id !== habitId) return h;
        const done = { ...h.done };
        if (done[key]) delete done[key];
        else done[key] = true;
        return { ...h, done };
      })
    );
  }

  function saveHabit(data) {
    setHabits((habits) => {
      const exists = habits.some((h) => h.id === data.id);
      if (exists) return habits.map((h) => (h.id === data.id ? { ...h, ...data } : h));
      return [
        ...habits,
        {
          id: newId(),
          done: {},
          createdAt: todayKey(),
          ...data,
        },
      ];
    });
    setEditing(null);
  }

  function deleteHabit(habitId) {
    setHabits((habits) => habits.filter((h) => h.id !== habitId));
    setOpenHabitId(null);
  }

  const doneTodayCount = useMemo(
    () => state.habits.filter((h) => h.done[tk]).length,
    [state.habits, tk]
  );

  const openHabit = state.habits.find((h) => h.id === openHabitId) || null;

  return (
    <div className="app">
      <Header
        title={state.title}
        theme={state.theme}
        onToggleTheme={() =>
          update({ theme: state.theme === "dark" ? "light" : "dark" })
        }
        onSettings={() => setShowSettings(true)}
      />

      <main className="app__main">
        <p className="app__date">{longDate(today())}</p>

        <TodayPanel
          habits={state.habits}
          weekStart={state.weekStart}
          todayKey={tk}
          onToggleToday={(id) => toggleDay(id, tk)}
          onAdd={() => setEditing("new")}
        />

        <section className="habits" aria-label="Your habits">
          <div className="habits__head">
            <h2>
              Your habits{" "}
              <span className="habits__count">
                {doneTodayCount}/{state.habits.length} done today
              </span>
            </h2>
            <button className="btn btn--ghost" onClick={() => setEditing("new")}>
              + New habit
            </button>
          </div>

          {state.habits.length === 0 ? (
            <div className="empty">
              <p>No habits yet.</p>
              <button className="btn btn--primary" onClick={() => setEditing("new")}>
                Add your first habit
              </button>
            </div>
          ) : (
            <div className="habits__grid">
              {state.habits.map((h) => (
                <HabitCard
                  key={h.id}
                  habit={h}
                  weekStart={state.weekStart}
                  onOpen={() => setOpenHabitId(h.id)}
                  onToggleToday={() => toggleDay(h.id, tk)}
                  todayKey={tk}
                />
              ))}
            </div>
          )}
        </section>

        <footer className="app__footer">
          <p>
            Tally keeps everything in your browser — no account, no cloud.{" "}
            <a href="https://spacefast.com" target="_blank" rel="noreferrer">
              Published with Spacefast
            </a>
            .
          </p>
        </footer>
      </main>

      {openHabit && (
        <HabitDetail
          habit={openHabit}
          weekStart={state.weekStart}
          onClose={() => setOpenHabitId(null)}
          onToggleDay={(key) => toggleDay(openHabit.id, key)}
          onEdit={() => setEditing(openHabit)}
          onDelete={() => deleteHabit(openHabit.id)}
        />
      )}

      {editing && (
        <HabitModal
          habit={editing === "new" ? null : editing}
          onSave={saveHabit}
          onClose={() => setEditing(null)}
        />
      )}

      {showSettings && (
        <SettingsModal
          state={state}
          onChange={update}
          onClose={() => setShowSettings(false)}
        />
      )}
    </div>
  );
}
