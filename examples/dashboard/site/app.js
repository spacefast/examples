/* Brightside Coffee — Growth Dashboard
 * Self-contained, no framework. A seeded-but-lively data model drives a single
 * auto-refreshing screen: KPI tiles, a 30-day revenue trend, a traffic donut,
 * a top-products table, a channel leaderboard, and email-list growth.
 *
 * To wire this to real data, replace the functions in the DATA MODEL section
 * with calls to your analytics / commerce API and keep the render() functions.
 */

/* ----------------------------- config ----------------------------- */
const CONFIG = {
  brand: "Brightside Coffee",
  currency: "USD",
  locale: "en-US",
  monthlyTarget: 185000, // revenue goal for the current month
  refreshMs: 8000,
};

/* ----------------------------- helpers ----------------------------- */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
const clamp = (n, lo, hi) => Math.min(hi, Math.max(lo, n));

const money = (n, frac = 0) =>
  new Intl.NumberFormat(CONFIG.locale, {
    style: "currency",
    currency: CONFIG.currency,
    maximumFractionDigits: frac,
    minimumFractionDigits: frac,
  }).format(n);

const compact = (n) =>
  new Intl.NumberFormat(CONFIG.locale, { notation: "compact", maximumFractionDigits: 1 }).format(n);

const num = (n) => new Intl.NumberFormat(CONFIG.locale).format(Math.round(n));

// deterministic pseudo-random so the seeded history is stable per day
function seeded(seed) {
  let s = seed % 2147483647;
  if (s <= 0) s += 2147483646;
  return () => (s = (s * 16807) % 2147483647) / 2147483647;
}

const todayKey = () => {
  const d = new Date();
  return d.getFullYear() * 10000 + (d.getMonth() + 1) * 100 + d.getDate();
};

/* ----------------------------- DATA MODEL -----------------------------
 * Builds a believable history once, then nudges "today" each refresh so the
 * board feels alive without ever looking random. */

const rnd = seeded(todayKey());

// 30 days of daily revenue, weekend dip + gentle upward trend + noise
function buildRevenueSeries() {
  const days = 30;
  const series = [];
  const now = new Date();
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date(now);
    d.setDate(now.getDate() - i);
    const dow = d.getDay();
    const weekend = dow === 0 || dow === 6 ? 0.82 : 1;
    const trend = 1 + (days - 1 - i) * 0.012; // ~ +36% across the month
    const promo = i === 11 || i === 4 ? 1.34 : 1; // a couple of campaign spikes
    const base = 5200 * weekend * trend * promo;
    const noise = 0.86 + rnd() * 0.3;
    series.push({ date: d, revenue: Math.round(base * noise) });
  }
  return series;
}

const REVENUE = buildRevenueSeries();

function movingAverage(arr, win) {
  return arr.map((_, i) => {
    const start = Math.max(0, i - win + 1);
    const slice = arr.slice(start, i + 1);
    return slice.reduce((a, b) => a + b.revenue, 0) / slice.length;
  });
}

const PRODUCTS = [
  { name: "Solstice Blend", tag: "Medium · whole bean 12oz", seed: "solstice", base: 412, price: 21 },
  { name: "Midnight Espresso", tag: "Dark · whole bean 12oz", seed: "midnight", base: 356, price: 22 },
  { name: "Ethiopia Yirgacheffe", tag: "Single origin · 12oz", seed: "yirga", base: 268, price: 26 },
  { name: "Cold Brew Concentrate", tag: "1L bottle · 2-pack", seed: "coldbrew", base: 244, price: 28 },
  { name: "Decaf Sunset", tag: "Swiss water · 12oz", seed: "decaf", base: 173, price: 21 },
];

const CHANNELS = [
  { name: "Email & SMS", spend: 6200, seed: "email" },
  { name: "Meta Ads", spend: 18400, seed: "meta" },
  { name: "Google Search", spend: 12900, seed: "google" },
  { name: "Influencer / UGC", spend: 9300, seed: "ugc" },
  { name: "Organic Social", spend: 1800, seed: "social" },
];

const SOURCES = [
  { name: "Organic search", key: "organic", color: getCSS("--organic") },
  { name: "Paid", key: "paid", color: getCSS("--paid") },
  { name: "Email", key: "email", color: getCSS("--email") },
  { name: "Social", key: "social", color: getCSS("--social") },
  { name: "Direct", key: "direct", color: getCSS("--direct") },
];

function getCSS(varName) {
  return getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
}

// Live state that gets nudged each refresh
const state = {
  revenueToday: REVENUE[REVENUE.length - 1].revenue,
  ordersToday: 0,
  sessions: 0,
  emailTotal: 24863,
  emailNew: 0,
  sourceShares: [0.41, 0.23, 0.16, 0.12, 0.08], // organic, paid, email, social, direct
  history: {
    revenueToday: [],
    orders: [],
    aov: [],
    conversion: [],
    email: [],
  },
};

