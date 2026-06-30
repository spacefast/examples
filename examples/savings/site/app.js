/* ===== Milestone — savings goal calculator =====
   All math runs client-side. Contributions are end-of-month; interest
   compounds monthly. Nothing is sent anywhere; inputs persist in localStorage.
*/
(function () {
  "use strict";

  var STORAGE_KEY = "milestone.plan.v1";
  var MAX_MONTHS = 80 * 12; // hard cap for "solve for date" loops

  /* ---------- Currency ---------- */
  var CURRENCIES = {
    USD: { sym: "$", locale: "en-US" },
    EUR: { sym: "€", locale: "de-DE" },
    GBP: { sym: "£", locale: "en-GB" },
    CAD: { sym: "$", locale: "en-CA" },
    AUD: { sym: "$", locale: "en-AU" },
    INR: { sym: "₹", locale: "en-IN" }
  };

  /* ---------- Elements ---------- */
  var $ = function (id) { return document.getElementById(id); };
  var form = $("goalForm");
  var elGoalName = $("goalName");
  var elTarget = $("target");
  var elStart = $("start");
  var elDate = $("targetDate");
  var elCustomRate = $("customRate");
  var elCurrency = $("currency");
  var ratePick = $("ratePick");
  var curSyms = document.querySelectorAll("[data-cur-sym]");

  var elPerMonth = $("perMonth");
  var elPerWeek = $("perWeek");
  var elMonthsToGo = $("monthsToGo");
  var elResultKicker = $("resultKicker");
  var elResultSub = $("resultSub");
  var elBanner = $("resultBanner");
  var outGoal = $("outGoal"), outTarget = $("outTarget"), outStart = $("outStart"),
      outContrib = $("outContrib"), outInterest = $("outInterest");
  var elChartGoalName = $("chartGoalName"), elChartCanvas = $("chartCanvas"), elChartCap = $("chartCap");

  var segStart = $("segStart"), segContrib = $("segContrib"), segInterest = $("segInterest");
  var keyStart = $("keyStart"), keyContrib = $("keyContrib"), keyInterest = $("keyInterest");

  var ledgerBody = $("ledgerBody");

  var whatMonthly = $("whatMonthly"), whatRate = $("whatRate");
  var whatMonthlyOut = $("whatMonthlyOut"), whatRateOut = $("whatRateOut");
  var whatGoalName = $("whatGoalName"), whatDate = $("whatDate"), whatDelta = $("whatDelta");
  var whatTotalInterest = $("whatTotalInterest"), whatMonthsOut = $("whatMonthsOut");
  var syncBtn = $("syncBtn");

  var copyBtn = $("copyBtn"), copyLabel = $("copyLabel"), toast = $("toast");

  /* ---------- State ---------- */
  var state = {
    goalName: "House down payment",
    target: 20000,
    start: 3500,
    targetDate: defaultDateValue(),
    annualRate: 4.5,
    currency: "USD"
  };
  var lastPlan = null; // computed plan, for what-if sync

  /* ---------- Helpers ---------- */
  function defaultDateValue() {
    var d = new Date();
    d.setMonth(d.getMonth() + 36); // ~3 years out
    return d.getFullYear() + "-" + pad2(d.getMonth() + 1);
  }
  function pad2(n) { return (n < 10 ? "0" : "") + n; }

  function parseNum(str) {
    if (typeof str === "number") return str;
    var n = parseFloat(String(str).replace(/[^0-9.\-]/g, ""));
    return isFinite(n) ? n : 0;
  }

  function fmtMoney(n, opts) {
    opts = opts || {};
    var c = CURRENCIES[state.currency] || CURRENCIES.USD;
    try {
      return new Intl.NumberFormat(c.locale, {
        style: "currency", currency: state.currency,
        minimumFractionDigits: opts.cents ? 2 : 0,
        maximumFractionDigits: opts.cents ? 2 : 0
      }).format(n);
    } catch (e) {
      return c.sym + Math.round(n).toLocaleString();
    }
  }

  function monthsUntil(value) {
    // value: "YYYY-MM"; returns whole months from this month to that month
    if (!value) return 36;
    var parts = value.split("-");
    var ty = parseInt(parts[0], 10), tm = parseInt(parts[1], 10);
    var now = new Date();
    var months = (ty - now.getFullYear()) * 12 + (tm - (now.getMonth() + 1));
    return months;
  }

  function dateFromMonths(m) {
    var d = new Date();
    d.setDate(1);
    d.setMonth(d.getMonth() + Math.round(m));
    return d;
  }

  function fmtMonthYear(d) {
    return d.toLocaleDateString("en-US", { month: "long", year: "numeric" });
  }

  /* ---------- Core finance ---------- */
  // Future value of an annuity-immediate plus growth of present value.
  function futureValue(pv, pmt, i, n) {
    if (n <= 0) return pv;
    if (i === 0) return pv + pmt * n;
    var g = Math.pow(1 + i, n);
    return pv * g + pmt * (g - 1) / i;
  }

  // Solve required monthly contribution to reach `fv` in `n` months.
  function requiredMonthly(fv, pv, i, n) {
    if (n <= 0) return Math.max(0, fv - pv);
    if (i === 0) return (fv - pv) / n;
    var g = Math.pow(1 + i, n);
    var pmt = (fv - pv * g) / ((g - 1) / i);
    return pmt;
  }

  // Solve number of months to reach `fv` given a fixed `pmt`. Returns Infinity if never.
  function monthsToReach(fv, pv, pmt, i) {
    if (pv >= fv) return 0;
    if (i === 0) {
      if (pmt <= 0) return Infinity;
      return (fv - pv) / pmt;
    }
    // x = (1+i)^n ; fv = x*(pv + pmt/i) - pmt/i
    var k = pmt / i;
    var denom = pv + k;
    if (denom <= 0) return Infinity;
    var x = (fv + k) / denom;
    if (x <= 1) return Infinity;
    var n = Math.log(x) / Math.log(1 + i);
    if (!isFinite(n) || n < 0) return Infinity;
    return n;
  }

  // Month-by-month series; cap point count for rendering.
  function buildSeries(pv, pmt, i, n) {
    var pts = [];
    var step = Math.max(1, Math.ceil(n / 240));
    for (var m = 0; m <= n; m += step) {
      var bal = futureValue(pv, pmt, i, m);
      var principal = pv + pmt * m;
      pts.push({ m: m, balance: bal, principal: principal, interest: Math.max(0, bal - principal) });
    }
    // ensure final point lands exactly on n
    if (pts.length === 0 || pts[pts.length - 1].m !== n) {
      var balN = futureValue(pv, pmt, i, n);
      var prinN = pv + pmt * n;
      pts.push({ m: n, balance: balN, principal: prinN, interest: Math.max(0, balN - prinN) });
    }
    return pts;
  }

  /* ---------- Read inputs ---------- */
  function readInputs() {
    state.goalName = (elGoalName.value || "").trim() || "your goal";
    state.target = Math.max(0, parseNum(elTarget.value));
    state.start = Math.max(0, parseNum(elStart.value));
    state.targetDate = elDate.value || defaultDateValue();
    state.currency = elCurrency.value || "USD";
    // rate comes from active rate button OR custom field
    var active = ratePick.querySelector(".ratebtn.is-active");
    if (active && active.classList.contains("ratebtn--custom")) {
      state.annualRate = Math.max(0, parseNum(elCustomRate.value));
    } else if (active) {
      state.annualRate = parseNum(active.getAttribute("data-rate"));
    }
  }

  /* ---------- Main recompute ---------- */
  function recompute(opts) {
    opts = opts || {};
    readInputs();

    var c = CURRENCIES[state.currency] || CURRENCIES.USD;
    curSyms.forEach(function (el) { el.textContent = c.sym; });

    var n = monthsUntil(state.targetDate);
    var clampedN = Math.max(1, n);
    var i = state.annualRate / 100 / 12;
    var pv = state.start;
    var fv = state.target;

    var pmt = requiredMonthly(fv, pv, i, clampedN);
    var alreadyThere = pmt <= 0.005;
    var displayPmt = Math.max(0, pmt);
    var roundedPmt = Math.ceil(displayPmt); // round up to whole units for a clean autopay number

    // Recompute the actual plan with the rounded contribution (what you'd really set up)
    var planMonthly = alreadyThere ? 0 : roundedPmt;
    var series = buildSeries(pv, planMonthly, i, clampedN);
    var final = series[series.length - 1];
    var totalContributed = pv + planMonthly * clampedN;
    var totalInterest = Math.max(0, final.balance - totalContributed);

    lastPlan = {
      pmt: planMonthly, i: i, n: clampedN, pv: pv, fv: fv,
      series: series, totalInterest: totalInterest
    };

    /* ----- Result card ----- */
    elPerMonth.textContent = Math.round(planMonthly).toLocaleString();
    var weekly = planMonthly * 12 / 52;
    elPerWeek.textContent = fmtMoney(weekly, { cents: weekly < 100 });
    elMonthsToGo.textContent = clampedN + (clampedN === 1 ? " month" : " months");
    outGoal.textContent = cap(state.goalName);
    outTarget.textContent = fmtMoney(fv);
    outStart.textContent = fmtMoney(pv);
    outContrib.textContent = fmtMoney(planMonthly * clampedN);
    outInterest.textContent = fmtMoney(totalInterest);

    // banner / messaging
    elBanner.hidden = true;
    elBanner.classList.remove("is-good");
    elResultKicker.textContent = "To reach your goal you'll set aside";
    if (fv <= 0) {
      elResultKicker.textContent = "Set a target above to get started";
    } else if (alreadyThere && pv >= fv) {
      elResultKicker.textContent = "You're already there 🎉";
      elBanner.hidden = false;
      elBanner.classList.add("is-good");
      elBanner.textContent = "Your starting balance already meets the goal. Nice work — keep it growing.";
    } else if (alreadyThere) {
      // interest alone gets you there before the deadline
      var soloMonths = monthsToReach(fv, pv, 0, i);
      elResultKicker.textContent = "No new savings needed";
      elBanner.hidden = false;
      elBanner.classList.add("is-good");
      if (isFinite(soloMonths)) {
        elBanner.textContent = "At " + trimRate(state.annualRate) + "%, your current balance grows to " +
          fmtMoney(fv) + " on its own by " + fmtMonthYear(dateFromMonths(soloMonths)) + ".";
      } else {
        elBanner.textContent = "Your starting balance already covers the goal.";
      }
    } else if (n <= 0) {
      elBanner.hidden = false;
      elBanner.textContent = "That date is here already — we figured this as a one-month sprint. Pick a later month for a gentler pace.";
    } else if (planMonthly > 0 && clampedN <= 3) {
      elBanner.hidden = false;
      elBanner.textContent = "That's a short runway. Pushing the deadline out even a few months drops the monthly amount a lot.";
    }

    /* ----- Chart ----- */
    elChartGoalName.textContent = lowerGoal(state.goalName);
    renderChart(series, fv, clampedN, i, planMonthly, pv);

    /* ----- Split bar ----- */
    renderSplit(pv, planMonthly * clampedN, totalInterest);

    /* ----- Ledger ----- */
    renderLedger(pv, planMonthly, i, clampedN, fv);

    /* ----- What-if (optionally re-seed sliders) ----- */
    if (opts.syncWhatIf !== false) seedWhatIf(planMonthly);
    updateWhatIf();

    persist();
  }

  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
  function lowerGoal(s) {
    if (s === "your goal") return s;
    // keep as-is but lowercase the leading article-less phrase nicely
    return s;
  }
  function trimRate(r) { return (Math.round(r * 100) / 100).toString(); }

  /* ---------- Chart rendering ---------- */
  var CW = 760, CH = 320, PAD = { t: 18, r: 16, b: 34, l: 58 };
  function renderChart(series, goal, n, i, pmt, pv) {
    var maxY = Math.max(goal, series[series.length - 1].balance) * 1.06;
    var plotW = CW - PAD.l - PAD.r, plotH = CH - PAD.t - PAD.b;

    function x(m) { return PAD.l + (n === 0 ? 0 : (m / n) * plotW); }
    function y(v) { return PAD.t + plotH - (v / maxY) * plotH; }

    // build area paths
    var topLine = "", baseLine = "", principalArea = "";
    series.forEach(function (p, idx) {
      var cmd = idx === 0 ? "M" : "L";
      topLine += cmd + x(p.m).toFixed(1) + " " + y(p.balance).toFixed(1) + " ";
    });
    // interest area = between principal and balance; principal area = ground to principal
    var balPath = topLine + "L" + x(n).toFixed(1) + " " + y(0).toFixed(1) + " L" + x(0).toFixed(1) + " " + y(0).toFixed(1) + " Z";
    var prinTop = "";
    series.forEach(function (p, idx) {
      var cmd = idx === 0 ? "M" : "L";
      prinTop += cmd + x(p.m).toFixed(1) + " " + y(p.principal).toFixed(1) + " ";
    });
    var prinPath = prinTop + "L" + x(n).toFixed(1) + " " + y(0).toFixed(1) + " L" + x(0).toFixed(1) + " " + y(0).toFixed(1) + " Z";

    // y axis ticks
    var ticks = niceTicks(maxY, 4);
    var gridSvg = "";
    ticks.forEach(function (t) {
      var yy = y(t).toFixed(1);
      gridSvg += '<line x1="' + PAD.l + '" y1="' + yy + '" x2="' + (CW - PAD.r) + '" y2="' + yy + '" stroke="#e7e3d6" stroke-width="1"/>';
      gridSvg += '<text x="' + (PAD.l - 8) + '" y="' + (parseFloat(yy) + 4) + '" text-anchor="end" font-size="11" fill="#97a09d" font-family="Space Mono, monospace">' + compact(t) + '</text>';
    });

    // x axis labels (year marks)
    var xLabels = "";
    var yearStep = n > 60 ? 24 : 12;
    for (var m = 0; m <= n; m += yearStep) {
      var d = dateFromMonths(m);
      xLabels += '<text x="' + x(m).toFixed(1) + '" y="' + (CH - 10) + '" text-anchor="middle" font-size="11" fill="#97a09d" font-family="Inter, sans-serif">' +
        (m === 0 ? "now" : "'" + String(d.getFullYear()).slice(2)) + '</text>';
    }

    var goalY = y(goal).toFixed(1);

    var svg =
      '<svg viewBox="0 0 ' + CW + ' ' + CH + '" role="img" aria-label="Compound growth toward the goal of ' +
        fmtMoney(goal) + '. Final balance ' + fmtMoney(series[series.length - 1].balance) + '.">' +
      '<defs>' +
        '<linearGradient id="gradInterest" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#f5c451" stop-opacity="0.95"/>' +
          '<stop offset="100%" stop-color="#f5c451" stop-opacity="0.35"/>' +
        '</linearGradient>' +
        '<linearGradient id="gradPrincipal" x1="0" y1="0" x2="0" y2="1">' +
          '<stop offset="0%" stop-color="#1f9e76" stop-opacity="0.9"/>' +
          '<stop offset="100%" stop-color="#1f9e76" stop-opacity="0.5"/>' +
        '</linearGradient>' +
      '</defs>' +
      gridSvg +
      '<path d="' + balPath + '" fill="url(#gradInterest)"/>' +
      '<path d="' + prinPath + '" fill="url(#gradPrincipal)"/>' +
      '<path d="' + topLine + '" fill="none" stroke="#157857" stroke-width="2.5" stroke-linejoin="round"/>' +
      '<line x1="' + PAD.l + '" y1="' + goalY + '" x2="' + (CW - PAD.r) + '" y2="' + goalY + '" stroke="#0f3d3e" stroke-width="1.5" stroke-dasharray="5 4"/>' +
      '<text x="' + (CW - PAD.r) + '" y="' + (parseFloat(goalY) - 7) + '" text-anchor="end" font-size="11" font-weight="700" fill="#0f3d3e" font-family="Inter, sans-serif">Goal · ' + fmtMoney(goal) + '</text>' +
      xLabels +
      '<g class="hover-layer"></g>' +
      '</svg>';

    elChartCanvas.innerHTML = svg + '<div class="chart-tip" id="chartTip"></div>';
    attachHover(series, goal, x, y, n);
  }

  function attachHover(series, goal, x, y, n) {
    var svg = elChartCanvas.querySelector("svg");
    var layer = elChartCanvas.querySelector(".hover-layer");
    var tip = $("chartTip");
    if (!svg || !layer) return;

    function locate(clientX) {
      var rect = svg.getBoundingClientRect();
      var sx = (clientX - rect.left) / rect.width * CW; // svg coords
      var frac = (sx - PAD.l) / (CW - PAD.l - PAD.r);
      frac = Math.min(1, Math.max(0, frac));
      var m = frac * n;
      // nearest series point
      var nearest = series[0], best = Infinity;
      for (var k = 0; k < series.length; k++) {
        var d = Math.abs(series[k].m - m);
        if (d < best) { best = d; nearest = series[k]; }
      }
      return nearest;
    }

    function show(clientX) {
      var p = locate(clientX);
      var px = x(p.m), py = y(p.balance);
      layer.innerHTML =
        '<line class="chart-hover-line" x1="' + px.toFixed(1) + '" y1="' + PAD.t + '" x2="' + px.toFixed(1) + '" y2="' + (CH - PAD.b) + '"/>' +
        '<circle class="chart-hover-dot" cx="' + px.toFixed(1) + '" cy="' + py.toFixed(1) + '" r="5"/>';
      var rect = svg.getBoundingClientRect();
      var leftPx = (px / CW) * rect.width;
      var topPx = (py / CH) * rect.height;
      tip.style.left = leftPx + "px";
      tip.style.top = topPx + "px";
      var d = dateFromMonths(p.m);
      tip.innerHTML = "<strong>" + fmtMoney(p.balance) + "</strong><br>" +
        fmtMonthYear(d) + "<br>" +
        "in: " + fmtMoney(p.principal) + " · int: " + fmtMoney(p.interest);
      tip.classList.add("is-on");
      elChartCap.textContent = fmtMonthYear(d) + ": balance " + fmtMoney(p.balance) +
        " (" + Math.round(p.balance / goal * 100) + "% of goal).";
    }
    function hide() {
      layer.innerHTML = "";
      tip.classList.remove("is-on");
      elChartCap.textContent = "Hover the chart to see any month.";
    }

    svg.addEventListener("mousemove", function (e) { show(e.clientX); });
    svg.addEventListener("mouseleave", hide);
    svg.addEventListener("touchstart", function (e) { if (e.touches[0]) show(e.touches[0].clientX); }, { passive: true });
    svg.addEventListener("touchmove", function (e) { if (e.touches[0]) { show(e.touches[0].clientX); } }, { passive: true });
  }

  function niceTicks(max, count) {
    var step = max / count;
    var mag = Math.pow(10, Math.floor(Math.log10(step)));
    var norm = step / mag;
    var nice = norm >= 5 ? 5 : norm >= 2 ? 2 : 1;
    var s = nice * mag;
    var out = [];
    for (var v = 0; v <= max + 0.5; v += s) out.push(Math.round(v));
    return out;
  }

  function compact(n) {
    var c = CURRENCIES[state.currency] || CURRENCIES.USD;
    if (n >= 1000000) return c.sym + (n / 1000000).toFixed(n % 1000000 === 0 ? 0 : 1) + "M";
    if (n >= 1000) return c.sym + (n / 1000).toFixed(n % 1000 === 0 ? 0 : 1) + "k";
    return c.sym + Math.round(n);
  }

  /* ---------- Split bar ---------- */
  function renderSplit(start, contrib, interest) {
    var total = start + contrib + interest;
    if (total <= 0) total = 1;
    var ps = start / total * 100, pc = contrib / total * 100, pi = interest / total * 100;
    segStart.style.flexBasis = ps + "%";
    segContrib.style.flexBasis = pc + "%";
    segInterest.style.flexBasis = pi + "%";
    segStart.style.display = ps < 0.5 ? "none" : "flex";
    keyStart.textContent = fmtMoney(start);
    keyContrib.textContent = fmtMoney(contrib);
    keyInterest.textContent = fmtMoney(interest);
    // hide labels in narrow segments
    [["segStart", ps], ["segContrib", pc], ["segInterest", pi]].forEach(function (pair) {
      var span = $(pair[0]).querySelector("span");
      if (span) span.style.opacity = pair[1] < 12 ? "0" : ".92";
    });
  }

  /* ---------- Ledger ---------- */
  function renderLedger(pv, pmt, i, n, goal) {
    ledgerBody.innerHTML = "";
    var years = Math.ceil(n / 12);
    for (var yr = 1; yr <= years; yr++) {
      var m = Math.min(yr * 12, n);
      var bal = futureValue(pv, pmt, i, m);
      var contributed = pv + pmt * m;
      var interest = Math.max(0, bal - contributed);
      var pct = goal > 0 ? Math.min(100, bal / goal * 100) : 0;
      var isFinal = m === n;
      var d = dateFromMonths(m);
      var tr = document.createElement("tr");
      if (isFinal) tr.className = "is-final";
      tr.innerHTML =
        "<td>" + d.toLocaleDateString("en-US", { month: "short", year: "numeric" }) + (isFinal ? " · goal" : "") + "</td>" +
        '<td class="num">' + fmtMoney(contributed) + "</td>" +
        '<td class="num">' + fmtMoney(interest) + "</td>" +
        '<td class="num">' + fmtMoney(bal) + "</td>" +
        '<td class="num"><span class="pct-cell">' + Math.round(pct) + '%<span class="pct-bar"><i style="width:' + pct + '%"></i></span></span></td>';
      ledgerBody.appendChild(tr);
      if (m === n) break;
    }
  }

  /* ---------- What-if ---------- */
  function seedWhatIf(planMonthly) {
    var max = Math.max(1000, Math.ceil(planMonthly * 2.5 / 50) * 50);
    whatMonthly.max = String(max);
    whatMonthly.value = String(Math.round(planMonthly));
    whatRate.value = String(state.annualRate);
  }

  function updateWhatIf() {
    var monthly = parseNum(whatMonthly.value);
    var rate = parseNum(whatRate.value);
    var i = rate / 100 / 12;
    var pv = state.start, fv = state.target;

    setRangeFill(whatMonthly);
    setRangeFill(whatRate);
    whatMonthlyOut.textContent = fmtMoney(monthly, { cents: monthly < 100 });
    whatRateOut.textContent = trimRate(rate) + "%";
    whatGoalName.textContent = lowerGoal(state.goalName);

    var months = monthsToReach(fv, pv, monthly, i);
    if (!isFinite(months) || months > MAX_MONTHS) {
      whatDate.textContent = "not at this pace";
      whatDelta.textContent = "Add a little each month — or a touch more return — to get there.";
      whatDelta.className = "whatif__delta is-slower";
      whatTotalInterest.textContent = "—";
      whatMonthsOut.textContent = "—";
      return;
    }
    var whole = Math.ceil(months);
    var d = dateFromMonths(whole);
    whatDate.textContent = fmtMonthYear(d);

    var bal = futureValue(pv, monthly, i, whole);
    var contributed = pv + monthly * whole;
    var interest = Math.max(0, bal - contributed);
    whatTotalInterest.textContent = fmtMoney(interest);
    whatMonthsOut.textContent = whole;

    // delta vs the plan deadline
    var planMonths = lastPlan ? lastPlan.n : monthsUntil(state.targetDate);
    var diff = planMonths - whole;
    if (Math.abs(diff) <= 0) {
      whatDelta.textContent = "Right on your target date.";
      whatDelta.className = "whatif__delta";
    } else if (diff > 0) {
      whatDelta.textContent = aheadText(diff) + " sooner than your deadline.";
      whatDelta.className = "whatif__delta is-faster";
    } else {
      whatDelta.textContent = aheadText(-diff) + " later than your deadline.";
      whatDelta.className = "whatif__delta is-slower";
    }
  }

  function aheadText(months) {
    if (months >= 12) {
      var y = Math.floor(months / 12), m = months % 12;
      return y + (y === 1 ? " year" : " years") + (m ? " " + m + (m === 1 ? " mo" : " mos") : "");
    }
    return months + (months === 1 ? " month" : " months");
  }

  function setRangeFill(el) {
    var min = parseNum(el.min) || 0, max = parseNum(el.max) || 100, val = parseNum(el.value);
    var pct = max > min ? (val - min) / (max - min) * 100 : 0;
    el.style.setProperty("--fill", pct + "%");
  }

  /* ---------- Persistence ---------- */
  function persist() {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(state)); } catch (e) {}
  }
  function restore() {
    var raw;
    try { raw = localStorage.getItem(STORAGE_KEY); } catch (e) { return; }
    if (!raw) return;
    try {
      var s = JSON.parse(raw);
      if (s && typeof s === "object") {
        elGoalName.value = s.goalName || elGoalName.value;
        if (s.target != null) elTarget.value = Number(s.target).toLocaleString();
        if (s.start != null) elStart.value = Number(s.start).toLocaleString();
        if (s.targetDate) elDate.value = s.targetDate;
        if (s.currency) elCurrency.value = s.currency;
        if (s.annualRate != null) applyRate(s.annualRate);
      }
    } catch (e) {}
  }

  function applyRate(rate) {
    var matched = false;
    ratePick.querySelectorAll(".ratebtn").forEach(function (b) {
      b.classList.remove("is-active");
      b.removeAttribute("aria-pressed");
      if (!b.classList.contains("ratebtn--custom") && parseNum(b.getAttribute("data-rate")) === parseNum(rate)) {
        b.classList.add("is-active"); b.setAttribute("aria-pressed", "true"); matched = true;
      }
    });
    if (!matched) {
      var custom = ratePick.querySelector(".ratebtn--custom");
      custom.classList.add("is-active");
      elCustomRate.value = trimRate(rate);
    }
  }

  /* ---------- Copy plan ---------- */
  function copyPlan() {
    var c = CURRENCIES[state.currency] || CURRENCIES.USD;
    var n = lastPlan ? lastPlan.n : monthsUntil(state.targetDate);
    var d = dateFromMonths(n);
    var lines = [
      "MILESTONE — my savings plan",
      "Goal: " + cap(state.goalName),
      "Target: " + fmtMoney(state.target) + " by " + fmtMonthYear(d),
      "Starting with: " + fmtMoney(state.start),
      "Assumed return: " + trimRate(state.annualRate) + "% / year",
      "→ Set aside " + fmtMoney(lastPlan ? lastPlan.pmt : 0) + " every month (" + n + " months)",
      "Interest does about " + fmtMoney(lastPlan ? lastPlan.totalInterest : 0) + " of the work.",
      "Planned with milestone — built on Spacefast."
    ];
    var text = lines.join("\n");
    function done() { flash("Plan copied to clipboard"); copyLabel.textContent = "Copied!"; setTimeout(function () { copyLabel.textContent = "Copy my plan"; }, 1800); }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(done, fallbackCopy);
    } else { fallbackCopy(); }
    function fallbackCopy() {
      var ta = document.createElement("textarea");
      ta.value = text; ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); done(); } catch (e) { flash("Couldn't copy — select and copy manually"); }
      document.body.removeChild(ta);
    }
  }

  var toastTimer;
  function flash(msg) {
    toast.textContent = msg; toast.classList.add("is-on");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove("is-on"); }, 2400);
  }

  /* ---------- Input formatting ---------- */
  function formatMoneyField(el) {
    var raw = el.value.replace(/[^0-9.]/g, "");
    if (raw === "") { return; }
    var num = parseFloat(raw);
    if (!isFinite(num)) return;
    // keep decimals if the user is mid-typing a decimal
    if (/\.\d*$/.test(raw) && raw.indexOf(".") === raw.length - 1) return;
    el.value = num.toLocaleString(undefined, { maximumFractionDigits: 2 });
  }

  /* ---------- Wiring ---------- */
  function bind() {
    // rate buttons
    ratePick.querySelectorAll(".ratebtn").forEach(function (btn) {
      var act = function () {
        ratePick.querySelectorAll(".ratebtn").forEach(function (b) { b.classList.remove("is-active"); b.removeAttribute("aria-pressed"); });
        btn.classList.add("is-active"); btn.setAttribute("aria-pressed", "true");
        if (btn.classList.contains("ratebtn--custom")) { elCustomRate.focus(); }
        recompute();
      };
      if (btn.classList.contains("ratebtn--custom")) {
        elCustomRate.addEventListener("focus", function () {
          ratePick.querySelectorAll(".ratebtn").forEach(function (b) { b.classList.remove("is-active"); b.removeAttribute("aria-pressed"); });
          btn.classList.add("is-active");
        });
        elCustomRate.addEventListener("input", recompute);
      } else {
        btn.addEventListener("click", act);
      }
    });

    [elGoalName, elTarget, elStart, elDate, elCurrency].forEach(function (el) {
      el.addEventListener("input", recompute);
      el.addEventListener("change", recompute);
    });
    [elTarget, elStart].forEach(function (el) {
      el.addEventListener("blur", function () { formatMoneyField(el); recompute(); });
    });

    form.addEventListener("submit", function (e) { e.preventDefault(); });
    form.addEventListener("reset", function () {
      setTimeout(function () {
        try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
        elGoalName.value = "House down payment";
        elTarget.value = "20,000";
        elStart.value = "3,500";
        elDate.value = defaultDateValue();
        elCurrency.value = "USD";
        applyRate(4.5);
        elCustomRate.value = "";
        recompute();
        flash("Reset to a fresh plan");
      }, 0);
    });

    whatMonthly.addEventListener("input", updateWhatIf);
    whatRate.addEventListener("input", updateWhatIf);
    syncBtn.addEventListener("click", function () {
      if (lastPlan) { seedWhatIf(lastPlan.pmt); }
      whatRate.value = String(state.annualRate);
      updateWhatIf();
      flash("Sliders matched to your plan");
    });

    copyBtn.addEventListener("click", copyPlan);
    window.addEventListener("resize", debounce(function () {
      if (lastPlan) renderChart(lastPlan.series, lastPlan.fv, lastPlan.n, lastPlan.i, lastPlan.pmt, lastPlan.pv);
    }, 150));
  }

  function debounce(fn, ms) {
    var t; return function () { clearTimeout(t); t = setTimeout(fn, ms); };
  }

  /* ---------- Init ---------- */
  function init() {
    if (!elDate.value) elDate.value = defaultDateValue();
    restore();
    bind();
    recompute();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else { init(); }
})();
