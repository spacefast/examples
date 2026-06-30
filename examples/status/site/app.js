(function () {
  "use strict";

  /* ---------- Component data ----------
     status: "up" | "degraded" | "down" | "maint"
     The 90-day history is generated deterministically per component so the bars
     are stable across reloads (a real status page reads this from monitoring). */
  var COMPONENTS = [
    {
      name: "API",
      desc: "REST & GraphQL endpoints · api.northwindapi.com",
      status: "up",
      seed: 7,
      // sparse real-feeling incidents on specific days (0 = today, counting back)
      events: { 7: "down" }
    },
    {
      name: "Dashboard",
      desc: "app.northwindapi.com web console",
      status: "up",
      seed: 19,
      events: { 19: "degraded" }
    },
    {
      name: "Webhooks",
      desc: "Event delivery to your endpoints",
      status: "degraded",
      seed: 3,
      events: { 0: "degraded" }
    },
    {
      name: "CDN",
      desc: "Static assets & file downloads",
      status: "up",
      seed: 31,
      events: {}
    },
    {
      name: "Database",
      desc: "Primary Postgres cluster · us-east-1",
      status: "up",
      seed: 11,
      events: { 32: "maint" }
    }
  ];

  var DAYS = 90;

  var STATUS_LABEL = {
    up: "Operational",
    degraded: "Degraded performance",
    down: "Partial outage",
    maint: "Under maintenance"
  };
  var STATUS_CLASS = {
    up: "status-up",
    degraded: "status-degraded",
    down: "status-down",
    maint: "status-maint"
  };
  var DOT_CLASS = {
    up: "dot-up",
    degraded: "dot-degraded",
    down: "dot-down",
    maint: "dot-maint"
  };

  // Tiny deterministic PRNG so bars are stable but look organic.
  function mulberry(a) {
    return function () {
      a |= 0; a = (a + 0x6d2b79f5) | 0;
      var t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function buildHistory(comp) {
    var rand = mulberry(comp.seed * 2654435761);
    var cells = [];
    var downDays = 0, degradedDays = 0, maintDays = 0;
    for (var i = DAYS - 1; i >= 0; i--) {
      var state = "up";
      if (comp.events[i]) {
        state = comp.events[i];
      } else {
        var r = rand();
        // very rare blips for realism
        if (r > 0.992) state = "degraded";
      }
      if (state === "down") downDays++;
      else if (state === "degraded") degradedDays += 0.4;
      else if (state === "maint") maintDays += 0.15;
      cells.push({ ago: i, state: state });
    }
    var badDays = downDays + degradedDays + maintDays;
    var pct = ((DAYS - badDays) / DAYS) * 100;
    return { cells: cells, pct: pct };
  }

  function dayLabel(ago) {
    var d = new Date();
    d.setUTCDate(d.getUTCDate() - ago);
    return d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
  }

  function el(tag, cls, attrs) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (attrs) for (var k in attrs) n.setAttribute(k, attrs[k]);
    return n;
  }

  function renderComponents() {
    var list = document.getElementById("component-list");
    if (!list) return;
    list.innerHTML = "";

    COMPONENTS.forEach(function (comp) {
      var hist = buildHistory(comp);

      var row = el("li", "component-row");

      var top = el("div", "component-top");
      var name = el("div", "component-name");
      name.appendChild(el("span", "dot " + DOT_CLASS[comp.status]));
      var nameText = el("span");
      nameText.appendChild(document.createTextNode(comp.name));
      var desc = el("span", "component-desc");
      desc.textContent = comp.desc;
      nameText.appendChild(desc);
      name.appendChild(nameText);

      var status = el("span", "component-status " + STATUS_CLASS[comp.status]);
      status.textContent = STATUS_LABEL[comp.status];

      top.appendChild(name);
      top.appendChild(status);
      row.appendChild(top);

      var bar = el("div", "uptime-bar", { role: "img", "aria-label": comp.name + " uptime over the last 90 days: " + hist.pct.toFixed(2) + " percent" });
      hist.cells.forEach(function (c) {
        var cell = el("span", "uptime-cell c-" + c.state);
        var label = c.state === "up"
          ? dayLabel(c.ago) + " — operational"
          : dayLabel(c.ago) + " — " + STATUS_LABEL[c.state].toLowerCase();
        cell.title = label;
        bar.appendChild(cell);
      });
      row.appendChild(bar);

      var foot = el("div", "uptime-foot");
      var leftLbl = el("span"); leftLbl.textContent = "90 days ago";
      var pct = el("span", "uptime-pct"); pct.textContent = hist.pct.toFixed(2) + "% uptime";
      var rightLbl = el("span"); rightLbl.textContent = "Today";
      foot.appendChild(leftLbl);
      foot.appendChild(pct);
      foot.appendChild(rightLbl);
      row.appendChild(foot);

      list.appendChild(row);
    });
  }

  /* ---------- Overall banner from component states ---------- */
  function refreshBanner() {
    var worst = "up";
    var order = { up: 0, maint: 1, degraded: 2, down: 3 };
    COMPONENTS.forEach(function (c) {
      if (order[c.status] > order[worst]) worst = c.status;
    });

    var banner = document.getElementById("overall-banner");
    var title = banner && banner.querySelector(".banner-title");
    if (!banner || !title) return;

    banner.classList.remove("banner--ok", "banner--degraded", "banner--down");
    if (worst === "up") {
      banner.classList.add("banner--ok");
      title.textContent = "All systems operational";
    } else if (worst === "down") {
      banner.classList.add("banner--down");
      title.textContent = "Partial system outage";
    } else {
      banner.classList.add("banner--degraded");
      title.textContent = "Some systems degraded";
    }
  }

  /* ---------- Last-updated timestamp ---------- */
  function relativeTime(date) {
    var s = Math.round((Date.now() - date) / 1000);
    if (s < 45) return "just now";
    if (s < 90) return "a minute ago";
    var m = Math.round(s / 60);
    if (m < 60) return m + " minutes ago";
    var h = Math.round(m / 60);
    if (h < 24) return h + (h === 1 ? " hour ago" : " hours ago");
    return date.toLocaleString();
  }

  var pageLoadedAt = new Date();
  function tickTimestamp() {
    var t = document.getElementById("last-updated");
    if (!t) return;
    t.textContent = relativeTime(pageLoadedAt);
    t.setAttribute("datetime", pageLoadedAt.toISOString());
  }

  /* ---------- Subscribe form ---------- */
  var STORAGE_KEY = "northwind-status-subscriber";

  function showSuccess(email) {
    var form = document.getElementById("subscribe-form");
    var success = document.getElementById("subscribe-success");
    var successEmail = document.getElementById("success-email");
    if (!form || !success) return;
    successEmail.textContent = email;
    success.hidden = false;
    var fields = form.querySelectorAll(".field, .field-note");
    fields.forEach(function (f) { f.style.display = "none"; });
  }

  function initForm() {
    var form = document.getElementById("subscribe-form");
    if (!form) return;
    var input = document.getElementById("email");
    var error = document.getElementById("email-error");

    // Restore previous subscription if present.
    try {
      var saved = localStorage.getItem(STORAGE_KEY);
      if (saved) showSuccess(saved);
    } catch (e) { /* storage blocked — fine */ }

    input.addEventListener("input", function () {
      input.removeAttribute("aria-invalid");
      error.hidden = true;
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var value = input.value.trim();
      var valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      if (!valid) {
        input.setAttribute("aria-invalid", "true");
        error.hidden = false;
        input.focus();
        return;
      }
      try { localStorage.setItem(STORAGE_KEY, value); } catch (e2) {}
      showSuccess(value);
    });
  }

  /* ---------- Boot ---------- */
  document.addEventListener("DOMContentLoaded", function () {
    renderComponents();
    refreshBanner();
    tickTimestamp();
    setInterval(tickTimestamp, 30000);
    initForm();
  });
})();
