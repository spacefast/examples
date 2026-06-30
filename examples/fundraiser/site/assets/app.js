/* Help Fund the Maple Street Mural — campaign logic (no backend, no build) */
(function () {
  "use strict";

  // ---- Campaign config ---------------------------------------------------
  var CONFIG = {
    goal: 24000,
    baseRaised: 16450, // pledged before any visitor donations
    endDate: "2026-09-12T23:59:59", // Founders' Day
    storageKey: "msm.donations.v1",
  };

  // Seed donors shown on the wall (most recent first).
  var SEED_DONORS = [
    { name: "Rosa & the workshop kids", amount: 250, note: "Can't wait to paint it!" },
    { name: "Delgado Family", amount: 1000, note: "For Abuelo's store." },
    { name: "Priya N.", amount: 50, note: "I take the 12 every day." },
    { name: "The Corner Cafe", amount: 500, note: "Coffee's on us during painting." },
    { name: "Marcus from 4th St", amount: 25, note: "" },
    { name: "Anonymous", amount: 150, note: "Beautiful idea." },
    { name: "Lena & Tom", amount: 75, note: "Married on this block in '04." },
    { name: "Riverside Cycling Club", amount: 200, note: "" },
    { name: "Mr. Okafor", amount: 40, note: "Retired teacher, proud neighbor." },
    { name: "Jess H.", amount: 100, note: "For the elders' panel." },
    { name: "The Park Slope Book Club", amount: 120, note: "" },
    { name: "Sam & Dev", amount: 50, note: "Our kids will paint a panel!" },
  ];

  var PALETTE = ["#e2563e", "#1f7a73", "#e8a93b", "#c4422c", "#155a55", "#8a5a2b"];

  // ---- Helpers -----------------------------------------------------------
  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  var money = function (n) { return "$" + Math.round(n).toLocaleString("en-US"); };

  function loadUserDonations() {
    try {
      var raw = localStorage.getItem(CONFIG.storageKey);
      return raw ? JSON.parse(raw) : [];
    } catch (e) { return []; }
  }
  function saveUserDonations(list) {
    try { localStorage.setItem(CONFIG.storageKey, JSON.stringify(list)); } catch (e) {}
  }

  var userDonations = loadUserDonations();

  function totalRaised() {
    var extra = userDonations.reduce(function (s, d) { return s + d.amount; }, 0);
    return CONFIG.baseRaised + extra;
  }
  function donorCount() {
    return SEED_DONORS.length + userDonations.length;
  }
  function daysLeft() {
    var diff = new Date(CONFIG.endDate).getTime() - Date.now();
    return Math.max(0, Math.ceil(diff / 86400000));
  }
  function pct() {
    return Math.min(100, (totalRaised() / CONFIG.goal) * 100);
  }

  // ---- Render stats ------------------------------------------------------
  function setText(sel, value) { $$(sel).forEach(function (el) { el.textContent = value; }); }

  function renderStats(animateBar) {
    var raised = totalRaised();
    var percent = pct();
    setText("[data-raised-display]", money(raised));
    setText("[data-goal-display]", money(CONFIG.goal));
    setText("[data-pct-display]", Math.round(percent));
    setText("[data-donor-count]", donorCount());
    setText("[data-days-left]", daysLeft());

    var bar = $("[data-progress-fill]");
    var track = $(".progress");
    if (track) track.setAttribute("aria-valuenow", Math.round(raised));
    if (bar) {
      if (animateBar) {
        // force a reflow so the transition runs from 0
        bar.style.width = "0%";
        // eslint-disable-next-line no-unused-expressions
        bar.offsetWidth;
      }
      requestAnimationFrame(function () { bar.style.width = percent + "%"; });
    }
  }

  // ---- Donor wall --------------------------------------------------------
  function initials(name) {
    var clean = name.replace(/[^a-zA-Z ]/g, " ").trim();
    if (!clean) return "♥";
    var parts = clean.split(/\s+/);
    var first = parts[0][0] || "";
    var second = parts.length > 1 ? parts[parts.length - 1][0] : "";
    return (first + second).toUpperCase();
  }
  function colorFor(name) {
    var sum = 0;
    for (var i = 0; i < name.length; i++) sum += name.charCodeAt(i);
    return PALETTE[sum % PALETTE.length];
  }
  function donorEl(d, isNew) {
    var el = document.createElement("div");
    el.className = "donor" + (isNew ? " is-new" : "");
    var av = document.createElement("span");
    av.className = "donor-av";
    av.style.background = colorFor(d.name);
    av.textContent = initials(d.name);
    av.setAttribute("aria-hidden", "true");

    var main = document.createElement("div");
    main.className = "donor-main";
    var nm = document.createElement("div");
    nm.className = "donor-name";
    nm.textContent = d.name;
    main.appendChild(nm);
    if (d.note) {
      var note = document.createElement("div");
      note.className = "donor-note";
      note.textContent = "“" + d.note + "”";
      main.appendChild(note);
    }
    var amt = document.createElement("span");
    amt.className = "donor-amt";
    amt.textContent = money(d.amount);

    el.appendChild(av);
    el.appendChild(main);
    el.appendChild(amt);
    return el;
  }
  function renderWall() {
    var wall = $("[data-donor-wall]");
    if (!wall) return;
    wall.innerHTML = "";
    // newest user donations first, then seed donors
    userDonations.slice().reverse().forEach(function (d) { wall.appendChild(donorEl(d, false)); });
    SEED_DONORS.forEach(function (d) { wall.appendChild(donorEl(d, false)); });
  }
  function prependDonor(d) {
    var wall = $("[data-donor-wall]");
    if (!wall) return;
    var el = donorEl(d, true);
    wall.insertBefore(el, wall.firstChild);
  }

  // ---- Toast -------------------------------------------------------------
  var toastTimer;
  function toast(msg) {
    var t = $("[data-toast]");
    if (!t) return;
    t.textContent = msg;
    t.hidden = false;
    requestAnimationFrame(function () { t.classList.add("is-show"); });
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      t.classList.remove("is-show");
      setTimeout(function () { t.hidden = true; }, 300);
    }, 2400);
  }

  // ---- Modal -------------------------------------------------------------
  var modal = $("[data-modal]");
  var formView = $("[data-modal-form]");
  var successView = $("[data-modal-success]");
  var form = $("[data-form]");
  var lastFocused = null;

  function selectedAmount() {
    var custom = parseFloat(($("[name=customAmount]") || {}).value);
    if (!isNaN(custom) && custom >= 1) return Math.round(custom);
    var checked = $("[name=amount]:checked");
    return checked ? parseInt(checked.value, 10) : 0;
  }
  function syncSubmitLabel() {
    var amt = selectedAmount();
    setText("[data-submit-amount]", amt > 0 ? money(amt) : "");
  }

  function openModal(presetAmount) {
    lastFocused = document.activeElement;
    if (formView) formView.hidden = false;
    if (successView) successView.hidden = true;
    if (presetAmount) {
      var radio = $('[name=amount][value="' + presetAmount + '"]');
      var custom = $("[name=customAmount]");
      if (radio) { radio.checked = true; if (custom) custom.value = ""; }
      else if (custom) { custom.value = presetAmount; $$("[name=amount]").forEach(function (r) { r.checked = false; }); }
    }
    syncSubmitLabel();
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    var nameField = $("#donor-name");
    setTimeout(function () { if (nameField) nameField.focus(); }, 50);
  }
  function closeModal() {
    modal.hidden = true;
    document.body.style.overflow = "";
    if (lastFocused && lastFocused.focus) lastFocused.focus();
  }

  // ---- Share -------------------------------------------------------------
  function pageUrl() { return window.location.href.split("#")[0]; }
  function shareText() {
    return "We're " + Math.round(pct()) + "% of the way to a 90-foot community mural on Maple Street. Help us finish it:";
  }
  function setupShareLinks() {
    var url = encodeURIComponent(pageUrl());
    var text = encodeURIComponent(shareText());
    $$('[data-share="twitter"]').forEach(function (a) { a.href = "https://twitter.com/intent/tweet?text=" + text + "&url=" + url; });
    $$('[data-share="facebook"]').forEach(function (a) { a.href = "https://www.facebook.com/sharer/sharer.php?u=" + url; });
    $$('[data-share="email"]').forEach(function (a) {
      a.href = "mailto:?subject=" + encodeURIComponent("Help fund the Maple Street Mural") + "&body=" + text + "%20" + url;
    });
  }
  function copyLink() {
    var url = pageUrl();
    var done = function () {
      toast("Link copied — go forward it to a neighbor!");
      var lbl = $("[data-copy-label]");
      if (lbl) { var prev = lbl.textContent; lbl.textContent = "Copied!"; setTimeout(function () { lbl.textContent = prev; }, 1800); }
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(url).then(done).catch(fallbackCopy);
    } else { fallbackCopy(); }
    function fallbackCopy() {
      var ta = document.createElement("textarea");
      ta.value = url; ta.style.position = "fixed"; ta.style.opacity = "0";
      document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); done(); } catch (e) { toast("Copy failed — here's the link: " + url); }
      document.body.removeChild(ta);
    }
  }

  // ---- Wire up -----------------------------------------------------------
  function init() {
    renderWall();
    renderStats(true);
    setupShareLinks();

    // Donate triggers
    $$("[data-donate]").forEach(function (btn) {
      btn.addEventListener("click", function () { openModal(this.getAttribute("data-amount")); });
    });

    // Modal close
    $$("[data-modal-close]").forEach(function (b) { b.addEventListener("click", closeModal); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && modal && !modal.hidden) closeModal();
    });

    // Amount syncing
    $$("[name=amount]").forEach(function (r) {
      r.addEventListener("change", function () {
        var custom = $("[name=customAmount]");
        if (custom) custom.value = "";
        syncSubmitLabel();
      });
    });
    var customField = $("[name=customAmount]");
    if (customField) {
      customField.addEventListener("input", function () {
        if (this.value) $$("[name=amount]").forEach(function (r) { r.checked = false; });
        syncSubmitLabel();
      });
    }

    // Form submit
    if (form) {
      form.addEventListener("submit", function (e) {
        e.preventDefault();
        var nameField = $("#donor-name");
        var anon = $("[name=anon]").checked;
        var note = ($("[name=note]").value || "").trim();
        var amount = selectedAmount();
        var nameErr = $("[data-err-name]");

        var rawName = (nameField.value || "").trim();
        if (!anon && !rawName) {
          if (nameErr) nameErr.hidden = false;
          nameField.focus();
          return;
        }
        if (nameErr) nameErr.hidden = true;
        if (amount < 1) { toast("Please choose or enter an amount."); return; }

        var displayName = anon ? "Anonymous" : rawName;
        var donation = { name: displayName, amount: amount, note: anon ? "" : note, at: Date.now() };

        userDonations.push(donation);
        saveUserDonations(userDonations);

        // update wall + stats with animation
        prependDonor(donation);
        renderStats(true);
        setupShareLinks();

        // success view
        setText("[data-success-name]", anon ? "friend" : rawName.split(/\s+/)[0]);
        setText("[data-success-amount]", money(amount));
        if (formView) formView.hidden = true;
        if (successView) successView.hidden = false;
        form.reset();
        var fiftyRadio = $('[name=amount][value="50"]');
        if (fiftyRadio) fiftyRadio.checked = true;
      });
    }

    // Share-after button inside success view
    var shareAfter = $("[data-share-after]");
    if (shareAfter) shareAfter.addEventListener("click", function () { closeModal(); copyLink(); var s = $("#share"); if (s) s.scrollIntoView({ behavior: "smooth" }); });

    // Copy link
    $$("[data-copy-link]").forEach(function (b) { b.addEventListener("click", copyLink); });

    // Live countdown refresh once a minute (days only changes daily, but keeps it honest)
    setInterval(function () { setText("[data-days-left]", daysLeft()); }, 60000);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else { init(); }
})();
