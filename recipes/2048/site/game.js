/* 2048 — a faithful vanilla-JS remake.
 * Tile-object model with stable ids so moves animate smoothly via CSS transforms.
 * Controls: arrow keys + swipe. Score + best (localStorage). Win/lose + restart. Undo. */

(() => {
  "use strict";

  // ---- config (tweak these to re-theme / resize the board) ----
  const SIZE = 4;          // board is SIZE x SIZE
  const WIN_VALUE = 2048;  // the tile you're chasing
  const START_TILES = 2;   // tiles seeded on a new game
  const STORE_KEY = "spacefast-2048";

  // ---- DOM ----
  const els = {
    board: document.getElementById("board"),
    gridBg: document.getElementById("gridBg"),
    tiles: document.getElementById("tiles"),
    score: document.getElementById("score"),
    best: document.getElementById("best"),
    scoreAdd: document.getElementById("scoreAdd"),
    moves: document.getElementById("moves"),
    goalLabel: document.getElementById("goalLabel"),
    overlay: document.getElementById("overlay"),
    overlayTitle: document.getElementById("overlayTitle"),
    overlayText: document.getElementById("overlayText"),
    newGame: document.getElementById("newGame"),
    keepGoing: document.getElementById("keepGoing"),
    tryAgain: document.getElementById("tryAgain"),
    undoBtn: document.getElementById("undoBtn"),
  };

  document.documentElement.style.setProperty("--size", SIZE);
  els.goalLabel.textContent = WIN_VALUE;

  // ---- state ----
  let grid;            // 2D array [r][c] of tile objects or null
  let tileEls;         // Map<id, HTMLElement>
  let nextId = 1;
  let score = 0;
  let best = loadBest();
  let moves = 0;
  let won = false;     // reached WIN_VALUE
  let keepPlaying = false;
  let over = false;
  let history = null;  // single-level undo snapshot
  let busy = false;    // ignore input mid-animation

  els.best.textContent = best;

  // build the static background cells
  (function buildBg() {
    const frag = document.createDocumentFragment();
    for (let i = 0; i < SIZE * SIZE; i++) {
      const c = document.createElement("div");
      c.className = "cell";
      frag.appendChild(c);
    }
    els.gridBg.appendChild(frag);
  })();

  // ---------- helpers ----------
  function emptyGrid() {
    return Array.from({ length: SIZE }, () => Array(SIZE).fill(null));
  }

  function cellsAvailable() {
    for (let r = 0; r < SIZE; r++)
      for (let c = 0; c < SIZE; c++)
        if (!grid[r][c]) return true;
    return false;
  }

  function randomEmptyCell() {
    const empties = [];
    for (let r = 0; r < SIZE; r++)
      for (let c = 0; c < SIZE; c++)
        if (!grid[r][c]) empties.push({ r, c });
    if (!empties.length) return null;
    return empties[Math.floor(Math.random() * empties.length)];
  }

  function addRandomTile() {
    const cell = randomEmptyCell();
    if (!cell) return;
    const value = Math.random() < 0.9 ? 2 : 4;
    const tile = { id: nextId++, value, r: cell.r, c: cell.c, isNew: true, merged: false };
    grid[cell.r][cell.c] = tile;
  }

  // ---------- rendering ----------
  function tileClass(tile) {
    const len = String(tile.value).length;
    let cls = `tile len${len}`;
    if (tile.value > 2048) cls += " super";
    if (tile.isNew) cls += " new";
    if (tile.merged) cls += " merged";
    return cls;
  }

  function positionStyle(tile) {
    // translate in units of the tile's own size (100%) plus the gap between cells
    const x = `calc(${tile.c} * 100% + ${tile.c} * var(--gap))`;
    const y = `calc(${tile.r} * 100% + ${tile.r} * var(--gap))`;
    return `translate(${x}, ${y})`;
  }

  function createTileEl(tile) {
    const el = document.createElement("div");
    el.style.width = `calc((100% - ${SIZE - 1} * var(--gap)) / ${SIZE})`;
    el.style.height = `calc((100% - ${SIZE - 1} * var(--gap)) / ${SIZE})`;
    const inner = document.createElement("div");
    inner.className = "tile-inner";
    el.appendChild(inner);
    els.tiles.appendChild(el);
    return el;
  }

  function render() {
    const seen = new Set();
    for (let r = 0; r < SIZE; r++) {
      for (let c = 0; c < SIZE; c++) {
        const tile = grid[r][c];
        if (!tile) continue;
        seen.add(tile.id);
        let el = tileEls.get(tile.id);
        if (!el) {
          el = createTileEl(tile);
          tileEls.set(tile.id, el);
          // place a brand-new tile at its cell WITHOUT animating in from the corner
          el.style.transition = "none";
          el.style.transform = positionStyle(tile);
          void el.offsetWidth; // force reflow so the no-transition placement sticks
          el.style.transition = "";
        }
        el.className = tileClass(tile);
        el.dataset.val = tile.value;
        el.querySelector(".tile-inner").textContent = tile.value;
        el.style.transform = positionStyle(tile);
      }
    }
    // remove DOM nodes for tiles that no longer exist (merged away)
    for (const [id, el] of tileEls) {
      if (!seen.has(id)) {
        el.remove();
        tileEls.delete(id);
      }
    }
    els.score.textContent = score;
    els.best.textContent = best;
    els.moves.textContent = moves;
    els.undoBtn.disabled = !history;
  }

  function flashScore(delta) {
    if (delta <= 0) return;
    els.scoreAdd.textContent = "+" + delta;
    els.scoreAdd.classList.remove("run");
    // reflow to restart the animation
    void els.scoreAdd.offsetWidth;
    els.scoreAdd.classList.add("run");
  }

  // ---------- movement ----------
  // Build the ordered list of cell coordinates to traverse for a given direction.
  const VECTORS = {
    left:  { dr: 0,  dc: -1 },
    right: { dr: 0,  dc: 1 },
    up:    { dr: -1, dc: 0 },
    down:  { dr: 1,  dc: 0 },
  };

  function traversals(dir) {
    const rows = [...Array(SIZE).keys()];
    const cols = [...Array(SIZE).keys()];
    if (dir === "right") cols.reverse();
    if (dir === "down") rows.reverse();
    return { rows, cols };
  }

  function findFarthest(r, c, vec) {
    let prev;
    do {
      prev = { r, c };
      r += vec.dr;
      c += vec.dc;
    } while (inBounds(r, c) && !grid[r][c]);
    return { farthest: prev, next: inBounds(r, c) ? { r, c } : null };
  }

  function inBounds(r, c) {
    return r >= 0 && r < SIZE && c >= 0 && c < SIZE;
  }

  function move(dir) {
    if (busy || over) return;
    const vec = VECTORS[dir];
    const { rows, cols } = traversals(dir);

    // clear per-move flags
    for (let r = 0; r < SIZE; r++)
      for (let c = 0; c < SIZE; c++) {
        if (grid[r][c]) { grid[r][c].isNew = false; grid[r][c].merged = false; }
      }

    const snapshot = serialize();
    let moved = false;
    let gained = 0;

    for (const r of rows) {
      for (const c of cols) {
        const tile = grid[r][c];
        if (!tile) continue;
        const { farthest, next } = findFarthest(r, c, vec);
        const target = next ? grid[next.r][next.c] : null;

        if (target && target.value === tile.value && !target.merged) {
          // merge tile into target
          target.value *= 2;
          target.merged = true;
          gained += target.value;
          grid[tile.r][tile.c] = null;
          // move the merging tile's element onto the target cell, then drop it
          const movingEl = tileEls.get(tile.id);
          if (movingEl) {
            movingEl.style.transform = positionStyle({ r: next.r, c: next.c });
            movingEl.style.zIndex = "1";
          }
          // retire the merged-away tile id after the slide completes
          retireTile(tile.id);
          if (target.value === WIN_VALUE && !won) {
            won = true;
          }
          moved = true;
        } else if (farthest.r !== r || farthest.c !== c) {
          grid[r][c] = null;
          tile.r = farthest.r;
          tile.c = farthest.c;
          grid[farthest.r][farthest.c] = tile;
          moved = true;
        }
      }
    }

    if (!moved) return;

    history = snapshot;
    moves++;
    if (gained > 0) {
      score += gained;
      if (score > best) { best = score; saveBest(best); }
      flashScore(gained);
    }

    busy = true;
    render();

    // after the slide animation, spawn a new tile and re-check end state
    window.setTimeout(() => {
      addRandomTile();
      render();
      busy = false;
      checkEndState();
    }, 120);
  }

  function retireTile(id) {
    // element is removed on next render() once the id is gone from the grid,
    // but we keep it during the slide so it visibly travels to the merge cell.
    window.setTimeout(() => {
      const el = tileEls.get(id);
      if (el) { el.remove(); tileEls.delete(id); }
    }, 120);
  }

  // ---------- end-state ----------
  function movesAvailable() {
    if (cellsAvailable()) return true;
    for (let r = 0; r < SIZE; r++) {
      for (let c = 0; c < SIZE; c++) {
        const t = grid[r][c];
        if (!t) continue;
        for (const key in VECTORS) {
          const v = VECTORS[key];
          const nr = r + v.dr, nc = c + v.dc;
          if (inBounds(nr, nc) && grid[nr][nc] && grid[nr][nc].value === t.value)
            return true;
        }
      }
    }
    return false;
  }

  function checkEndState() {
    if (won && !keepPlaying) {
      showOverlay("win");
      return;
    }
    if (!movesAvailable()) {
      over = true;
      showOverlay("lose");
    }
  }

  function showOverlay(kind) {
    els.overlay.hidden = false;
    els.overlay.classList.remove("win", "lose");
    els.overlay.classList.add(kind);
    if (kind === "win") {
      els.overlayTitle.textContent = "You win! 🎉";
      els.overlayText.textContent = `You reached the ${WIN_VALUE} tile. Keep going for a higher score?`;
      els.keepGoing.hidden = false;
    } else {
      els.overlayTitle.textContent = "Game over";
      els.overlayText.textContent = `No moves left. You scored ${score}.`;
      els.keepGoing.hidden = true;
    }
  }

  function hideOverlay() {
    els.overlay.hidden = true;
    els.overlay.classList.remove("win", "lose");
  }

  // ---------- serialize / undo ----------
  function serialize() {
    return {
      grid: grid.map(row => row.map(t => (t ? { id: t.id, value: t.value, r: t.r, c: t.c } : null))),
      score, moves, won, keepPlaying, over, nextId,
    };
  }

  function restore(snap) {
    grid = snap.grid.map(row => row.map(t => (t ? { ...t, isNew: false, merged: false } : null)));
    score = snap.score;
    moves = snap.moves;
    won = snap.won;
    keepPlaying = snap.keepPlaying;
    over = snap.over;
    nextId = snap.nextId;
  }

  function undo() {
    if (!history || busy) return;
    // wipe current tile elements so positions re-seat cleanly
    for (const [, el] of tileEls) el.remove();
    tileEls.clear();
    restore(history);
    history = null;
    over = false;
    hideOverlay();
    render();
  }

  // ---------- lifecycle ----------
  function newGame() {
    grid = emptyGrid();
    tileEls = new Map();
    nextId = 1;
    score = 0;
    moves = 0;
    won = false;
    keepPlaying = false;
    over = false;
    history = null;
    busy = false;
    // clear any lingering DOM
    els.tiles.innerHTML = "";
    hideOverlay();
    for (let i = 0; i < START_TILES; i++) addRandomTile();
    render();
    els.board.focus();
  }

  // ---------- input ----------
  const KEY_DIR = {
    ArrowLeft: "left", ArrowRight: "right", ArrowUp: "up", ArrowDown: "down",
    a: "left", d: "right", w: "up", s: "down",
    h: "left", l: "right", k: "up", j: "down", // vim
  };

  window.addEventListener("keydown", (e) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const dir = KEY_DIR[e.key];
    if (dir) {
      e.preventDefault();
      move(dir);
    } else if (e.key.toLowerCase() === "u") {
      undo();
    } else if (e.key.toLowerCase() === "r") {
      newGame();
    }
  });

  // swipe
  let touch = null;
  els.board.addEventListener("touchstart", (e) => {
    const t = e.changedTouches[0];
    touch = { x: t.clientX, y: t.clientY };
  }, { passive: true });

  els.board.addEventListener("touchmove", (e) => {
    // prevent the page from scrolling while swiping the board
    if (touch) e.preventDefault();
  }, { passive: false });

  els.board.addEventListener("touchend", (e) => {
    if (!touch) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touch.x;
    const dy = t.clientY - touch.y;
    const adx = Math.abs(dx), ady = Math.abs(dy);
    const THRESH = 24;
    if (Math.max(adx, ady) > THRESH) {
      if (adx > ady) move(dx > 0 ? "right" : "left");
      else move(dy > 0 ? "down" : "up");
    }
    touch = null;
  }, { passive: true });

  // buttons
  els.newGame.addEventListener("click", newGame);
  els.tryAgain.addEventListener("click", newGame);
  els.undoBtn.addEventListener("click", undo);
  els.keepGoing.addEventListener("click", () => {
    keepPlaying = true;
    hideOverlay();
    els.board.focus();
  });

  // ---------- storage ----------
  function loadBest() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (!raw) return 0;
      const v = JSON.parse(raw);
      return Number(v.best) || 0;
    } catch { return 0; }
  }
  function saveBest(v) {
    try { localStorage.setItem(STORE_KEY, JSON.stringify({ best: v })); } catch {}
  }

  // boot
  newGame();
})();
