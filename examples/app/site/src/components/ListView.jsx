import { useState } from "react";
import Avatar from "./Avatar.jsx";
import { PriorityDot, LabelChip } from "./Badges.jsx";
import { COLUMNS, PRIORITIES } from "../lib/constants.js";
import { dueInfo, progressOf, priorityOf } from "../lib/util.js";
import { IconChevron, IconClock } from "./icons.jsx";

const columnName = (id) => COLUMNS.find((c) => c.id === id)?.name || id;

export default function ListView({ tasks, onOpen, sort, setSort }) {
  const [collapsed, setCollapsed] = useState({});

  const sorted = [...tasks].sort((a, b) => {
    if (sort === "priority")
      return priorityOf(a.priority).rank - priorityOf(b.priority).rank;
    if (sort === "due") {
      const av = a.due ? new Date(a.due).getTime() : Infinity;
      const bv = b.due ? new Date(b.due).getTime() : Infinity;
      return av - bv;
    }
    return 0; // "status" — keep board order, grouping handles it
  });

  // Group by status when sorting by status; otherwise one flat group.
  const groups =
    sort === "status"
      ? COLUMNS.map((c) => ({
          key: c.id,
          name: c.name,
          items: sorted.filter((t) => t.status === c.id),
        })).filter((g) => g.items.length)
      : [{ key: "all", name: null, items: sorted }];

  return (
    <div className="list">
      <div className="list__toolbar">
        <span className="list__sortlabel">Sort by</span>
        {[
          ["status", "Status"],
          ["priority", "Priority"],
          ["due", "Due date"],
        ].map(([id, label]) => (
          <button
            key={id}
            className={`seg${sort === id ? " seg--on" : ""}`}
            onClick={() => setSort(id)}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="list__head" aria-hidden="true">
        <span>Task</span>
        <span>Status</span>
        <span>Priority</span>
        <span>Assignee</span>
        <span>Due</span>
      </div>

      {groups.map((g) => (
        <div key={g.key} className="list__group">
          {g.name && (
            <button
              className="list__grouphead"
              onClick={() =>
                setCollapsed((c) => ({ ...c, [g.key]: !c[g.key] }))
              }
            >
              <IconChevron
                size={15}
                style={{
                  transform: collapsed[g.key] ? "none" : "rotate(90deg)",
                  transition: "transform .15s",
                }}
              />
              {g.name}
              <span className="list__groupcount">{g.items.length}</span>
            </button>
          )}
          {!collapsed[g.key] &&
            g.items.map((t) => {
              const due = dueInfo(t.due);
              const prog = progressOf(t);
              return (
                <button
                  key={t.id}
                  className="row"
                  onClick={() => onOpen(t.id)}
                  aria-label={`Open task: ${t.title}`}
                >
                  <span className="row__task">
                    <span className="row__title">{t.title}</span>
                    <span className="row__sub">
                      {t.labels.map((l) => (
                        <LabelChip key={l} id={l} />
                      ))}
                      {prog && (
                        <span className="row__prog">
                          {prog.done}/{prog.total}
                        </span>
                      )}
                    </span>
                  </span>
                  <span className="row__status" data-status={t.status}>
                    {columnName(t.status)}
                  </span>
                  <span className="row__pri">
                    <PriorityDot id={t.priority} withLabel />
                  </span>
                  <span className="row__assignee">
                    <Avatar id={t.assignee} size={24} />
                  </span>
                  <span className="row__due">
                    {due ? (
                      <span className={`due due--${due.tone}`}>
                        <IconClock size={12} />
                        {due.label}
                      </span>
                    ) : (
                      <span className="due due--none">—</span>
                    )}
                  </span>
                </button>
              );
            })}
        </div>
      ))}
    </div>
  );
}
