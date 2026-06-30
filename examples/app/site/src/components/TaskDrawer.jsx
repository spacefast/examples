import { useEffect, useRef, useState } from "react";
import Avatar from "./Avatar.jsx";
import { MEMBERS } from "../lib/seed.js";
import {
  COLUMNS,
  PRIORITY_ORDER,
  LABEL_ORDER,
  PRIORITIES,
  LABELS,
} from "../lib/constants.js";
import { newId, timeAgo, memberById, progressOf } from "../lib/util.js";
import {
  IconClose,
  IconTrash,
  IconCheck,
  IconPlus,
  IconChecklist,
  IconChat,
} from "./icons.jsx";

export default function TaskDrawer({ task, onClose, onPatch, onDelete }) {
  const [comment, setComment] = useState("");
  const [newSub, setNewSub] = useState("");
  const titleRef = useRef(null);
  const closeRef = useRef(null);

  // Esc to close; focus the close button on open for keyboard users.
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  if (!task) return null;

  const patch = (fields) => onPatch(task.id, fields);
  const prog = progressOf(task);

  const toggleLabel = (id) => {
    const has = task.labels.includes(id);
    patch({
      labels: has ? task.labels.filter((l) => l !== id) : [...task.labels, id],
    });
  };

  const addSub = (e) => {
    e.preventDefault();
    const title = newSub.trim();
    if (!title) return;
    patch({ subtasks: [...task.subtasks, { id: newId("s"), title, done: false }] });
    setNewSub("");
  };
  const toggleSub = (id) =>
    patch({
      subtasks: task.subtasks.map((s) =>
        s.id === id ? { ...s, done: !s.done } : s
      ),
    });
  const removeSub = (id) =>
    patch({ subtasks: task.subtasks.filter((s) => s.id !== id) });

  const addComment = (e) => {
    e.preventDefault();
    const text = comment.trim();
    if (!text) return;
    patch({
      comments: [
        ...task.comments,
        { id: newId("c"), author: "m_dani", text, at: new Date().toISOString() },
      ],
    });
    setComment("");
  };

  return (
    <div className="drawer-wrap" onMouseDown={onClose}>
      <aside
        className="drawer"
        role="dialog"
        aria-modal="true"
        aria-label={`Task details: ${task.title}`}
        onMouseDown={(e) => e.stopPropagation()}
      >
        <header className="drawer__head">
          <div className="drawer__crumbs">
            <span className={`column__dot column__dot--${task.status}`} />
            {COLUMNS.find((c) => c.id === task.status)?.name}
          </div>
          <button
            ref={closeRef}
            className="icon-btn"
            onClick={onClose}
            aria-label="Close"
          >
            <IconClose size={18} />
          </button>
        </header>

        <div className="drawer__body">
          {task.cover && (
            <div className="drawer__cover">
              <img src={task.cover} alt="" />
            </div>
          )}

          <textarea
            ref={titleRef}
            className="drawer__title"
            value={task.title}
            rows={1}
            onChange={(e) => patch({ title: e.target.value })}
            aria-label="Task title"
            placeholder="Task title"
          />

          {/* Properties grid */}
          <dl className="props">
            <div className="props__row">
              <dt>Status</dt>
              <dd>
                <select
                  value={task.status}
                  onChange={(e) => patch({ status: e.target.value })}
                  className="native-select"
                  aria-label="Status"
                >
                  {COLUMNS.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.name}
                    </option>
                  ))}
                </select>
              </dd>
            </div>

            <div className="props__row">
              <dt>Assignee</dt>
              <dd className="props__assignee">
                <Avatar id={task.assignee} size={24} />
                <select
                  value={task.assignee || ""}
                  onChange={(e) => patch({ assignee: e.target.value || null })}
                  className="native-select"
                  aria-label="Assignee"
                >
                  <option value="">Unassigned</option>
                  {MEMBERS.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name} · {m.role}
                    </option>
                  ))}
                </select>
              </dd>
            </div>

            <div className="props__row">
              <dt>Priority</dt>
              <dd className="props__pri">
                {PRIORITY_ORDER.map((id) => (
                  <button
                    key={id}
                    className={`tagpill${task.priority === id ? " tagpill--on" : ""}`}
                    style={{ "--c": PRIORITIES[id].color }}
                    onClick={() => patch({ priority: id })}
                    aria-pressed={task.priority === id}
                  >
                    <span className="tagpill__dot" />
                    {PRIORITIES[id].name}
                  </button>
                ))}
              </dd>
            </div>

            <div className="props__row">
              <dt>Due</dt>
              <dd>
                <input
                  type="date"
                  className="native-select"
                  value={task.due ? task.due.slice(0, 10) : ""}
                  onChange={(e) =>
                    patch({
                      due: e.target.value
                        ? new Date(e.target.value + "T12:00:00").toISOString()
                        : null,
                    })
                  }
                  aria-label="Due date"
                />
              </dd>
            </div>

            <div className="props__row">
              <dt>Labels</dt>
              <dd className="props__labels">
                {LABEL_ORDER.map((id) => {
                  const on = task.labels.includes(id);
                  return (
                    <button
                      key={id}
                      className={`chip chip--toggle${on ? " chip--on" : ""}`}
                      style={{ "--chip": LABELS[id].color }}
                      onClick={() => toggleLabel(id)}
                      aria-pressed={on}
                    >
                      {on && <IconCheck size={12} />}
                      {LABELS[id].name}
                    </button>
                  );
                })}
              </dd>
            </div>
          </dl>

          {/* Description */}
          <section className="drawer__section">
            <h4 className="drawer__label">Description</h4>
            <textarea
              className="drawer__desc"
              value={task.description}
              placeholder="Add more detail…"
              onChange={(e) => patch({ description: e.target.value })}
              aria-label="Description"
            />
          </section>

          {/* Subtasks */}
          <section className="drawer__section">
            <h4 className="drawer__label">
              <IconChecklist size={15} /> Subtasks
              {prog && (
                <span className="drawer__labelcount">
                  {prog.done}/{prog.total}
                </span>
              )}
            </h4>
            {prog && (
              <div className="card__progress drawer__progress" aria-hidden="true">
                <span style={{ width: `${prog.pct}%` }} />
              </div>
            )}
            <ul className="subs">
              {task.subtasks.map((s) => (
                <li key={s.id} className={`sub${s.done ? " sub--done" : ""}`}>
                  <button
                    className="sub__check"
                    onClick={() => toggleSub(s.id)}
                    aria-pressed={s.done}
                    aria-label={s.done ? "Mark not done" : "Mark done"}
                  >
                    {s.done && <IconCheck size={13} />}
                  </button>
                  <span className="sub__title">{s.title}</span>
                  <button
                    className="sub__del"
                    onClick={() => removeSub(s.id)}
                    aria-label="Delete subtask"
                  >
                    <IconTrash size={14} />
                  </button>
                </li>
              ))}
            </ul>
            <form className="sub-add" onSubmit={addSub}>
              <IconPlus size={15} />
              <input
                value={newSub}
                onChange={(e) => setNewSub(e.target.value)}
                placeholder="Add a subtask…"
                aria-label="New subtask"
              />
            </form>
          </section>

          {/* Comments */}
          <section className="drawer__section">
            <h4 className="drawer__label">
              <IconChat size={15} /> Activity
              <span className="drawer__labelcount">{task.comments.length}</span>
            </h4>
            <ul className="comments">
              {task.comments.length === 0 && (
                <li className="comments__empty">No comments yet — start the thread.</li>
              )}
              {task.comments.map((c) => {
                const m = memberById(c.author);
                return (
                  <li key={c.id} className="comment">
                    <Avatar id={c.author} size={28} />
                    <div className="comment__body">
                      <div className="comment__meta">
                        <strong>{m?.name || "Someone"}</strong>
                        <span>{timeAgo(c.at)}</span>
                      </div>
                      <p>{c.text}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
            <form className="comment-add" onSubmit={addComment}>
              <Avatar id="m_dani" size={28} />
              <input
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write a comment…"
                aria-label="Write a comment"
              />
              <button className="btn btn--small" type="submit" disabled={!comment.trim()}>
                Send
              </button>
            </form>
          </section>
        </div>

        <footer className="drawer__foot">
          <button
            className="btn btn--danger-ghost"
            onClick={() => onDelete(task.id)}
          >
            <IconTrash size={15} /> Delete task
          </button>
        </footer>
      </aside>
    </div>
  );
}
