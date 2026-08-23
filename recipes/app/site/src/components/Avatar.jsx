import { memberById } from "../lib/util.js";

export default function Avatar({ id, size = 26, title }) {
  const m = memberById(id);
  if (!m) {
    return (
      <span
        className="avatar avatar--empty"
        style={{ width: size, height: size }}
        title="Unassigned"
        aria-label="Unassigned"
      />
    );
  }
  return (
    <span
      className="avatar"
      style={{ width: size, height: size, "--ring": m.color }}
      title={title || `${m.name} · ${m.role}`}
    >
      <img src={m.avatar} alt={m.name} width={size} height={size} loading="lazy" />
    </span>
  );
}
