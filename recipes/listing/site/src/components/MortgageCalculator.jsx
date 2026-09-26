import { useMemo, useState } from "react";
import { property, fmtUSD } from "../data.js";

export default function MortgageCalculator() {
  const [price, setPrice] = useState(property.price);
  const [downPct, setDownPct] = useState(20);
  const [rate, setRate] = useState(6.5);
  const [term, setTerm] = useState(30);

  const result = useMemo(() => {
    const down = (price * downPct) / 100;
    const principal = price - down;
    const monthlyRate = rate / 100 / 12;
    const n = term * 12;
    const piti =
      monthlyRate === 0
        ? principal / n
        : (principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -n));
    // Rough monthly carrying costs for a CA coastal estate.
    const tax = (price * 0.0118) / 12; // ~1.18% effective
    const insurance = (price * 0.0035) / 12;
    const total = piti + tax + insurance;
    return { down, principal, piti, tax, insurance, total };
  }, [price, downPct, rate, term]);

  const row = (label, value, strong = false) => (
    <div className={`calc-row${strong ? " calc-row--total" : ""}`}>
      <span>{label}</span>
      <span>{fmtUSD(value)}</span>
    </div>
  );

  return (
    <section id="estimate" className="section section--tint" aria-labelledby="calc-h">
      <div className="section-head">
        <p className="eyebrow">Affordability</p>
        <h2 id="calc-h">Estimate the monthly payment</h2>
        <p className="lede">
          Move the sliders to model a purchase. Numbers are estimates for
          planning only — your lender will have the final word.
        </p>
      </div>

      <div className="calc">
        <form className="calc-controls" aria-label="Mortgage estimator inputs">
          <label className="field">
            <span className="field__label">
              Home price <strong>{fmtUSD(price)}</strong>
            </span>
            <input
              type="range"
              min={2000000}
              max={6000000}
              step={25000}
              value={price}
              onChange={(e) => setPrice(Number(e.target.value))}
            />
          </label>

          <label className="field">
            <span className="field__label">
              Down payment <strong>{downPct}% · {fmtUSD(result.down)}</strong>
            </span>
            <input
              type="range"
              min={5}
              max={60}
              step={1}
              value={downPct}
              onChange={(e) => setDownPct(Number(e.target.value))}
            />
          </label>

          <label className="field">
            <span className="field__label">
              Interest rate <strong>{rate.toFixed(2)}%</strong>
            </span>
            <input
              type="range"
              min={3}
              max={9}
              step={0.05}
              value={rate}
              onChange={(e) => setRate(Number(e.target.value))}
            />
          </label>

          <fieldset className="field field--term">
            <legend className="field__label">Loan term</legend>
            <div className="seg">
              {[15, 20, 30].map((t) => (
                <button
                  type="button"
                  key={t}
                  className={`seg__btn${term === t ? " is-active" : ""}`}
                  aria-pressed={term === t}
                  onClick={() => setTerm(t)}
                >
                  {t} yr
                </button>
              ))}
            </div>
          </fieldset>
        </form>

        <div className="calc-out" aria-live="polite">
          <p className="calc-out__label">Estimated monthly payment</p>
          <p className="calc-out__big">{fmtUSD(result.total)}</p>
          <div className="calc-breakdown">
            {row("Principal & interest", result.piti)}
            {row("Property tax (est.)", result.tax)}
            {row("Insurance (est.)", result.insurance)}
            {row("Total / month", result.total, true)}
          </div>
          <p className="calc-out__fine">
            Loan amount {fmtUSD(result.principal)} over {term} years at{" "}
            {rate.toFixed(2)}%. Taxes and insurance estimated from the price.
          </p>
        </div>
      </div>
    </section>
  );
}
