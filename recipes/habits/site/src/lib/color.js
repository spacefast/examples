// A small, fixed palette of accent "vibes". Each is a single hex; the heatmap
// derives its intensity levels by blending the accent toward the empty-cell
// color, so a habit's grid reads as one coherent gradient.

export const PALETTE = [
  { id: "green", label: "Classic green", hex: "#26a641" },
  { id: "sunset", label: "Sunset", hex: "#f97316" },
  { id: "ocean", label: "Ocean", hex: "#0ea5e9" },
  { id: "violet", label: "Violet", hex: "#8b5cf6" },
  { id: "rose", label: "Rose", hex: "#f43f5e" },
  { id: "amber", label: "Amber", hex: "#eab308" },
];

export function paletteHex(id) {
  return (PALETTE.find((p) => p.id === id) || PALETTE[0]).hex;
}

function hexToRgb(hex) {
  const h = hex.replace("#", "");
  return {
    r: parseInt(h.slice(0, 2), 16),
    g: parseInt(h.slice(2, 4), 16),
    b: parseInt(h.slice(4, 6), 16),
  };
}

// level: 1..4 (0 handled by CSS as the empty cell). 4 is the full accent.
export function levelColor(hex, level) {
  const { r, g, b } = hexToRgb(hex);
  const alpha = { 1: 0.26, 2: 0.48, 3: 0.72, 4: 1 }[level] || 1;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
