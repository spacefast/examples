import { useState } from "react";
import Modal from "./Modal.jsx";
import { PALETTE, paletteHex } from "../lib/color.js";

const EMOJI_CHOICES = [
  "🏋️", "📚", "🧘", "💧", "🏃", "🥗", "😴", "✍️",
  "🎸", "🧹", "💸", "🌱", "☀️", "🦷", "📵", "🎯",
];

export default function HabitModal({ habit, onSave, onClose }) {
  const editing = !!habit;
  const [name, setName] = useState(habit?.name || "");
  const [emoji, setEmoji] = useState(habit?.emoji || "🎯");
  const [color, setColor] = useState(habit?.color || "green");
  const [freqType, setFreqType] = useState(habit?.frequency?.type || "daily");
  const [timesPerWeek, setTimesPerWeek] = useState(
    habit?.frequency?.timesPerWeek || 3
  );
  const [error, setError] = useState("");

  function submit(e) {
    e.preventDefault();
    const trimmed = name.trim();
    if (!trimmed) {
      setError("Give your habit a name.");
      return;
    }
    const frequency =
      freqType === "weekly"
        ? { type: "weekly", timesPerWeek: Number(timesPerWeek) }
        : { type: "daily" };
    onSave({ ...(habit || {}), name: trimmed, emoji, color, frequency });
  }

  return (
    <Modal title={editing ? "Edit habit" : "New habit"} onClose={onClose} labelledBy="form-title">
      <form className="form" onSubmit={submit}>
        <div className="form__head">
          <h2 id="form-title">{editing ? "Edit habit" : "New habit"}</h2>
          <button type="button" className="iconbtn" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <label className="field">
          <span className="field__label">Habit name</span>
          <input
            className="field__input"
            type="text"
            value={name}
            maxLength={40}
            placeholder="e.g. Stretch, Journal, No phone before noon"
            autoFocus
            onChange={(e) => {
              setName(e.target.value);
              setError("");
            }}
          />
        </label>

        <fieldset className="field">
          <legend className="field__label">Icon</legend>
          <div className="emojigrid" role="radiogroup" aria-label="Habit icon">
            {EMOJI_CHOICES.map((e) => (
              <button
                type="button"
                key={e}
                className={`emojigrid__btn${emoji === e ? " emojigrid__btn--on" : ""}`}
                onClick={() => setEmoji(e)}
                aria-pressed={emoji === e}
                aria-label={`Icon ${e}`}
              >
                {e}
              </button>
            ))}
          </div>
        </fieldset>

        <fieldset className="field">
          <legend className="field__label">Heatmap color</legend>
          <div className="swatches" role="radiogroup" aria-label="Heatmap color">
            {PALETTE.map((p) => (
              <button
                type="button"
                key={p.id}
                className={`swatch${color === p.id ? " swatch--on" : ""}`}
                style={{ background: paletteHex(p.id) }}
                onClick={() => setColor(p.id)}
                aria-pressed={color === p.id}
                aria-label={p.label}
                title={p.label}
              />
            ))}
          </div>
        </fieldset>

        <fieldset className="field">
          <legend className="field__label">How often?</legend>
          <div className="seg">
            <button
              type="button"
              className={`seg__btn${freqType === "daily" ? " seg__btn--on" : ""}`}
              onClick={() => setFreqType("daily")}
              aria-pressed={freqType === "daily"}
            >
              Every day
            </button>
            <button
              type="button"
              className={`seg__btn${freqType === "weekly" ? " seg__btn--on" : ""}`}
              onClick={() => setFreqType("weekly")}
              aria-pressed={freqType === "weekly"}
            >
              Times per week
            </button>
          </div>
          {freqType === "weekly" && (
            <label className="field__inline">
              <span>Target</span>
              <select
                className="field__select"
                value={timesPerWeek}
                onChange={(e) => setTimesPerWeek(e.target.value)}
              >
                {[1, 2, 3, 4, 5, 6].map((n) => (
                  <option key={n} value={n}>
                    {n}× per week
                  </option>
                ))}
              </select>
            </label>
          )}
        </fieldset>

        {error && <p className="form__error" role="alert">{error}</p>}

        <div className="form__actions">
          <button type="button" className="btn btn--ghost" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" className="btn btn--primary">
            {editing ? "Save changes" : "Add habit"}
          </button>
        </div>
      </form>
    </Modal>
  );
}
