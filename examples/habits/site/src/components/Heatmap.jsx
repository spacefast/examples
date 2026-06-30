import { useMemo } from "react";
import {
  today,
  addDays,
  toKey,
  startOfWeek,
  monthShort,
  weekdayShort,
  prettyDate,
} from "../lib/date.js";
import { levelColor } from "../lib/color.js";

/**
 * A GitHub-style contribution grid.
 *
 * @param {(key:string)=>number} getLevel  0..4 intensity for a day.
 * @param {string} accentHex                full-intensity color.
 * @param {number} weekStart                0 = Sunday, 1 = Monday.
 * @param {number} weeks                    columns to render (~53 = a year).
 * @param {(key:string)=>void} [onCellClick]
 * @param {(key:string,level:number)=>string} [describe] aria/title text.
 */
export default function Heatmap({
  getLevel,
  accentHex,
  weekStart = 1,
  weeks = 53,
  onCellClick,
  describe,
}) {
  const { columns, monthLabels } = useMemo(() => {
    const end = today();
    const firstDay = startOfWeek(addDays(end, -(weeks - 1) * 7), weekStart);
    const cols = [];
    const labels = [];
    let lastMonth = -1;

    for (let w = 0; w < weeks; w += 1) {
      const colStart = addDays(firstDay, w * 7);
      const days = [];
      for (let d = 0; d < 7; d += 1) {
        const date = addDays(colStart, d);
        const inRange = date <= end;
        const key = toKey(date);
        days.push({ key, date, inRange, level: inRange ? getLevel(key) : 0 });
      }
      // Month label sits above the first column whose top cell starts a month.
      const top = days[0].date;
      if (top.getMonth() !== lastMonth) {
        lastMonth = top.getMonth();
        labels.push({ col: w, text: monthShort(top.getMonth()) });
      }
      cols.push(days);
    }
    return { columns: cols, monthLabels: labels };
  }, [getLevel, weekStart, weeks]);

  const weekdayRows = [0, 1, 2, 3, 4, 5, 6].map(
    (i) => (weekStart + i) % 7
  );

  return (
    <div className="heatmap" role="img" aria-label="Daily completion heatmap">
      <div className="heatmap__months" aria-hidden="true">
        {monthLabels.map((m) => (
          <span
            key={`${m.col}-${m.text}`}
            className="heatmap__month"
            style={{ gridColumn: m.col + 1 }}
          >
            {m.text}
          </span>
        ))}
      </div>
      <div className="heatmap__body">
        <div className="heatmap__weekdays" aria-hidden="true">
          {weekdayRows.map((wd, i) => (
            <span key={wd} className="heatmap__weekday">
              {i % 2 === 1 ? weekdayShort(wd) : ""}
            </span>
          ))}
        </div>
        <div className="heatmap__grid">
          {columns.map((days, w) => (
            <div className="heatmap__col" key={w}>
              {days.map((day) => {
                const style =
                  day.level > 0
                    ? { background: levelColor(accentHex, day.level) }
                    : undefined;
                const title = describe
                  ? describe(day.key, day.level)
                  : prettyDate(day.key);
                if (!day.inRange) {
                  return (
                    <span
                      key={day.key}
                      className="heatmap__cell heatmap__cell--future"
                      aria-hidden="true"
                    />
                  );
                }
                const interactive = !!onCellClick;
                const Tag = interactive ? "button" : "span";
                return (
                  <Tag
                    key={day.key}
                    type={interactive ? "button" : undefined}
                    className={`heatmap__cell heatmap__cell--l${day.level}${
                      interactive ? " heatmap__cell--btn" : ""
                    }`}
                    style={style}
                    title={title}
                    aria-label={interactive ? title : undefined}
                    onClick={interactive ? () => onCellClick(day.key) : undefined}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
      <Legend accentHex={accentHex} />
    </div>
  );
}

function Legend({ accentHex }) {
  return (
    <div className="heatmap__legend" aria-hidden="true">
      <span>Less</span>
      <span className="heatmap__cell heatmap__cell--l0" />
      {[1, 2, 3, 4].map((l) => (
        <span
          key={l}
          className="heatmap__cell"
          style={{ background: levelColor(accentHex, l) }}
        />
      ))}
      <span>More</span>
    </div>
  );
}
