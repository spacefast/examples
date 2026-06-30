/* ============================================================
   Northbound "Tap-through" — interactions
   - Self-rendered QR code pointing at this very page
   - Copy the discount code  (clipboard + feedback)
   - Copy the page link      (clipboard + feedback)
   - Tiny toast for confirmations
   No build step. Plain DOM.
   ============================================================ */
(function () {
  "use strict";

  var $ = function (sel, root) { return (root || document).querySelector(sel); };

  /* ---- Toast ---- */
  var toastEl = $("#toast");
  var toastTimer = null;
  function toast(msg) {
    if (!toastEl) return;
    toastEl.textContent = msg;
    toastEl.classList.add("is-show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      toastEl.classList.remove("is-show");
    }, 1900);
  }

  /* ---- Clipboard helper (with execCommand fallback) ---- */
  function copyText(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      try {
        var ta = document.createElement("textarea");
        ta.value = text;
        ta.setAttribute("readonly", "");
        ta.style.position = "fixed";
        ta.style.top = "-1000px";
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
        resolve();
      } catch (e) { reject(e); }
    });
  }

  /* ---- The canonical link for this page ----
     Use the live address when served; fall back to a sensible
     URL for file:// previews so the QR is never empty. */
  function pageUrl() {
    var href = window.location.href.split("#")[0];
    if (/^https?:/i.test(href)) return href;
    return "https://northbound.coffee/r/cascadia";
  }
  var SHARE_URL = pageUrl();

  /* ---- Self-rendered QR ---- */
  function renderQR() {
    var box = $("#qrcode");
    var cap = $("#qrUrl");
    if (cap) cap.textContent = SHARE_URL.replace(/^https?:\/\//, "");
    if (!box) return;

    if (typeof window.qrcode !== "function") {
      box.innerHTML =
        '<span class="qr__pending">Scan the printed code, or copy the link below.</span>';
      return;
    }
    try {
      var qr = window.qrcode(0, "M");          // type 0 = auto-size, ECC level M
      qr.addData(SHARE_URL);
      qr.make();
      box.innerHTML = qr.createSvgTag({ cellSize: 5, margin: 0, scalable: true });
      var svg = box.querySelector("svg");
      if (svg) {
        svg.setAttribute("shape-rendering", "crispEdges");
        svg.removeAttribute("width");
        svg.removeAttribute("height");
      }
    } catch (e) {
      box.innerHTML =
        '<span class="qr__pending">Couldn’t draw the code — copy the link below.</span>';
    }
  }

  /* ---- Copy discount code ---- */
  function wireCodeChip() {
    var chip = $("#copyCode");
    if (!chip) return;
    chip.addEventListener("click", function () {
      var code = chip.getAttribute("data-code") || "";
      copyText(code).then(function () {
        chip.classList.add("is-copied");
        toast("Code " + code + " copied");
        setTimeout(function () { chip.classList.remove("is-copied"); }, 1400);
      }).catch(function () {
        toast("Couldn’t copy — code is " + code);
      });
    });
  }

  /* ---- Copy page link ---- */
  function wireCopyLink() {
    var btn = $("#copyLink");
    var label = $("#copyLinkLabel");
    if (!btn) return;
    btn.addEventListener("click", function () {
      copyText(SHARE_URL).then(function () {
        if (label) label.textContent = "Link copied!";
        btn.classList.add("is-copied");
        toast("Link copied to clipboard");
        setTimeout(function () {
          if (label) label.textContent = "Copy link";
          btn.classList.remove("is-copied");
        }, 1600);
      }).catch(function () {
        toast("Couldn’t copy the link");
      });
    });
  }

  /* ---- Secondary links are demo destinations in the example ---- */
  function wireSecondary() {
    var rows = document.querySelectorAll("[data-secondary]");
    Array.prototype.forEach.call(rows, function (row) {
      if (row.getAttribute("href") === "#") {
        row.addEventListener("click", function (e) {
          e.preventDefault();
          var title = (row.querySelector(".linkrow__title") || {}).textContent || "That page";
          toast(title.trim() + " — wire this up to your real link");
        });
      }
    });
  }

  function init() {
    renderQR();
    wireCodeChip();
    wireCopyLink();
    wireSecondary();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
