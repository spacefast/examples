/* Kaze Ramen House — interactions
   - sticky header state
   - mobile nav
   - scroll reveal
   - "open now" logic + today highlight
   - accessible gallery lightbox
*/
(function () {
  "use strict";

  /* ---- mark JS active so reveal-on-scroll is a progressive enhancement ---- */
  document.documentElement.classList.add("js");

  /* ---- year ---- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- header scroll state ---- */
  var header = document.getElementById("header");
  function onScroll() {
    if (window.scrollY > 30) header.classList.add("scrolled");
    else header.classList.remove("scrolled");
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---- mobile nav ---- */
  var toggle = document.getElementById("navToggle");
  var nav = document.getElementById("primaryNav");
  var backdrop = document.getElementById("navBackdrop");

  function setNav(open) {
    nav.classList.toggle("open", open);
    backdrop.classList.toggle("show", open);
    document.body.classList.toggle("no-scroll", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }
  toggle.addEventListener("click", function () {
    setNav(!nav.classList.contains("open"));
  });
  backdrop.addEventListener("click", function () { setNav(false); });
  nav.addEventListener("click", function (e) {
    if (e.target.tagName === "A") setNav(false);
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && nav.classList.contains("open")) setNav(false);
  });

  /* ---- scroll reveal ---- */
  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          en.target.classList.add("in");
          io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add("in"); });
  }

  /* ---- open now + today highlight ---- */
  // hours as [openMinutes, closeMinutes] in local time; null = closed. Index = getDay() (0 = Sun)
  var HOURS = {
    0: [12 * 60, 21 * 60],       // Sun
    1: null,                     // Mon
    2: [11 * 60 + 30, 22 * 60],  // Tue
    3: [11 * 60 + 30, 22 * 60],  // Wed
    4: [11 * 60 + 30, 22 * 60],  // Thu
    5: [11 * 60 + 30, 23 * 60],  // Fri
    6: [12 * 60, 23 * 60]        // Sat
  };
  var now = new Date();
  var day = now.getDay();
  var mins = now.getHours() * 60 + now.getMinutes();
  var todayHours = HOURS[day];
  var isOpen = !!todayHours && mins >= todayHours[0] && mins < todayHours[1];

  // highlight today's row
  var rows = document.querySelectorAll("#hoursList li");
  rows.forEach(function (li) {
    if (parseInt(li.getAttribute("data-day"), 10) === day) li.classList.add("today");
  });

  // open-now badge
  var badge = document.getElementById("openNow");
  if (badge) {
    badge.hidden = false;
    var fmt = function (m) {
      var h = Math.floor(m / 60), mm = m % 60;
      var ap = h >= 12 ? "PM" : "AM";
      var hh = h % 12; if (hh === 0) hh = 12;
      return hh + (mm ? ":" + (mm < 10 ? "0" + mm : mm) : "") + " " + ap;
    };
    if (isOpen) {
      badge.classList.remove("shut");
      badge.innerHTML = '<span class="pulse"></span> Open now · until ' + fmt(todayHours[1]);
    } else {
      badge.classList.add("shut");
      // find next opening day
      var nextLabel = "";
      for (var i = 1; i <= 7; i++) {
        var d = (day + i) % 7;
        if (HOURS[d]) {
          var names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
          var when = (i === 1) ? "tomorrow" : names[d];
          // opening later today?
          if (i === 0) when = "today";
          nextLabel = "Opens " + when + " at " + fmt(HOURS[d][0]);
          break;
        }
      }
      // opening later today (closed before open time)
      if (todayHours && mins < todayHours[0]) {
        nextLabel = "Opens today at " + fmt(todayHours[0]);
      }
      badge.innerHTML = '<span class="pulse"></span> Closed now · ' + nextLabel;
    }
  }

  /* ---- gallery lightbox ---- */
  var items = Array.prototype.slice.call(document.querySelectorAll(".gallery__item"));
  var lb = document.getElementById("lightbox");
  var lbImg = document.getElementById("lbImg");
  var lbCap = document.getElementById("lbCap");
  var lbClose = document.getElementById("lbClose");
  var lbPrev = document.getElementById("lbPrev");
  var lbNext = document.getElementById("lbNext");
  var current = 0;
  var lastFocus = null;

  function show(i) {
    current = (i + items.length) % items.length;
    var btn = items[current];
    lbImg.src = btn.getAttribute("data-full");
    lbImg.alt = btn.querySelector("img").alt;
    lbCap.textContent = btn.getAttribute("data-cap") || "";
  }
  function openLb(i) {
    lastFocus = document.activeElement;
    show(i);
    lb.classList.add("open");
    document.body.classList.add("no-scroll");
    lbClose.focus();
  }
  function closeLb() {
    lb.classList.remove("open");
    document.body.classList.remove("no-scroll");
    lbImg.src = "";
    if (lastFocus) lastFocus.focus();
  }
  items.forEach(function (btn, i) {
    btn.addEventListener("click", function () { openLb(i); });
  });
  lbClose.addEventListener("click", closeLb);
  lbNext.addEventListener("click", function () { show(current + 1); });
  lbPrev.addEventListener("click", function () { show(current - 1); });
  lb.addEventListener("click", function (e) { if (e.target === lb) closeLb(); });
  document.addEventListener("keydown", function (e) {
    if (!lb.classList.contains("open")) return;
    if (e.key === "Escape") closeLb();
    else if (e.key === "ArrowRight") show(current + 1);
    else if (e.key === "ArrowLeft") show(current - 1);
  });
})();
