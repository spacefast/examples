/* Driftfield — application layer.
 * Wires the flow-field engine to a live canvas, a control panel, seed sharing,
 * and PNG export. No build step, no dependencies. */

(function () {
  "use strict";

  const DF = window.Driftfield;
  const TAU = Math.PI * 2;
  const STORAGE_KEY = "driftfield:v1";

  // ---- Palettes -------------------------------------------------------------
  // Mid-saturation tones chosen to read on both luminous and paper backdrops.
  const PALETTES = {
    sunset: { name: "Sunset", colors: ["#ff5e3a", "#ff9e2c", "#ffd166", "#ff4d6d", "#c44ad0"] },
    ocean: { name: "Ocean", colors: ["#2dd4bf", "#38bdf8", "#6366f1", "#0ea5e9", "#22d3ee"] },
    mono: { name: "Ink mono", colors: ["#8a8a93", "#b4b4be", "#6b6b75", "#d0d0d8", "#5a5a63"] },
    pastel: { name: "Pastel", colors: ["#ffadad", "#ffd6a5", "#caffbf", "#9bf6ff", "#bdb2ff"] },
    ember: { name: "Ember", colors: ["#ff3b30", "#ff7a18", "#ffb547", "#e23b3b", "#d62828"] },
    aurora: { name: "Aurora", colors: ["#34d399", "#22d3ee", "#818cf8", "#4ade80", "#c084fc"] },
  };
  const PALETTE_ORDER = ["sunset", "ocean", "mono", "pastel", "ember", "aurora"];

  const BACKDROPS = {
    ink: { type: "solid", color: "#0d0c14", blend: "lighter", alpha: 0.045 },
    paper: { type: "solid", color: "#f2ebdd", blend: "multiply", alpha: 0.06 },
    dusk: { type: "gradient", stops: ["#221b3a", "#3a2b52", "#1a1530"], blend: "lighter", alpha: 0.04 },
  };

  // ---- State ----------------------------------------------------------------
  const state = {
    palette: "sunset",
    backdrop: "ink",
    density: 900,
    speed: 1,
    weight: 1.4,
    scale: 0.0026,
    evolve: true,
    seed: null,
  };

  let canvas, ctx, W = 0, H = 0, DPR = 1;
  let noise2 = null;
  let rgbColors = [];
  let particles = [];
  let z = 0; // field evolution offset
  let running = true;
  let rafId = null;

  // ---- Helpers --------------------------------------------------------------
  function hexToRgb(hex) {
    const h = hex.replace("#", "");
    return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
  }

  function toast(msg, ms) {
    const el = document.getElementById("toast");
    el.innerHTML = msg;
    el.classList.add("show");
    clearTimeout(toast._t);
    toast._t = setTimeout(() => el.classList.remove("show"), ms || 2600);
  }

  function save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) { /* private mode — ignore */ }
  }

  function restore() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) Object.assign(state, JSON.parse(raw));
    } catch (e) { /* ignore */ }
  }

  // ---- Canvas + field setup -------------------------------------------------
  function sizeCanvas() {
    DPR = Math.min(window.devicePixelRatio || 1, 2);
    W = window.innerWidth;
    H = window.innerHeight;
    canvas.width = Math.floor(W * DPR);
    canvas.height = Math.floor(H * DPR);
    canvas.style.width = W + "px";
    canvas.style.height = H + "px";
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
  }

  function fillBackground() {
    const bd = BACKDROPS[state.backdrop];
    ctx.save();
    ctx.globalCompositeOperation = "source-over";
    ctx.globalAlpha = 1;
    if (bd.type === "gradient") {
      const g = ctx.createLinearGradient(0, 0, W * 0.4, H);
      g.addColorStop(0, bd.stops[0]);
      g.addColorStop(0.55, bd.stops[1]);
      g.addColorStop(1, bd.stops[2]);
      ctx.fillStyle = g;
    } else {
      ctx.fillStyle = bd.color;
    }
    ctx.fillRect(0, 0, W, H);
    ctx.restore();
  }

  function buildField() {
    const rng = DF.mulberry32(state.seed);
    noise2 = DF.makeNoise(rng);
    z = 0;
  }

  function applyPalette() {
    rgbColors = PALETTES[state.palette].colors.map(hexToRgb);
  }

  function spawn(p) {
    p.x = Math.random() * W;
    p.y = Math.random() * H;
    p.px = p.x;
    p.py = p.y;
    p.age = 0;
    p.maxAge = 40 + Math.random() * 180;
    p.rgb = rgbColors[(Math.random() * rgbColors.length) | 0];
  }

  function buildParticles() {
    particles = new Array(state.density);
    for (let i = 0; i < state.density; i++) {
      particles[i] = {};
      spawn(particles[i]);
    }
  }

  function resizeParticles() {
    if (particles.length === state.density) return;
    if (particles.length < state.density) {
      while (particles.length < state.density) {
        const p = {};
        spawn(p);
        particles.push(p);
      }
    } else {
      particles.length = state.density;
    }
  }

  // ---- Render loop ----------------------------------------------------------
  function step() {
    rafId = requestAnimationFrame(step);
    if (!running) return;

    const bd = BACKDROPS[state.backdrop];
    const sp = state.speed;
    const sc = state.scale;
    const zx = z * 0.6;
    const zy = z * 0.6;
    const moveLen = 1.6 * sp;

    ctx.globalCompositeOperation = bd.blend;
    ctx.lineWidth = state.weight;
    ctx.globalAlpha = bd.alpha;

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];
      // angle from the noise field; multiple turns enrich the swirl
      const n = noise2(p.x * sc + zx, p.y * sc + zy);
      const angle = n * TAU * 2;
      p.px = p.x;
      p.py = p.y;
      p.x += Math.cos(angle) * moveLen;
      p.y += Math.sin(angle) * moveLen;

      ctx.strokeStyle = "rgb(" + p.rgb[0] + "," + p.rgb[1] + "," + p.rgb[2] + ")";
      ctx.beginPath();
      ctx.moveTo(p.px, p.py);
      ctx.lineTo(p.x, p.y);
      ctx.stroke();

      p.age++;
      if (
        p.age > p.maxAge ||
        p.x < -20 || p.x > W + 20 ||
        p.y < -20 || p.y > H + 20
      ) {
        spawn(p);
      }
    }

    if (state.evolve) z += 0.0009 * sp;
  }

  // ---- Lifecycle actions ----------------------------------------------------
  function reseed(newSeed) {
    state.seed = (newSeed != null) ? (newSeed >>> 0) : DF.randomSeed();
    buildField();
    fillBackground();
    buildParticles();
    updateSeedReadout();
    save();
  }

  function clearInk() {
    fillBackground();
    buildParticles();
  }

  function setRunning(on) {
    running = on;
    document.getElementById("playpause").classList.toggle("paused", !on);
    document.getElementById("playpause").setAttribute("aria-pressed", String(!on));
    document.getElementById("seedpill").classList.toggle("paused", !on);
    document.getElementById("dock-playpause").textContent = on ? "❚❚" : "▶";
  }

  function updateSeedReadout() {
    const s = DF.seedToString(state.seed);
    document.getElementById("seedReadout").textContent = s;
    try {
      history.replaceState(null, "", "#" + s);
    } catch (e) { /* ignore */ }
  }

  function exportPNG() {
    const s = DF.seedToString(state.seed);
    try {
      const url = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      a.href = url;
      a.download = "driftfield-" + s + ".png";
      document.body.appendChild(a);
      a.click();
      a.remove();
      toast("Saved <strong>driftfield-" + s + ".png</strong> — seed travels in the filename.");
    } catch (e) {
      toast("Couldn't export here, but your seed is <strong>" + s + "</strong>.");
    }
  }

  // ---- UI wiring ------------------------------------------------------------
  function buildPaletteSwatches() {
    const wrap = document.getElementById("palettes");
    wrap.innerHTML = "";
    PALETTE_ORDER.forEach((key) => {
      const pal = PALETTES[key];
      const btn = document.createElement("button");
      btn.className = "swatch";
      btn.type = "button";
      btn.setAttribute("role", "radio");
      btn.setAttribute("aria-checked", String(key === state.palette));
      btn.dataset.palette = key;
      const grad = "linear-gradient(90deg," + pal.colors.join(",") + ")";
      btn.innerHTML = '<span class="bar" style="background:' + grad + '"></span><span class="nm">' + pal.name + "</span>";
      btn.addEventListener("click", () => {
        state.palette = key;
        applyPalette();
        wrap.querySelectorAll(".swatch").forEach((s) =>
          s.setAttribute("aria-checked", String(s.dataset.palette === key))
        );
        save();
      });
      wrap.appendChild(btn);
    });
  }

  function setFill(input) {
    const min = parseFloat(input.min);
    const max = parseFloat(input.max);
    const pct = ((parseFloat(input.value) - min) / (max - min)) * 100;
    input.style.setProperty("--fill", pct + "%");
  }

  function scaleLabel(v) {
    if (v < 0.0016) return "broad";
    if (v < 0.0034) return "balanced";
    return "fine";
  }

  function wireControls() {
    // Backdrops
    const bdWrap = document.getElementById("backdrops");
    bdWrap.querySelectorAll("button").forEach((b) => {
      b.setAttribute("aria-checked", String(b.dataset.bg === state.backdrop));
      b.addEventListener("click", () => {
        state.backdrop = b.dataset.bg;
        bdWrap.querySelectorAll("button").forEach((x) =>
          x.setAttribute("aria-checked", String(x.dataset.bg === state.backdrop))
        );
        clearInk(); // backdrop change restarts the canvas on a fresh ground
        save();
      });
    });

    // Sliders
    const density = document.getElementById("density");
    const speed = document.getElementById("speed");
    const weight = document.getElementById("weight");
    const scale = document.getElementById("scale");

    density.value = state.density;
    speed.value = state.speed;
    weight.value = state.weight;
    scale.value = state.scale;

    [density, speed, weight, scale].forEach(setFill);

    document.getElementById("densityVal").textContent = state.density;
    document.getElementById("speedVal").textContent = state.speed.toFixed(1) + "×";
    document.getElementById("weightVal").textContent = state.weight.toFixed(1) + "px";
    document.getElementById("scaleVal").textContent = scaleLabel(state.scale);

    density.addEventListener("input", () => {
      state.density = parseInt(density.value, 10);
      document.getElementById("densityVal").textContent = state.density;
      setFill(density);
      resizeParticles();
      save();
    });
    speed.addEventListener("input", () => {
      state.speed = parseFloat(speed.value);
      document.getElementById("speedVal").textContent = state.speed.toFixed(1) + "×";
      setFill(speed);
      save();
    });
    weight.addEventListener("input", () => {
      state.weight = parseFloat(weight.value);
      document.getElementById("weightVal").textContent = state.weight.toFixed(1) + "px";
      setFill(weight);
      save();
    });
    scale.addEventListener("input", () => {
      state.scale = parseFloat(scale.value);
      document.getElementById("scaleVal").textContent = scaleLabel(state.scale);
      setFill(scale);
      save();
    });

    // Evolve switch
    const evolve = document.getElementById("evolve");
    evolve.checked = state.evolve;
    evolve.addEventListener("change", () => {
      state.evolve = evolve.checked;
      save();
    });

    // Action buttons
    document.getElementById("reseed").addEventListener("click", () => { reseed(); toast("New field seeded — <strong>" + DF.seedToString(state.seed) + "</strong>."); });
    document.getElementById("clear").addEventListener("click", clearInk);
    document.getElementById("export").addEventListener("click", exportPNG);
    document.getElementById("playpause").addEventListener("click", () => setRunning(!running));

    // Dock (mobile)
    document.getElementById("dock-reseed").addEventListener("click", () => reseed());
    document.getElementById("dock-playpause").addEventListener("click", () => setRunning(!running));
    document.getElementById("dock-export").addEventListener("click", exportPNG);

    // Seed form
    document.getElementById("seedForm").addEventListener("submit", (e) => {
      e.preventDefault();
      const val = document.getElementById("seedInput").value;
      const seed = DF.stringToSeed(val);
      if (seed == null) {
        toast("That doesn't look like a seed. Try something like <strong>DF-7K3Q09</strong>.");
        return;
      }
      reseed(seed);
      document.getElementById("seedInput").value = "";
      toast("Loaded seed <strong>" + DF.seedToString(seed) + "</strong>.");
    });

    // Panel toggle
    document.getElementById("toggle-panel").addEventListener("click", () => {
      const hidden = document.body.classList.toggle("panel-hidden");
      document.getElementById("toggle-panel").setAttribute("aria-expanded", String(!hidden));
    });

    // Keyboard shortcuts
    window.addEventListener("keydown", (e) => {
      const tag = (e.target.tagName || "").toLowerCase();
      if (tag === "input" || tag === "textarea") return;
      if (e.key === " ") { e.preventDefault(); setRunning(!running); }
      else if (e.key.toLowerCase() === "r") reseed();
      else if (e.key.toLowerCase() === "s") exportPNG();
      else if (e.key.toLowerCase() === "c") clearInk();
    });
  }

  // ---- Resize ---------------------------------------------------------------
  let resizeTimer = null;
  function onResize() {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      sizeCanvas();
      fillBackground();
      buildParticles();
    }, 180);
  }

  // ---- Boot -----------------------------------------------------------------
  function init() {
    canvas = document.getElementById("stage");
    ctx = canvas.getContext("2d", { alpha: false });

    restore();

    // A seed in the URL hash wins — shareable links reproduce a piece exactly.
    const fromHash = DF.stringToSeed(location.hash.replace("#", ""));
    if (fromHash != null) state.seed = fromHash;
    if (state.seed == null) state.seed = DF.randomSeed();

    buildPaletteSwatches();
    wireControls();
    applyPalette();

    sizeCanvas();
    buildField();
    fillBackground();
    buildParticles();
    updateSeedReadout();
    setRunning(true);

    window.addEventListener("resize", onResize);
    document.getElementById("seedpill").addEventListener("click", () => {
      const s = DF.seedToString(state.seed);
      const link = location.origin + location.pathname + "#" + s;
      if (navigator.clipboard) {
        navigator.clipboard.writeText(link).then(
          () => toast("Copied a shareable link for <strong>" + s + "</strong>."),
          () => toast("Seed <strong>" + s + "</strong>")
        );
      } else {
        toast("Seed <strong>" + s + "</strong>");
      }
    });

    step();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
