import { MEMBERS } from "../lib/seed.js";
import { PRIORITY_ORDER, LABEL_ORDER, PRIORITIES, LABELS } from "../lib/constants.js";
import {
  IconBoard,
  IconList,
  IconSearch,
  IconPlus,
  IconSun,
  IconMoon,
  IconClose,
} from "./icons.jsx";

export default function Toolbar({
  view,
  setView,
  theme,
  toggleTheme,
  query,
  setQuery,
  filters,
  setFilters,
  onNew,
  counts,
}) {
  const setF = (key, value) =>
    setFilters((f) => ({ ...f, [key]: f[key] === value ? null : value }));

  const activeCount =
    (filters.assignee ? 1 : 0) +
    (filters.priority ? 1 : 0) +
    (filters.label ? 1 : 0) +
    (query ? 1 : 0);

  return (
    <div className="toolbar">
      <div className="toolbar__row toolbar__row--top">
        <div className="search">
          <IconSearch size={17} />
          <input
            type="search"
            value={query}
            placeholder="Search tasks…"
            aria-label="Search tasks"
            onChange={(e) => setQuery(e.target.value)}
          />
          {query && (
            <button
              className="search__clear"
              onClick={() => setQuery("")}
              aria-label="Clear search"
            >
              <IconClose size={14} />
            </button>
          )}
        </div>

        <div className="seg-group" role="tablist" aria-label="View">
          <button
            role="tab"
            aria-selected={view === "board"}
            className={`seg${view === "board" ? " seg--on" : ""}`}
            onClick={() => setView("board")}
          >
            <IconBoard size={15} /> Board
          </button>
          <button
            role="tab"
            aria-selected={view === "list"}
            className={`seg${view === "list" ? " seg--on" : ""}`}
            onClick={() => setView("list")}
          >
            <IconList size={15} /> List
          </button>
        </div>

        <button
          className="icon-btn"
          onClick={toggleTheme}
          title={theme === "dark" ? "Switch to light" : "Switch to dark"}
          aria-label="Toggle color theme"
        >
          {theme === "dark" ? <IconSun size={18} /> : <IconMoon size={18} />}
        </button>

        <button className="btn btn--primary" onClick={() => onNew()}>
          <IconPlus size={16} /> New task
        </button>
      </div>

      <div className="toolbar__row toolbar__row--filters">
        <div className="filtergroup" aria-label="Filter by assignee">
          <span className="filtergroup__label">People</span>
          {MEMBERS.map((m) => (
            <button
              key={m.id}
              className={`facepill${filters.assignee === m.id ? " facepill--on" : ""}`}
              style={{ "--ring": m.color }}
              onClick={() => setF("assignee", m.id)}
              title={`${m.name} · ${m.role}`}
              aria-pressed={filters.assignee === m.id}
            >
              <img src={m.avatar} alt="" width={22} height={22} loading="lazy" />
              <span className="facepill__name">{m.name.split(" ")[0]}</span>
            </button>
          ))}
        </div>

        <div className="filtergroup" aria-label="Filter by priority">
          <span className="filtergroup__label">Priority</span>
          {PRIORITY_ORDER.map((id) => (
            <button
              key={id}
              className={`tagpill${filters.priority === id ? " tagpill--on" : ""}`}
              style={{ "--c": PRIORITIES[id].color }}
              onClick={() => setF("priority", id)}
              aria-pressed={filters.priority === id}
            >
              <span className="tagpill__dot" />
              {PRIORITIES[id].name}
            </button>
          ))}
        </div>

        <div className="filtergroup" aria-label="Filter by label">
          <span className="filtergroup__label">Labels</span>
          {LABEL_ORDER.map((id) => (
            <button
              key={id}
              className={`tagpill${filters.label === id ? " tagpill--on" : ""}`}
              style={{ "--c": LABELS[id].color }}
              onClick={() => setF("label", id)}
              aria-pressed={filters.label === id}
            >
              <span className="tagpill__dot" />
              {LABELS[id].name}
            </button>
          ))}
        </div>

        {activeCount > 0 && (
          <button
            className="clearfilters"
            onClick={() => {
              setFilters({ assignee: null, priority: null, label: null });
              setQuery("");
            }}
          >
            <IconClose size={13} /> Clear ({counts.shown}/{counts.total})
          </button>
        )}
      </div>
    </div>
  );
}
