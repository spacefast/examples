import React, { useState, useCallback } from "react";
import { currencyM, currencyK, signedCurrencyM, pct } from "./format.js";

// ── Shared mouse-following tooltip ────────────────────────────────────────
export function useTooltip() {
  const [tip, setTip] = useState(null);
  const show = useCallback((content, e) => {
    setTip({ content, x: e.clientX, y: e.clientY });
  }, []);
  const move = useCallback((e) => {
    setTip((t) => (t ? { ...t, x: e.clientX, y: e.clientY } : t));
  }, []);
  const hide = useCallback(() => setTip(null), []);
  return { tip, show, move, hide };
}

export function Tooltip({ tip }) {
  if (!tip) return null;
  const style = {
    left: Math.min(tip.x + 14, window.innerWidth - 220),
    top: tip.y + 14,
  };
  return (
    <div className="tooltip" role="status" style={style}>
      {tip.content}
    </div>
  );
}

// ── ARR bridge waterfall ──────────────────────────────────────────────────
export function Waterfall({ steps }) {
  const t = useTooltip();
  const W = 760;
  const H = 320;
  const padL = 16;
  const padR = 16;
  const padTop = 28;
  const padBottom = 44;
  const plotH = H - padTop - padBottom;
  const n = steps.length;
  const gap = 18;
  const barW = (W - padL - padR - gap * (n - 1)) / n;

  // running totals to compute float positions
  let running = 0;
  const max = 15_000_000;
  const y = (v) => padTop + plotH - (v / max) * plotH;

  const bars = steps.map((s, i) => {
    const x = padL + i * (barW + gap);
    let top, bottom, displayVal, color;
    if (s.kind === "total") {
      running = s.value;
      top = s.value;
      bottom = 0;
      displayVal = currencyM(s.value);
      color = "var(--c-axis-strong)";
    } else if (s.kind === "up") {
      bottom = running;
      top = running + s.value;
      running = top;
      displayVal = signedCurrencyM(s.value);
      color = "var(--c-green)";
    } else {
      top = running;
      bottom = running + s.value; // s.value negative
      running = bottom;
      displayVal = signedCurrencyM(s.value);
      color = "var(--c-red)";
    }
    // the cumulative "running" level after this bar, in y-space
    const endLevelY = y(running);
    return { ...s, x, yTop: y(top), yBottom: y(bottom), endLevelY, displayVal, color };
  });

  const onEnter = (b) => (e) =>
    t.show(
      <>
        <strong>{b.label}</strong>
        <span>{b.displayVal}</span>
      </>,
      e,
    );

  return (
    <div className="chart-wrap">
      <svg viewBox={`0 0 ${W} ${H}`} className="chart" role="img"
        aria-label="ARR bridge waterfall from $11.0M starting to $14.2M ending ARR">
        {/* baseline */}
        <line x1={padL} x2={W - padR} y1={y(0)} y2={y(0)} className="axis-line" />
        {bars.map((b, i) => (
          <g key={b.label}>
            {/* connector: horizontal line at the cumulative level of the previous bar */}
            {i > 0 && (
              <line
                x1={bars[i - 1].x + barW}
                x2={b.x}
                y1={bars[i - 1].endLevelY}
                y2={bars[i - 1].endLevelY}
                className="connector"
              />
            )}
            <rect
              x={b.x}
              y={Math.min(b.yTop, b.yBottom)}
              width={barW}
              height={Math.max(2, Math.abs(b.yTop - b.yBottom))}
              rx="3"
              fill={b.color}
              className="wf-bar"
              tabIndex={0}
              role="img"
              aria-label={`${b.label}: ${b.displayVal}`}
              onMouseEnter={onEnter(b)}
              onMouseMove={t.move}
              onMouseLeave={t.hide}
              onFocus={(e) => onEnter(b)({ clientX: b.x + 80, clientY: 200 })}
              onBlur={t.hide}
            />
            <text x={b.x + barW / 2} y={Math.min(b.yTop, b.yBottom) - 8}
              className="wf-value" textAnchor="middle">
              {b.displayVal}
            </text>
            <text x={b.x + barW / 2} y={H - 24} className="axis-label" textAnchor="middle">
              {b.label.replace(" ARR", "")}
            </text>
            {b.kind === "total" && (
              <text x={b.x + barW / 2} y={H - 10} className="axis-sub" textAnchor="middle">
                {b.label.includes("Starting") ? "Jan 1" : "Dec 31"}
              </text>
            )}
          </g>
        ))}
      </svg>
      <Tooltip tip={t.tip} />
    </div>
  );
}

