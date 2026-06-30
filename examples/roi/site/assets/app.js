/* Beacon ROI calculator — live computation, animated SVG charts, gated lead form */
(function () {
  "use strict";

  // ---- Model assumptions -------------------------------------------------
  const DEFLECTION = 0.42;       // share of tickets Beacon auto-resolves
  const PRICE_PER_SEAT = 49;     // Beacon $/agent/month
  const MIN_PER_TICKET = 9;      // agent minutes saved per deflected ticket

  const DEFAULTS = { team: 8, spend: 32000, tickets: 4200 };
  const LIMITS = {
    team:    { min: 1, max: 120 },
    spend:   { min: 0, max: 400000 },
    tickets: { min: 0, max: 100000 },
  };

  const $ = (id) => document.getElementById(id);

  // ---- Formatting --------------------------------------------------------
  const usd0 = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });
  const num0 = new Intl.NumberFormat("en-US", { maximumFractionDigits: 0 });

  function clamp(v, lo, hi) { return Math.min(hi, Math.max(lo, v)); }

  // ---- Core computation --------------------------------------------------
  function compute(input) {
    const team = clamp(Math.round(input.team) || 0, LIMITS.team.min, LIMITS.team.max);
    const spend = clamp(Math.round(input.spend) || 0, LIMITS.spend.min, LIMITS.spend.max);
    const tickets = clamp(Math.round(input.tickets) || 0, LIMITS.tickets.min, LIMITS.tickets.max);

    const costPerTicket = tickets > 0 ? spend / tickets : 0;
    const deflected = tickets * DEFLECTION;
    const grossMonthly = deflected * costPerTicket;          // labour Beacon removes
    const beaconCost = team * PRICE_PER_SEAT;                // what Beacon costs
    const netMonthly = grossMonthly - beaconCost;
    const annual = netMonthly * 12;
    const hours = (deflected * MIN_PER_TICKET) / 60;
    const newMonthlyCost = Math.max(0, spend - grossMonthly + beaconCost);
    const roiMultiple = beaconCost > 0 ? grossMonthly / beaconCost : 0;

    // payback: days for the gross savings to cover one month of Beacon
    let paybackDays = null;
    if (grossMonthly > 0) paybackDays = Math.max(1, Math.round(beaconCost / (grossMonthly / 30)));

    return {
      team, spend, tickets,
      grossMonthly, beaconCost, netMonthly, annual, hours,
      newMonthlyCost, roiMultiple, paybackDays,
    };
  }

  // ---- Number tween ------------------------------------------------------
  const tweens = new WeakMap();
  function animateValue(el, to, render) {
    const from = tweens.get(el) ?? to;
    tweens.set(el, to);
    if (matchMedia("(prefers-reduced-motion: reduce)").matches || from === to) {
      el.textContent = render(to);
      return;
    }
    const start = performance.now();
    const dur = 480;
    function frame(now) {
      const t = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - t, 3);
      el.textContent = render(from + (to - from) * eased);
      if (t < 1) requestAnimationFrame(frame);
    }
    requestAnimationFrame(frame);
  }

  function paybackText(days) {
    if (days == null) return "—";
    if (days < 1) return "same day";
    if (days < 14) return days + (days === 1 ? " day" : " days");
    const weeks = Math.round(days / 7);
    return weeks + (weeks === 1 ? " week" : " weeks");
  }

  // ---- Render results ----------------------------------------------------
  function renderResults(r) {
    animateValue($("r-annual"), Math.max(0, r.annual), (v) => usd0.format(v));
    animateValue($("r-monthly"), Math.max(0, r.netMonthly), (v) => usd0.format(v));
    animateValue($("r-hours"), r.hours, (v) => num0.format(v));
    animateValue($("r-cumulative"), Math.max(0, r.annual), (v) => usd0.format(v) + " banked by month 12");
    $("r-payback").textContent = paybackText(r.paybackDays);

    if (r.roiMultiple >= 1) {
      $("r-roi").textContent = (r.roiMultiple >= 10 ? Math.round(r.roiMultiple) : r.roiMultiple.toFixed(1)) + "×";
    } else {
      $("r-roi").textContent = Math.round(r.roiMultiple * 100) + "%";
    }

    const sub = $("r-annual-sub");
    if (r.netMonthly <= 0) {
      sub.textContent = "Beacon's fee outweighs savings at this volume";
    } else {
      sub.textContent = "after Beacon's $" + r.beaconCost.toLocaleString() + "/mo subscription";
    }

    const leadSummary = $("lead-summary");
    if (leadSummary) leadSummary.textContent = usd0.format(Math.max(0, r.annual)) + " / year";

    drawBars(r);
    drawArea(r);
  }

  // ---- Bar chart (today vs with Beacon) ----------------------------------
  const SVGNS = "http://www.w3.org/2000/svg";
  function el(name, attrs) {
    const node = document.createElementNS(SVGNS, name);
    for (const k in attrs) node.setAttribute(k, attrs[k]);
    return node;
  }

  function drawBars(r) {
    const svg = $("bar-chart");
    if (!svg) return;
    const W = 520, H = 220, base = 180, top = 24;
    const max = Math.max(r.spend, r.newMonthlyCost, 1);
    const slots = [
      { label: "Today", value: r.spend, fill: "#c4c9d8", text: "#42485c" },
      { label: "With Beacon", value: r.newMonthlyCost, fill: "#0ea968", text: "#08643f" },
    ];
    svg.textContent = "";
    // baseline
    svg.appendChild(el("line", { x1: 40, y1: base, x2: W - 20, y2: base, stroke: "#e6e8f0", "stroke-width": 1 }));

    const barW = 150, gap = 70;
    const startX = (W - (barW * 2 + gap)) / 2;
    slots.forEach((s, i) => {
      const h = ((s.value / max) * (base - top));
      const x = startX + i * (barW + gap);
      const y = base - h;
      const rect = el("rect", {
        x, y: base, width: barW, height: 0, rx: 8, fill: s.fill, class: "bar",
      });
      svg.appendChild(rect);
      // force layout then animate
      requestAnimationFrame(() => {
        rect.setAttribute("y", y);
        rect.setAttribute("height", Math.max(0, h));
      });
      const val = el("text", { x: x + barW / 2, y: y - 10, "text-anchor": "middle", fill: s.text, "font-size": 16, "font-weight": 700, "font-family": "Sora, sans-serif" });
      val.textContent = usd0.format(s.value);
      svg.appendChild(val);
      const lab = el("text", { x: x + barW / 2, y: base + 24, "text-anchor": "middle", fill: "#5b6577", "font-size": 13 });
      lab.textContent = s.label;
      svg.appendChild(lab);
    });
  }

  // ---- Cumulative savings area chart -------------------------------------
  function drawArea(r) {
    const svg = $("area-chart");
    if (!svg) return;
    const W = 1000, H = 320, padL = 70, padR = 24, padT = 24, padB = 48;
    const months = 12;
    const perMonth = Math.max(0, r.netMonthly);
    const pts = [];
    for (let m = 0; m <= months; m++) pts.push(perMonth * m);
    const maxY = Math.max(pts[months], 1);

    const x = (m) => padL + (m / months) * (W - padL - padR);
    const y = (v) => H - padB - (v / maxY) * (H - padT - padB);

    svg.textContent = "";

    // gridlines + y labels (4 steps)
    for (let i = 0; i <= 4; i++) {
      const v = (maxY / 4) * i;
      const gy = y(v);
      svg.appendChild(el("line", { x1: padL, y1: gy, x2: W - padR, y2: gy, stroke: "#eef0f6", "stroke-width": 1 }));
      const t = el("text", { x: padL - 12, y: gy + 4, "text-anchor": "end", fill: "#98a0b3", "font-size": 13 });
      t.textContent = usd0.format(v);
      svg.appendChild(t);
    }

    // gradient
    const defs = el("defs", {});
    const grad = el("linearGradient", { id: "areaGrad", x1: 0, y1: 0, x2: 0, y2: 1 });
    grad.appendChild(el("stop", { offset: "0%", "stop-color": "#0ea968", "stop-opacity": 0.28 }));
    grad.appendChild(el("stop", { offset: "100%", "stop-color": "#0ea968", "stop-opacity": 0.02 }));
    defs.appendChild(grad);
    svg.appendChild(defs);

    // area + line paths
    let line = "";
    pts.forEach((v, m) => { line += (m === 0 ? "M" : "L") + x(m).toFixed(1) + " " + y(v).toFixed(1) + " "; });
    const area = "M" + x(0) + " " + y(0) + " " + line.slice(1) + "L" + x(months) + " " + y(0) + " Z";

    svg.appendChild(el("path", { d: area, fill: "url(#areaGrad)" }));
    const path = el("path", { d: line.trim(), fill: "none", stroke: "#0ea968", "stroke-width": 3, "stroke-linecap": "round", "stroke-linejoin": "round" });
    svg.appendChild(path);

    // animate line draw
    if (!matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const len = path.getTotalLength();
      path.style.strokeDasharray = len;
      path.style.strokeDashoffset = len;
      requestAnimationFrame(() => {
        path.style.transition = "stroke-dashoffset .9s ease-out";
        path.style.strokeDashoffset = 0;
      });
    }

    // x axis month labels (every 2 months) + end dot
    for (let m = 0; m <= months; m += 2) {
      const t = el("text", { x: x(m), y: H - padB + 24, "text-anchor": "middle", fill: "#98a0b3", "font-size": 13 });
      t.textContent = m === 0 ? "Now" : "M" + m;
      svg.appendChild(t);
    }
    svg.appendChild(el("circle", { cx: x(months), cy: y(pts[months]), r: 6, fill: "#0ea968", stroke: "#fff", "stroke-width": 2 }));
  }

  // ---- Inputs wiring -----------------------------------------------------
  function readInputs() {
    return {
      team: parseFloat($("team").value),
      spend: parseFloat($("spend").value),
      tickets: parseFloat($("tickets").value),
    };
  }

  function syncRange(key) {
    const range = $(key + "-range");
    const number = $(key);
    if (range) range.value = clamp(parseFloat(number.value) || 0, LIMITS[key].min, LIMITS[key].max);
  }

  function recalc() {
    const r = compute(readInputs());
    ["team", "spend", "tickets"].forEach(syncRange);
    renderResults(r);
  }

  function bindPair(key) {
    const range = $(key + "-range");
    const number = $(key);
    if (range) {
      range.addEventListener("input", () => { number.value = range.value; recalc(); });
    }
    number.addEventListener("input", recalc);
    number.addEventListener("blur", () => {
      let v = clamp(parseFloat(number.value) || LIMITS[key].min, LIMITS[key].min, LIMITS[key].max);
      number.value = v;
      recalc();
    });
  }

  ["team", "spend", "tickets"].forEach(bindPair);

  $("reset-btn").addEventListener("click", () => {
    $("team").value = DEFAULTS.team;
    $("spend").value = DEFAULTS.spend;
    $("tickets").value = DEFAULTS.tickets;
    recalc();
  });

  // ---- Lead form ---------------------------------------------------------
  const leadForm = $("lead-form");
  const emailInput = $("lead-email");
  const emailError = $("email-error");

  function validEmail(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim()); }

  leadForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const ok = validEmail(emailInput.value);
    emailError.hidden = ok;
    emailInput.classList.toggle("invalid", !ok);
    if (!$("lead-name").value.trim()) {
      $("lead-name").classList.add("invalid");
    } else {
      $("lead-name").classList.remove("invalid");
    }
    if (!ok || !$("lead-name").value.trim()) {
      (ok ? $("lead-name") : emailInput).focus();
      return;
    }

    const r = compute(readInputs());
    const name = $("lead-name").value.trim().split(/\s+/)[0];
    $("success-line").textContent =
      "Thanks " + name + " — your ROI report (" + usd0.format(Math.max(0, r.annual)) +
      " / year) is on its way to " + emailInput.value.trim() + ".";

    // hide the fields, show success
    Array.from(leadForm.querySelectorAll(".field, .btn-block, .form-fine")).forEach((n) => (n.hidden = true));
    $("lead-success").hidden = false;
  });

  emailInput.addEventListener("input", () => {
    if (validEmail(emailInput.value)) { emailError.hidden = true; emailInput.classList.remove("invalid"); }
  });

  $("lead-reset").addEventListener("click", () => {
    leadForm.reset();
    Array.from(leadForm.querySelectorAll(".field, .btn-block, .form-fine")).forEach((n) => (n.hidden = false));
    $("lead-success").hidden = true;
    emailInput.classList.remove("invalid");
    $("lead-name").classList.remove("invalid");
    recalc();
    document.getElementById("calculator").scrollIntoView({ behavior: "smooth" });
  });

  // ---- Boot --------------------------------------------------------------
  recalc();
})();
