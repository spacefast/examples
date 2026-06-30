import { useEffect, useMemo, useState, useCallback } from "react";
import Toolbar from "./components/Toolbar.jsx";
import Board from "./components/Board.jsx";
import ListView from "./components/ListView.jsx";
import TaskDrawer from "./components/TaskDrawer.jsx";
import { loadState, saveState, resetState } from "./lib/storage.js";
import { newId } from "./lib/util.js";
import { IconFlame, IconReset } from "./components/icons.jsx";

export default function App() {
  const [state, setState] = useState(() => loadState());
  const [view, setView] = useState(state.view || "board");
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({
    assignee: null,
    priority: null,
    label: null,
  });
  const [sort, setSort] = useState("status");
  const [openId, setOpenId] = useState(null);

  const { tasks, theme } = state;

  // Persist + reflect theme on <html>.
  useEffect(() => {
    saveState({ ...state, view });
    document.documentElement.dataset.theme = theme;
  }, [state, view, theme]);

  const setTasks = useCallback(
    (updater) =>
      setState((s) => ({
        ...s,
        tasks: typeof updater === "function" ? updater(s.tasks) : updater,
      })),
    []
  );

  const patchTask = useCallback(
    (id, fields) =>
      setTasks((ts) => ts.map((t) => (t.id === id ? { ...t, ...fields } : t))),
    [setTasks]
  );

  const moveTask = useCallback(
    (id, status) => patchTask(id, { status }),
    [patchTask]
  );

  const deleteTask = useCallback(
    (id) => {
      setTasks((ts) => ts.filter((t) => t.id !== id));
      setOpenId(null);
    },
    [setTasks]
  );

  const addTask = useCallback(
    (status = "todo") => {
      const id = newId("t");
      const task = {
        id,
        title: "",
        description: "",
        status,
        priority: "medium",
        assignee: null,
        labels: [],
        due: null,
        subtasks: [],
        comments: [],
        cover: null,
        createdAt: new Date().toISOString(),
      };
      setTasks((ts) => [task, ...ts]);
      setOpenId(id);
    },
    [setTasks]
  );

  const toggleTheme = () =>
    setState((s) => ({ ...s, theme: s.theme === "dark" ? "light" : "dark" }));

  const onReset = () => {
    if (
      window.confirm(
        "Reset Tasklane to the sample sprint? Your changes will be cleared."
      )
    ) {
      const fresh = resetState();
      setState(fresh);
      setView(fresh.view);
      setOpenId(null);
      setQuery("");
      setFilters({ assignee: null, priority: null, label: null });
    }
  };

  // Filter + search (search matches title, description, and subtask titles).
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return tasks.filter((t) => {
      if (filters.assignee && t.assignee !== filters.assignee) return false;
      if (filters.priority && t.priority !== filters.priority) return false;
      if (filters.label && !t.labels.includes(filters.label)) return false;
      if (q) {
        const hay = [
          t.title,
          t.description,
          ...(t.subtasks || []).map((s) => s.title),
        ]
          .join(" ")
          .toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
  }, [tasks, filters, query]);

  const openTask = openId ? tasks.find((t) => t.id === openId) : null;

  const stats = useMemo(() => {
    const total = tasks.length;
    const done = tasks.filter((t) => t.status === "done").length;
    const active = tasks.filter(
      (t) => t.status === "in_progress" || t.status === "review"
    ).length;
    const overdue = tasks.filter(
      (t) => t.due && new Date(t.due) < new Date() && t.status !== "done"
    ).length;
    return { total, done, active, overdue, pct: total ? Math.round((done / total) * 100) : 0 };
  }, [tasks]);

  return (
    <div className="app">
      <header className="topbar">
        <div className="brand">
          <span className="brand__mark" aria-hidden="true">
            <span /><span /><span />
          </span>
          <div className="brand__text">
            <h1>Tasklane</h1>
            <p>Orbit — Q3 mobile sprint</p>
          </div>
        </div>

        <div className="topstats">
          <div className="stat">
            <span className="stat__num">{stats.active}</span>
            <span className="stat__label">In flight</span>
          </div>
          <div className="stat">
            <span className="stat__num">{stats.done}</span>
            <span className="stat__label">Shipped</span>
          </div>
          <div className={`stat${stats.overdue ? " stat--warn" : ""}`}>
            <span className="stat__num">{stats.overdue}</span>
            <span className="stat__label">Overdue</span>
          </div>
          <div className="stat stat--ring">
            <div
              className="ring"
              style={{ "--pct": stats.pct }}
              role="img"
              aria-label={`${stats.pct}% of tasks done`}
            >
              <span>{stats.pct}%</span>
            </div>
            <span className="stat__label">Cycle done</span>
          </div>
          <button className="icon-btn icon-btn--ghost reset-btn" onClick={onReset} title="Reset to sample data">
            <IconReset size={17} />
          </button>
        </div>
      </header>

      <Toolbar
        view={view}
        setView={setView}
        theme={theme}
        toggleTheme={toggleTheme}
        query={query}
        setQuery={setQuery}
        filters={filters}
        setFilters={setFilters}
        onNew={() => addTask("todo")}
        counts={{ shown: filtered.length, total: tasks.length }}
      />

      <main className="content">
        {filtered.length === 0 ? (
          <div className="noresults">
            <IconFlame size={28} />
            <h2>Nothing matches</h2>
            <p>Try clearing a filter or your search to see more tasks.</p>
          </div>
        ) : view === "board" ? (
          <Board
            tasks={filtered}
            onOpen={setOpenId}
            onMove={moveTask}
            onAdd={addTask}
          />
        ) : (
          <ListView
            tasks={filtered}
            onOpen={setOpenId}
            sort={sort}
            setSort={setSort}
          />
        )}
      </main>

      {openTask && (
        <TaskDrawer
          task={openTask}
          onClose={() => setOpenId(null)}
          onPatch={patchTask}
          onDelete={deleteTask}
        />
      )}
    </div>
  );
}
