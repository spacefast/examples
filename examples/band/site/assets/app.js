/* ============================================================
   The Tidal Wolves — interactive bits
   - data-driven tracklist, tour, merch
   - sticky audio player (play/pause/seek/prev/next)
   - mailing-list form with success state + localStorage
   ============================================================ */
(function () {
  "use strict";

  /* ---------- Data ---------- */
  // Streaming previews use SoundHelix's free demo MP3s as stand-ins for the
  // real masters — swap these src URLs for your own tracks.
  var TRACKS = [
    { title: "Saltwater Hymn", tag: "Single", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" },
    { title: "Ferry Lights", tag: "", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3" },
    { title: "Cedar & Smoke", tag: "", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3" },
    { title: "The Long Coast", tag: "", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3" },
    { title: "Driftwood Choir", tag: "", src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-9.mp3" }
  ];

  var SHOWS = [
    { month: "Aug", day: "14", city: "Portland, OR", venue: "Mississippi Studios", state: "soldout" },
    { month: "Aug", day: "22", city: "Seattle, WA", venue: "The Tractor Tavern", state: "on" },
    { month: "Sep", day: "05", city: "San Francisco, CA", venue: "The Chapel", state: "on" },
    { month: "Sep", day: "12", city: "Denver, CO", venue: "Globe Hall", state: "few" },
    { month: "Sep", day: "19", city: "Austin, TX", venue: "The Parish · Album release", state: "on" }
  ];

  var MERCH = [
    { name: "Low Tide Cathedral — LP", desc: "180g sea-glass green vinyl, gatefold sleeve, hand-numbered.", price: "$32", seed: "tidal-wolves-vinyl",
      img: "https://images.unsplash.com/photo-1539375665275-f9de415ef9ac?auto=format&fit=crop&w=700&q=80",
      alt: "A vinyl record half out of its sleeve on a wooden surface" },
    { name: "Tour Tee — Heather Slate", desc: "Soft cotton tee with the wolf-and-wave crest, 2026 tour dates on the back.", price: "$28", seed: "tidal-wolves-tee",
      img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=80",
      alt: "A folded grey band t-shirt on a neutral background" },
    { name: "Coast Tote", desc: "Heavy natural canvas, screen-printed crest. Holds two records and a thermos.", price: "$18", seed: "tidal-wolves-tote",
      img: "https://images.unsplash.com/photo-1597484661643-2f5fef640dd1?auto=format&fit=crop&w=700&q=80",
      alt: "A natural canvas tote bag hanging on a hook" }
  ];

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function el(tag, cls, html) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (html != null) n.innerHTML = html;
    return n;
  }
  function fmtTime(s) {
    if (!isFinite(s) || s < 0) s = 0;
    var m = Math.floor(s / 60);
    var sec = Math.floor(s % 60);
    return m + ":" + (sec < 10 ? "0" : "") + sec;
  }

  /* ---------- Render tracklist ---------- */
  var tracklistEl = $("#tracklist");
  TRACKS.forEach(function (t, i) {
    var li = el("li", "track");
    li.setAttribute("tabindex", "0");
    li.setAttribute("role", "button");
    li.setAttribute("aria-label", "Play " + t.title);
    li.dataset.index = i;
    li.innerHTML =
      '<span class="track__num">' + (i + 1) + "</span>" +
      '<span class="track__title">' + t.title + "</span>" +
      (t.tag ? '<span class="track__tag">' + t.tag + "</span>" : "<span></span>") +
      '<span class="track__dur" aria-hidden="true">—:—</span>';
    li.addEventListener("click", function () { selectTrack(i, true); });
    li.addEventListener("keydown", function (e) {
      if (e.key === "Enter" || e.key === " ") { e.preventDefault(); selectTrack(i, true); }
    });
    tracklistEl.appendChild(li);
  });

  /* ---------- Render shows ---------- */
  var showsEl = $("#shows");
  SHOWS.forEach(function (s) {
    var li = el("li", "show");
    var cta;
    if (s.state === "soldout") {
      cta = '<span class="show__soldout">Sold out</span>';
    } else if (s.state === "few") {
      cta = '<a class="btn btn--solid show__few" href="#">Few left</a>';
    } else {
      cta = '<a class="btn btn--ghost" href="#">Tickets</a>';
    }
    li.innerHTML =
      '<div class="show__date"><div class="show__month">' + s.month + '</div><div class="show__day">' + s.day + "</div></div>" +
      '<div class="show__info"><div class="show__city">' + s.city + '</div><div class="show__venue">' + s.venue + "</div></div>" +
      '<div class="show__cta">' + cta + "</div>";
    showsEl.appendChild(li);
  });

  /* ---------- Render merch ---------- */
  var merchEl = $("#merch-grid");
  MERCH.forEach(function (m) {
    var card = el("article", "merch-card");
    card.innerHTML =
      '<div class="merch-card__img"><img src="' + m.img + '" alt="' + m.alt + '" loading="lazy" /></div>' +
      '<div class="merch-card__body">' +
        '<h3 class="merch-card__name">' + m.name + "</h3>" +
        '<p class="merch-card__desc">' + m.desc + "</p>" +
        '<div class="merch-card__row">' +
          '<span class="merch-card__price">' + m.price + "</span>" +
          '<a class="btn btn--solid merch-card__buy" href="#">Add to cart</a>' +
        "</div>" +
      "</div>";
    merchEl.appendChild(card);
  });

  /* ============================================================
     Player
     ============================================================ */
  var audio = $("#audio");
  var player = $("#player");
  var toggleBtn = $("#player-toggle");
  var iconPlay = $(".icon-play", toggleBtn);
  var iconPause = $(".icon-pause", toggleBtn);
  var titleEl = $("#player-title");
  var curEl = $("#player-cur");
  var durEl = $("#player-dur");
  var bar = $("#player-bar");
  var current = -1;
  var seeking = false;

  function trackRow(i) { return tracklistEl.querySelector('.track[data-index="' + i + '"]'); }

  function setActiveRow(i) {
    tracklistEl.querySelectorAll(".track").forEach(function (r) {
      r.classList.toggle("is-active", Number(r.dataset.index) === i);
    });
  }
  function setPlayingState(playing) {
    iconPlay.hidden = playing;
    iconPause.hidden = !playing;
    toggleBtn.setAttribute("aria-label", playing ? "Pause" : "Play");
    var row = trackRow(current);
    tracklistEl.querySelectorAll(".track").forEach(function (r) { r.classList.remove("is-playing"); });
    if (playing && row) row.classList.add("is-playing");
  }

  function selectTrack(i, autoplay) {
    if (i < 0 || i >= TRACKS.length) return;
    player.hidden = false;
    if (i !== current) {
      current = i;
      audio.src = TRACKS[i].src;
      titleEl.textContent = TRACKS[i].title;
      setActiveRow(i);
      curEl.textContent = "0:00";
      durEl.textContent = "0:00";
      bar.value = 0;
      bar.style.setProperty("--p", "0%");
    }
    if (autoplay) {
      var p = audio.play();
      if (p && p.catch) p.catch(function () { setPlayingState(false); });
    }
  }

  function togglePlay() {
    if (current < 0) { selectTrack(0, true); return; }
    if (audio.paused) {
      var p = audio.play();
      if (p && p.catch) p.catch(function () {});
    } else {
      audio.pause();
    }
  }

  toggleBtn.addEventListener("click", togglePlay);
  $("#player-next").addEventListener("click", function () { selectTrack((current + 1) % TRACKS.length, true); });
  $("#player-prev").addEventListener("click", function () {
    selectTrack((current - 1 + TRACKS.length) % TRACKS.length, true);
  });
  $("#player-art").addEventListener("click", function () {
    document.getElementById("music").scrollIntoView({ behavior: "smooth" });
  });

  // Hero / "Play the single" buttons
  document.querySelectorAll("[data-play-track]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      selectTrack(Number(btn.getAttribute("data-play-track")) || 0, true);
    });
  });

  audio.addEventListener("play", function () { setPlayingState(true); });
  audio.addEventListener("pause", function () { setPlayingState(false); });
  audio.addEventListener("ended", function () { selectTrack((current + 1) % TRACKS.length, true); });
  audio.addEventListener("loadedmetadata", function () {
    durEl.textContent = fmtTime(audio.duration);
    var row = trackRow(current);
    if (row) { var d = row.querySelector(".track__dur"); if (d) d.textContent = fmtTime(audio.duration); }
  });
  audio.addEventListener("timeupdate", function () {
    if (seeking || !audio.duration) return;
    var pct = (audio.currentTime / audio.duration) * 100;
    bar.value = pct;
    bar.style.setProperty("--p", pct + "%");
    curEl.textContent = fmtTime(audio.currentTime);
  });
  audio.addEventListener("error", function () {
    titleEl.textContent = TRACKS[current] ? TRACKS[current].title + " (preview unavailable)" : "Preview unavailable";
    setPlayingState(false);
  });

  bar.addEventListener("input", function () {
    seeking = true;
    bar.style.setProperty("--p", bar.value + "%");
    if (audio.duration) curEl.textContent = fmtTime((bar.value / 100) * audio.duration);
  });
  bar.addEventListener("change", function () {
    if (audio.duration) audio.currentTime = (bar.value / 100) * audio.duration;
    seeking = false;
  });

  // Spacebar toggles play when not typing in a field
  document.addEventListener("keydown", function (e) {
    if (e.code !== "Space") return;
    var t = e.target;
    var typing = t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable || t.getAttribute("role") === "button");
    if (typing || player.hidden) return;
    e.preventDefault();
    togglePlay();
  });

  /* ============================================================
     Mailing list
     ============================================================ */
  var form = $("#mailing-form");
  var status = $("#ml-status");
  var STORE_KEY = "tidalwolves_subscribed";

  function showStatus(msg, ok) {
    status.textContent = msg;
    status.classList.toggle("is-ok", ok);
    status.classList.toggle("is-err", !ok);
  }

  try {
    var saved = localStorage.getItem(STORE_KEY);
    if (saved) showStatus("You're already on the list, " + saved + ". See you on the coast. 🌊", true);
  } catch (e) {}

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var name = $("#ml-name").value.trim();
    var email = $("#ml-email").value.trim();
    var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!name) { showStatus("What should we call you?", false); $("#ml-name").focus(); return; }
    if (!emailOk) { showStatus("That email doesn't look right — mind checking it?", false); $("#ml-email").focus(); return; }
    try { localStorage.setItem(STORE_KEY, name); } catch (e) {}
    showStatus("You're on the list, " + name + ". Welcome to the pack. 🐺", true);
    form.reset();
  });

  /* ---------- Footer year ---------- */
  var fine = $(".site-foot__fine");
  if (fine) fine.innerHTML = fine.innerHTML.replace("2026", new Date().getFullYear());
})();
