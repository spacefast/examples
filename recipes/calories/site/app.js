/* Plateful — a browser-only macro tracker for Maya's high-protein plan.
   Everything lives in localStorage. No backend, no build step. */

(() => {
  "use strict";

  const STORE_KEY = "plateful.v1";
  const MEALS = ["Breakfast", "Lunch", "Dinner", "Snacks"];
  const MEAL_ICONS = { Breakfast: "🥣", Lunch: "🥗", Dinner: "🍲", Snacks: "🍎" };
  const MEAL_TINT = {
    Breakfast: "rgba(245,196,81,.18)",
    Lunch: "rgba(163,230,53,.16)",
    Dinner: "rgba(110,168,254,.16)",
    Snacks: "rgba(255,122,89,.16)",
  };

  const RING_CIRCUM = 2 * Math.PI * 86; // r=86

  // ---- date helpers -------------------------------------------------------
  const dayKey = (d) => {
    const z = new Date(d);
    z.setHours(0, 0, 0, 0);
    return z.getFullYear() + "-" + String(z.getMonth() + 1).padStart(2, "0") + "-" + String(z.getDate()).padStart(2, "0");
  };
  const todayKey = () => dayKey(new Date());
  const addDays = (key, n) => {
    const [y, m, d] = key.split("-").map(Number);
    const z = new Date(y, m - 1, d + n);
    return dayKey(z);
  };
  const fmtLabel = (key) => {
    if (key === todayKey()) return "Today";
    if (key === addDays(todayKey(), -1)) return "Yesterday";
    if (key === addDays(todayKey(), 1)) return "Tomorrow";
    const [y, m, d] = key.split("-").map(Number);
    return new Date(y, m - 1, d).toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric" });
  };

  // ---- seed (Maya Okafor, high-protein) -----------------------------------
  const FAVORITES_SEED = [
    { name: "Greek yogurt + berries", emoji: "🥣", calories: 210, protein: 22, carbs: 20, fat: 4 },
    { name: "Grilled chicken & rice bowl", emoji: "🍗", calories: 540, protein: 48, carbs: 55, fat: 12 },
    { name: "Two-egg veggie scramble", emoji: "🍳", calories: 280, protein: 20, carbs: 6, fat: 19 },
    { name: "Protein shake (whey + milk)", emoji: "🥤", calories: 230, protein: 35, carbs: 9, fat: 4 },
    { name: "Salmon, quinoa & greens", emoji: "🐟", calories: 480, protein: 38, carbs: 34, fat: 21 },
    { name: "Cottage cheese & almonds", emoji: "🥄", calories: 240, protein: 26, carbs: 9, fat: 12 },
  ];

  const newId = () => Math.random().toString(36).slice(2, 9);

  function seedState() {
    const t = todayKey();
    const mk = (name, meal, cal, p, c, f) => ({ id: newId(), name, meal, calories: cal, protein: p, carbs: c, fat: f });
    const days = {};

    // Today: a partly-logged day so the rings look alive
    days[t] = {
      entries: [
        mk("Greek yogurt + berries", "Breakfast", 210, 22, 20, 4),
        mk("Black coffee", "Breakfast", 5, 0, 1, 0),
        mk("Grilled chicken & rice bowl", "Lunch", 540, 48, 55, 12),
        mk("Cottage cheese & almonds", "Snacks", 240, 26, 9, 12),
      ],
    };
    // Yesterday: a full, on-target day
    days[addDays(t, -1)] = {
      entries: [
        mk("Two-egg veggie scramble", "Breakfast", 280, 20, 6, 19),
        mk("Protein shake (whey + milk)", "Breakfast", 230, 35, 9, 4),
        mk("Turkey & avocado wrap", "Lunch", 520, 36, 44, 22),
        mk("Apple", "Snacks", 95, 0, 25, 0),
        mk("Salmon, quinoa & greens", "Dinner", 480, 38, 34, 21),
        mk("Dark chocolate square", "Snacks", 60, 1, 6, 4),
      ],
    };
    // Fill the previous 5 days with believable totals
    const past = [
      [1980, 152], [2120, 168], [1740, 121], [2050, 160], [1890, 140],
    ];
    past.forEach((tot, i) => {
      const key = addDays(t, -(i + 2));
      days[key] = {
        entries: [
          mk("Logged meals", "Breakfast", Math.round(tot[0] * 0.3), Math.round(tot[1] * 0.32), Math.round(tot[0] * 0.3 / 8), Math.round(tot[0] * 0.3 / 22)),
          mk("Logged meals", "Lunch", Math.round(tot[0] * 0.35), Math.round(tot[1] * 0.34), Math.round(tot[0] * 0.35 / 8), Math.round(tot[0] * 0.35 / 22)),
          mk("Logged meals", "Dinner", Math.round(tot[0] * 0.35), Math.round(tot[1] * 0.34), Math.round(tot[0] * 0.35 / 8), Math.round(tot[0] * 0.35 / 22)),
        ],
      };
    });

    return {
      owner: "Maya",
      style: "High-protein",
      goals: { calGoal: 2000, proGoal: 160, carbGoal: 180, fatGoal: 60 },
      favorites: FAVORITES_SEED.map((f) => ({ ...f, id: newId() })),
      days,
    };
  }

  // ---- persistence --------------------------------------------------------
  function load() {
    try {
      const raw = localStorage.getItem(STORE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) { /* ignore corrupt store */ }
    const s = seedState();
    try { localStorage.setItem(STORE_KEY, JSON.stringify(s)); } catch (e) { /* quota */ }
    return s;
  }
  function save(s) {
    state = s || state;
    try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) { /* quota */ }
  }

  let state = load();
  let current = todayKey();

  const dayOf = (key) => (state.days[key] = state.days[key] || { entries: [] });
  const round = (n) => Math.round(n);

  function totalsFor(key) {
    const d = state.days[key];
    const t = { calories: 0, protein: 0, carbs: 0, fat: 0 };
    if (!d) return t;
    for (const e of d.entries) {
      t.calories += e.calories || 0;
      t.protein += e.protein || 0;
      t.carbs += e.carbs || 0;
      t.fat += e.fat || 0;
    }
    return t;
  }

  // ---- DOM refs -----------------------------------------------------------
  const $ = (id) => document.getElementById(id);
  const dateLabel = $("dateLabel");
  const datePicker = $("datePicker");
  const mealsEl = $("meals");
  const favListEl = $("favList");
  const toastEl = $("toast");

  // ---- toast --------------------------------------------------------------
  let toastTimer;
  function toast(html) {
    toastEl.innerHTML = html;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("show"), 2200);
  }

  // ---- render dashboard ---------------------------------------------------
  function renderDashboard() {
    const t = totalsFor(current);
    const g = state.goals;

    // calorie ring
    const eaten = round(t.calories);
    const remaining = g.calGoal - eaten;
    $("calEaten").textContent = eaten.toLocaleString();
    $("calBurned").textContent = "0";
    $("calGoalLegend").textContent = g.calGoal.toLocaleString();
    $("calRemaining").textContent = Math.abs(remaining).toLocaleString();
    $("calRemLabel").textContent = remaining >= 0 ? "remaining" : "over";

    const pct = g.calGoal > 0 ? Math.min(eaten / g.calGoal, 1) : 0;
    const ring = $("calRing");
    ring.style.strokeDasharray = RING_CIRCUM.toFixed(2);
    ring.style.strokeDashoffset = (RING_CIRCUM * (1 - pct)).toFixed(2);
    ring.style.stroke = remaining < 0 ? "#ff5470" : "var(--accent)";

    // macros
    setMacro("protein", t.protein, g.proGoal);
    setMacro("carbs", t.carbs, g.carbGoal);
    setMacro("fat", t.fat, g.fatGoal);
    $("macroNote").textContent = `${state.style} plan · ${g.proGoal}g protein target`;
  }

  function setMacro(key, val, goal) {
    val = round(val);
    $(key + "Val").textContent = `${val} / ${goal} g`;
    const fill = $(key + "Bar");
    const pct = goal > 0 ? (val / goal) * 100 : 0;
    fill.style.width = Math.min(pct, 100) + "%";
    fill.classList.toggle("over", pct > 105);
  }

  // ---- render diary -------------------------------------------------------
  function renderDiary() {
    const d = dayOf(current);
    mealsEl.innerHTML = "";
    for (const meal of MEALS) {
      const entries = d.entries.filter((e) => e.meal === meal);
      const cals = round(entries.reduce((s, e) => s + (e.calories || 0), 0));

      const section = document.createElement("section");
      section.className = "meal";
      section.innerHTML = `
        <div class="meal__head">
          <span class="meal__icon" style="background:${MEAL_TINT[meal]}">${MEAL_ICONS[meal]}</span>
          <span class="meal__name">${meal}</span>
          <span class="meal__cals">${cals.toLocaleString()} cal</span>
          <button class="meal__add" type="button" aria-label="Add to ${meal}" data-meal="${meal}">+</button>
        </div>
        <ul class="meal__list"></ul>`;

      const ul = section.querySelector(".meal__list");
      if (!entries.length) {
        const li = document.createElement("li");
        li.className = "meal__empty";
        li.textContent = "Nothing logged yet.";
        ul.appendChild(li);
      } else {
        for (const e of entries) ul.appendChild(entryEl(e));
      }
      section.querySelector(".meal__add").addEventListener("click", () => openAdd(meal));
      mealsEl.appendChild(section);
    }
  }

  function entryEl(e) {
    const li = document.createElement("li");
    li.className = "entry";
    li.innerHTML = `
      <div class="entry__main">
        <span class="entry__name">${escapeHtml(e.name)}</span>
        <span class="entry__macros"><b class="dot">${round(e.protein)}P</b> · ${round(e.carbs)}C · ${round(e.fat)}F</span>
      </div>
      <span class="entry__cals">${round(e.calories)}</span>
      <button class="entry__del" type="button" aria-label="Remove ${escapeHtml(e.name)}">🗑</button>`;
    li.querySelector(".entry__del").addEventListener("click", () => removeEntry(e.id));
    return li;
  }

  function removeEntry(id) {
    const d = dayOf(current);
    const idx = d.entries.findIndex((e) => e.id === id);
    if (idx === -1) return;
    const [removed] = d.entries.splice(idx, 1);
    save();
    renderAll();
    toast(`Removed <b>${escapeHtml(removed.name)}</b>`);
  }

  // ---- favorites ----------------------------------------------------------
  function renderFavorites() {
    favListEl.innerHTML = "";
    const opts = $("favOptions");
    opts.innerHTML = "";
    for (const f of state.favorites) {
      const li = document.createElement("li");
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "fav";
      btn.innerHTML = `
        <span class="fav__emoji" aria-hidden="true">${f.emoji || "🍽"}</span>
        <span class="fav__body">
          <span class="fav__name">${escapeHtml(f.name)}</span>
          <span class="fav__meta">${f.calories} cal · ${f.protein}P ${f.carbs}C ${f.fat}F</span>
        </span>
        <span class="fav__add" aria-hidden="true">+</span>`;
      btn.setAttribute("aria-label", `Quick add ${f.name} to ${guessMeal()}`);
      btn.addEventListener("click", () => quickAdd(f));
      li.appendChild(btn);
      favListEl.appendChild(li);

      const opt = document.createElement("option");
      opt.value = f.name;
      opts.appendChild(opt);
    }
  }

  // pick a meal based on time of day for one-tap quick add
  function guessMeal() {
    const h = new Date().getHours();
    if (h < 11) return "Breakfast";
    if (h < 15) return "Lunch";
    if (h < 21) return "Dinner";
    return "Snacks";
  }

  function quickAdd(f) {
    const meal = guessMeal();
    dayOf(current).entries.push({
      id: newId(), name: f.name, meal,
      calories: f.calories, protein: f.protein, carbs: f.carbs, fat: f.fat,
    });
    save();
    renderAll();
    toast(`Added <b>${escapeHtml(f.name)}</b> to ${meal}`);
  }

  // ---- week chart ---------------------------------------------------------
  function renderWeek() {
    const chart = $("weekChart");
    chart.innerHTML = "";
    const keys = [];
    for (let i = 6; i >= 0; i--) keys.push(addDays(todayKey(), -i));
    const goal = state.goals.calGoal || 2000;
    const totals = keys.map((k) => round(totalsFor(k).calories));
    const max = Math.max(goal, ...totals, 1);

    let sumCal = 0, sumPro = 0, daysWithData = 0;
    keys.forEach((k, i) => {
      const cal = totals[i];
      const t = totalsFor(k);
      if (cal > 0) { sumCal += cal; sumPro += t.protein; daysWithData++; }
      const onTarget = cal > 0 && Math.abs(cal - goal) <= goal * 0.1;
      const isToday = k === todayKey();
      const h = Math.max((cal / max) * 100, cal > 0 ? 6 : 2);

      const day = document.createElement("div");
      day.className = "week__day" + (isToday ? " today" : "");
      const labDate = new Date(...k.split("-").map((n, idx) => idx === 1 ? Number(n) - 1 : Number(n)));
      day.innerHTML = `
        <div class="week__barwrap"><div class="week__bar ${isToday ? "is-today" : onTarget ? "on-target" : ""}" style="height:${h}%" title="${cal.toLocaleString()} cal"></div></div>
        <span class="week__lab">${labDate.toLocaleDateString(undefined, { weekday: "narrow" })}</span>`;
      chart.appendChild(day);
    });

    const avgCal = daysWithData ? round(sumCal / daysWithData) : 0;
    const avgPro = daysWithData ? round(sumPro / daysWithData) : 0;
    $("weekAvgPill").textContent = daysWithData ? `avg ${avgCal.toLocaleString()} cal` : "no data yet";

    $("weekStats").innerHTML = `
      <div><dt>Avg calories</dt><dd>${avgCal.toLocaleString()}</dd></div>
      <div><dt>Avg protein</dt><dd>${avgPro}g</dd></div>
      <div><dt>Days logged</dt><dd>${daysWithData}/7</dd></div>`;
  }

  // ---- render-all + date --------------------------------------------------
  function renderAll() {
    renderDashboard();
    renderDiary();
    renderFavorites();
    renderWeek();
  }

  function setDate(key) {
    current = key;
    dateLabel.textContent = fmtLabel(key);
    datePicker.value = key;
    renderAll();
  }

  // ---- add-food dialog ----------------------------------------------------
  const addSheet = $("addSheet");
  const addForm = $("addForm");
  const servRange = $("fServ");
  const servOut = $("servOut");

  function openAdd(presetMeal) {
    addForm.reset();
    servOut.textContent = "1×";
    if (presetMeal) {
      const r = addForm.querySelector(`input[name="meal"][value="${presetMeal}"]`);
      if (r) r.checked = true;
    } else {
      const r = addForm.querySelector(`input[name="meal"][value="${guessMeal()}"]`);
      if (r) r.checked = true;
    }
    addSheet.showModal();
    setTimeout(() => $("fName").focus(), 50);
  }

  servRange.addEventListener("input", () => { servOut.textContent = servRange.value + "×"; });

  // autofill macros when a known favorite name is typed/selected
  $("fName").addEventListener("input", (e) => {
    const match = state.favorites.find((f) => f.name.toLowerCase() === e.target.value.trim().toLowerCase());
    if (match) {
      $("fCal").value = match.calories;
      $("fPro").value = match.protein;
      $("fCarb").value = match.carbs;
      $("fFat").value = match.fat;
    }
  });

  addForm.addEventListener("submit", (e) => {
    const btn = e.submitter;
    if (btn && btn.value === "cancel") return; // dialog closes
    if (!addForm.reportValidity()) { e.preventDefault(); return; }

    const fd = new FormData(addForm);
    const mult = parseFloat(fd.get("servings")) || 1;
    const num = (k) => Math.max(0, (parseFloat(fd.get(k)) || 0) * mult);
    const name = String(fd.get("name")).trim();
    const meal = fd.get("meal");
    const entry = {
      id: newId(), name, meal,
      calories: round(num("calories")),
      protein: round(num("protein") * 10) / 10,
      carbs: round(num("carbs") * 10) / 10,
      fat: round(num("fat") * 10) / 10,
    };
    dayOf(current).entries.push(entry);

    if (fd.get("saveFav") && !state.favorites.some((f) => f.name.toLowerCase() === name.toLowerCase())) {
      // store the per-serving values (divide back out)
      state.favorites.unshift({
        id: newId(), name, emoji: "⭐",
        calories: round(num("calories") / mult),
        protein: round(num("protein") / mult),
        carbs: round(num("carbs") / mult),
        fat: round(num("fat") / mult),
      });
    }
    save();
    renderAll();
    toast(`Added <b>${escapeHtml(name)}</b> to ${meal}`);
    // let the dialog close via method="dialog"
  });

  $("openAdd").addEventListener("click", () => openAdd());

  // ---- goals dialog -------------------------------------------------------
  const goalsSheet = $("goalsSheet");
  const goalsForm = $("goalsForm");

  function openGoals() {
    goalsForm.owner.value = state.owner;
    goalsForm.style.value = state.style;
    goalsForm.calGoal.value = state.goals.calGoal;
    goalsForm.proGoal.value = state.goals.proGoal;
    goalsForm.carbGoal.value = state.goals.carbGoal;
    goalsForm.fatGoal.value = state.goals.fatGoal;
    updateMacroCheck();
    goalsSheet.showModal();
  }

  function updateMacroCheck() {
    const cal = +goalsForm.calGoal.value || 0;
    const p = +goalsForm.proGoal.value || 0;
    const c = +goalsForm.carbGoal.value || 0;
    const f = +goalsForm.fatGoal.value || 0;
    const fromMacros = p * 4 + c * 4 + f * 9;
    const el = $("macroCheck");
    if (!cal || !fromMacros) { el.textContent = ""; el.className = "goals__macrocheck"; return; }
    const diff = fromMacros - cal;
    const pctP = Math.round((p * 4 / fromMacros) * 100);
    const pctC = Math.round((c * 4 / fromMacros) * 100);
    const pctF = 100 - pctP - pctC;
    const split = `Split: ${pctP}% protein · ${pctC}% carbs · ${pctF}% fat.`;
    if (Math.abs(diff) <= cal * 0.06) {
      el.textContent = `${split} Macros line up with your calorie goal. 👍`;
      el.className = "goals__macrocheck ok";
    } else {
      el.textContent = `${split} Macros add up to ${fromMacros.toLocaleString()} cal (${diff > 0 ? "+" : ""}${diff} vs goal).`;
      el.className = "goals__macrocheck warn";
    }
  }
  ["calGoal", "proGoal", "carbGoal", "fatGoal"].forEach((n) =>
    goalsForm[n].addEventListener("input", updateMacroCheck));

  goalsForm.addEventListener("submit", (e) => {
    const btn = e.submitter;
    if (btn && (btn.value === "cancel")) return;
    state.owner = goalsForm.owner.value.trim() || "Maya";
    state.style = goalsForm.style.value;
    state.goals = {
      calGoal: Math.max(0, +goalsForm.calGoal.value || 0),
      proGoal: Math.max(0, +goalsForm.proGoal.value || 0),
      carbGoal: Math.max(0, +goalsForm.carbGoal.value || 0),
      fatGoal: Math.max(0, +goalsForm.fatGoal.value || 0),
    };
    document.querySelector(".brand__sub").textContent = `${state.owner}'s food diary`;
    document.querySelector(".sitefoot__demo").innerHTML = `Demo diary for <strong>${escapeHtml(state.owner)} Okafor</strong> · built as a Spacefast example.`;
    save();
    renderAll();
    toast("Goals saved");
  });

  $("resetDay").addEventListener("click", () => {
    if (!confirm(`Clear all foods logged on ${fmtLabel(current)}?`)) return;
    state.days[current] = { entries: [] };
    save();
    renderAll();
    goalsSheet.close();
    toast(`Cleared ${fmtLabel(current)}`);
  });

  $("openGoals").addEventListener("click", openGoals);

  // ---- date nav -----------------------------------------------------------
  $("prevDay").addEventListener("click", () => setDate(addDays(current, -1)));
  $("nextDay").addEventListener("click", () => setDate(addDays(current, 1)));
  dateLabel.addEventListener("click", () => {
    if (datePicker.showPicker) { try { datePicker.showPicker(); return; } catch (e) {} }
    datePicker.style.pointerEvents = "auto";
    datePicker.focus();
    datePicker.click();
  });
  datePicker.addEventListener("change", () => { if (datePicker.value) setDate(datePicker.value); });

  // keyboard: left/right arrows switch days when not typing
  document.addEventListener("keydown", (e) => {
    if (e.target.matches("input, textarea, select, button") || addSheet.open || goalsSheet.open) return;
    if (e.key === "ArrowLeft") setDate(addDays(current, -1));
    if (e.key === "ArrowRight") setDate(addDays(current, 1));
  });

  // ---- util ---------------------------------------------------------------
  function escapeHtml(s) {
    return String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  }

  // ---- boot ---------------------------------------------------------------
  document.querySelector(".brand__sub").textContent = `${state.owner}'s food diary`;
  setDate(todayKey());
})();