function nudge() {
  // revenue today drifts upward through the "day"
  state.revenueToday = Math.round(state.revenueToday * (1 + (rnd() - 0.42) * 0.012));
  const aov = 36 + rnd() * 9; // $36–45
  state.ordersToday = Math.round(state.revenueToday / aov);
  state.sessions = Math.round(state.ordersToday / (0.031 + rnd() * 0.004)); // ~3.1–3.5% conv
  state.emailNew = 18 + Math.round(rnd() * 26);
  state.emailTotal += Math.round(rnd() * 4);

  // keep small rolling sparkline histories
  pushHist("revenueToday", state.revenueToday, 24);
  pushHist("orders", state.ordersToday, 24);
  pushHist("aov", state.revenueToday / state.ordersToday, 24);
  pushHist("conversion", (state.ordersToday / state.sessions) * 100, 24);
  pushHist("email", state.emailNew, 14);
}

function pushHist(key, val, max) {
  const h = state.history[key];
  h.push(val);
  if (h.length > max) h.shift();
}

// seed the sparkline histories so charts aren't empty on first paint
function seedHistories() {
  for (let i = 0; i < 24; i++) {
    const wobble = 0.9 + rnd() * 0.2;
    pushHist("revenueToday", REVENUE[REVENUE.length - 1].revenue * wobble * (0.6 + i / 30), 24);
    pushHist("orders", 240 * wobble * (0.6 + i / 30), 24);
    pushHist("aov", 38 + rnd() * 6, 24);
    pushHist("conversion", 3 + rnd() * 0.7, 24);
  }
  for (let i = 0; i < 14; i++) pushHist("email", 20 + rnd() * 22, 14);
}

/* ----------------------------- rendering ----------------------------- */

function animateNumber(el, to, fmt) {
  const from = Number(el.dataset.raw || 0);
  el.dataset.raw = to;
  const start = performance.now();
  const dur = 650;
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || from === 0) {
    el.textContent = fmt(to);
    return;
  }
  function frame(t) {
    const p = clamp((t - start) / dur, 0, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = fmt(from + (to - from) * eased);
    if (p < 1) requestAnimationFrame(frame);
  }
  requestAnimationFrame(frame);
}

function setDelta(el, pct) {
  const up = pct >= 0;
  el.classList.toggle("delta-up", up);
  el.classList.toggle("delta-down", !up);
  el.textContent = `${up ? "+" : ""}${pct.toFixed(1)}%`;
}

function sparkline(svg, data, color) {
  const w = 120, h = 36;
  const min = Math.min(...data), max = Math.max(...data);
  const span = max - min || 1;
  const pts = data.map((v, i) => {
    const x = (i / (data.length - 1)) * w;
    const y = h - 4 - ((v - min) / span) * (h - 8);
    return [x, y];
  });
  const line = pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ");
  const area = `${line} L${w} ${h} L0 ${h} Z`;
  const id = "g" + Math.abs(hash(svg.parentElement.dataset.kpi || color));
  svg.innerHTML = `
    <defs><linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="${color}" stop-opacity="0.34"/>
      <stop offset="1" stop-color="${color}" stop-opacity="0"/>
    </linearGradient></defs>
    <path d="${area}" fill="url(#${id})"/>
    <path d="${line}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`;
}

function hash(str) {
  let h = 0;
  for (let i = 0; i < str.length; i++) h = (h << 5) - h + str.charCodeAt(i);
  return h;
}

function renderKPIs() {
  const accent = getCSS("--accent");
  const yRev = REVENUE[REVENUE.length - 2].revenue;
  const aov = state.revenueToday / state.ordersToday;
  const conv = (state.ordersToday / state.sessions) * 100;

  // revenue today
  let el = $('[data-kpi="revenue-today"]');
  flash(animateNumber($("[data-value]", el), state.revenueToday, (v) => money(v)));
  setDelta($("[data-delta]", el), ((state.revenueToday - yRev) / yRev) * 100);
  sparkline($("[data-spark]", el), state.history.revenueToday, accent);

  // revenue MTD
  el = $('[data-kpi="revenue-mtd"]');
  const mtd = revenueMTD();
  animateNumber($("[data-value]", el), mtd, (v) => money(v));
  const pct = clamp((mtd / CONFIG.monthlyTarget) * 100, 0, 100);
  $("[data-target-fill]", el).style.width = pct + "%";
  $("[data-target-pct]", el).textContent = Math.round(pct) + "%";
  $("[data-target-goal]", el).textContent = compact(CONFIG.monthlyTarget);

  // orders
  el = $('[data-kpi="orders"]');
  animateNumber($("[data-value]", el), state.ordersToday, (v) => num(v));
  setDelta($("[data-delta]", el), 4.2 + (rnd() - 0.5) * 6);
  sparkline($("[data-spark]", el), state.history.orders, accent);

  // AOV
  el = $('[data-kpi="aov"]');
  animateNumber($("[data-value]", el), aov, (v) => money(v, 2));
  setDelta($("[data-delta]", el), 1.6 + (rnd() - 0.5) * 4);
  sparkline($("[data-spark]", el), state.history.aov, accent);

  // conversion
  el = $('[data-kpi="conversion"]');
  animateNumber($("[data-value]", el), conv, (v) => v.toFixed(2) + "%");
  setDelta($("[data-delta]", el), 2.1 + (rnd() - 0.5) * 5);
  sparkline($("[data-spark]", el), state.history.conversion, accent);
}

