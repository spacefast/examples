/* Northpeak — coming-soon teaser
 * Live countdown, validating email capture with a friendly success state,
 * and a waitlist counter that nudges up when you join. All client-side,
 * no backend. State persists in localStorage so returning visitors stay "in".
 */
(function () {
  "use strict";

  // ---- Launch target -------------------------------------------------------
  // Edit this single line to change the launch date. It drives the countdown
  // and the "Targeting …" line in the markup.
  var LAUNCH = new Date("2026-09-16T16:00:00Z");

  var STORE_KEY = "northpeak.signup";
  var BASE_WAITLIST = 1294;

  // ---- Helpers -------------------------------------------------------------
  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function pad(n) { return String(n).padStart(2, "0"); }
  function isEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.trim());
  }
  function fmtCount(n) { return n.toLocaleString("en-US"); }

  // ---- Countdown -----------------------------------------------------------
  var cells = {
    days: $("[data-days]"),
    hours: $("[data-hours]"),
    mins: $("[data-mins]"),
    secs: $("[data-secs]")
  };

  function setCell(el, value) {
    if (!el || el.textContent === value) return;
    el.textContent = value;
    el.classList.remove("flip");
    // force reflow so the animation can replay
    void el.offsetWidth;
    el.classList.add("flip");
  }

  function tick() {
    var diff = LAUNCH.getTime() - Date.now();

    if (diff <= 0) {
      setCell(cells.days, "00");
      setCell(cells.hours, "00");
      setCell(cells.mins, "00");
      setCell(cells.secs, "00");
      var label = $(".countdown__label");
      if (label) label.textContent = "We're live";
      return false;
    }

    var s = Math.floor(diff / 1000);
    var days = Math.floor(s / 86400);
    var hours = Math.floor((s % 86400) / 3600);
    var mins = Math.floor((s % 3600) / 60);
    var secs = s % 60;

    setCell(cells.days, pad(days));
    setCell(cells.hours, pad(hours));
    setCell(cells.mins, pad(mins));
    setCell(cells.secs, pad(secs));
    return true;
  }

  tick();
  var timer = setInterval(function () {
    if (tick() === false) clearInterval(timer);
  }, 1000);

  // ---- Waitlist counter ----------------------------------------------------
  var countEl = $("#count");
  var saved = null;
  try { saved = JSON.parse(localStorage.getItem(STORE_KEY)); } catch (e) {}

  function renderCount(joined) {
    if (!countEl) return;
    countEl.textContent = fmtCount(BASE_WAITLIST + (joined ? 1 : 0));
  }
  renderCount(saved && saved.joined);

  // ---- Signup form ---------------------------------------------------------
  var form = $("#signup-form");
  var input = $("#email");
  var msg = $("#form-msg");
  var success = $("#success");
  var successSub = $("#success-sub");
  var countLine = $("#count-line");

  function showSuccess(email) {
    form.hidden = true;
    success.hidden = false;
    if (successSub && email) {
      successSub.textContent =
        "We'll email " + email + " the moment Northpeak opens. No spam, just the invite.";
    }
    renderCount(true);
  }

  // Returning visitor who already signed up: skip straight to the thank-you.
  if (saved && saved.joined) {
    showSuccess(saved.email);
  }

  if (form) {
    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      var value = input.value.trim();

      if (!value) {
        form.classList.add("invalid");
        msg.textContent = "Pop in your email and we'll save you a spot.";
        input.focus();
        return;
      }
      if (!isEmail(value)) {
        form.classList.add("invalid");
        msg.textContent = "That doesn't look like an email — mind checking it?";
        input.focus();
        return;
      }

      form.classList.remove("invalid");
      msg.textContent = "";

      try {
        localStorage.setItem(STORE_KEY, JSON.stringify({ joined: true, email: value, at: Date.now() }));
      } catch (e) {}

      showSuccess(value);
    });

    // Clear the error the moment they start fixing it.
    input.addEventListener("input", function () {
      if (form.classList.contains("invalid")) {
        form.classList.remove("invalid");
        msg.textContent = "";
      }
    });
  }
})();