// ── MRR movement stacked bars by month ────────────────────────────────────
export function MrrMovement({ months, data, showNet }) {
  const t = useTooltip();
  const W = 760;
  const H = 300;
  const padL = 44;
  const padR = 12;
  const padTop = 16;
  const padBottom = 36;
  const plotH = H - padTop - padBottom;
  const n = months.length;
  const gap = 10;
  const groupW = (W - padL - padR - gap * (n - 1)) / n;

  const maxPos = 40_000; // headroom for positive stack
  const maxNeg = 12_000; // negative stack
  const mid = padTop + (plotH * maxPos) / (maxPos + maxNeg);
  const yPos = (v) => mid - (v / maxPos) * (mid - padTop);
  const yNeg = (v) => mid + (v / maxNeg) * (H - padBottom - mid);

  const series = [
    { key: "new", label: "New", color: "var(--c-blue)", sign: 1 },
    { key: "expansion", label: "Expansion", color: "var(--c-violet)", sign: 1 },
    { key: "contraction", label: "Contraction", color: "var(--c-amber)", sign: -1 },
    { key: "churned", label: "Churned", color: "var(--c-red)", sign: -1 },
  ];

  const netByMonth = months.map(
    (_, i) =>
      data.new[i] + data.expansion[i] + data.contraction[i] + data.churned[i],
  );

  const gridVals = [-10000, 0, 10000, 20000, 30000, 40000];

  return (
    <div className="chart-wrap">
      <svg viewBox={`0 0 ${W} ${H}`} className="chart" role="img"
        aria-label="Monthly MRR movement by component">
        {gridVals.map((g) => {
          const yy = g >= 0 ? yPos(g) : yNeg(-g);
          return (
            <g key={g}>
              <line x1={padL} x2={W - padR} y1={yy} y2={yy}
                className={g === 0 ? "axis-line" : "grid-line"} />
              <text x={padL - 8} y={yy + 3} className="axis-tick" textAnchor="end">
                {currencyK(g)}
              </text>
            </g>
          );
        })}
        {months.map((m, i) => {
          const x = padL + i * (groupW + gap);
          // positive stack
          let posTop = 0;
          let negTop = 0;
          return (
            <g key={m}>
              {series.map((s) => {
                const v = data[s.key][i];
                if (s.sign > 0) {
                  const h = (v / maxPos) * (mid - padTop);
                  const yTop = yPos(posTop + v);
                  posTop += v;
                  return (
                    <rect key={s.key} x={x} y={yTop} width={groupW} height={Math.max(1, h)}
                      fill={s.color} className="mrr-bar"
                      onMouseEnter={(e) => t.show(<><strong>{m} · {s.label}</strong><span>{currencyK(v)} MRR</span></>, e)}
                      onMouseMove={t.move} onMouseLeave={t.hide} />
                  );
                } else {
                  const av = Math.abs(v);
                  const h = (av / maxNeg) * (H - padBottom - mid);
                  const yTop = yNeg(negTop);
                  negTop += av;
                  return (
                    <rect key={s.key} x={x} y={yTop} width={groupW} height={Math.max(1, h)}
                      fill={s.color} className="mrr-bar"
                      onMouseEnter={(e) => t.show(<><strong>{m} · {s.label}</strong><span>{currencyK(v)} MRR</span></>, e)}
                      onMouseMove={t.move} onMouseLeave={t.hide} />
                  );
                }
              })}
              <text x={x + groupW / 2} y={H - 18} className="axis-label" textAnchor="middle">{m}</text>
            </g>
          );
        })}
        {/* net new line overlay */}
        {showNet && (
          <polyline
            className="net-line"
            points={months
              .map((_, i) => {
                const x = padL + i * (groupW + gap) + groupW / 2;
                return `${x},${yPos(netByMonth[i])}`;
              })
              .join(" ")}
          />
        )}
        {showNet &&
          months.map((m, i) => {
            const x = padL + i * (groupW + gap) + groupW / 2;
            return (
              <circle key={m} cx={x} cy={yPos(netByMonth[i])} r="3.5" className="net-dot"
                onMouseEnter={(e) => t.show(<><strong>{m} · Net new</strong><span>{currencyK(netByMonth[i])} MRR</span></>, e)}
                onMouseMove={t.move} onMouseLeave={t.hide} />
            );
          })}
      </svg>
      <Tooltip tip={t.tip} />
    </div>
  );
}

