/* Maple Street Community Garden — interactions
   - sticky header state
   - mobile nav
   - scroll reveal (progressive enhancement)
   - next workday (2nd Saturday) computed in the browser
   - waitlist form: validate, success state, remembered via localStorage
   - accessible photo lightbox
   Persists only the visitor's own "I joined" flag — it's a static site.
*/
(function () {
  "use strict";

  document.documentElement.classList.add("js");

  /* ---- year ---- */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- header scroll state ---- */
  var header = document.getElementById("header");
  function onScroll() {
    if (window.scrollY > 24) header.classList.add("scrolled");
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

  /* ---- next workday: 2nd Saturday of the month, 9am–12pm ---- */
  (function () {
    var box = document.getElementById("nextWorkday");
    var out = document.getElementById("nwDate");
    if (!box || !out) return;

    function secondSaturday(year, month) {
      // month 0-indexed. First day's weekday:
      var first = new Date(year, month, 1).getDay(); // 0=Sun..6=Sat
      var offsetToSat = (6 - first + 7) % 7;          // days until first Saturday
      var firstSat = 1 + offsetToSat;
      return new Date(year, month, firstSat + 7);     // second Saturday
    }

    var now = new Date();
    var d = secondSaturday(now.getFullYear(), now.getMonth());
    // If this month's workday already passed (after noon that day), roll to next month.
    var passed = d < now && !(d.toDateString() === now.toDateString() && now.getHours() < 12);
    if (passed) {
      var m = now.getMonth() + 1, y = now.getFullYear();
      if (m > 11) { m = 0; y += 1; }
      d = secondSaturday(y, m);
    }

    var opts = { weekday: "long", month: "long", day: "numeric" };
    out.textContent = d.toLocaleDateString(undefined, opts) + " · 9 am–12 pm";
    box.hidden = false;
  })();

  /* ---- waitlist form ---- */
  (function () {
    var form = document.getElementById("waitlistForm");
    if (!form) return;
    var success = document.getElementById("formSuccess");
    var successMsg = document.getElementById("successMsg");
    var resetBtn = document.getElementById("resetForm");
    var KEY = "mscg_waitlist";

    var sizeLabels = {
      starter: "a Starter (4×4) bed",
      standard: "a Standard (4×8) bed",
      family: "a Family (4×12) bed",
      accessible: "an accessible waist-high bed"
    };

    function clearError(field) {
      field.removeAttribute("aria-invalid");
      var err = field.parentNode.querySelector(".field-error");
      if (err) err.remove();
    }
    function setError(field, msg) {
      field.setAttribute("aria-invalid", "true");
      var err = field.parentNode.querySelector(".field-error");
      if (!err) {
        err = document.createElement("p");
        err.className = "field-error";
        field.parentNode.appendChild(err);
      }
      err.textContent = msg;
    }

    function showSuccess(name, size) {
      var bit = size && sizeLabels[size] ? " for " + sizeLabels[size] : "";
      successMsg.textContent =
        (name ? name.split(" ")[0] + ", you're" : "You're") +
        " on the waitlist" + bit + ". A coordinator will be in touch within 48 hours — usually sooner. " +
        "Welcome to the block!";
      form.querySelectorAll(".field, h3, .form-sub, button[type=submit], .form-policy").forEach(function (el) {
        el.style.display = "none";
      });
      success.hidden = false;
    }

    // Returning visitor who already joined
    try {
      var saved = JSON.parse(localStorage.getItem(KEY) || "null");
      if (saved && saved.name) showSuccess(saved.name, saved.size);
    } catch (e) { /* ignore */ }

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var name = form.elements["name"];
      var email = form.elements["email"];
      var size = form.elements["size"];
      var ok = true;

      clearError(name); clearError(email);

      if (!name.value.trim()) { setError(name, "Please tell us your name."); ok = false; }
      var emailVal = email.value.trim();
      if (!emailVal) { setError(email, "We need an email to reach you."); ok = false; }
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailVal)) { setError(email, "That email doesn't look right."); ok = false; }

      if (!ok) {
        var firstBad = form.querySelector('[aria-invalid="true"]');
        if (firstBad) firstBad.focus();
        return;
      }

      var record = { name: name.value.trim(), size: size.value, when: Date.now() };
      try { localStorage.setItem(KEY, JSON.stringify(record)); } catch (e) { /* ignore */ }

      showSuccess(record.name, record.size);
      success.scrollIntoView({ behavior: "smooth", block: "center" });
    });

    if (resetBtn) {
      resetBtn.addEventListener("click", function () {
        try { localStorage.removeItem(KEY); } catch (e) { /* ignore */ }
        form.reset();
        form.querySelectorAll(".field, h3, .form-sub, button[type=submit], .form-policy").forEach(function (el) {
          el.style.display = "";
        });
        success.hidden = true;
        var first = document.getElementById("wl-name");
        if (first) first.focus();
      });
    }
  })();

  /* ---- gallery lightbox ---- */
  (function () {
    var items = Array.prototype.slice.call(document.querySelectorAll(".gallery__item"));
    var lb = document.getElementById("lightbox");
    if (!items.length || !lb) return;
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

})();
