/* ===== Northbound Studio — interactions ===== */
(function () {
  "use strict";

  /* Current year in footer */
  var yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = String(new Date().getFullYear());

  /* ---- Mobile nav ---- */
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("nav-menu");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    });
    menu.addEventListener("click", function (e) {
      if (e.target.tagName === "A" && menu.classList.contains("is-open")) {
        menu.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Open menu");
      }
    });
  }

  /* ---- Work filter ---- */
  var chips = Array.prototype.slice.call(document.querySelectorAll(".chip"));
  var cards = Array.prototype.slice.call(document.querySelectorAll(".work-card"));
  var emptyMsg = document.getElementById("work-empty");

  function applyFilter(filter) {
    var visible = 0;
    cards.forEach(function (card) {
      var cats = (card.getAttribute("data-cats") || "").split(/\s+/);
      var show = filter === "all" || cats.indexOf(filter) !== -1;
      if (show) {
        card.classList.remove("is-hidden");
        // brief fade-in
        card.classList.add("is-fading");
        requestAnimationFrame(function () {
          requestAnimationFrame(function () { card.classList.remove("is-fading"); });
        });
        visible++;
      } else {
        card.classList.add("is-hidden");
      }
    });
    if (emptyMsg) emptyMsg.hidden = visible !== 0;
  }

  chips.forEach(function (chip) {
    chip.addEventListener("click", function () {
      chips.forEach(function (c) {
        c.classList.remove("is-active");
        c.setAttribute("aria-pressed", "false");
      });
      chip.classList.add("is-active");
      chip.setAttribute("aria-pressed", "true");
      applyFilter(chip.getAttribute("data-filter"));
    });
  });

  /* ---- Before / after toggle ---- */
  var ba = document.querySelector(".ba");
  var baToggle = document.querySelector(".ba-toggle");
  var baLabel = document.getElementById("ba-label");
  if (ba && baToggle && baLabel) {
    baToggle.addEventListener("click", function () {
      var isAfter = ba.getAttribute("data-state") === "after";
      var next = isAfter ? "before" : "after";
      ba.setAttribute("data-state", next);
      baLabel.textContent = next === "after" ? "After" : "Before";
      baToggle.setAttribute("aria-pressed", String(next === "after"));
    });
  }

  /* ---- Contact form validation + success state ---- */
  var form = document.getElementById("contact-form");
  var success = document.getElementById("contact-success");
  var resetBtn = document.getElementById("reset-form");

  function setError(name, msg) {
    var span = document.querySelector('.error[data-for="' + name + '"]');
    var field = document.getElementById(name);
    if (span) span.textContent = msg || "";
    if (field && field.parentElement) {
      field.parentElement.classList.toggle("has-error", !!msg);
      if (msg) field.setAttribute("aria-invalid", "true");
      else field.removeAttribute("aria-invalid");
    }
  }

  function validEmail(v) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  }

  if (form) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var data = {
        name: form.name.value.trim(),
        email: form.email.value.trim(),
        "project-type": form["project-type"].value,
        message: form.message.value.trim(),
      };
      var ok = true;

      if (!data.name) { setError("name", "Tell us your name."); ok = false; }
      else setError("name", "");

      if (!data.email) { setError("email", "We need an email to reply."); ok = false; }
      else if (!validEmail(data.email)) { setError("email", "That email looks off."); ok = false; }
      else setError("email", "");

      if (!data["project-type"]) { setError("project-type", "Pick what you need."); ok = false; }
      else setError("project-type", "");

      if (!data.message) { setError("message", "A sentence or two is plenty."); ok = false; }
      else if (data.message.length < 10) { setError("message", "Give us a little more to go on."); ok = false; }
      else setError("message", "");

      if (!ok) {
        var firstErr = form.querySelector(".has-error input, .has-error select, .has-error textarea");
        if (firstErr) firstErr.focus();
        return;
      }

      // Personalize success copy
      var firstName = data.name.split(" ")[0];
      var heading = document.getElementById("success-heading");
      var body = document.getElementById("success-body");
      if (heading) heading.textContent = "Thanks, " + firstName + " — it's in our inbox.";
      if (body) body.textContent = "We've noted you're after “" + data["project-type"] + "”. A real person will reply within two business days.";

      form.hidden = true;
      if (success) {
        success.hidden = false;
        success.focus && success.focus();
        success.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });
  }

  if (resetBtn) {
    resetBtn.addEventListener("click", function () {
      if (form) {
        form.reset();
        ["name", "email", "project-type", "message"].forEach(function (n) { setError(n, ""); });
        form.hidden = false;
        form.name.focus();
      }
      if (success) success.hidden = true;
    });
  }
})();
