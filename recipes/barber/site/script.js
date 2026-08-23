/* ===== Ironclad Barber Co. — interactions ===== */
(function () {
  "use strict";

  /* ---- Footer year ---- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---- Mobile nav ---- */
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("nav-menu");
  if (toggle && menu) {
    var setOpen = function (open) {
      menu.classList.toggle("open", open);
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    };
    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });
    menu.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setOpen(false);
    });
  }

  /* ---- Hours: highlight today + open/closed status ---- */
  // Index 0 = Sunday … 6 = Saturday. [openMinutes, closeMinutes] or null when closed.
  var schedule = [
    [600, 900],   // Sun 10:00–15:00
    null,         // Mon closed
    [540, 1140],  // Tue 9:00–19:00
    [540, 1140],  // Wed
    [540, 1140],  // Thu
    [540, 1200],  // Fri 9:00–20:00
    [480, 1020]   // Sat 8:00–17:00
  ];

  var rows = document.querySelectorAll(".hours-row");
  var now = new Date();
  var day = now.getDay();
  // Rows are listed Monday → Sunday; map weekday index to row index.
  var rowOrder = [6, 0, 1, 2, 3, 4, 5]; // Mon..Sun row -> JS day
  rows.forEach(function (row, i) {
    if (rowOrder[i] === day) row.classList.add("is-today");
  });

  var statusEl = document.getElementById("open-status");
  if (statusEl) {
    var mins = now.getHours() * 60 + now.getMinutes();
    var today = schedule[day];
    var open = !!today && mins >= today[0] && mins < today[1];
    statusEl.hidden = false;
    statusEl.classList.add(open ? "is-open" : "is-closed");
    if (open) {
      var closeM = today[1];
      var h = Math.floor(closeM / 60);
      var ampm = h >= 12 ? "PM" : "AM";
      var h12 = ((h + 11) % 12) + 1;
      statusEl.textContent = "Open now · until " + h12 + ":00 " + ampm;
    } else {
      // Find next opening day.
      var label = "Closed now";
      for (var k = 1; k <= 7; k++) {
        var d = (day + k) % 7;
        if (schedule[d]) {
          var names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
          var oh = Math.floor(schedule[d][0] / 60);
          var oampm = oh >= 12 ? "PM" : "AM";
          var oh12 = ((oh + 11) % 12) + 1;
          var when = k === 1 ? "tomorrow" : names[d];
          label = "Closed now · opens " + when + " at " + oh12 + ":00 " + oampm;
          break;
        }
      }
      statusEl.textContent = label;
    }
  }

  /* ---- Booking form ---- */
  var form = document.getElementById("book-form");
  var success = document.getElementById("book-success");
  var detail = document.getElementById("success-detail");
  var again = document.getElementById("book-again");

  var validators = {
    name: function (v) { return v.trim().length >= 2; },
    phone: function (v) { return v.replace(/[^\d]/g, "").length >= 7; },
    service: function (v) { return v.trim() !== ""; }
  };

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true;
      Object.keys(validators).forEach(function (id) {
        var field = form.elements[id];
        if (!field) return;
        var valid = validators[id](field.value);
        field.setAttribute("aria-invalid", String(!valid));
        if (!valid && ok) { field.focus(); ok = false; }
      });
      if (!ok) return;

      var name = form.elements.name.value.trim().split(" ")[0];
      var service = form.elements.service.value.split("—")[0].trim();
      var barber = form.elements.barber.value;
      var when = form.elements.when.value.trim();

      if (detail) {
        var who = barber && barber !== "No preference" ? " with " + barber : "";
        var time = when ? " for " + when : "";
        detail.textContent =
          "Thanks, " + name + " — we've got your " + service + who + time +
          " down. We'll text you within the hour to lock in the time.";
      }

      // Remember the visitor's name for a warmer return visit.
      try { localStorage.setItem("ironclad_lastName", name); } catch (err) {}

      form.hidden = true;
      if (success) {
        success.hidden = false;
        success.focus && success.focus();
        success.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });

    form.addEventListener("input", function (e) {
      var t = e.target;
      if (t && t.getAttribute("aria-invalid") === "true") {
        t.setAttribute("aria-invalid", "false");
      }
    });
  }

  if (again && form && success) {
    again.addEventListener("click", function () {
      success.hidden = true;
      form.hidden = false;
      form.reset();
      form.elements.name.focus();
    });
  }
})();
