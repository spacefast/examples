import { useState } from "react";
import { neighborhood } from "../data.js";

const LEVELS = {
  main: {
    label: "Main level",
    rooms: [
      { x: 20, y: 20, w: 150, h: 110, name: "Great Room" },
      { x: 175, y: 20, w: 120, h: 110, name: "Kitchen" },
      { x: 300, y: 20, w: 90, h: 110, name: "Dining" },
      { x: 20, y: 135, w: 110, h: 95, name: "Office" },
      { x: 135, y: 135, w: 95, h: 95, name: "Foyer" },
      { x: 235, y: 135, w: 75, h: 95, name: "Powder" },
      { x: 315, y: 135, w: 75, h: 95, name: "Pantry" },
    ],
    terrace: { x: 20, y: 235, w: 370, h: 45, name: "Ocean Terrace" },
  },
  upper: {
    label: "Upper level",
    rooms: [
      { x: 20, y: 20, w: 200, h: 130, name: "Primary Suite" },
      { x: 225, y: 20, w: 165, h: 65, name: "Primary Bath" },
      { x: 225, y: 90, w: 80, h: 60, name: "Closet" },
      { x: 310, y: 90, w: 80, h: 60, name: "Sitting" },
      { x: 20, y: 155, w: 115, h: 105, name: "Bedroom 2" },
      { x: 140, y: 155, w: 115, h: 105, name: "Bedroom 3" },
      { x: 260, y: 155, w: 130, h: 105, name: "Bedroom 4" },
    ],
    terrace: null,
  },
  lower: {
    label: "Lower level",
    rooms: [
      { x: 20, y: 20, w: 150, h: 120, name: "Wine Room" },
      { x: 175, y: 20, w: 215, h: 120, name: "Gym & Sauna" },
      { x: 20, y: 145, w: 175, h: 115, name: "Media Lounge" },
      { x: 200, y: 145, w: 190, h: 115, name: "Bedroom 5 / Guest" },
    ],
    terrace: null,
  },
};

export default function FloorPlan() {
  const [level, setLevel] = useState("main");
  const data = LEVELS[level];

  return (
    <section id="floorplan" className="section section--tint" aria-labelledby="fp-h">
      <div className="section-head">
        <p className="eyebrow">Layout</p>
        <h2 id="fp-h">Floor plan & neighborhood</h2>
        <p className="lede">
          Three levels, each opening to light and air. Switch levels to walk the
          home.
        </p>
      </div>

      <div className="fp">
        <div className="fp-plan">
          <div className="seg seg--levels" role="tablist" aria-label="Floor level">
            {Object.entries(LEVELS).map(([key, v]) => (
              <button
                key={key}
                role="tab"
                aria-selected={level === key}
                className={`seg__btn${level === key ? " is-active" : ""}`}
                onClick={() => setLevel(key)}
              >
                {v.label}
              </button>
            ))}
          </div>

          <svg
            className="fp-svg"
            viewBox="0 0 410 300"
            role="img"
            aria-label={`Schematic floor plan of the ${data.label.toLowerCase()}`}
          >
            <rect
              x="10"
              y="10"
              width="390"
              height="280"
              rx="8"
              className="fp-shell"
            />
            {data.rooms.map((r) => (
              <g key={r.name} className="fp-room">
                <rect x={r.x} y={r.y} width={r.w} height={r.h} rx="4" />
                <text x={r.x + r.w / 2} y={r.y + r.h / 2}>
                  {r.name}
                </text>
              </g>
            ))}
            {data.terrace && (
              <g className="fp-room fp-room--terrace">
                <rect
                  x={data.terrace.x}
                  y={data.terrace.y}
                  width={data.terrace.w}
                  height={data.terrace.h}
                  rx="4"
                />
                <text
                  x={data.terrace.x + data.terrace.w / 2}
                  y={data.terrace.y + data.terrace.h / 2}
                >
                  {data.terrace.name}
                </text>
              </g>
            )}
          </svg>
          <p className="fp-note">Schematic — not to scale. Survey on request.</p>
        </div>

        <aside className="hood">
          <h3>{neighborhood.name}</h3>
          <p className="hood__blurb">{neighborhood.blurb}</p>
          <div className="hood__walk">
            <span className="hood__score">{neighborhood.walkScore}</span>
            <span className="hood__score-label">
              Walk Score · most errands on foot
            </span>
          </div>
          <ul className="hood__list">
            {neighborhood.points.map(([place, dist]) => (
              <li key={place}>
                <span>{place}</span>
                <span className="hood__dist">{dist}</span>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </section>
  );
}
