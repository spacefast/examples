/* Site chrome: mobile nav toggle + booking form success state. */
(function () {
  "use strict";

  // --- mobile nav ---
  var toggle = document.querySelector(".nav-toggle");
  var menu = document.getElementById("mobile-nav");
  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      var open = toggle.getAttribute("aria-expanded") === "true";
      toggle.setAttribute("aria-expanded", String(!open));
      menu.hidden = open;
    });
    menu.addEventListener("click", function (e) {
      if (e.target.tagName === "A") {
        menu.hidden = true;
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  // --- booking form ---
  var form = document.getElementById("bookForm");
  var success = document.getElementById("bookSuccess");
  if (form && success) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.checkValidity()) {
        form.reportValidity();
        return;
      }
      var name = (form.elements.name && form.elements.name.value || "").trim();
      success.hidden = false;
      success.textContent = (name ? "Thanks, " + name + "! " : "Got it — thanks! ") +
        "We'll email you within a day to lock in the back room. 🕹️";
      form.querySelectorAll("input, textarea, button").forEach(function (el) {
        if (el.type !== "submit") el.value = el.defaultValue || "";
      });
      success.scrollIntoView({ behavior: "smooth", block: "nearest" });
    });
  }
})();
