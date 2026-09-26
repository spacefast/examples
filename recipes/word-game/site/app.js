/* Lexicle — a daily five-letter word game. Vanilla JS, no dependencies. */
(function () {
  "use strict";

  var ANSWERS = window.LEXICLE_ANSWERS || [];
  var VALID = new Set(ANSWERS.concat(window.LEXICLE_EXTRA || []));

  var ROWS = 6;
  var COLS = 5;
  var STORE_KEY = "lexicle.state.v1";
  var STATS_KEY = "lexicle.stats.v1";
  var THEME_KEY = "lexicle.theme.v1";
  // The "epoch" — day 0 of Lexicle. Puzzle number = days since this date.
  var EPOCH = Date.UTC(2024, 0, 1); // 2024-01-01

  // ---- Day / word-of-the-day logic ------------------------------------
  function todayIndex() {
    var now = new Date();
    var localMidnight = Date.UTC(now.getFullYear(), now.getMonth(), now.getDate());
    return Math.floor((localMidnight - EPOCH) / 86400000);
  }

  function wordForIndex(i) {
    // Deterministic, well-shuffled mapping from day -> answer.
    var n = ANSWERS.length;
    // A large coprime stride spreads consecutive days across the list so the
    // word doesn't march alphabetically. (n and stride share no factors.)
    var stride = 1103515245 % n;
    if (gcd(stride, n) !== 1) stride = 1; // safety fallback
    var idx = (((i * stride) % n) + n) % n;
    return ANSWERS[idx];
  }

  function gcd(a, b) { while (b) { var t = b; b = a % b; a = t; } return a; }

  // ---- State ----------------------------------------------------------
  var state;       // current game state
  var stats;       // lifetime stats
  var practiceWord = null; // when set, we're in practice mode
  var busy = false; // animation lock

  function defaultStats() {
    return {
      played: 0, wins: 0, currentStreak: 0, maxStreak: 0,
      dist: [0, 0, 0, 0, 0, 0], lastWonIndex: null
    };
  }

  function loadStats() {
    try {
      var s = JSON.parse(localStorage.getItem(STATS_KEY));
      if (s && Array.isArray(s.dist) && s.dist.length === 6) return s;
    } catch (e) {}
    return defaultStats();
  }
  function saveStats() {
    try { localStorage.setItem(STATS_KEY, JSON.stringify(stats)); } catch (e) {}
  }

  function freshGame(index, answer) {
    return { index: index, answer: answer, guesses: [], status: "playing" };
  }

  function loadGame() {
    var index = todayIndex();
    var answer = wordForIndex(index);
    try {
      var saved = JSON.parse(localStorage.getItem(STORE_KEY));
      if (saved && saved.index === index && saved.answer === answer) return saved;
    } catch (e) {}
    return freshGame(index, answer);
  }
  function saveGame() {
    if (practiceWord) return; // don't persist practice rounds
    try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) {}
  }

  // ---- Scoring (handles duplicate letters correctly) ------------------
  function scoreGuess(guess, answer) {
    var result = new Array(COLS).fill("absent");
    var counts = {};
    var i, c;
    for (i = 0; i < COLS; i++) { c = answer[i]; counts[c] = (counts[c] || 0) + 1; }
    // First pass: greens
    for (i = 0; i < COLS; i++) {
      if (guess[i] === answer[i]) { result[i] = "correct"; counts[guess[i]]--; }
    }
    // Second pass: yellows (only if letters remain)
    for (i = 0; i < COLS; i++) {
      if (result[i] === "correct") continue;
      c = guess[i];
      if (counts[c] > 0) { result[i] = "present"; counts[c]--; }
    }
    return result;
  }

  // Best-known status per key, for keyboard coloring (correct > present > absent)
  function keyStatuses() {
    var map = {};
    var rank = { absent: 1, present: 2, correct: 3 };
    state.guesses.forEach(function (g) {
      var res = scoreGuess(g, state.answer);
      for (var i = 0; i < COLS; i++) {
        var k = g[i], s = res[i];
        if (!map[k] || rank[s] > rank[map[k]]) map[k] = s;
      }
    });
    return map;
  }

  // ---- DOM references -------------------------------------------------
  var boardEl = document.getElementById("board");
  var keyboardEl = document.getElementById("keyboard");
  var messageEl = document.getElementById("message");

  var current = ""; // letters typed on the active row

  // ---- Rendering ------------------------------------------------------
  function buildBoard() {
    boardEl.innerHTML = "";
    for (var r = 0; r < ROWS; r++) {
      var row = document.createElement("div");
      row.className = "board-row";
      row.dataset.row = r;
      for (var c = 0; c < COLS; c++) {
        var tile = document.createElement("div");
        tile.className = "tile";
        tile.dataset.col = c;
        row.appendChild(tile);
      }
      boardEl.appendChild(row);
    }
    renderBoard();
  }

  function rowEl(r) { return boardEl.children[r]; }

  function renderBoard() {
    for (var r = 0; r < ROWS; r++) {
      var row = rowEl(r);
      var guess = state.guesses[r];
      for (var c = 0; c < COLS; c++) {
        var tile = row.children[c];
        tile.className = "tile";
        if (guess) {
          var res = scoreGuess(guess, state.answer);
          tile.textContent = guess[c];
          tile.classList.add("filled", res[c]);
        } else if (r === state.guesses.length) {
          tile.textContent = current[c] || "";
          if (current[c]) tile.classList.add("filled");
        } else {
          tile.textContent = "";
        }
      }
    }
  }

  var KB = [
    "QWERTYUIOP".split(""),
    "ASDFGHJKL".split(""),
    ["ENTER"].concat("ZXCVBNM".split("")).concat(["BACK"])
  ];

  function buildKeyboard() {
    keyboardEl.innerHTML = "";
    KB.forEach(function (rowKeys) {
      var row = document.createElement("div");
      row.className = "kb-row";
      rowKeys.forEach(function (k) {
        var btn = document.createElement("button");
        btn.type = "button";
        btn.className = "key";
        btn.dataset.key = k;
        if (k === "ENTER") { btn.classList.add("wide"); btn.textContent = "Enter"; btn.setAttribute("aria-label", "Enter"); }
        else if (k === "BACK") {
          btn.classList.add("wide");
          btn.setAttribute("aria-label", "Backspace");
          btn.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M22 3H7L1 12l6 9h15a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1ZM18 9l-6 6M12 9l6 6"/></svg>';
        } else { btn.textContent = k; btn.setAttribute("aria-label", k); }
        btn.addEventListener("click", function () { handleKey(k); });
        row.appendChild(btn);
      });
      keyboardEl.appendChild(row);
    });
    paintKeyboard();
  }

  function paintKeyboard() {
    var map = keyStatuses();
    var keys = keyboardEl.querySelectorAll(".key");
    keys.forEach(function (btn) {
      var k = btn.dataset.key;
      btn.classList.remove("correct", "present", "absent");
      if (map[k]) btn.classList.add(map[k]);
    });
  }

  // ---- Toast ----------------------------------------------------------
  function toast(text, ms) {
    var el = document.createElement("div");
    el.className = "toast";
    el.textContent = text;
    messageEl.appendChild(el);
    var life = ms || 1300;
    setTimeout(function () {
      el.classList.add("fade");
      setTimeout(function () { el.remove(); }, 300);
    }, life);
  }

  function shakeRow(r) {
    var row = rowEl(r);
    row.classList.add("shake");
    setTimeout(function () { row.classList.remove("shake"); }, 500);
  }

  // ---- Input handling -------------------------------------------------
  function handleKey(k) {
    if (busy) return;
    if (state.status !== "playing") return;
    if (k === "ENTER") return submitGuess();
    if (k === "BACK") {
      current = current.slice(0, -1);
      renderBoard();
      return;
    }
    if (/^[A-Z]$/.test(k) && current.length < COLS) {
      current += k;
      renderBoard();
    }
  }

  function submitGuess() {
    var r = state.guesses.length;
    if (current.length < COLS) { toast("Not enough letters"); shakeRow(r); return; }
    if (!VALID.has(current)) { toast("Not in word list"); shakeRow(r); return; }

    var guess = current;
    var res = scoreGuess(guess, state.answer);
    state.guesses.push(guess);
    current = "";
    busy = true;

    // Flip-reveal each tile in sequence.
    var row = rowEl(r);
    for (var c = 0; c < COLS; c++) {
      (function (c) {
        var tile = row.children[c];
        setTimeout(function () {
          tile.classList.add("reveal");
          // Swap color at the midpoint of the flip.
          setTimeout(function () {
            tile.classList.add("filled", res[c]);
            tile.textContent = guess[c];
          }, 250);
        }, c * 220);
      })(c);
    }

    var revealMs = (COLS - 1) * 220 + 550;
    setTimeout(function () {
      paintKeyboard();
      finishTurn(guess, res, r);
      busy = false;
      saveGame();
    }, revealMs);
  }

  function finishTurn(guess, res, r) {
    var won = res.every(function (s) { return s === "correct"; });
    if (won) {
      state.status = "won";
      rowEl(r).classList.add("win");
      var praise = ["Genius", "Magnificent", "Impressive", "Splendid", "Great", "Phew"];
      setTimeout(function () { toast(praise[r] || "Solved!", 2200); }, 200);
      recordResult(true, r + 1);
      setTimeout(openStats, 1700);
    } else if (state.guesses.length >= ROWS) {
      state.status = "lost";
      recordResult(false, null);
      setTimeout(function () { toast(state.answer, 4000); }, 200);
      setTimeout(openStats, 1500);
    }
  }

  function recordResult(won, guessCount) {
    if (practiceWord) return; // practice doesn't touch lifetime stats
    if (stats.lastWonIndex === state.index && won) return; // guard double-count
    stats.played += 1;
    if (won) {
      stats.wins += 1;
      stats.dist[guessCount - 1] += 1;
      // Streak continues only if the previous solved puzzle was yesterday.
      if (stats.lastWonIndex === state.index - 1) stats.currentStreak += 1;
      else stats.currentStreak = 1;
      stats.lastWonIndex = state.index;
      if (stats.currentStreak > stats.maxStreak) stats.maxStreak = stats.currentStreak;
    } else {
      stats.currentStreak = 0;
    }
    saveStats();
  }

  // ---- Stats modal ----------------------------------------------------
  function renderStats() {
    var winPct = stats.played ? Math.round((stats.wins / stats.played) * 100) : 0;
    var nums = [
      [stats.played, "Played"],
      [winPct, "Win %"],
      [stats.currentStreak, "Current streak"],
      [stats.maxStreak, "Max streak"]
    ];
    var grid = document.getElementById("stats-numbers");
    grid.innerHTML = nums.map(function (n) {
      return '<div><div class="stat-num">' + n[0] + '</div><div class="stat-label">' + n[1] + '</div></div>';
    }).join("");

    var maxBar = Math.max.apply(null, stats.dist.concat([1]));
    var currentRow = state.status === "won" ? state.guesses.length : -1;
    var dist = document.getElementById("dist");
    dist.innerHTML = stats.dist.map(function (count, i) {
      var pct = Math.max(8, Math.round((count / maxBar) * 100));
      var cls = (i + 1 === currentRow) ? " current" : "";
      return '<div class="dist-row"><span class="dist-key">' + (i + 1) + '</span>' +
        '<div class="dist-bar-wrap"><div class="dist-bar' + cls + '" style="width:' + pct + '%">' + count + '</div></div></div>';
    }).join("");

    var played = state.status !== "playing";
    document.getElementById("share-btn").style.display = (played && !practiceWord) ? "" : "none";
    var cd = document.getElementById("countdown");
    cd.hidden = !(played && !practiceWord);
  }

  function openStats() { renderStats(); openModal("stats-modal"); }

  // ---- Sharing --------------------------------------------------------
  function buildShareText() {
    var n = state.guesses.length;
    var head = "Lexicle " + (state.index) + " " +
      (state.status === "won" ? n + "/6" : "X/6");
    var grid = state.guesses.map(function (g) {
      return scoreGuess(g, state.answer).map(function (s) {
        return s === "correct" ? "🟩" : s === "present" ? "🟨" : "⬛";
      }).join("");
    }).join("\n");
    return head + "\n\n" + grid + "\n\nplay at lexicle.example";
  }

  function share() {
    var text = buildShareText();
    if (navigator.share) {
      navigator.share({ text: text }).catch(function () { copyShare(text); });
    } else {
      copyShare(text);
    }
  }
  function copyShare(text) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(
        function () { toast("Copied to clipboard"); },
        function () { fallbackCopy(text); }
      );
    } else { fallbackCopy(text); }
  }
  function fallbackCopy(text) {
    var ta = document.createElement("textarea");
    ta.value = text;
    ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta);
    ta.select();
    try { document.execCommand("copy"); toast("Copied to clipboard"); }
    catch (e) { toast("Press to copy"); }
    ta.remove();
  }

  // ---- Countdown ------------------------------------------------------
  function tickCountdown() {
    var el = document.getElementById("cd-time");
    if (!el) return;
    var now = new Date();
    var next = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
    var diff = Math.max(0, next - now);
    var h = Math.floor(diff / 3600000);
    var m = Math.floor((diff % 3600000) / 60000);
    var s = Math.floor((diff % 60000) / 1000);
    el.textContent = pad(h) + ":" + pad(m) + ":" + pad(s);
    if (diff < 1000) location.reload();
  }
  function pad(n) { return (n < 10 ? "0" : "") + n; }

  // ---- Practice mode --------------------------------------------------
  function startPractice() {
    practiceWord = ANSWERS[Math.floor(Math.random() * ANSWERS.length)];
    state = freshGame(state.index, practiceWord);
    current = "";
    buildBoard();
    paintKeyboard();
    closeModal();
    toast("Practice word — good luck!", 1600);
  }

  // ---- Modals ---------------------------------------------------------
  function openModal(id) { document.getElementById(id).hidden = false; }
  function closeModal() {
    document.querySelectorAll(".modal-backdrop").forEach(function (m) { m.hidden = true; });
  }

  // ---- Theme ----------------------------------------------------------
  function applyTheme(t) {
    document.documentElement.setAttribute("data-theme", t);
    var meta = document.querySelector('meta[name="theme-color"]');
    if (meta) meta.setAttribute("content", t === "light" ? "#ffffff" : "#0f1115");
  }
  function initTheme() {
    var saved;
    try { saved = localStorage.getItem(THEME_KEY); } catch (e) {}
    if (!saved) saved = "dark";
    applyTheme(saved);
  }
  function toggleTheme() {
    var t = document.documentElement.getAttribute("data-theme") === "light" ? "dark" : "light";
    applyTheme(t);
    try { localStorage.setItem(THEME_KEY, t); } catch (e) {}
  }

  // ---- Wiring ---------------------------------------------------------
  function init() {
    initTheme();
    stats = loadStats();
    state = loadGame();
    buildBoard();
    buildKeyboard();

    document.addEventListener("keydown", function (e) {
      if (!document.getElementById("help-modal").hidden ||
          !document.getElementById("stats-modal").hidden) {
        if (e.key === "Escape") closeModal();
        return;
      }
      if (e.key === "Enter") { handleKey("ENTER"); }
      else if (e.key === "Backspace") { handleKey("BACK"); }
      else if (/^[a-zA-Z]$/.test(e.key)) { handleKey(e.key.toUpperCase()); }
    });

    document.getElementById("help-btn").addEventListener("click", function () { openModal("help-modal"); });
    document.getElementById("stats-btn").addEventListener("click", openStats);
    document.getElementById("theme-btn").addEventListener("click", toggleTheme);
    document.getElementById("share-btn").addEventListener("click", share);
    document.getElementById("practice-btn").addEventListener("click", startPractice);

    document.querySelectorAll("[data-close]").forEach(function (b) {
      b.addEventListener("click", closeModal);
    });
    document.querySelectorAll(".modal-backdrop").forEach(function (m) {
      m.addEventListener("click", function (e) { if (e.target === m) closeModal(); });
    });

    // First-time players see the rules.
    var seen;
    try { seen = localStorage.getItem("lexicle.seenHelp"); } catch (e) {}
    if (!seen) {
      openModal("help-modal");
      try { localStorage.setItem("lexicle.seenHelp", "1"); } catch (e) {}
    } else if (state.status !== "playing") {
      // Returning after finishing today's puzzle: show results.
      paintKeyboard();
      setTimeout(openStats, 400);
    }

    setInterval(tickCountdown, 1000);
    tickCountdown();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else { init(); }
})();
