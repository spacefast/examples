import { priorityOf, labelOf } from "../lib/util.js";

export function PriorityDot({ id, withLabel = false }) {
  const p = priorityOf(id);
  return (
    <span className="pri" title={`${p.name} priority`}>
      <span className="pri__dot" style={{ background: p.color }} />
      {withLabel && <span className="pri__name">{p.name}</span>}
    </span>
  );
}

export function LabelChip({ id }) {
  const l = labelOf(id);
  if (!l) return null;
  return (
    <span className="chip" style={{ "--chip": l.color }}>
      {l.name}
    </span>
  );
}
