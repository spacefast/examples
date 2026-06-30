/* ===========================================================
   BRICK BUSTER — a playable Breakout-style hero game.
   Canvas internal resolution is fixed (480x600); CSS scales it.
   Controls: ← → / A D / mouse / touch to move; Space to launch; P to pause.
   =========================================================== */
(function () {
  "use strict";

  var canvas = document.getElementById("game");
  if (!canvas || !canvas.getContext) return;
  var ctx = canvas.getContext("2d");

  var W = canvas.width;   // 480
  var H = canvas.height;  // 600

  // --- DOM ---
  var overlay = document.getElementById("overlay");
  var overlaySub = document.getElementById("overlay-sub");
  var overlayTitle = overlay.querySelector(".overlay__title");
  var startBtn = document.getElementById("startBtn");
  var scoreEl = document.getElementById("score");
  var hiscoreEl = document.getElementById("hiscore");
  var livesEl = document.getElementById("lives");
  var levelEl = document.getElementById("level");

  // --- palette (mirrors the CSS neon theme) ---
  var COLORS = ["#ff2db8", "#21e6ff", "#b6ff3d", "#ffd23d", "#9b5cff"];

  // --- state ---
  var STATE = { START: "start", READY: "ready", PLAYING: "playing", PAUSED: "paused", OVER: "over", WON: "won" };
  var state = STATE.START;

  var score = 0;
  var lives = 3;
  var level = 1;
  var hiscore = 0;
  try { hiscore = parseInt(localStorage.getItem("qu_brickbuster_hi") || "0", 10) || 0; } catch (e) {}

  // --- paddle ---
  var paddle = { w: 92, h: 12, x: (W - 92) / 2, y: H - 38, speed: 7 };

  // --- ball ---
  var ball = { x: W / 2, y: paddle.y - 9, r: 7, vx: 0, vy: 0, stuck: true, baseSpeed: 5 };

  // --- bricks ---
  var bricks = [];
  var BRICK = { rows: 5, cols: 8, w: 50, h: 20, gap: 6, top: 70, left: 13 };

  var keys = { left: false, right: false };
  var lastTime = 0;

  function setHud() {
    scoreEl.textContent = score;
    hiscoreEl.textContent = hiscore;
    livesEl.textContent = lives;
    levelEl.textContent = level;
  }

  function buildBricks() {
    bricks = [];
    var rows = Math.min(BRICK.rows + (level - 1), 8);
    for (var r = 0; r < rows; r++) {
      for (var c = 0; c < BRICK.cols; c++) {
        bricks.push({
          x: BRICK.left + c * (BRICK.w + BRICK.gap),
          y: BRICK.top + r * (BRICK.h + BRICK.gap),
          w: BRICK.w,
          h: BRICK.h,
          color: COLORS[(r + c) % COLORS.length],
          hits: r < 1 && level > 1 ? 2 : 1, // top row gets tougher on later waves
          alive: true,
          points: (rows - r) * 10
        });
      }
    }
  }

  function resetBall() {
    ball.stuck = true;
    ball.x = paddle.x + paddle.w / 2;
    ball.y = paddle.y - ball.r - 1;
    ball.vx = 0;
    ball.vy = 0;
  }

  function launchBall() {
    if (!ball.stuck) return;
    ball.stuck = false;
    var speed = ball.baseSpeed + (level - 1) * 0.6;
    var angle = (Math.random() * 0.5 - 0.25); // small horizontal nudge
    ball.vx = speed * Math.sin(angle) + (Math.random() < 0.5 ? 1.3 : -1.3);
    ball.vy = -Math.abs(speed);
  }

  function startGame() {
    score = 0;
    lives = 3;
    level = 1;
    paddle.x = (W - paddle.w) / 2;
    buildBricks();
    resetBall();
    setHud();
    state = STATE.PLAYING;
    overlay.dataset.state = "playing";
    canvas.focus();
  }

  function nextLevel() {
    level++;
    paddle.w = Math.max(64, paddle.w - 6); // gets harder
    buildBricks();
    resetBall();
    setHud();
    state = STATE.PLAYING;
    overlay.dataset.state = "playing";
  }

  function loseLife() {
    lives--;
    setHud();
    if (lives <= 0) {
      gameOver();
    } else {
      resetBall();
    }
  }

  function commitHiscore() {
    if (score > hiscore) {
      hiscore = score;
      try { localStorage.setItem("qu_brickbuster_hi", String(hiscore)); } catch (e) {}
    }
    setHud();
  }

  function gameOver() {
    state = STATE.OVER;
    commitHiscore();
    overlayTitle.textContent = "GAME OVER";
    overlaySub.innerHTML = "You scored <b style='color:#b6ff3d'>" + score +
      "</b>." + (score >= hiscore && score > 0 ? " New high score!" : " Beat it on a real cabinet.");
    startBtn.textContent = "PLAY AGAIN";
    overlay.dataset.state = "over";
  }

  function gameWon() {
    state = STATE.WON;
    commitHiscore();
    overlayTitle.textContent = "WAVE CLEAR";
    overlaySub.innerHTML = "Wave " + level + " down — score <b style='color:#b6ff3d'>" + score + "</b>.";
    startBtn.textContent = "NEXT WAVE";
    overlay.dataset.state = "won";
  }

  function togglePause() {
    if (state === STATE.PLAYING) {
      state = STATE.PAUSED;
      overlayTitle.textContent = "PAUSED";
      overlaySub.textContent = "Take a sip. Press P or Start to resume.";
      startBtn.textContent = "RESUME";
      overlay.dataset.state = "paused";
    } else if (state === STATE.PAUSED) {
      state = STATE.PLAYING;
      overlay.dataset.state = "playing";
    }
  }

  // primary action button / start key
  function primaryAction() {
    if (state === STATE.PLAYING) return;
    if (state === STATE.WON) { nextLevel(); return; }
    if (state === STATE.PAUSED) { togglePause(); return; }
    // START or OVER -> fresh game
    startGame();
  }

  // ---------------- update ----------------
  function update(dt) {
    if (state !== STATE.PLAYING) return;

    // paddle movement
    if (keys.left) paddle.x -= paddle.speed * dt;
    if (keys.right) paddle.x += paddle.speed * dt;
    paddle.x = Math.max(0, Math.min(W - paddle.w, paddle.x));

    if (ball.stuck) {
      ball.x = paddle.x + paddle.w / 2;
      ball.y = paddle.y - ball.r - 1;
      return;
    }

    ball.x += ball.vx * dt;
    ball.y += ball.vy * dt;

    // walls
    if (ball.x - ball.r < 0) { ball.x = ball.r; ball.vx = Math.abs(ball.vx); }
    if (ball.x + ball.r > W) { ball.x = W - ball.r; ball.vx = -Math.abs(ball.vx); }
    if (ball.y - ball.r < 0) { ball.y = ball.r; ball.vy = Math.abs(ball.vy); }

    // bottom — lose life
    if (ball.y - ball.r > H) { loseLife(); return; }

    // paddle collision
    if (ball.vy > 0 &&
        ball.y + ball.r >= paddle.y &&
        ball.y - ball.r <= paddle.y + paddle.h &&
        ball.x >= paddle.x - ball.r &&
        ball.x <= paddle.x + paddle.w + ball.r) {
      ball.y = paddle.y - ball.r;
      // reflect with angle based on where it hit the paddle
      var hit = (ball.x - (paddle.x + paddle.w / 2)) / (paddle.w / 2); // -1..1
      hit = Math.max(-1, Math.min(1, hit));
      var speed = Math.min(11, Math.hypot(ball.vx, ball.vy) + 0.06);
      var maxAngle = Math.PI / 3; // 60deg
      var angle = hit * maxAngle;
      ball.vx = speed * Math.sin(angle);
      ball.vy = -speed * Math.cos(angle);
    }

    // brick collisions
    for (var i = 0; i < bricks.length; i++) {
      var b = bricks[i];
      if (!b.alive) continue;
      if (ball.x + ball.r > b.x && ball.x - ball.r < b.x + b.w &&
          ball.y + ball.r > b.y && ball.y - ball.r < b.y + b.h) {
        // decide bounce axis by smallest overlap
        var overlapL = ball.x + ball.r - b.x;
        var overlapR = b.x + b.w - (ball.x - ball.r);
        var overlapT = ball.y + ball.r - b.y;
        var overlapB = b.y + b.h - (ball.y - ball.r);
        var minX = Math.min(overlapL, overlapR);
        var minY = Math.min(overlapT, overlapB);
        if (minX < minY) ball.vx = -ball.vx; else ball.vy = -ball.vy;

        b.hits--;
        if (b.hits <= 0) {
          b.alive = false;
          score += b.points;
        } else {
          score += 5;
        }
        setHud();
        break; // one brick per frame keeps physics sane
      }
    }

    // win check
    var remaining = 0;
    for (var j = 0; j < bricks.length; j++) if (bricks[j].alive) remaining++;
    if (remaining === 0) gameWon();
  }

  // ---------------- render ----------------
  function roundRect(x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  function render() {
    // background
    ctx.fillStyle = "#02000a";
    ctx.fillRect(0, 0, W, H);

    // faint grid
    ctx.strokeStyle = "rgba(155,92,255,0.07)";
    ctx.lineWidth = 1;
    for (var gx = 0; gx <= W; gx += 40) {
      ctx.beginPath(); ctx.moveTo(gx, 0); ctx.lineTo(gx, H); ctx.stroke();
    }
    for (var gy = 0; gy <= H; gy += 40) {
      ctx.beginPath(); ctx.moveTo(0, gy); ctx.lineTo(W, gy); ctx.stroke();
    }

    // bricks
    for (var i = 0; i < bricks.length; i++) {
      var b = bricks[i];
      if (!b.alive) continue;
      ctx.save();
      ctx.shadowColor = b.color;
      ctx.shadowBlur = b.hits > 1 ? 16 : 9;
      ctx.fillStyle = b.color;
      ctx.globalAlpha = b.hits > 1 ? 1 : 0.92;
      roundRect(b.x, b.y, b.w, b.h, 4);
      ctx.fill();
      ctx.restore();
    }

    // paddle
    ctx.save();
    ctx.shadowColor = "#21e6ff";
    ctx.shadowBlur = 14;
    ctx.fillStyle = "#21e6ff";
    roundRect(paddle.x, paddle.y, paddle.w, paddle.h, 6);
    ctx.fill();
    ctx.restore();

    // ball
    ctx.save();
    ctx.shadowColor = "#ffffff";
    ctx.shadowBlur = 14;
    ctx.fillStyle = "#fff7fc";
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // "launch" hint
    if (ball.stuck && state === STATE.PLAYING) {
      ctx.fillStyle = "rgba(244,236,255,0.75)";
      ctx.font = "12px 'Space Grotesk', sans-serif";
      ctx.textAlign = "center";
      ctx.fillText("PRESS SPACE / TAP TO LAUNCH", W / 2, paddle.y - 28);
    }
  }

  // ---------------- loop ----------------
  function loop(t) {
    if (!lastTime) lastTime = t;
    // dt normalized so 60fps -> 1.0
    var dt = Math.min((t - lastTime) / 16.667, 2.4);
    lastTime = t;
    update(dt);
    render();
    requestAnimationFrame(loop);
  }
  requestAnimationFrame(loop);

  // ---------------- input ----------------
  document.addEventListener("keydown", function (e) {
    var k = e.key.toLowerCase();
    if (k === "arrowleft" || k === "a") { keys.left = true; e.preventDefault(); }
    else if (k === "arrowright" || k === "d") { keys.right = true; e.preventDefault(); }
    else if (k === " " || k === "spacebar" || k === "enter") {
      if (state === STATE.PLAYING) { launchBall(); e.preventDefault(); }
      else { primaryAction(); e.preventDefault(); }
    }
    else if (k === "p") { togglePause(); }
  });
  document.addEventListener("keyup", function (e) {
    var k = e.key.toLowerCase();
    if (k === "arrowleft" || k === "a") keys.left = false;
    else if (k === "arrowright" || k === "d") keys.right = false;
  });

  function moveToClientX(clientX) {
    var rect = canvas.getBoundingClientRect();
    var rel = (clientX - rect.left) / rect.width; // 0..1
    paddle.x = Math.max(0, Math.min(W - paddle.w, rel * W - paddle.w / 2));
  }

  canvas.addEventListener("mousemove", function (e) {
    if (state === STATE.PLAYING) moveToClientX(e.clientX);
  });
  canvas.addEventListener("click", function () {
    if (state === STATE.PLAYING && ball.stuck) launchBall();
  });

  canvas.addEventListener("touchstart", function (e) {
    if (state === STATE.PLAYING) {
      moveToClientX(e.touches[0].clientX);
      if (ball.stuck) launchBall();
      e.preventDefault();
    }
  }, { passive: false });
  canvas.addEventListener("touchmove", function (e) {
    if (state === STATE.PLAYING) { moveToClientX(e.touches[0].clientX); e.preventDefault(); }
  }, { passive: false });

  startBtn.addEventListener("click", function () {
    primaryAction();
  });

  // make canvas focusable for keyboard
  canvas.setAttribute("tabindex", "0");

  setHud();
})();