// ── Cohort retention heatmap ──────────────────────────────────────────────
export function CohortHeatmap({ cohorts, maxMonths }) {
  const t = useTooltip();
  const cell = 44;
  const cellH = 30;
  const labelW = 70;
  const headerH = 24;

  function color(v) {
    // map 88..114 onto red→amber→green
    if (v == null) return "transparent";
    const clamped = Math.max(88, Math.min(114, v));
    if (clamped >= 100) {
      const t2 = (clamped - 100) / 14; // 0..1
      return `rgba(52, 211, 153, ${0.18 + t2 * 0.62})`;
    }
    const t2 = (100 - clamped) / 12; // 0..1
    // amber to red
    const r = 248;
    const g = Math.round(191 - t2 * 78);
    const b = Math.round(36 + t2 * 30);
    return `rgba(${r}, ${g}, ${b}, ${0.22 + t2 * 0.55})`;
  }

  return (
    <div className="heatmap-scroll">
      <div className="heatmap" style={{ width: labelW + maxMonths * cell }}>
        <div className="heatmap-header" style={{ paddingLeft: labelW, height: headerH }}>
          {Array.from({ length: maxMonths }).map((_, i) => (
            <span key={i} className="hm-col" style={{ width: cell }}>M{i}</span>
          ))}
        </div>
        {cohorts.map((row) => (
          <div className="heatmap-row" key={row.label} style={{ height: cellH }}>
            <span className="hm-rowlabel" style={{ width: labelW }}>{row.label}</span>
            {Array.from({ length: maxMonths }).map((_, i) => {
              const v = row.values[i];
              return (
                <span
                  key={i}
                  className="hm-cell"
                  style={{ width: cell, background: color(v) }}
                  onMouseEnter={(e) =>
                    v != null &&
                    t.show(<><strong>{row.label} · month {i}</strong><span>{v}% retained</span></>, e)
                  }
                  onMouseMove={t.move}
                  onMouseLeave={t.hide}
                >
                  {v != null ? v : ""}
                </span>
              );
            })}
          </div>
        ))}
      </div>
      <Tooltip tip={t.tip} />
    </div>
  );
}

// ── FY2026 forecast area + line ───────────────────────────────────────────
export function Forecast({ quarters, arr, color }) {
  const t = useTooltip();
  const W = 760;
  const H = 280;
  const padL = 52;
  const padR = 16;
  const padTop = 20;
  const padBottom = 36;
  const plotW = W - padL - padR;
  const plotH = H - padTop - padBottom;
  const min = 13_000_000;
  const max = 21_000_000;
  const x = (i) => padL + (i / (quarters.length - 1)) * plotW;
  const y = (v) => padTop + plotH - ((v - min) / (max - min)) * plotH;

  const pts = arr.map((v, i) => [x(i), y(v)]);
  const linePath = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0]},${p[1]}`).join(" ");
  const areaPath =
    `M${pts[0][0]},${y(min)} ` +
    pts.map((p) => `L${p[0]},${p[1]}`).join(" ") +
    ` L${pts[pts.length - 1][0]},${y(min)} Z`;

  const gridVals = [14_000_000, 16_000_000, 18_000_000, 20_000_000];

  return (
    <div className="chart-wrap">
      <svg viewBox={`0 0 ${W} ${H}`} className="chart" role="img"
        aria-label="FY2026 quarterly ARR forecast">
        <defs>
          <linearGradient id="fcGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.35" />
            <stop offset="100%" stopColor={color} stopOpacity="0.02" />
          </linearGradient>
        </defs>
        {gridVals.map((g) => (
          <g key={g}>
            <line x1={padL} x2={W - padR} y1={y(g)} y2={y(g)} className="grid-line" />
            <text x={padL - 10} y={y(g) + 3} className="axis-tick" textAnchor="end">{currencyM(g)}</text>
          </g>
        ))}
        <path d={areaPath} fill="url(#fcGrad)" />
        <path d={linePath} fill="none" stroke={color} strokeWidth="2.5" className="fc-line" />
        {pts.map((p, i) => (
          <g key={i}>
            <circle cx={p[0]} cy={p[1]} r={i === 0 ? 4 : 4.5}
              fill={i === 0 ? "var(--bg)" : color} stroke={color} strokeWidth="2"
              onMouseEnter={(e) => t.show(<><strong>{quarters[i]}</strong><span>{currencyM(arr[i])} ARR</span></>, e)}
              onMouseMove={t.move} onMouseLeave={t.hide} />
            <text x={p[0]} y={H - 16} className="axis-label" textAnchor="middle">{quarters[i]}</text>
            {i === pts.length - 1 && (
              <text x={p[0]} y={p[1] - 12} className="fc-end" textAnchor="end">{currencyM(arr[i])}</text>
            )}
          </g>
        ))}
      </svg>
      <Tooltip tip={t.tip} />
    </div>
  );
}

// ── Horizontal bar (tier / segment / churn reasons) ───────────────────────
export function HBars({ rows, total, accent }) {
  const t = useTooltip();
  const max = Math.max(...rows.map((r) => r.value));
  return (
    <div className="hbars">
      {rows.map((r) => (
        <div className="hbar-row" key={r.label}
          onMouseEnter={(e) => t.show(<><strong>{r.label}</strong><span>{r.tip}</span></>, e)}
          onMouseMove={t.move} onMouseLeave={t.hide}>
          <span className="hbar-label">{r.label}</span>
          <div className="hbar-track">
            <div className="hbar-fill" style={{ width: `${(r.value / max) * 100}%`, background: r.color || accent }} />
          </div>
          <span className="hbar-value">{r.display}</span>
        </div>
      ))}
      <Tooltip tip={t.tip} />
    </div>
  );
}
