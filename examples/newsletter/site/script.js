// Offcuts — tiny progressive-enhancement helpers.
// 1) Subscribe forms: validate + show a friendly success state, no backend.
// 2) Remember a subscriber locally so the inline form greets returning readers.

(function () {
  "use strict";

  var STORE_KEY = "offcuts:subscriber";

  function markSubscribed(email) {
    try {
      localStorage.setItem(
        STORE_KEY,
        JSON.stringify({ email: email, at: new Date().toISOString() })
      );
    } catch (e) {
      /* private mode — fine, the form still confirms */
    }
  }

  function getSubscriber() {
    try {
      return JSON.parse(localStorage.getItem(STORE_KEY) || "null");
    } catch (e) {
      return null;
    }
  }

  function wireForm(form) {
    var box = form.closest(".subscribe");
    var input = form.querySelector('input[type="email"]');
    var okName = box ? box.querySelector(".subscribe__ok-name") : null;

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!input.checkValidity()) {
        input.reportValidity();
        return;
      }
      var email = input.value.trim();
      markSubscribed(email);
      if (okName) {
        var handle = email.split("@")[0];
        okName.textContent = handle ? handle : "friend";
      }
      if (box) box.classList.add("is-done");
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    var forms = document.querySelectorAll(".subscribe__form");
    Array.prototype.forEach.call(forms, wireForm);

    // Greet returning readers on the inline home form.
    var sub = getSubscriber();
    if (sub && sub.email) {
      var inline = document.querySelector("[data-greet]");
      if (inline) {
        var box = inline.closest(".subscribe");
        var okName = box.querySelector(".subscribe__ok-name");
        if (okName) okName.textContent = sub.email.split("@")[0];
        box.classList.add("is-done");
      }
    }

    // Current year in footers.
    var years = document.querySelectorAll("[data-year]");
    Array.prototype.forEach.call(years, function (el) {
      el.textContent = new Date().getFullYear();
    });
  });
})();
