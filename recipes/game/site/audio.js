/* ============================================================
   Prism Breaker — tiny WebAudio synth (no asset files)
   Exposes window.PrismAudio with { play, setMuted, resume }.
   ============================================================ */
(function () {
  "use strict";

  let ctx = null;
  let master = null;
  let muted = false;

  function ensure() {
    if (ctx) return ctx;
    const AC = window.AudioContext || window.webkitAudioContext;
    if (!AC) return null;
    ctx = new AC();
    master = ctx.createGain();
    master.gain.value = 0.35;
    master.connect(ctx.destination);
    return ctx;
  }

  function tone(opts) {
    if (muted) return;
    const c = ensure();
    if (!c) return;
    if (c.state === "suspended") c.resume();

    const t0 = c.currentTime;
    const osc = c.createOscillator();
    const gain = c.createGain();
    osc.type = opts.type || "square";
    osc.frequency.setValueAtTime(opts.freq, t0);
    if (opts.toFreq) {
      osc.frequency.exponentialRampToValueAtTime(
        Math.max(1, opts.toFreq),
        t0 + (opts.dur || 0.1)
      );
    }
    const peak = opts.gain == null ? 0.5 : opts.gain;
    gain.gain.setValueAtTime(0.0001, t0);
    gain.gain.exponentialRampToValueAtTime(peak, t0 + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.0001, t0 + (opts.dur || 0.1));
    osc.connect(gain);
    gain.connect(master);
    osc.start(t0);
    osc.stop(t0 + (opts.dur || 0.1) + 0.02);
  }

  const SOUNDS = {
    paddle: () => tone({ type: "square", freq: 220, toFreq: 320, dur: 0.06, gain: 0.4 }),
    wall:   () => tone({ type: "triangle", freq: 180, dur: 0.04, gain: 0.25 }),
    brick:  () => tone({ type: "square", freq: 440, toFreq: 660, dur: 0.07, gain: 0.35 }),
    crack:  () => tone({ type: "triangle", freq: 300, dur: 0.05, gain: 0.3 }),
    power:  () => { tone({ type: "sine", freq: 520, toFreq: 880, dur: 0.14, gain: 0.4 });
                    setTimeout(() => tone({ type: "sine", freq: 880, toFreq: 1180, dur: 0.12, gain: 0.3 }), 70); },
    laser:  () => tone({ type: "sawtooth", freq: 900, toFreq: 200, dur: 0.12, gain: 0.25 }),
    lose:   () => tone({ type: "sawtooth", freq: 280, toFreq: 70, dur: 0.4, gain: 0.4 }),
    levelup:() => { [523, 659, 784, 1047].forEach((f, i) =>
                    setTimeout(() => tone({ type: "square", freq: f, dur: 0.12, gain: 0.35 }), i * 90)); },
    gameover:() => { [392, 330, 262, 196].forEach((f, i) =>
                    setTimeout(() => tone({ type: "sawtooth", freq: f, dur: 0.22, gain: 0.4 }), i * 140)); },
    launch: () => tone({ type: "square", freq: 330, toFreq: 520, dur: 0.1, gain: 0.35 }),
  };

  window.PrismAudio = {
    play(name) { const fn = SOUNDS[name]; if (fn) fn(); },
    setMuted(v) { muted = !!v; },
    isMuted() { return muted; },
    resume() { const c = ensure(); if (c && c.state === "suspended") c.resume(); },
  };
})();
