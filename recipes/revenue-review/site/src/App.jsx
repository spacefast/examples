import React, { useState } from "react";
import {
  company,
  kpis,
  arrBridge,
  months,
  mrrMovement,
  cohorts,
  cohortMaxMonths,
  tiers,
  segments,
  churnReasons,
  atRisk,
  forecastQuarters,
  scenarios,
} from "./data.js";
import { formatKpi, currencyM, currency0, pct, pct1 } from "./format.js";
import { Waterfall, MrrMovement, CohortHeatmap, Forecast, HBars } from "./charts.jsx";

const totalArr = 14_200_000;

function Section({ id, eyebrow, title, children, sub }) {
  return (
    <section className="section" id={id}>
      <header className="section-head">
        <span className="eyebrow">{eyebrow}</span>
        <h2>{title}</h2>
        {sub && <p className="section-sub">{sub}</p>}
      </header>
      {children}
    </section>
  );
}

function Legend({ items }) {
  return (
    <ul className="legend">
      {items.map((it) => (
        <li key={it.label}>
          <span className="swatch" style={{ background: it.color }} />
          {it.label}
        </li>
      ))}
    </ul>
  );
}

export default function App() {
  const [breakdown, setBreakdown] = useState("tier");
  const [showNet, setShowNet] = useState(true);
  const [scenarioKey, setScenarioKey] = useState("base");
  const scenario = scenarios[scenarioKey];

  const breakdownRows = (breakdown === "tier" ? tiers : segments).map((r) => ({
    label: r.label,
    value: r.arr,
    color: r.color,
    display: `${currencyM(r.arr)} · ${pct(r.arr / totalArr)}`,
    tip: `${currencyM(r.arr)} ARR · ${r.customers} customers · ${currency0(r.arr / r.customers)} ACV`,
  }));

  const churnRows = churnReasons.map((r, i) => ({
    label: r.reason,
    value: r.share,
    color: `hsl(${356 - i * 8} 78% ${62 - i * 4}%)`,
    display: pct(r.share),
    tip: `${pct(r.share)} of churned ARR`,
  }));

  const atRiskTotal = atRisk.reduce((a, r) => a + r.arr, 0);

  return (
    <div className="page">
      {/* ── Masthead ─────────────────────────────────────────── */}
      <header
        className="masthead"
        style={{ "--hero": `url(${company.heroImage})` }}
      >
        <div className="masthead-inner">
          <div className="brand">
            <span className="brand-mark" aria-hidden="true" />
            <span className="brand-name">{company.name}</span>
          </div>
          <p className="confidential">{company.confidentiality}</p>
          <h1>
            {company.fiscalYear} Revenue Review
          </h1>
          <p className="masthead-sub">
            A year-end view of ARR, retention, and the path into FY2026 for{" "}
            {company.name} — {company.product}.
          </p>
          <div className="byline">
            <img src={company.preparedByPhoto} alt={`${company.preparedBy}, ${company.preparedByTitle}`} loading="lazy" />
            <div>
              <strong>Prepared by {company.preparedBy}</strong>
              <span>{company.preparedByTitle} · Reviewed {company.reviewedAt}</span>
            </div>
          </div>
        </div>
      </header>

      <main>
        {/* ── Executive summary ──────────────────────────────── */}
        <Section
          id="summary"
          eyebrow="01 · Executive summary"
          title="The headline"
          sub={`Period: ${company.period}`}
        >
          <div className="kpi-strip">
            {kpis.map((k) => (
              <div className="kpi" key={k.label}>
                <span className="kpi-label">{k.label}</span>
                <span className="kpi-value">{formatKpi(k.value, k.format)}</span>
                <span className={`kpi-delta ${k.good ? "up" : "down"}`}>
                  {k.deltaLabel}
                </span>
                <span className="kpi-note">{k.note}</span>
              </div>
            ))}
          </div>
          <p className="callout">
            Lumen closed FY2025 at <strong>{currencyM(totalArr)} ARR</strong>, up 29%
            year over year. Growth was led by the existing base — net revenue
            retention of <strong>112%</strong> means expansion outpaced contraction and
            churn — while new-logo bookings added a further {currencyM(1_880_000)}.
          </p>
        </Section>

        {/* ── ARR bridge ─────────────────────────────────────── */}
        <Section
          id="bridge"
          eyebrow="02 · ARR bridge"
          title="How we got from $11.0M to $14.2M"
          sub="Starting ARR + New + Expansion − Contraction − Churned = Ending ARR"
        >
          <div className="panel">
            <Waterfall steps={arrBridge.steps} />
            <Legend
              items={[
                { label: "Gain", color: "var(--c-green)" },
                { label: "Loss", color: "var(--c-red)" },
                { label: "Balance", color: "var(--c-axis-strong)" },
              ]}
            />
          </div>
          <div className="bridge-stats">
            <div><span>Gross new + expansion</span><strong className="pos">+{currencyM(4_280_000)}</strong></div>
            <div><span>Contraction + churn</span><strong className="neg">−{currencyM(1_080_000)}</strong></div>
            <div><span>Net change</span><strong className="pos">+{currencyM(3_200_000)}</strong></div>
            <div><span>Gross revenue retention</span><strong>90.2%</strong></div>
          </div>
        </Section>

        {/* ── MRR movement ───────────────────────────────────── */}
        <Section
          id="mrr"
          eyebrow="03 · MRR movement"
          title="Monthly MRR movement"
          sub="New and expansion stack up; contraction and churn pull down. Net of all twelve months is +$266K MRR."
        >
          <div className="panel">
            <div className="panel-controls">
              <Legend
                items={[
                  { label: "New", color: "var(--c-blue)" },
                  { label: "Expansion", color: "var(--c-violet)" },
                  { label: "Contraction", color: "var(--c-amber)" },
                  { label: "Churned", color: "var(--c-red)" },
                ]}
              />
              <label className="toggle">
                <input
                  type="checkbox"
                  checked={showNet}
                  onChange={(e) => setShowNet(e.target.checked)}
                />
                Net new line
              </label>
            </div>
            <MrrMovement months={months} data={mrrMovement} showNet={showNet} />
          </div>
        </Section>

        {/* ── Cohort heatmap ─────────────────────────────────── */}
        <Section
          id="cohorts"
          eyebrow="04 · Retention cohorts"
          title="Net revenue retention by cohort"
          sub="Each row is a signup cohort; each column is months since signup. Green means a cohort grew past its starting ARR; red means it shrank."
        >
          <div className="panel">
            <CohortHeatmap cohorts={cohorts} maxMonths={cohortMaxMonths} />
            <div className="heatmap-key">
              <span>Shrinking</span>
              <span className="gradient-bar" aria-hidden="true" />
              <span>Growing</span>
            </div>
            <p className="section-sub">
              The mature 2024-07 cohort sits at <strong>111%</strong> a year in. The
              soft <strong>2024-11</strong> cohort — a batch of self-serve SMB signups —
              is the one to watch.
            </p>
          </div>
        </Section>

        {/* ── Breakdown ──────────────────────────────────────── */}
        <Section
          id="breakdown"
          eyebrow="05 · Revenue mix"
          title="Where the revenue lives"
          sub="The same $14.2M, cut two ways."
        >
          <div className="panel">
            <div className="segmented" role="tablist" aria-label="Breakdown dimension">
              <button
                role="tab"
                aria-selected={breakdown === "tier"}
                className={breakdown === "tier" ? "active" : ""}
                onClick={() => setBreakdown("tier")}
              >
                By plan tier
              </button>
              <button
                role="tab"
                aria-selected={breakdown === "segment"}
                className={breakdown === "segment" ? "active" : ""}
                onClick={() => setBreakdown("segment")}
              >
                By segment
              </button>
            </div>
            <HBars rows={breakdownRows} accent="var(--c-violet)" />
            <p className="section-sub">
              {breakdown === "tier"
                ? "Enterprise and Growth together are 88% of ARR on a fraction of the logos — 82 Enterprise accounts average $78K ACV."
                : "Mid-Market and Enterprise drive 82% of ARR. SMB is high-volume, low-ACV, and carries most of the logo churn."}
            </p>
          </div>
        </Section>

        {/* ── Churn ──────────────────────────────────────────── */}
        <Section
          id="churn"
          eyebrow="06 · Churn analysis"
          title="Why customers left"
          sub={`${currencyM(1_080_000)} of ARR was lost to contraction and churn this year.`}
        >
          <div className="two-col">
            <div className="panel">
              <h3 className="panel-title">Stated churn reasons</h3>
              <HBars rows={churnRows} accent="var(--c-red)" />
            </div>
            <div className="panel">
              <h3 className="panel-title">
                Logos at risk
                <span className="panel-title-tag">{currency0(atRiskTotal)} ARR · {atRisk.length} accounts</span>
              </h3>
              <div className="table-scroll">
                <table className="risk-table">
                  <thead>
                    <tr>
                      <th>Account</th>
                      <th>Segment</th>
                      <th className="num">ARR</th>
                      <th className="num">Health</th>
                      <th>Renews</th>
                    </tr>
                  </thead>
                  <tbody>
                    {atRisk.map((r) => (
                      <tr key={r.account}>
                        <td>
                          <span className="acct">{r.account}</span>
                          <span className="acct-reason">{r.reason}</span>
                        </td>
                        <td>{r.segment}</td>
                        <td className="num">{currency0(r.arr)}</td>
                        <td className="num">
                          <span className={`health ${r.health < 40 ? "bad" : "warn"}`}>{r.health}</span>
                        </td>
                        <td className="when">{r.renews}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </Section>

        {/* ── Forecast ───────────────────────────────────────── */}
        <Section
          id="forecast"
          eyebrow="07 · FY2026 forecast"
          title="The year ahead"
          sub="Three scenarios off the $14.2M base. Toggle to compare."
        >
          <div className="panel">
            <div className="segmented" role="tablist" aria-label="Forecast scenario">
              {Object.entries(scenarios).map(([key, s]) => (
                <button
                  key={key}
                  role="tab"
                  aria-selected={scenarioKey === key}
                  className={scenarioKey === key ? "active" : ""}
                  onClick={() => setScenarioKey(key)}
                >
                  {s.label}
                </button>
              ))}
            </div>

            <div className="forecast-head">
              <div>
                <span className="forecast-target-label">{scenario.label} case · Ending FY2026 ARR</span>
                <span className="forecast-target" style={{ color: scenarioColor(scenarioKey) }}>
                  {currencyM(scenario.endingArr)}
                </span>
                <span className="forecast-growth">+{pct(scenario.growth)} YoY</span>
              </div>
              <p className="forecast-blurb">{scenario.blurb}</p>
            </div>

            <Forecast
              quarters={forecastQuarters}
              arr={scenario.arr}
              color={scenarioColor(scenarioKey)}
            />

            <div className="assumptions">
              {scenario.assumptions.map(([k, v]) => (
                <div key={k}>
                  <span>{k}</span>
                  <strong>{v}</strong>
                </div>
              ))}
            </div>
          </div>
        </Section>
      </main>

      <footer className="site-footer">
        <div className="footer-inner">
          <div>
            <strong>{company.name}</strong> · {company.fiscalYear} Revenue Review
            <span className="footer-muted"> — {company.confidentiality}</span>
          </div>
          <p className="footer-muted">
            Figures are illustrative and prepared for internal board discussion.
            Built as a Spacefast example.
          </p>
        </div>
      </footer>
    </div>
  );
}

function scenarioColor(key) {
  return {
    base: "var(--c-violet)",
    bull: "var(--c-green)",
    bear: "var(--c-amber)",
  }[key];
}
