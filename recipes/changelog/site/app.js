/* ---------------------------------------------------------------------------
   Plank — Changelog
   Client-side behaviour: theme toggle, category filtering (persisted to the URL
   + localStorage), "x days ago" stamps, permalink copy, and a subscribe form
   that shows a friendly success state. No backend, no dependencies.
--------------------------------------------------------------------------- */
(function () {
  "use strict";

  var root = document.documentElement;

  /* ---- Theme (light/dark) -------------------------------------------- */
  var THEME_KEY = "plank-theme";
  function applyTheme(t) { root.setAttribute("data-theme", t); }

  var stored = null;
  try { stored = localStorage.getItem(THEME_KEY); } catch (e) {}
  if (stored === "light" || stored === "dark") {
    applyTheme(stored);
  } else if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
    applyTheme("dark");
  }

  var themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.addEventListener("click", function () {
      var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
      applyTheme(next);
      try { localStorage.setItem(THEME_KEY, next); } catch (e) {}
    });
  }

  /* ---- "x ago" relative stamps --------------------------------------- */
  function relativeFrom(dateStr) {
    var then = new Date(dateStr + "T12:00:00");
    if (isNaN(then)) return "";
    var days = Math.round((Date.now() - then.getTime()) / 86400000);
    if (days <= 0) return "today";
    if (days === 1) return "yesterday";
    if (days < 14) return days + " days ago";
    if (days < 60) return Math.round(days / 7) + " weeks ago";
    if (days < 365) return Math.round(days / 30) + " months ago";
    var y = Math.floor(days / 365);
    return y + (y === 1 ? " year ago" : " years ago");
  }
  Array.prototype.forEach.call(document.querySelectorAll(".ago[data-date]"), function (el) {
    el.textContent = relativeFrom(el.getAttribute("data-date"));
  });

  /* ---- Category filtering -------------------------------------------- */
  var FILTER_KEY = "plank-filter";
  var VALID = ["all", "new", "improved", "fixed"];
  var filters = Array.prototype.slice.call(document.querySelectorAll(".filter"));
  var releases = Array.prototype.slice.call(document.querySelectorAll(".release"));
  var countEl = document.getElementById("resultCount");
  var emptyEl = document.getElementById("empty");

  function readInitialFilter() {
    var params = new URLSearchParams(window.location.search);
    var fromUrl = params.get("filter");
    if (VALID.indexOf(fromUrl) > -1) return fromUrl;
    var saved = null;
    try { saved = localStorage.getItem(FILTER_KEY); } catch (e) {}
    if (VALID.indexOf(saved) > -1) return saved;
    return "all";
  }

  function applyFilter(value, opts) {
    opts = opts || {};
    if (VALID.indexOf(value) === -1) value = "all";
    var shown = 0;

    releases.forEach(function (rel) {
      var match = value === "all" || rel.getAttribute("data-category") === value;
      rel.classList.toggle("is-hidden", !match);
      if (match) shown++;
    });

    filters.forEach(function (btn) {
      btn.setAttribute("aria-pressed", btn.getAttribute("data-filter") === value ? "true" : "false");
    });

    if (emptyEl) emptyEl.classList.toggle("show", shown === 0);
    if (countEl) {
      countEl.textContent = value === "all"
        ? "Showing all " + releases.length + " updates"
        : "Showing " + shown + " of " + releases.length + " updates";
    }

    try { localStorage.setItem(FILTER_KEY, value); } catch (e) {}

    if (!opts.silent) {
      var params = new URLSearchParams(window.location.search);
      if (value === "all") params.delete("filter"); else params.set("filter", value);
      var qs = params.toString();
      history.replaceState(null, "", window.location.pathname + (qs ? "?" + qs : "") + window.location.hash);
    }
  }

  filters.forEach(function (btn) {
    btn.addEventListener("click", function () {
      applyFilter(btn.getAttribute("data-filter"));
    });
  });

  applyFilter(readInitialFilter(), { silent: true });

  /* ---- Permalink copy ------------------------------------------------ */
  var toast = document.getElementById("toast");
  var toastText = document.getElementById("toastText");
  var toastTimer;

  function showToast(msg) {
    if (!toast) return;
    if (toastText) toastText.textContent = msg;
    toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.classList.remove("show"); }, 2200);
  }

  Array.prototype.forEach.call(document.querySelectorAll(".permalink"), function (link) {
    link.addEventListener("click", function (e) {
      var id = (link.getAttribute("href") || "").replace(/^#/, "");
      if (!id) return;
      var url = window.location.origin + window.location.pathname + "#" + id;
      // Update the address bar regardless of clipboard support.
      history.replaceState(null, "", "#" + id);
      if (navigator.clipboard && navigator.clipboard.writeText) {
        e.preventDefault();
        navigator.clipboard.writeText(url).then(
          function () { showToast("Link copied to clipboard"); },
          function () { showToast("Jumped to this update"); }
        );
      } else {
        showToast("Jumped to this update");
      }
    });
  });

  /* ---- Subscribe form ------------------------------------------------ */
  var form = document.getElementById("subForm");
  var input = document.getElementById("subEmail");
  var success = document.getElementById("subSuccess");
  var successText = document.getElementById("subSuccessText");

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var email = (input && input.value || "").trim();
      var ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
      if (!ok) {
        if (input) {
          input.focus();
          input.setCustomValidity("Please enter a valid email address.");
          input.reportValidity();
          input.addEventListener("input", function clear() {
            input.setCustomValidity("");
            input.removeEventListener("input", clear);
          });
        }
        return;
      }
      var name = email.split("@")[0].replace(/[._-]+/g, " ").trim();
      if (successText) {
        successText.textContent = "You're on the list" +
          (name ? ", " + name.charAt(0).toUpperCase() + name.slice(1) : "") +
          ". We'll email you the next time Plank ships.";
      }
      form.style.display = "none";
      if (success) success.classList.add("show");
    });
  }
})();
