/* ===== Kimchi Taco Co. — where are we today? ===== */
(function () {
  "use strict";

  // Days indexed Sun=0 … Sat=6 to match Date.getDay().
  // open/close are minutes from midnight (e.g. 11:00 = 660). closed = no stop.
  var WEEK = [
    { day: 0, dow: "Sun", loc: "Smorgasburg LA",        addr: "785 Bay St, Los Angeles",          open: 600,  close: 960  }, // 10–4
    { day: 1, dow: "Mon", loc: "Resting the grill",     addr: "Closed — prep & maintenance day",  open: null, close: null },
    { day: 2, dow: "Tue", loc: "Arts District",         addr: "800 Traction Ave, Los Angeles",    open: 660,  close: 900  }, // 11–3
    { day: 3, dow: "Wed", loc: "Exposition Park / USC", addr: "700 Exposition Park Dr, Los Angeles", open: 690, close: 870 }, // 11:30–2:30
    { day: 4, dow: "Thu", loc: "Smorgasburg Dinner Pop-up", addr: "785 Bay St, Los Angeles",      open: 1020, close: 1260 }, // 5–9
    { day: 5, dow: "Fri", loc: "Abbot Kinney, Venice",  addr: "1010 Abbot Kinney Blvd, Venice",   open: 690,  close: 900  }, // 11:30–3
    { day: 6, dow: "Sat", loc: "Highland Park",         addr: "5651 N Figueroa St, Los Angeles",  open: 720,  close: 1200 }  // 12–8
  ];

  var DOW_LONG = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

  function pad(n) { return n < 10 ? "0" + n : "" + n; }

  function fmtTime(mins) {
    var h = Math.floor(mins / 60), m = mins % 60;
    var ampm = h >= 12 ? "PM" : "AM";
    var h12 = h % 12; if (h12 === 0) h12 = 12;
    return m === 0 ? h12 + " " + ampm : h12 + ":" + pad(m) + " " + ampm;
  }

  function fmtHours(stop) {
    if (stop.open === null) return "Closed today";
    return fmtTime(stop.open) + " – " + fmtTime(stop.close);
  }

  function mapsHref(stop) {
    return "https://www.google.com/maps/dir/?api=1&destination=" +
      encodeURIComponent(stop.loc + ", " + stop.addr);
  }

  // Date label for the next occurrence of a weekday this week (relative to today).
  function dateForDay(targetDay, today) {
    var base = new Date(today);
    var delta = (targetDay - today.getDay() + 7) % 7;
    base.setDate(base.getDate() + delta);
    return base;
  }

  function ordinal(d) {
    if (d > 3 && d < 21) return d + "th";
    switch (d % 10) { case 1: return d + "st"; case 2: return d + "nd"; case 3: return d + "rd"; default: return d + "th"; }
  }

  function buildRow(stop, opts) {
    var li = document.createElement("li");
    li.className = "route-row";
    var closed = stop.open === null;
    if (closed) li.classList.add("is-closed");
    if (opts.isToday) li.classList.add("is-today");

    var dateObj = dateForDay(stop.day, opts.today);
    var dateLabel = dateObj.toLocaleDateString("en-US", { month: "short" }) + " " + ordinal(dateObj.getDate());

    // Day column
    var dayCol = document.createElement("div");
    dayCol.className = "route-day";
    dayCol.innerHTML = '<span class="dow">' + stop.dow + '</span><span class="date">' + dateLabel + '</span>';

    // Where column
    var whereCol = document.createElement("div");
    whereCol.className = "route-where";
    var todayFlag = opts.isToday ? '<span class="today-flag">Today</span><br>' : "";
    whereCol.innerHTML =
      todayFlag +
      '<span class="loc">' + stop.loc + '</span><br>' +
      '<span class="addr">' + stop.addr + '</span>' +
      (closed ? "" : '<br><span class="hours">' + fmtHours(stop) + '</span>');

    // Action column
    var actionCol = document.createElement("div");
    actionCol.className = "route-action";
    if (!closed) {
      var a = document.createElement("a");
      a.className = "route-link";
      a.href = mapsHref(stop);
      a.target = "_blank";
      a.rel = "noopener";
      a.textContent = "📍 Directions";
      actionCol.appendChild(a);
      if (opts.isToday) {
        var status = document.createElement("span");
        var isOpen = opts.nowMins >= stop.open && opts.nowMins < stop.close;
        status.className = "open-now " + (isOpen ? "open" : "closed");
        status.textContent = isOpen ? "Open now" : (opts.nowMins < stop.open ? "Opens " + fmtTime(stop.open) : "Closed for today");
        actionCol.appendChild(status);
      }
    } else {
      var off = document.createElement("span");
      off.className = "open-now closed";
      off.textContent = "Day off";
      actionCol.appendChild(off);
    }

    li.appendChild(dayCol);
    li.appendChild(whereCol);
    li.appendChild(actionCol);
    return li;
  }

  function nextOpenStop(today) {
    for (var i = 1; i <= 7; i++) {
      var idx = (today.getDay() + i) % 7;
      var s = WEEK[idx];
      if (s.open !== null) return s;
    }
    return null;
  }

  function renderBanner(today, nowMins) {
    var banner = document.getElementById("now-banner");
    var dot = document.getElementById("now-dot");
    var text = document.getElementById("now-text");
    var dir = document.getElementById("now-directions");
    if (!banner) return;

    var todayStop = WEEK[today.getDay()];
    var openToday = todayStop.open !== null;
    var liveNow = openToday && nowMins >= todayStop.open && nowMins < todayStop.close;
    var laterToday = openToday && nowMins < todayStop.open;

    if (liveNow) {
      banner.classList.add("is-open");
      text.innerHTML = "We're parked at <strong>" + todayStop.loc + "</strong> right now — open till " + fmtTime(todayStop.close) + ".";
      dir.href = mapsHref(todayStop); dir.hidden = false;
    } else if (laterToday) {
      banner.classList.add("is-closed");
      text.innerHTML = "Today we roll up to <strong>" + todayStop.loc + "</strong> at " + fmtTime(todayStop.open) + ".";
      dir.href = mapsHref(todayStop); dir.hidden = false;
    } else {
      // Closed for the day (day off, or after close) — point to next stop.
      var next = nextOpenStop(today);
      banner.classList.add("is-closed");
      if (next) {
        text.innerHTML = "Off the road right now — next stop <strong>" + next.loc + "</strong> on " + DOW_LONG[next.day] + ".";
        dir.href = mapsHref(next); dir.hidden = false;
      } else {
        text.textContent = "Check this week's route below for our next stop.";
      }
    }
    if (dir && !dir.hidden) dir.textContent = "Get directions →";
  }

  function renderSchedule() {
    var now = new Date();
    var nowMins = now.getHours() * 60 + now.getMinutes();
    var todayIdx = now.getDay();

    // Order: today first, then the rest of the week in order.
    var ordered = [];
    for (var i = 0; i < 7; i++) ordered.push(WEEK[(todayIdx + i) % 7]);

    var route = document.getElementById("route");
    if (route) {
      route.innerHTML = "";
      ordered.forEach(function (stop) {
        route.appendChild(buildRow(stop, {
          isToday: stop.day === todayIdx,
          today: now,
          nowMins: nowMins
        }));
      });
    }
    renderBanner(now, nowMins);
  }

  /* ===== Catering form ===== */
  function initForm() {
    var form = document.getElementById("catering-form");
    if (!form) return;
    var status = document.getElementById("form-status");

    function setInvalid(el, bad) { el.setAttribute("aria-invalid", bad ? "true" : "false"); }
    function emailOk(v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.elements["name"];
      var email = form.elements["email"];
      var ok = true;

      if (!name.value.trim()) { setInvalid(name, true); ok = false; } else setInvalid(name, false);
      if (!emailOk(email.value.trim())) { setInvalid(email, true); ok = false; } else setInvalid(email, false);

      if (!ok) {
        status.textContent = "Add your name and a valid email and we'll get right back to you.";
        status.className = "form-status err";
        (name.getAttribute("aria-invalid") === "true" ? name : email).focus();
        return;
      }

      var first = name.value.trim().split(" ")[0];
      form.querySelectorAll(".field, .field-row, button[type=submit]").forEach(function (n) { n.style.display = "none"; });
      status.innerHTML = "🌮 Thanks, " + first + "! Your inquiry's in — we usually reply within a day. " +
        "Truck-bound right now? Email <a href=\"mailto:catering@kimchitacoco.example\">catering@kimchitacoco.example</a>.";
      status.className = "form-status ok";
      status.style.fontSize = "1.05rem";
      status.focus && status.focus();
    });
  }

  function init() {
    renderSchedule();
    initForm();
    var yr = document.getElementById("year");
    if (yr) yr.textContent = new Date().getFullYear();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
