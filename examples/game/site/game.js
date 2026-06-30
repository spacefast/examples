/* ============================================================
   PRISM BREAKER — a neon-synthwave brick-breaker
   Pure canvas + vanilla JS. No build step, no assets.
   ============================================================ */
(function () {
  "use strict";

  // ---------- Canvas ----------
  const canvas = document.getElementById("game");
  const ctx = canvas.getContext("2d");
  const W = canvas.width;   // 800 (logical units)
  const H = canvas.height;  // 600

  // ---------- DOM ----------
  const $ = (id) => document.getElementById(id);
  const els = {
    score: $("scoreVal"), lives: $("livesVal"), level: $("levelVal"), best: $("bestVal"),
    titleScreen: $("titleScreen"), titleBest: $("titleBest"),
    messageScreen: $("messageScreen"), msgKicker: $("msgKicker"), msgHeading: $("msgHeading"),
    msgScore: $("msgScore"), msgBest: $("msgBest"), msgBtn: $("msgBtn"),
    pauseScreen: $("pauseScreen"), launchHint: $("launchHint"),
    playBtn: $("playBtn"), howBtn: $("howBtn"), resumeBtn: $("resumeBtn"),
    muteBtn: $("muteBtn"),
    howModal: $("howModal"), howClose: $("howClose"), howScrim: $("howScrim"),
    touchLeft: $("touchLeft"), touchRight: $("touchRight"), touchLaunch: $("touchLaunch"),
  };

  // ---------- Audio shim ----------
  const Audio = window.PrismAudio || { play() {}, setMuted() {}, resume() {}, isMuted: () => false };

  // ---------- Persistent best ----------
  const BEST_KEY = "prismbreaker.best.v1";
  let best = 0;
  try { best = parseInt(localStorage.getItem(BEST_KEY) || "0", 10) || 0; } catch (e) { best = 0; }

  // ---------- Palette ----------
  const COLORS = {
    cyan: "#00f0ff", magenta: "#ff2e97", violet: "#9d4edd",
    gold: "#ffd166", lime: "#b6ff3c", orange: "#ff7b3c",
  };
  // Brick colors by hit-points tier
  const TIER = {
    1: { fill: COLORS.cyan, glow: "rgba(0,240,255,0.6)", points: 50 },
    2: { fill: COLORS.magenta, glow: "rgba(255,46,151,0.6)", points: 90 },
    3: { fill: COLORS.gold, glow: "rgba(255,209,102,0.6)", points: 150 },
  };

  // ---------- Levels (13 columns) ----------
  const LEVELS = [
    [ // 1 — The Wall
      "1111111111111",
      "1111111111111",
      "2222222222222",
      "1111111111111",
    ],
    [ // 2 — Pyramid
      "......2......",
      ".....222.....",
      "....22122....",
      "...2211122...",
      "..221111122..",
      ".22111111122.",
    ],
    [ // 3 — Lattice
      ".1.1.1.1.1.1.",
      "1.2.2.2.2.2.1",
      ".2.3.3.3.3.2.",
      "1.2.2.2.2.2.1",
      ".1.1.1.1.1.1.",
    ],
    [ // 4 — Fortress
      "3333333333333",
      "3...........3",
      "3.222222222.3",
      "3.2.......2.3",
      "3.2.11111.2.3",
      "3.222222222.3",
      "3333333333333",
    ],
    [ // 5 — The Prism
      "1322222222231",
      "3.2.2.2.2.2.3",
      "23.2.3.3.2.32",
      "3.2.3.1.3.2.3",
      "23.2.3.3.2.32",
      "3.2.2.2.2.2.3",
      "1322222222231",
    ],
  ];
  const COLS = 13;
  const FIELD_PAD = 46;
  const BRICK_TOP = 62;
  const BRICK_GAP = 6;
  const BRICK_H = 26;

  // ---------- Game state ----------
  const State = { TITLE: "title", READY: "ready", PLAYING: "playing", PAUSED: "paused", LEVELCLEAR: "levelclear", GAMEOVER: "gameover", WIN: "win" };
  let state = State.TITLE;

  let score = 0, lives = 3, level = 1, combo = 1;
  let bricks = [];
  let balls = [];
  let powerups = [];
  let lasers = [];
  let particles = [];
  let floats = [];
  let shake = 0;

  const paddle = {
    w: 120, baseW: 120, h: 16,
    x: W / 2, y: H - 42,
    speed: 9,
    laser: false,
  };

  const ballBaseR = 9;
  let levelBaseSpeed = 6.0;

  // timed power-up effects
  const effects = { wide: 0, slow: 0, laser: 0 };

  // input
  const keys = { left: false, right: false };
  let pointerActive = false;
  let pointerX = null;

  // ---------- Helpers ----------
  function levelSpeed(lv) { return 5.6 + (lv - 1) * 0.55; }

  function makeBall(x, y, vx, vy, stuck) {
    return { x, y, vx: vx || 0, vy: vy || 0, r: ballBaseR, stuck: !!stuck, trail: [] };
  }

  function clamp(v, lo, hi) { return v < lo ? lo : v > hi ? hi : v; }

  function setText(el, v) { el.textContent = v; }

  function bump(el) { el.classList.remove("is-bump"); void el.offsetWidth; el.classList.add("is-bump"); }

  // ---------- HUD ----------
  function renderHud() {
    setText(els.score, score.toLocaleString());
    setText(els.level, level);
    setText(els.best, best.toLocaleString());
    els.lives.textContent = lives > 0 ? "●".repeat(lives) : "—";
  }

  function addScore(n, x, y) {
    score += n;
    bump(els.score);
    setText(els.score, score.toLocaleString());
    if (x != null) floats.push({ x, y, text: "+" + n, life: 1, vy: -0.6 });
  }

  // ---------- Level build ----------
  function buildBricks(layout) {
    bricks = [];
    const areaW = W - FIELD_PAD * 2;
    const bw = (areaW - BRICK_GAP * (COLS - 1)) / COLS;
    for (let r = 0; r < layout.length; r++) {
      const row = layout[r];
      for (let c = 0; c < COLS && c < row.length; c++) {
        const ch = row[c];
        const hp = ch >= "1" && ch <= "3" ? parseInt(ch, 10) : 0;
        if (!hp) continue;
        bricks.push({
          x: FIELD_PAD + c * (bw + BRICK_GAP),
          y: BRICK_TOP + r * (BRICK_H + BRICK_GAP),
          w: bw, h: BRICK_H,
          hp, maxHp: hp, alive: true,
        });
      }
    }
  }

  function aliveBricks() {
    let n = 0;
    for (const b of bricks) if (b.alive) n++;
    return n;
  }

  // ---------- Flow ----------
  function startGame() {
    score = 0; lives = 3; level = 1; combo = 1;
    Audio.resume();
    loadLevel();
  }

  function loadLevel() {
    levelBaseSpeed = levelSpeed(level);
    buildBricks(LEVELS[(level - 1) % LEVELS.length]);
    powerups = []; lasers = []; particles = []; floats = [];
    effects.wide = 0; effects.slow = 0; effects.laser = 0;
    paddle.w = paddle.baseW; paddle.laser = false; paddle.x = W / 2;
    balls = [resetBallOnPaddle()];
    combo = 1;
    state = State.READY;
    hideAllOverlays();
    els.launchHint.classList.add("is-active");
    renderHud();
  }

  function resetBallOnPaddle() {
    return makeBall(paddle.x, paddle.y - paddle.h / 2 - ballBaseR - 1, 0, 0, true);
  }

  function launchBall() {
    let launched = false;
    for (const b of balls) {
      if (b.stuck) {
        const angle = (-Math.PI / 2) + (Math.random() * 0.5 - 0.25);
        const spd = currentSpeed();
        b.vx = Math.cos(angle) * spd;
        b.vy = Math.sin(angle) * spd;
        b.stuck = false;
        launched = true;
      }
    }
    if (launched) {
      state = State.PLAYING;
      els.launchHint.classList.remove("is-active");
      Audio.play("launch");
    }
  }

  function currentSpeed() {
    return levelBaseSpeed * (effects.slow > 0 ? 0.62 : 1);
  }

  function loseLife() {
    lives--;
    shake = 14;
    Audio.play("lose");
    renderHud();
    if (lives <= 0) {
      gameOver();
    } else {
      // soft reset: clear power-up effects and drops, keep bricks
      powerups = []; lasers = [];
      effects.wide = 0; effects.slow = 0; effects.laser = 0;
      paddle.w = paddle.baseW; paddle.laser = false;
      combo = 1;
      balls = [resetBallOnPaddle()];
      state = State.READY;
      els.launchHint.classList.add("is-active");
    }
  }

  function levelCleared() {
    Audio.play("levelup");
    if (level >= LEVELS.length) {
      win();
    } else {
      state = State.LEVELCLEAR;
      els.launchHint.classList.remove("is-active");
      showMessage({
        kicker: "Level " + level + " cleared",
        heading: "NICE BREAK",
        btn: "Next level →",
        onBtn: () => { level++; loadLevel(); },
      });
    }
  }

  function gameOver() {
    state = State.GAMEOVER;
    commitBest();
    Audio.play("gameover");
    els.launchHint.classList.remove("is-active");
    showMessage({
      kicker: "Game over",
      heading: "WALL WINS",
      btn: "Play again",
      onBtn: () => startGame(),
    });
  }

  function win() {
    state = State.WIN;
    commitBest();
    Audio.play("levelup");
    els.launchHint.classList.remove("is-active");
    showMessage({
      kicker: "All five levels cleared",
      heading: "PRISM MASTER",
      btn: "Play again",
      onBtn: () => startGame(),
    });
  }

  function commitBest() {
    if (score > best) {
      best = score;
      try { localStorage.setItem(BEST_KEY, String(best)); } catch (e) {}
    }
    renderHud();
  }

  // ---------- Overlays ----------
  function hideAllOverlays() {
    els.titleScreen.classList.remove("is-active");
    els.messageScreen.classList.remove("is-active");
    els.messageScreen.setAttribute("aria-hidden", "true");
    els.pauseScreen.classList.remove("is-active");
    els.pauseScreen.setAttribute("aria-hidden", "true");
  }

  let messageAction = null;
  function showMessage({ kicker, heading, btn, onBtn }) {
    hideAllOverlays();
    setText(els.msgKicker, kicker);
    setText(els.msgHeading, heading);
    setText(els.msgScore, score.toLocaleString());
    setText(els.msgBest, best.toLocaleString());
    setText(els.msgBtn, btn);
    messageAction = onBtn;
    els.messageScreen.classList.add("is-active");
    els.messageScreen.setAttribute("aria-hidden", "false");
    els.msgBtn.focus();
  }

  function togglePause(force) {
    if (state === State.PLAYING || force === true) {
      if (state !== State.PLAYING) return;
      state = State.PAUSED;
      els.pauseScreen.classList.add("is-active");
      els.pauseScreen.setAttribute("aria-hidden", "false");
    } else if (state === State.PAUSED) {
      state = State.PLAYING;
      els.pauseScreen.classList.remove("is-active");
      els.pauseScreen.setAttribute("aria-hidden", "true");
    }
  }

  // ---------- Power-ups ----------
  const POWER_TABLE = [
    { type: "multi", color: COLORS.cyan, letter: "M", weight: 26 },
    { type: "wide", color: COLORS.lime, letter: "W", weight: 24 },
    { type: "slow", color: COLORS.violet, letter: "S", weight: 22 },
    { type: "laser", color: COLORS.magenta, letter: "L", weight: 18 },
    { type: "life", color: COLORS.gold, letter: "+", weight: 6 },
  ];
  const POWER_TOTAL = POWER_TABLE.reduce((s, p) => s + p.weight, 0);

  function maybeDropPower(x, y) {
    if (Math.random() > 0.20) return;
    let roll = Math.random() * POWER_TOTAL;
    let pick = POWER_TABLE[0];
    for (const p of POWER_TABLE) { if (roll < p.weight) { pick = p; break; } roll -= p.weight; }
    powerups.push({ x, y, vy: 2.6, type: pick.type, color: pick.color, letter: pick.letter, w: 30, h: 18 });
  }

  function applyPower(type) {
    Audio.play("power");
    switch (type) {
      case "multi": {
        const live = balls.filter((b) => !b.stuck);
        const src = live.length ? live : balls;
        const additions = [];
        for (const b of src) {
          if (balls.length + additions.length >= 6) break;
          for (let k = 0; k < 2; k++) {
            if (balls.length + additions.length >= 6) break;
            const spd = currentSpeed();
            const ang = Math.atan2(b.vy || -1, b.vx || 0) + (k === 0 ? -0.45 : 0.45);
            additions.push(makeBall(b.x, b.y, Math.cos(ang) * spd, Math.sin(ang) * spd, false));
          }
        }
        balls = balls.concat(additions);
        break;
      }
      case "wide": effects.wide = 12 * 60; paddle.w = paddle.baseW * 1.6; break;
      case "slow": effects.slow = 8 * 60; break;
      case "laser": effects.laser = 10 * 60; paddle.laser = true; break;
      case "life": lives = Math.min(lives + 1, 6); renderHud(); bump(els.lives); break;
    }
  }

  function fireLaser() {
    if (!paddle.laser) return;
    const y = paddle.y - paddle.h;
    lasers.push({ x: paddle.x - paddle.w / 2 + 8, y, vy: -11 });
    lasers.push({ x: paddle.x + paddle.w / 2 - 8, y, vy: -11 });
    Audio.play("laser");
  }

  // ---------- Particles ----------
  function burst(x, y, color, n) {
    for (let i = 0; i < n; i++) {
      const a = Math.random() * Math.PI * 2;
      const s = 1 + Math.random() * 4;
      particles.push({
        x, y,
        vx: Math.cos(a) * s, vy: Math.sin(a) * s - 1,
        life: 1, color, size: 2 + Math.random() * 3,
      });
    }
  }

  // ---------- Collision ----------
  function damageBrick(b, x, y) {
    b.hp--;
    if (b.hp <= 0) {
      b.alive = false;
      const pts = Math.round(TIER[b.maxHp].points * combo);
      addScore(pts, b.x + b.w / 2, b.y);
      burst(b.x + b.w / 2, b.y + b.h / 2, TIER[b.maxHp].fill, 14);
      maybeDropPower(b.x + b.w / 2, b.y + b.h / 2);
      Audio.play("brick");
      combo = Math.min(combo + 0.25, 4);
    } else {
      burst(x, y, TIER[b.maxHp].fill, 5);
      Audio.play("crack");
    }
  }

  // circle vs brick AABB; reflect ball, return true on hit
  function ballBrickCollision(ball) {
    for (const b of bricks) {
      if (!b.alive) continue;
      const nx = clamp(ball.x, b.x, b.x + b.w);
      const ny = clamp(ball.y, b.y, b.y + b.h);
      const dx = ball.x - nx;
      const dy = ball.y - ny;
      if (dx * dx + dy * dy <= ball.r * ball.r) {
        // resolve along axis of least penetration
        const overlapL = ball.x - b.x;          // dist from left
        const overlapR = b.x + b.w - ball.x;    // dist to right
        const overlapT = ball.y - b.y;
        const overlapB = b.y + b.h - ball.y;
        const minX = Math.min(overlapL, overlapR);
        const minY = Math.min(overlapT, overlapB);
        if (minX < minY) {
          ball.vx = -ball.vx;
          // push out along the shallower horizontal axis
          ball.x += (overlapL < overlapR ? -1 : 1) * (minX + 0.5);
        } else {
          ball.vy = -ball.vy;
          ball.y += (overlapT < overlapB ? -1 : 1) * (minY + 0.5);
        }
        damageBrick(b, nx, ny);
        return true;
      }
    }
    return false;
  }

  function ballPaddleCollision(ball) {
    if (ball.vy <= 0) return;
    const px = paddle.x - paddle.w / 2;
    const top = paddle.y - paddle.h / 2;
    if (
      ball.y + ball.r >= top &&
      ball.y - ball.r <= paddle.y + paddle.h / 2 &&
      ball.x >= px - ball.r && ball.x <= px + paddle.w + ball.r
    ) {
      const rel = clamp((ball.x - paddle.x) / (paddle.w / 2), -1, 1);
      const maxAngle = (60 * Math.PI) / 180;
      const angle = rel * maxAngle;
      const spd = currentSpeed();
      ball.vx = Math.sin(angle) * spd;
      ball.vy = -Math.cos(angle) * spd;
      ball.y = top - ball.r - 0.5;
      combo = 1;
      Audio.play("paddle");
    }
  }

  // ---------- Update ----------
  function updatePaddle(dt) {
    if (pointerActive && pointerX != null) {
      // ease toward pointer
      paddle.x += (pointerX - paddle.x) * Math.min(1, 0.35 * dt);
    }
    if (keys.left) paddle.x -= paddle.speed * dt;
    if (keys.right) paddle.x += paddle.speed * dt;
    const half = paddle.w / 2;
    paddle.x = clamp(paddle.x, half + 2, W - half - 2);
  }

  function updateBalls(dt) {
    for (const ball of balls) {
      if (ball.stuck) {
        ball.x = paddle.x;
        ball.y = paddle.y - paddle.h / 2 - ball.r - 1;
        continue;
      }
      // trail
      ball.trail.push({ x: ball.x, y: ball.y });
      if (ball.trail.length > 8) ball.trail.shift();

      // substep to avoid tunneling
      const stepDist = Math.hypot(ball.vx, ball.vy) * dt;
      const steps = Math.max(1, Math.ceil(stepDist / (ball.r * 0.9)));
      const sdt = dt / steps;
      for (let s = 0; s < steps; s++) {
        ball.x += ball.vx * sdt;
        ball.y += ball.vy * sdt;
        // walls
        if (ball.x - ball.r < 0) { ball.x = ball.r; ball.vx = Math.abs(ball.vx); Audio.play("wall"); }
        else if (ball.x + ball.r > W) { ball.x = W - ball.r; ball.vx = -Math.abs(ball.vx); Audio.play("wall"); }
        if (ball.y - ball.r < 0) { ball.y = ball.r; ball.vy = Math.abs(ball.vy); Audio.play("wall"); }
        ballBrickCollision(ball);
        ballPaddleCollision(ball);
        if (ball.y - ball.r > H) { ball.dead = true; break; }
      }
    }
    // drop dead balls
    const before = balls.length;
    balls = balls.filter((b) => !b.dead);
    if (balls.length === 0 && before > 0) {
      loseLife();
      return;
    }
  }

  function updatePowerups(dt) {
    for (const p of powerups) {
      p.y += p.vy * dt;
      // caught?
      const px = paddle.x - paddle.w / 2;
      if (
        p.y + p.h / 2 >= paddle.y - paddle.h / 2 &&
        p.y - p.h / 2 <= paddle.y + paddle.h / 2 &&
        p.x >= px - 8 && p.x <= px + paddle.w + 8
      ) {
        p.caught = true;
        applyPower(p.type);
        floats.push({ x: p.x, y: p.y, text: p.letter, life: 1, vy: -0.8, color: p.color });
      }
    }
    powerups = powerups.filter((p) => !p.caught && p.y - p.h < H);
  }

  function updateLasers(dt) {
    for (const l of lasers) {
      l.y += l.vy * dt;
      for (const b of bricks) {
        if (!b.alive) continue;
        if (l.x >= b.x && l.x <= b.x + b.w && l.y <= b.y + b.h && l.y >= b.y) {
          damageBrick(b, l.x, l.y);
          l.dead = true;
          break;
        }
      }
    }
    lasers = lasers.filter((l) => !l.dead && l.y > -10);
  }

  function updateParticles(dt) {
    for (const p of particles) {
      p.x += p.vx * dt;
      p.y += p.vy * dt;
      p.vy += 0.18 * dt;
      p.life -= 0.03 * dt;
    }
    particles = particles.filter((p) => p.life > 0);
  }

  function updateFloats(dt) {
    for (const f of floats) {
      f.y += f.vy * dt;
      f.life -= 0.02 * dt;
    }
    floats = floats.filter((f) => f.life > 0);
  }

  function updateEffects(dt) {
    if (effects.wide > 0) { effects.wide -= dt; if (effects.wide <= 0) paddle.w = paddle.baseW; }
    if (effects.slow > 0) effects.slow -= dt;
    if (effects.laser > 0) { effects.laser -= dt; if (effects.laser <= 0) paddle.laser = false; }
  }

  function update(dt) {
    if (state === State.PLAYING) {
      updatePaddle(dt);
      updateBalls(dt);
      if (state !== State.PLAYING) return; // life lost mid-update
      updatePowerups(dt);
      updateLasers(dt);
      updateEffects(dt);
      if (aliveBricks() === 0) { levelCleared(); }
    } else if (state === State.READY) {
      updatePaddle(dt);
      updateBalls(dt); // keeps ball glued to paddle
    }
    updateParticles(dt);
    updateFloats(dt);
    if (shake > 0) shake = Math.max(0, shake - dt);
  }

  // ---------- Render ----------
  function roundRect(x, y, w, h, r) {
    r = Math.min(r, w / 2, h / 2);
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  function drawBackground() {
    const g = ctx.createLinearGradient(0, 0, 0, H);
    g.addColorStop(0, "#0c0220");
    g.addColorStop(1, "#05010f");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, W, H);

    // faint horizon grid near bottom
    ctx.save();
    ctx.globalAlpha = 0.10;
    ctx.strokeStyle = COLORS.violet;
    ctx.lineWidth = 1;
    for (let x = 0; x <= W; x += 50) {
      ctx.beginPath(); ctx.moveTo(x, H * 0.78); ctx.lineTo(W / 2 + (x - W / 2) * 2.2, H); ctx.stroke();
    }
    for (let i = 0; i < 5; i++) {
      const y = H * 0.78 + i * i * 6 + 8;
      ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y); ctx.stroke();
    }
    ctx.restore();
  }

  function drawBricks() {
    for (const b of bricks) {
      if (!b.alive) continue;
      const tier = TIER[b.maxHp];
      ctx.save();
      ctx.shadowColor = tier.glow;
      ctx.shadowBlur = 12;
      // body
      const damaged = b.hp < b.maxHp;
      ctx.globalAlpha = damaged ? 0.65 : 1;
      const grad = ctx.createLinearGradient(b.x, b.y, b.x, b.y + b.h);
      grad.addColorStop(0, tier.fill);
      grad.addColorStop(1, shade(tier.fill, -0.35));
      ctx.fillStyle = grad;
      roundRect(b.x, b.y, b.w, b.h, 5);
      ctx.fill();
      ctx.restore();

      // top highlight
      ctx.save();
      ctx.globalAlpha = 0.5;
      ctx.fillStyle = "rgba(255,255,255,0.55)";
      roundRect(b.x + 3, b.y + 3, b.w - 6, 3, 2);
      ctx.fill();
      ctx.restore();

      // crack lines for damaged multi-hp bricks
      if (damaged) {
        ctx.save();
        ctx.strokeStyle = "rgba(0,0,0,0.55)";
        ctx.lineWidth = 1.4;
        ctx.beginPath();
        ctx.moveTo(b.x + b.w * 0.3, b.y + 2);
        ctx.lineTo(b.x + b.w * 0.45, b.y + b.h * 0.6);
        ctx.lineTo(b.x + b.w * 0.6, b.y + b.h - 2);
        ctx.moveTo(b.x + b.w * 0.7, b.y + 3);
        ctx.lineTo(b.x + b.w * 0.55, b.y + b.h * 0.5);
        ctx.stroke();
        ctx.restore();
      }
    }
  }

  function drawPaddle() {
    ctx.save();
    ctx.shadowColor = "rgba(0,240,255,0.7)";
    ctx.shadowBlur = 18;
    const x = paddle.x - paddle.w / 2;
    const y = paddle.y - paddle.h / 2;
    const grad = ctx.createLinearGradient(x, 0, x + paddle.w, 0);
    if (paddle.laser) {
      grad.addColorStop(0, COLORS.magenta);
      grad.addColorStop(0.5, "#fff");
      grad.addColorStop(1, COLORS.magenta);
    } else {
      grad.addColorStop(0, COLORS.cyan);
      grad.addColorStop(0.5, "#dffaff");
      grad.addColorStop(1, COLORS.magenta);
    }
    ctx.fillStyle = grad;
    roundRect(x, y, paddle.w, paddle.h, paddle.h / 2);
    ctx.fill();
    ctx.restore();

    if (paddle.laser) {
      ctx.save();
      ctx.fillStyle = COLORS.magenta;
      ctx.shadowColor = COLORS.magenta; ctx.shadowBlur = 10;
      ctx.fillRect(x + 5, y - 6, 4, 6);
      ctx.fillRect(x + paddle.w - 9, y - 6, 4, 6);
      ctx.restore();
    }
  }

  function drawBalls() {
    for (const ball of balls) {
      // trail
      for (let i = 0; i < ball.trail.length; i++) {
        const t = ball.trail[i];
        const a = (i / ball.trail.length) * 0.4;
        ctx.save();
        ctx.globalAlpha = a;
        ctx.fillStyle = COLORS.cyan;
        ctx.beginPath();
        ctx.arc(t.x, t.y, ball.r * (i / ball.trail.length), 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }
      ctx.save();
      ctx.shadowColor = "rgba(0,240,255,0.9)";
      ctx.shadowBlur = 16;
      const g = ctx.createRadialGradient(ball.x - 2, ball.y - 2, 1, ball.x, ball.y, ball.r);
      g.addColorStop(0, "#ffffff");
      g.addColorStop(0.5, COLORS.cyan);
      g.addColorStop(1, "#0aa6c9");
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }

  function drawPowerups() {
    for (const p of powerups) {
      ctx.save();
      ctx.shadowColor = p.color; ctx.shadowBlur = 14;
      ctx.fillStyle = p.color;
      roundRect(p.x - p.w / 2, p.y - p.h / 2, p.w, p.h, 9);
      ctx.fill();
      ctx.restore();
      ctx.save();
      ctx.fillStyle = "#08001a";
      ctx.font = "900 13px Orbitron, sans-serif";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillText(p.letter, p.x, p.y + 1);
      ctx.restore();
    }
  }

  function drawLasers() {
    ctx.save();
    ctx.shadowColor = COLORS.magenta; ctx.shadowBlur = 10;
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 3;
    for (const l of lasers) {
      ctx.beginPath();
      ctx.moveTo(l.x, l.y);
      ctx.lineTo(l.x, l.y + 14);
      ctx.stroke();
    }
    ctx.restore();
  }

  function drawParticles() {
    for (const p of particles) {
      ctx.save();
      ctx.globalAlpha = Math.max(0, p.life);
      ctx.fillStyle = p.color;
      ctx.shadowColor = p.color; ctx.shadowBlur = 6;
      ctx.fillRect(p.x, p.y, p.size, p.size);
      ctx.restore();
    }
  }

  function drawFloats() {
    ctx.save();
    ctx.font = "700 16px Rajdhani, sans-serif";
    ctx.textAlign = "center";
    for (const f of floats) {
      ctx.globalAlpha = Math.max(0, f.life);
      ctx.fillStyle = f.color || "#fff";
      ctx.fillText(f.text, f.x, f.y);
    }
    ctx.restore();
  }

  function drawEffectBadges() {
    const active = [];
    if (effects.wide > 0) active.push(["WIDE", COLORS.lime, effects.wide]);
    if (effects.slow > 0) active.push(["SLOW-MO", COLORS.violet, effects.slow]);
    if (effects.laser > 0) active.push(["LASER", COLORS.magenta, effects.laser]);
    let y = 8;
    ctx.save();
    ctx.font = "700 11px Rajdhani, sans-serif";
    ctx.textBaseline = "top";
    for (const [label, color, t] of active) {
      ctx.globalAlpha = 1;
      ctx.fillStyle = color;
      const secs = Math.ceil(t / 60);
      const txt = label + " " + secs + "s";
      const w = ctx.measureText(txt).width + 14;
      ctx.globalAlpha = 0.18;
      roundRect(8, y, w, 18, 6); ctx.fill();
      ctx.globalAlpha = 1;
      ctx.fillStyle = color;
      ctx.fillText(txt, 15, y + 4);
      y += 24;
    }
    ctx.restore();
  }

  function render() {
    ctx.save();
    if (shake > 0) {
      const s = shake / 3;
      ctx.translate((Math.random() - 0.5) * s, (Math.random() - 0.5) * s);
    }
    drawBackground();
    drawBricks();
    drawPowerups();
    drawLasers();
    drawParticles();
    drawPaddle();
    drawBalls();
    drawFloats();
    drawEffectBadges();
    ctx.restore();
  }

  // ---------- Color shade util ----------
  function shade(hex, amt) {
    const c = hex.replace("#", "");
    let r = parseInt(c.substring(0, 2), 16);
    let g = parseInt(c.substring(2, 4), 16);
    let b = parseInt(c.substring(4, 6), 16);
    r = clamp(Math.round(r + r * amt), 0, 255);
    g = clamp(Math.round(g + g * amt), 0, 255);
    b = clamp(Math.round(b + b * amt), 0, 255);
    return "rgb(" + r + "," + g + "," + b + ")";
  }

  // ---------- Loop ----------
  let lastT = performance.now();
  function frame(now) {
    let dt = (now - lastT) / 16.6667; // normalize to 60fps units
    lastT = now;
    if (dt > 2.5) dt = 2.5; // clamp big gaps (tab switch)
    update(dt);
    render();
    requestAnimationFrame(frame);
  }

  // ============================================================
  //  Input
  // ============================================================
  function onAction() {
    // context-sensitive primary action (space / tap / launch button)
    if (state === State.READY) launchBall();
    else if (state === State.PLAYING) fireLaser();
    else if (state === State.PAUSED) togglePause();
  }

  document.addEventListener("keydown", (e) => {
    const k = e.key.toLowerCase();
    if (k === "arrowleft" || k === "a") { keys.left = true; pointerActive = false; e.preventDefault(); }
    else if (k === "arrowright" || k === "d") { keys.right = true; pointerActive = false; e.preventDefault(); }
    else if (e.key === " " || e.code === "Space") {
      e.preventDefault();
      if (state === State.TITLE) { startGame(); }
      else onAction();
    }
    else if (k === "p") { if (state === State.PLAYING || state === State.PAUSED) togglePause(); }
    else if (e.key === "Enter") {
      if (state === State.TITLE) startGame();
      else if (state === State.LEVELCLEAR || state === State.GAMEOVER || state === State.WIN) { if (messageAction) messageAction(); }
    }
    else if (k === "m") { toggleMute(); }
  });

  document.addEventListener("keyup", (e) => {
    const k = e.key.toLowerCase();
    if (k === "arrowleft" || k === "a") keys.left = false;
    else if (k === "arrowright" || k === "d") keys.right = false;
  });

  // mouse
  function pointerToGameX(clientX) {
    const rect = canvas.getBoundingClientRect();
    return ((clientX - rect.left) / rect.width) * W;
  }
  canvas.addEventListener("mousemove", (e) => {
    pointerActive = true;
    pointerX = pointerToGameX(e.clientX);
  });
  canvas.addEventListener("mousedown", (e) => {
    e.preventDefault();
    pointerActive = true;
    pointerX = pointerToGameX(e.clientX);
    if (state === State.READY) launchBall();
    else if (state === State.PLAYING) fireLaser();
    else if (state === State.PAUSED) togglePause();
  });

  // touch
  canvas.addEventListener("touchstart", (e) => {
    e.preventDefault();
    pointerActive = true;
    if (e.touches[0]) pointerX = pointerToGameX(e.touches[0].clientX);
    if (state === State.READY) launchBall();
    else if (state === State.PAUSED) togglePause();
  }, { passive: false });
  canvas.addEventListener("touchmove", (e) => {
    e.preventDefault();
    pointerActive = true;
    if (e.touches[0]) pointerX = pointerToGameX(e.touches[0].clientX);
  }, { passive: false });

  // on-screen buttons (mobile)
  function holdBtn(el, on, off) {
    const start = (e) => { e.preventDefault(); on(); };
    const end = (e) => { e.preventDefault(); off(); };
    el.addEventListener("touchstart", start, { passive: false });
    el.addEventListener("touchend", end);
    el.addEventListener("touchcancel", end);
    el.addEventListener("mousedown", start);
    el.addEventListener("mouseup", end);
    el.addEventListener("mouseleave", end);
  }
  holdBtn(els.touchLeft, () => { keys.left = true; pointerActive = false; }, () => { keys.left = false; });
  holdBtn(els.touchRight, () => { keys.right = true; pointerActive = false; }, () => { keys.right = false; });
  els.touchLaunch.addEventListener("click", (e) => { e.preventDefault(); onAction(); });

  // ---------- Buttons / overlays ----------
  els.playBtn.addEventListener("click", () => startGame());
  els.resumeBtn.addEventListener("click", () => togglePause());
  els.msgBtn.addEventListener("click", () => { if (messageAction) messageAction(); });

  function openHow() { els.howModal.classList.add("is-active"); els.howModal.setAttribute("aria-hidden", "false"); }
  function closeHow() { els.howModal.classList.remove("is-active"); els.howModal.setAttribute("aria-hidden", "true"); }
  els.howBtn.addEventListener("click", openHow);
  els.howClose.addEventListener("click", closeHow);
  els.howScrim.addEventListener("click", closeHow);
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeHow(); });

  // ---------- Mute ----------
  function toggleMute() {
    const next = !Audio.isMuted();
    Audio.setMuted(next);
    els.muteBtn.setAttribute("aria-pressed", String(next));
  }
  els.muteBtn.addEventListener("click", toggleMute);

  // ---------- Boot ----------
  els.titleBest.textContent = best > 0 ? "Best score: " + best.toLocaleString() : "";
  renderHud();
  requestAnimationFrame((t) => { lastT = t; requestAnimationFrame(frame); });
})();
