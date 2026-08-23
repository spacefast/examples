/* ===== RamHacks 2026 ===== */
(function () {
  "use strict";

  // Event window, Mountain Daylight Time (UTC-06:00 in mid-October).
  var KICKOFF = new Date("2026-10-17T10:00:00-06:00"); // Opening ceremony
  var ENDS    = new Date("2026-10-18T22:00:00-06:00"); // Closing / pack-up

  /* ---------- Countdown ---------- */
  function pad(n) { return n < 10 ? "0" + n : "" + n; }

  function setText(id, val) {
    var el = document.getElementById(id);
    if (el) el.textContent = val;
  }

  function renderCountdown() {
    var now = Date.now();
    var clock = document.getElementById("countdown-clock");
    var label = document.getElementById("countdown-label");
    var wrap = document.getElementById("countdown");
    if (!clock || !wrap) return false;

    if (now >= ENDS.getTime()) {
      // Event over.
      clock.innerHTML =
        '<span class="countdown-live"><span class="live-dot" style="background:var(--ink-mute);animation:none"></span>' +
        "That's a wrap — see you in 2027! 🐏</span>";
      if (label) label.textContent = "RamHacks 2026";
      return false; // stop ticking
    }

    if (now >= KICKOFF.getTime()) {
      // Event live — count down to closing instead.
      wrap.classList.add("is-live");
      if (label) label.textContent = "Hacking is live — submissions close in";
      var rem = ENDS.getTime() - now;
      renderClock(clock, rem, true);
      return true;
    }

    // Before kickoff.
    if (label) label.textContent = "Kickoff in";
    renderClock(clock, KICKOFF.getTime() - now, false);
    return true;
  }

  function renderClock(clock, ms, live) {
    var totalSec = Math.floor(ms / 1000);
    var days = Math.floor(totalSec / 86400);
    var hours = Math.floor((totalSec % 86400) / 3600);
    var mins = Math.floor((totalSec % 3600) / 60);
    var secs = totalSec % 60;

    // If JS was replaced (live state used innerHTML), rebuild the unit markup.
    if (!document.getElementById("cd-days")) {
      clock.innerHTML =
        unit("cd-days", "days") + sep() +
        unit("cd-hours", "hrs") + sep() +
        unit("cd-mins", "min") + sep() +
        unit("cd-secs", "sec");
    }
    setText("cd-days", pad(days));
    setText("cd-hours", pad(hours));
    setText("cd-mins", pad(mins));
    setText("cd-secs", pad(secs));
  }
  function unit(id, word) {
    return '<div class="cd-unit"><span class="cd-num" id="' + id + '">--</span><span class="cd-word">' + word + "</span></div>";
  }
  function sep() { return '<span class="cd-sep" aria-hidden="true">:</span>'; }

  function startCountdown() {
    if (renderCountdown() === false) return;
    var timer = setInterval(function () {
      if (renderCountdown() === false) clearInterval(timer);
    }, 1000);
  }

  /* ---------- Schedule ---------- */
  var SCHEDULE = {
    sat: [
      { time: "8:00 AM",  title: "Check-in & breakfast",       desc: "Grab your badge, swag bag, and a bagel. Wi-Fi creds at the door.", tag: "food" },
      { time: "10:00 AM", title: "Opening ceremony",           desc: "Welcome, sponsor intros, prize reveal, and the rules. Don't miss it.", key: true },
      { time: "11:00 AM", title: "Team-formation mixer",       desc: "Solo or short a teammate? Pitch your idea and find your crew." },
      { time: "11:30 AM", title: "Hacking begins!",            desc: "The clock starts. 34 and a half hours on the board. Go build.", key: true },
      { time: "1:00 PM",  title: "Workshop: Intro to APIs",    desc: "Hands-on, beginner-friendly. Make your first request in 30 min.", tag: "work" },
      { time: "1:30 PM",  title: "Lunch",                      desc: "Build-your-own burrito bar in the Commons atrium.", tag: "food" },
      { time: "3:00 PM",  title: "Workshop: Ship your first AI app", desc: "From zero to a working LLM demo, hosted by Nimbus.", tag: "work" },
      { time: "6:00 PM",  title: "Dinner",                     desc: "Wood-fired pizza and a very large salad nobody will eat.", tag: "food" },
      { time: "8:00 PM",  title: "Cup-stacking grudge match",  desc: "Optional chaos. Winner gets a mechanical keyboard. Bracket on Discord." },
      { time: "11:59 PM", title: "Midnight snack",             desc: "Mac & cheese, cold brew, and questionable life choices.", tag: "food" }
    ],
    sun: [
      { time: "8:00 AM",  title: "Breakfast & coffee IV drip", desc: "Pancakes, fruit, and enough caffeine to finish strong.", tag: "food" },
      { time: "10:00 AM", title: "Hacking ends — submit!",     desc: "Pencils down. Submit your project on Devpost before the buzzer.", key: true },
      { time: "11:00 AM", title: "Project expo",               desc: "Science-fair-style demos. Judges and peers walk the floor." },
      { time: "1:00 PM",  title: "Lunch",                      desc: "Tacos to refuel before the finals.", tag: "food" },
      { time: "2:00 PM",  title: "Finalist demos",             desc: "Top teams pitch on the main stage. Three minutes, no slides required." },
      { time: "4:00 PM",  title: "Sponsor demos & raffle",     desc: "Cool tech from our sponsors, plus a swag raffle for everyone." },
      { time: "6:00 PM",  title: "Closing ceremony & awards",  desc: "Winners crowned, golden ram trophy awarded, group photo.", key: true },
      { time: "7:00 PM",  title: "Pack up & go sleep",         desc: "You earned it. Travel safe, and tag us in your project posts. 🐏" }
    ]
  };

  function renderAgenda(dayKey) {
    var panel = document.getElementById("panel-" + dayKey);
    if (!panel) return;
    panel.innerHTML = "";
    SCHEDULE[dayKey].forEach(function (item) {
      var li = document.createElement("li");
      li.className = "agenda-item" + (item.key ? " is-key" : "");

      var time = document.createElement("div");
      time.className = "ag-time";
      time.textContent = item.time;

      var body = document.createElement("div");
      body.className = "ag-body";
      var tag = "";
      if (item.tag === "food") tag = '<span class="ag-tag tag-food">🍕 food</span>';
      else if (item.tag === "work") tag = '<span class="ag-tag tag-work">workshop</span>';
      body.innerHTML =
        '<p class="ag-title">' + item.title + tag + "</p>" +
        '<p class="ag-desc">' + item.desc + "</p>";

      li.appendChild(time);
      li.appendChild(body);
      panel.appendChild(li);
    });
  }

  function initSchedule() {
    renderAgenda("sat");
    renderAgenda("sun");

    var tabs = Array.prototype.slice.call(document.querySelectorAll(".day-tab"));
    function activate(day) {
      tabs.forEach(function (t) {
        var on = t.getAttribute("data-day") === day;
        t.classList.toggle("is-active", on);
        t.setAttribute("aria-selected", on ? "true" : "false");
        t.tabIndex = on ? 0 : -1;
        var panel = document.getElementById("panel-" + t.getAttribute("data-day"));
        if (panel) panel.hidden = !on;
      });
    }
    tabs.forEach(function (tab, i) {
      tab.addEventListener("click", function () { activate(tab.getAttribute("data-day")); });
      tab.addEventListener("keydown", function (e) {
        if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
          e.preventDefault();
          var next = tabs[(i + (e.key === "ArrowRight" ? 1 : tabs.length - 1)) % tabs.length];
          activate(next.getAttribute("data-day"));
          next.focus();
        }
      });
    });
  }

  /* ---------- FAQ accordion ---------- */
  function initFaq() {
    var buttons = document.querySelectorAll(".faq-q");
    buttons.forEach(function (btn) {
      btn.addEventListener("click", function () {
        var open = btn.getAttribute("aria-expanded") === "true";
        var panel = btn.parentElement.parentElement.querySelector(".faq-a");
        btn.setAttribute("aria-expanded", open ? "false" : "true");
        if (panel) panel.hidden = open;
      });
    });
  }

  /* ---------- Registration form ---------- */
  function initForm() {
    var form = document.getElementById("register-form");
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
        status.textContent = "Add your name and a valid email so we can send your confirmation.";
        status.className = "form-status err";
        (name.getAttribute("aria-invalid") === "true" ? name : email).focus();
        return;
      }

      var first = name.value.trim().split(" ")[0];
      form.querySelectorAll(".field, button[type=submit], .form-fine").forEach(function (n) { n.style.display = "none"; });
      status.innerHTML =
        "🐏 You're in, " + first + "! We just emailed your confirmation and the " +
        '<a href="https://discord.gg/ramhacks" target="_blank" rel="noopener">Discord invite</a>. ' +
        "See you Oct 17 at the Engineering Commons — bring your charger.";
      status.className = "form-status ok";
      status.style.fontSize = "1.02rem";
      if (status.focus) status.focus();
    });
  }

  function init() {
    startCountdown();
    initSchedule();
    initFaq();
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