function flash(_) {
  // briefly highlight the headline revenue value on refresh
  const el = $('[data-kpi="revenue-today"] [data-value]');
  el.classList.remove("flash");
  void el.offsetWidth;
  el.classList.add("flash");
}

function revenueMTD() {
  const now = new Date();
  const month = now.getMonth();
  let sum = 0;
  for (const d of REVENUE) if (d.date.getMonth() === month) sum += d.revenue;
  // include today's live figure in place of the seeded last point if same day
  return Math.round(sum);
}

function renderTrend() {
  const svg = $("#trend-chart");
  const W = 720, H = 260, padB = 18, padT = 14;
  const vals = REVENUE.map((d) => d.revenue);
  const max = Math.max(...vals) * 1.08;
  const ma = movingAverage(REVENUE, 7);
  const n = REVENUE.length;
  const slot = W / n;
  const bw = slot * 0.56;

  // gridlines
  let grid = "";
  for (let g = 1; g <= 3; g++) {
    const y = padT + ((H - padT - padB) * g) / 4;
    grid += `<line x1="0" y1="${y}" x2="${W}" y2="${y}" stroke="${getCSS("--line")}" stroke-width="1"/>`;
  }

  // bars
  let bars = "";
  REVENUE.forEach((d, i) => {
    const h = ((d.revenue / max) * (H - padT - padB));
    const x = i * slot + (slot - bw) / 2;
    const y = H - padB - h;
    const last = i === n - 1;
    bars += `<rect x="${x.toFixed(1)}" y="${y.toFixed(1)}" width="${bw.toFixed(1)}" height="${Math.max(0, h).toFixed(1)}" rx="3"
      fill="${last ? getCSS("--accent") : "#f4a25955"}"/>`;
  });

  // moving average line
  const pts = ma.map((v, i) => {
    const x = i * slot + slot / 2;
    const y = H - padB - (v / max) * (H - padT - padB);
    return [x, y];
  });
  const line = pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ");

  svg.innerHTML = grid + bars +
    `<path d="${line}" fill="none" stroke="${getCSS("--accent")}" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>` +
    pts.filter((_, i) => i === pts.length - 1).map((p) =>
      `<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="4.5" fill="${getCSS("--ink")}" stroke="${getCSS("--accent")}" stroke-width="2.5"/>`).join("");

  // axis labels (a few dates)
  const axis = $("#trend-axis");
  const fmt = (d) => d.toLocaleDateString(CONFIG.locale, { month: "short", day: "numeric" });
  const idxs = [0, Math.floor(n / 3), Math.floor((2 * n) / 3), n - 1];
  axis.innerHTML = idxs.map((i) => `<span>${i === n - 1 ? "Today" : fmt(REVENUE[i].date)}</span>`).join("");
}

function renderDonut() {
  const svg = $("#donut");
  const total = state.sessions;
  $("#donut-total").textContent = compact(total);

  const R = 78, C = 2 * Math.PI * R, cx = 100, cy = 100;
  let offset = 0;
  let segs = `<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="#00000040" stroke-width="22"/>`;
  const legend = [];
  state.sourceShares.forEach((share, i) => {
    const len = share * C;
    const src = SOURCES[i];
    segs += `<circle cx="${cx}" cy="${cy}" r="${R}" fill="none" stroke="${src.color}" stroke-width="22"
      stroke-dasharray="${len.toFixed(1)} ${(C - len).toFixed(1)}" stroke-dashoffset="${(-offset).toFixed(1)}" stroke-linecap="butt"/>`;
    offset += len;
    legend.push(
      `<li><span class="dot" style="background:${src.color}"></span>
        <span class="src-name">${src.name}</span>
        <span class="src-val">${num(total * share)}</span>
        <span class="src-pct">${Math.round(share * 100)}%</span></li>`
    );
  });
  svg.innerHTML = segs;
  $("#source-legend").innerHTML = legend.join("");
}

