import { useState } from "react";
import Modal from "./Modal.jsx";
import { resetState } from "../lib/storage.js";

export default function SettingsModal({ state, onChange, onClose }) {
  const [title, setTitle] = useState(state.title);
  const [confirmReset, setConfirmReset] = useState(false);

  return (
    <Modal title="Settings" onClose={onClose} labelledBy="settings-title">
      <div className="form">
        <div className="form__head">
          <h2 id="settings-title">Settings</h2>
          <button type="button" className="iconbtn" onClick={onClose} aria-label="Close">
            ✕
          </button>
        </div>

        <label className="field">
          <span className="field__label">Tracker title</span>
          <input
            className="field__input"
            type="text"
            value={title}
            maxLength={40}
            onChange={(e) => setTitle(e.target.value)}
            onBlur={() => onChange({ title: title.trim() || "My Habits" })}
          />
        </label>

        <fieldset className="field">
          <legend className="field__label">Week starts on</legend>
          <div className="seg">
            <button
              type="button"
              className={`seg__btn${state.weekStart === 1 ? " seg__btn--on" : ""}`}
              onClick={() => onChange({ weekStart: 1 })}
              aria-pressed={state.weekStart === 1}
            >
              Monday
            </button>
            <button
              type="button"
              className={`seg__btn${state.weekStart === 0 ? " seg__btn--on" : ""}`}
              onClick={() => onChange({ weekStart: 0 })}
              aria-pressed={state.weekStart === 0}
            >
              Sunday
            </button>
          </div>
        </fieldset>

        <fieldset className="field">
          <legend className="field__label">Theme</legend>
          <div className="seg">
            <button
              type="button"
              className={`seg__btn${state.theme === "dark" ? " seg__btn--on" : ""}`}
              onClick={() => onChange({ theme: "dark" })}
              aria-pressed={state.theme === "dark"}
            >
              Dark
            </button>
            <button
              type="button"
              className={`seg__btn${state.theme === "light" ? " seg__btn--on" : ""}`}
              onClick={() => onChange({ theme: "light" })}
              aria-pressed={state.theme === "light"}
            >
              Light
            </button>
          </div>
        </fieldset>

        <div className="field">
          <span className="field__label">Data</span>
          <p className="settings__note">
            Everything lives in this browser only. Clearing your data can't be undone.
          </p>
          {confirmReset ? (
            <div className="settings__confirm">
              <button
                className="btn btn--danger"
                onClick={() => {
                  resetState();
                  window.location.reload();
                }}
              >
                Erase everything
              </button>
              <button className="btn btn--ghost" onClick={() => setConfirmReset(false)}>
                Cancel
              </button>
            </div>
          ) : (
            <button className="btn btn--danger-ghost" onClick={() => setConfirmReset(true)}>
              Reset all data
            </button>
          )}
        </div>

        <div className="form__actions">
          <button type="button" className="btn btn--primary" onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </Modal>
  );
}
