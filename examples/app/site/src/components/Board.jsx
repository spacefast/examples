import { useState } from "react";
import Card from "./Card.jsx";
import { COLUMNS } from "../lib/constants.js";
import { IconPlus } from "./icons.jsx";

export default function Board({ tasks, onOpen, onMove, onAdd }) {
  const [drag, setDrag] = useState(null); // dragging task id
  const [over, setOver] = useState(null); // column being hovered

  const byColumn = (status) => tasks.filter((t) => t.status === status);

  const onDragStart = (e, task) => {
    setDrag(task.id);
    e.dataTransfer.effectAllowed = "move";
    try {
      e.dataTransfer.setData("text/plain", task.id);
    } catch {
      /* some browsers are picky; state already holds the id */
    }
  };
  const onDragEnd = () => {
    setDrag(null);
    setOver(null);
  };
  const onDrop = (e, status) => {
    e.preventDefault();
    if (drag) onMove(drag, status);
    setDrag(null);
    setOver(null);
  };

  return (
    <div className="board" role="list">
      {COLUMNS.map((col) => {
        const items = byColumn(col.id);
        return (
          <section
            key={col.id}
            role="listitem"
            className={`column${over === col.id ? " column--over" : ""}`}
            onDragOver={(e) => {
              e.preventDefault();
              setOver(col.id);
            }}
            onDragLeave={(e) => {
              if (!e.currentTarget.contains(e.relatedTarget)) setOver(null);
            }}
            onDrop={(e) => onDrop(e, col.id)}
            aria-label={`${col.name}, ${items.length} tasks`}
          >
            <header className="column__head">
              <div className="column__title">
                <span className={`column__dot column__dot--${col.id}`} />
                <h2>{col.name}</h2>
                <span className="column__count">{items.length}</span>
              </div>
              <button
                className="icon-btn icon-btn--ghost"
                onClick={() => onAdd(col.id)}
                title={`Add a task to ${col.name}`}
                aria-label={`Add a task to ${col.name}`}
              >
                <IconPlus size={17} />
              </button>
            </header>

            <div className="column__body">
              {items.length === 0 && (
                <button className="column__empty" onClick={() => onAdd(col.id)}>
                  <IconPlus size={15} /> Add a task
                </button>
              )}
              {items.map((task) => (
                <Card
                  key={task.id}
                  task={task}
                  dragging={drag === task.id}
                  onOpen={onOpen}
                  onDragStart={onDragStart}
                  onDragEnd={onDragEnd}
                />
              ))}
            </div>
          </section>
        );
      })}
    </div>
  );
}
