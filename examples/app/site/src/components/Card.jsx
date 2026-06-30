import Avatar from "./Avatar.jsx";
import { PriorityDot, LabelChip } from "./Badges.jsx";
import { IconChat, IconChecklist, IconClock } from "./icons.jsx";
import { dueInfo, progressOf } from "../lib/util.js";

export default function Card({ task, onOpen, onDragStart, onDragEnd, dragging }) {
  const due = dueInfo(task.due);
  const prog = progressOf(task);
  const comments = task.comments?.length || 0;

  return (
    <article
      className={`card${dragging ? " card--dragging" : ""}`}
      draggable
      onDragStart={(e) => onDragStart(e, task)}
      onDragEnd={onDragEnd}
      onClick={() => onOpen(task.id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onOpen(task.id);
        }
      }}
      tabIndex={0}
      role="button"
      aria-label={`Open task: ${task.title}`}
    >
      {task.cover && (
        <div className="card__cover">
          <img src={task.cover} alt="" loading="lazy" />
        </div>
      )}

      {task.labels?.length > 0 && (
        <div className="card__labels">
          {task.labels.map((l) => (
            <LabelChip key={l} id={l} />
          ))}
        </div>
      )}

      <h3 className="card__title">{task.title}</h3>

      <div className="card__meta">
        <PriorityDot id={task.priority} withLabel />
        <div className="card__meta-right">
          {prog && (
            <span className="meta-pill" title={`${prog.done}/${prog.total} subtasks done`}>
              <IconChecklist size={13} />
              {prog.done}/{prog.total}
            </span>
          )}
          {comments > 0 && (
            <span className="meta-pill" title={`${comments} comment${comments > 1 ? "s" : ""}`}>
              <IconChat size={13} />
              {comments}
            </span>
          )}
        </div>
      </div>

      {prog && (
        <div className="card__progress" aria-hidden="true">
          <span style={{ width: `${prog.pct}%` }} />
        </div>
      )}

      <div className="card__footer">
        {due ? (
          <span className={`due due--${due.tone}`}>
            <IconClock size={13} />
            {due.label}
          </span>
        ) : (
          <span className="due due--none">No date</span>
        )}
        <Avatar id={task.assignee} size={24} />
      </div>
    </article>
  );
}
