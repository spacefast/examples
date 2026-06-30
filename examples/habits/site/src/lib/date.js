// All date math is done in the browser's local timezone so a "day" matches the
// user's day. Keys are "YYYY-MM-DD" strings — stable, sortable, timezone-safe.

export function toKey(d) {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function fromKey(key) {
  const [y, m, d] = key.split("-").map(Number);
  return new Date(y, m - 1, d);
}

export function startOfDay(d) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

export function today() {
  return startOfDay(new Date());
}

export function todayKey() {
  return toKey(today());
}

export function addDays(d, n) {
  const r = new Date(d);
  r.setDate(r.getDate() + n);
  return r;
}

export function diffDays(aKey, bKey) {
  // whole days from a -> b
  const a = fromKey(aKey);
  const b = fromKey(bKey);
  return Math.round((b - a) / 86400000);
}

const WEEKDAY_SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
const MONTH_SHORT = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export function weekdayShort(i) {
  return WEEKDAY_SHORT[i];
}

export function monthShort(i) {
  return MONTH_SHORT[i];
}

export function prettyDate(key) {
  const d = fromKey(key);
  return `${WEEKDAY_SHORT[d.getDay()]}, ${MONTH_SHORT[d.getMonth()]} ${d.getDate()}`;
}

export function longDate(d) {
  const days = [
    "Sunday", "Monday", "Tuesday", "Wednesday",
    "Thursday", "Friday", "Saturday",
  ];
  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December",
  ];
  return `${days[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()}`;
}

// Snap a date back to the most recent week-start (0 = Sunday, 1 = Monday).
export function startOfWeek(d, weekStart) {
  const diff = (d.getDay() - weekStart + 7) % 7;
  return addDays(startOfDay(d), -diff);
}
