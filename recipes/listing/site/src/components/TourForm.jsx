import { useState } from "react";
import { property, agent } from "../data.js";

const TIMES = ["Morning", "Midday", "Afternoon", "Evening"];

function nextDates(count = 6) {
  const out = [];
  const d = new Date();
  d.setDate(d.getDate() + 1);
  while (out.length < count) {
    const day = d.getDay();
    if (day !== 0) {
      out.push({
        value: d.toISOString().slice(0, 10),
        label: d.toLocaleDateString("en-US", {
          weekday: "short",
          month: "short",
          day: "numeric",
        }),
      });
    }
    d.setDate(d.getDate() + 1);
  }
  return out;
}

export default function TourForm() {
  const dates = nextDates();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    date: dates[0].value,
    time: "Afternoon",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  if (sent) {
    const chosen = dates.find((d) => d.value === form.date);
    return (
      <section id="tour" className="section" aria-labelledby="tour-h">
        <div className="tour-success" role="status">
          <div className="tour-success__check" aria-hidden="true">
            &#10003;
          </div>
          <h2 id="tour-h">You're on the calendar, {form.name.split(" ")[0]}.</h2>
          <p>
            {agent.name} will confirm your private showing of {property.address}{" "}
            for <strong>{chosen ? chosen.label : form.date}</strong>,{" "}
            <strong>{form.time.toLowerCase()}</strong>. Expect a text at{" "}
            {form.phone || "your number"} within the hour.
          </p>
          <button className="btn btn--ghost" onClick={() => setSent(false)}>
            Request another time
          </button>
        </div>
      </section>
    );
  }

  return (
    <section id="tour" className="section" aria-labelledby="tour-h">
      <div className="tour">
        <div className="tour-copy">
          <p className="eyebrow">Private showing</p>
          <h2 id="tour-h">Schedule a tour</h2>
          <p className="lede">
            See {property.address} in person. Pick a window that works and{" "}
            {agent.name.split(" ")[0]} will confirm by text — usually within the
            hour.
          </p>

          <div className="agent-card">
            <img
              src={agent.headshot}
              alt={`Portrait of ${agent.name}, listing agent`}
              className="agent-card__photo"
            />
            <div>
              <p className="agent-card__name">{agent.name}</p>
              <p className="agent-card__title">{agent.title}</p>
              <p className="agent-card__broker">{agent.brokerage}</p>
              <p className="agent-card__contact">
                <a href={agent.phoneHref}>{agent.phone}</a>
                <span aria-hidden="true"> · </span>
                <a href={`mailto:${agent.email}`}>{agent.email}</a>
              </p>
              <p className="agent-card__blurb">{agent.blurb}</p>
            </div>
          </div>
        </div>

        <form className="tour-form" onSubmit={submit} noValidate>
          <div className="grid-2">
            <label className="field">
              <span className="field__label">Full name</span>
              <input
                type="text"
                required
                autoComplete="name"
                value={form.name}
                onChange={set("name")}
                placeholder="Alex Romero"
              />
            </label>
            <label className="field">
              <span className="field__label">Phone</span>
              <input
                type="tel"
                required
                autoComplete="tel"
                value={form.phone}
                onChange={set("phone")}
                placeholder="(619) 555-0148"
              />
            </label>
          </div>

          <label className="field">
            <span className="field__label">Email</span>
            <input
              type="email"
              required
              autoComplete="email"
              value={form.email}
              onChange={set("email")}
              placeholder="alex@example.com"
            />
          </label>

          <div className="grid-2">
            <label className="field">
              <span className="field__label">Preferred date</span>
              <select value={form.date} onChange={set("date")}>
                {dates.map((d) => (
                  <option key={d.value} value={d.value}>
                    {d.label}
                  </option>
                ))}
              </select>
            </label>
            <label className="field">
              <span className="field__label">Time of day</span>
              <select value={form.time} onChange={set("time")}>
                {TIMES.map((t) => (
                  <option key={t} value={t}>
                    {t}
                  </option>
                ))}
              </select>
            </label>
          </div>

          <label className="field">
            <span className="field__label">Anything we should know? (optional)</span>
            <textarea
              rows={3}
              value={form.message}
              onChange={set("message")}
              placeholder="We're relocating from Austin and would love to see the primary suite and pool area."
            />
          </label>

          <button type="submit" className="btn btn--primary btn--block">
            Request this showing
          </button>
          <p className="form-fine">
            By requesting a tour you agree to be contacted about this property.
            No spam, ever.
          </p>
        </form>
      </div>
    </section>
  );
}