function renderProducts() {
  const body = $("#products-body");
  const rows = PRODUCTS.map((p) => {
    const units = Math.round(p.base * (0.92 + rnd() * 0.16));
    return { ...p, units, revenue: units * p.price };
  }).sort((a, b) => b.revenue - a.revenue);
  const max = Math.max(...rows.map((r) => r.revenue));

  body.innerHTML = rows
    .map(
      (r) => `<tr>
        <td><div class="prod-cell">
          <img class="prod-thumb" loading="lazy"
            src="https://picsum.photos/seed/brightside-${r.seed}/80/80"
            alt="${r.name} coffee product" />
          <div><div class="prod-name">${r.name}</div><div class="prod-tag">${r.tag}</div></div>
        </div></td>
        <td class="num">${num(r.units)}</td>
        <td><div class="rev-bar-wrap">
          <div class="rev-bar"><span style="width:${(r.revenue / max) * 100}%"></span></div>
          <span class="rev-amt">${money(r.revenue)}</span>
        </div></td>
      </tr>`
    )
    .join("");
}

function renderChannels() {
  const list = $("#channels");
  const rows = CHANNELS.map((c) => {
    const roas = 1.6 + rnd() * 4.4; // 1.6x – 6.0x
    return { ...c, roas, revenue: c.spend * roas };
  }).sort((a, b) => b.roas - a.roas);
  const maxRoas = Math.max(...rows.map((r) => r.roas));

  list.innerHTML = rows
    .map((r) => {
      const cls = r.roas >= 3.5 ? "good" : r.roas >= 2.2 ? "ok" : "low";
      const color = cls === "good" ? getCSS("--up") : cls === "ok" ? getCSS("--accent") : getCSS("--down");
      return `<li>
        <div><div class="ch-name">${r.name}</div>
          <div class="ch-spend">${money(r.spend)} spend → ${money(r.revenue)} rev</div></div>
        <div class="ch-roas ${cls}">${r.roas.toFixed(1)}<small>x ROAS</small></div>
        <div class="ch-meter"><span style="width:${(r.roas / maxRoas) * 100}%;background:${color}"></span></div>
      </li>`;
    })
    .join("");
}

function renderEmail() {
  animateNumber($("#email-total"), state.emailTotal, (v) => num(v));
  $("#email-new").textContent = "+" + state.emailNew;
  sparkline2($("#email-spark"), state.history.email, getCSS("--email"));
}

function sparkline2(svg, data, color) {
  const w = 260, h = 70;
  const min = Math.min(...data), max = Math.max(...data);
  const span = max - min || 1;
  const pts = data.map((v, i) => [
    (i / (data.length - 1)) * w,
    h - 6 - ((v - min) / span) * (h - 16),
  ]);
  const line = pts.map((p, i) => `${i ? "L" : "M"}${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(" ");
  const bars = data
    .map((v, i) => {
      const bw = (w / data.length) * 0.5;
      const x = (i / (data.length - 1)) * w - bw / 2;
      const bh = ((v - min) / span) * (h - 16) + 4;
      return `<rect x="${clamp(x, 0, w - bw).toFixed(1)}" y="${(h - bh).toFixed(1)}" width="${bw.toFixed(1)}" height="${bh.toFixed(1)}" rx="2" fill="${color}33"/>`;
    })
    .join("");
  svg.innerHTML = bars + `<path d="${line}" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`;
}

/* ----------------------------- clock / refresh ----------------------------- */
function tickClock() {
  const now = new Date();
  $("#clock-time").textContent = now.toLocaleTimeString(CONFIG.locale, {
    hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: true,
  });
  $("#clock-date").textContent = now.toLocaleDateString(CONFIG.locale, {
    weekday: "short", month: "short", day: "numeric",
  });
}

let lastRefresh = Date.now();
function tickUpdated() {
  const secs = Math.round((Date.now() - lastRefresh) / 1000);
  $("#updated-time").textContent = secs < 5 ? "just now" : `${secs}s ago`;
}

function refresh() {
  nudge();
  renderKPIs();
  renderDonut();
  renderEmail();
  lastRefresh = Date.now();
  $("#updated-time").textContent = "just now";
}

/* slow-moving panels: re-roll less often so the screen feels calm */
function refreshSlow() {
  renderProducts();
  renderChannels();
}

/* ----------------------------- boot ----------------------------- */
function init() {
  document.title = `${CONFIG.brand} — Growth Dashboard`;
  $(".brand-text h1").textContent = CONFIG.brand;
  seedHistories();
  nudge();

  renderKPIs();
  renderTrend();
  renderDonut();
  renderProducts();
  renderChannels();
  renderEmail();

  tickClock();
  setInterval(tickClock, 1000);
  setInterval(tickUpdated, 1000);
  setInterval(refresh, CONFIG.refreshMs);
  setInterval(refreshSlow, CONFIG.refreshMs * 4);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}
