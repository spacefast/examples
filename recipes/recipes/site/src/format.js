// Pretty-print a scaled quantity using nice kitchen fractions.
const FRACTIONS = [
  [1 / 8, "⅛"],
  [1 / 4, "¼"],
  [1 / 3, "⅓"],
  [3 / 8, "⅜"],
  [1 / 2, "½"],
  [5 / 8, "⅝"],
  [2 / 3, "⅔"],
  [3 / 4, "¾"],
  [7 / 8, "⅞"],
];

function nearestFraction(decimal) {
  let best = "";
  let bestDiff = Infinity;
  for (const [value, glyph] of FRACTIONS) {
    const diff = Math.abs(decimal - value);
    if (diff < bestDiff) {
      bestDiff = diff;
      best = glyph;
    }
  }
  // If we're closer to a whole number, drop the fraction.
  if (decimal < 0.0625) return "";
  if (decimal > 0.9375) return "round-up";
  return best;
}

export function formatQty(qty) {
  if (qty == null) return "";
  const rounded = Math.round(qty * 1000) / 1000;
  const whole = Math.floor(rounded);
  const remainder = rounded - whole;
  const frac = nearestFraction(remainder);

  if (frac === "round-up") {
    return String(whole + 1);
  }
  if (whole === 0 && frac === "") {
    // Tiny amount — show one decimal rather than 0.
    return rounded < 0.05 ? "a pinch" : String(rounded.toFixed(2)).replace(/0+$/, "");
  }
  if (whole === 0) return frac;
  if (frac === "") return String(whole);
  return `${whole}${frac}`;
}

export function pluralizeUnit(unit, qty) {
  if (!unit) return "";
  // crude but believable pluralization for the units we use
  if (qty <= 1) return unit;
  const map = {
    "clove": "cloves",
    "whole": "whole",
    "large": "large",
    "lb": "lbs",
  };
  return map[unit] || unit;
}
