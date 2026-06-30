/* Driftfield — noise + flow-field engine.
 * Zero dependencies. Implements a seedable PRNG (mulberry32) and Ken Perlin's
 * improved gradient noise, with the permutation table shuffled by the seed so
 * that the same seed always reproduces the same field. */

(function (global) {
  "use strict";

  // --- Seedable PRNG ---------------------------------------------------------
  function mulberry32(a) {
    return function () {
      a |= 0;
      a = (a + 0x6d2b79f5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  // --- Improved Perlin noise (2D) -------------------------------------------
  function fade(t) {
    return t * t * t * (t * (t * 6 - 15) + 10);
  }
  function lerp(a, b, t) {
    return a + t * (b - a);
  }
  function grad(hash, x, y) {
    // 8 gradient directions
    switch (hash & 7) {
      case 0: return x + y;
      case 1: return x - y;
      case 2: return -x + y;
      case 3: return -x - y;
      case 4: return x;
      case 5: return -x;
      case 6: return y;
      default: return -y;
    }
  }

  function makeNoise(rng) {
    const p = new Uint8Array(512);
    const perm = new Uint8Array(256);
    for (let i = 0; i < 256; i++) perm[i] = i;
    // Fisher–Yates shuffle driven by the seeded rng
    for (let i = 255; i > 0; i--) {
      const j = Math.floor(rng() * (i + 1));
      const tmp = perm[i];
      perm[i] = perm[j];
      perm[j] = tmp;
    }
    for (let i = 0; i < 512; i++) p[i] = perm[i & 255];

    return function noise2(x, y) {
      const X = Math.floor(x) & 255;
      const Y = Math.floor(y) & 255;
      x -= Math.floor(x);
      y -= Math.floor(y);
      const u = fade(x);
      const v = fade(y);
      const aa = p[p[X] + Y];
      const ab = p[p[X] + Y + 1];
      const ba = p[p[X + 1] + Y];
      const bb = p[p[X + 1] + Y + 1];
      const x1 = lerp(grad(aa, x, y), grad(ba, x - 1, y), u);
      const x2 = lerp(grad(ab, x, y - 1), grad(bb, x - 1, y - 1), u);
      return lerp(x1, x2, v); // ~[-1, 1]
    };
  }

  // --- Seed string helpers ---------------------------------------------------
  function seedToString(seed) {
    const base = (seed >>> 0).toString(36).toUpperCase().padStart(6, "0");
    return "DF-" + base;
  }
  function stringToSeed(str) {
    if (!str) return null;
    const cleaned = String(str).trim().toUpperCase().replace(/^DF[-\s]*/i, "");
    if (!/^[0-9A-Z]+$/.test(cleaned)) return null;
    const n = parseInt(cleaned, 36);
    return Number.isFinite(n) ? n >>> 0 : null;
  }
  function randomSeed() {
    return (Math.floor(Math.random() * 0xffffffff) >>> 0);
  }

  global.Driftfield = {
    mulberry32: mulberry32,
    makeNoise: makeNoise,
    seedToString: seedToString,
    stringToSeed: stringToSeed,
    randomSeed: randomSeed,
  };
})(window);
