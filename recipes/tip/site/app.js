(() => {
  "use strict";

  // ---- Configuration (a real build would read these from setup answers) ----
  const CURRENCY = { symbol: "$", code: "USD", locale: "en-US" };
  const DEFAULTS = { bill: "86.40", tip: 18, tax: "7.13", people: 4 };

  const money = new Intl.NumberFormat(CURRENCY.locale, {
    style: "currency", currency: CURRENCY.code,
  });

  // ---- State ----
  const state = {
    bill: 86.4,
    tipPercent: 18,
    tipOnTotal: false,
    tax: 7.13,
    people: 4,
    roundUp: false,
  };

  // ---- Elements ----
  const el = (id) => document.getElementById(id);
  const billInput = el("bill");
  const taxInput = el("tax");
  const customTip = el("customTip");
  const tipGrid = el("tipGrid");
  const tipBtns = [...tipGrid.querySelectorAll(".tipbtn[data-tip]")];
  const customLabel = customTip.closest(".tipbtn--custom");
  const tipOnTotal = el("tipOnTotal");
  const roundUp = el("roundUp");
  const peopleCount = el("peopleCount");
  const peopleRange = el("peopleRange");
  const minusPeople = el("minusPeople");
  const plusPeople = el("plusPeople");
  const resetBtn = el("resetBtn");
  const copyBtn = el("copyBtn");
  const copyLabel = el("copyLabel");
  const toast = el("toast");

  const out = {
    per: el("perPerson"),
    sub: el("perSub"),
    bill: el("outBill"),
    tip: el("outTip"),
    tipLabel: el("tipLineLabel"),
    tax: el("outTax"),
    total: el("outTotal"),
    cushionRow: el("roundupRow"),
    cushion: el("outCushion"),
    note: el("receiptNote"),
  };

  // ---- Helpers ----
  function parseMoney(raw) {
    if (!raw) return 0;
    const n = parseFloat(String(raw).replace(/[^0-9.]/g, ""));
    return Number.isFinite(n) && n >= 0 ? n : 0;
  }

  function sanitizeMoneyField(input) {
    // keep digits and a single dot, max two decimals
    let v = input.value.replace(/[^0-9.]/g, "");
    const firstDot = v.indexOf(".");
    if (firstDot !== -1) {
      v = v.slice(0, firstDot + 1) + v.slice(firstDot + 1).replace(/\./g, "");
      const [whole, dec] = v.split(".");
      v = whole + "." + dec.slice(0, 2);
    }
    input.value = v;
  }

  // ---- Core calculation ----
  function compute() {
    const { bill, tax, tipPercent, tipOnTotal: onTotal, people, roundUp: round } = state;
    const tipBase = onTotal ? bill + tax : bill;
    const tip = tipBase * (tipPercent / 100);
    const total = bill + tax + tip;

    const rawPer = people > 0 ? total / people : 0;
    let perPerson = rawPer;
    let cushion = 0;
    if (round && people > 0 && total > 0) {
      perPerson = Math.ceil(rawPer - 1e-9); // round each person up to the next whole dollar
      cushion = perPerson * people - total;
    }

    return { tip, total, perPerson, cushion };
  }

  // ---- Render ----
  function render() {
    const { tip, total, perPerson, cushion } = compute();

    out.per.textContent = perPerson.toFixed(2);
    out.sub.textContent = `for ${state.people} ${state.people === 1 ? "person" : "people"}`;
    out.bill.textContent = money.format(state.bill);
    out.tipLabel.textContent = `Tip (${formatPct(state.tipPercent)}%${state.tipOnTotal ? " of total" : ""})`;
    out.tip.textContent = money.format(tip);
    out.tax.textContent = money.format(state.tax);
    out.total.textContent = money.format(total);

    if (state.roundUp && cushion > 0.0049) {
      out.cushionRow.hidden = false;
      out.cushion.textContent = "+" + money.format(cushion);
    } else {
      out.cushionRow.hidden = true;
    }

    out.note.textContent = state.tipOnTotal
      ? "Tip is figured on the post-tax total — your call."
      : "Tip is figured on the bill before tax — the fair way.";
  }

  function formatPct(n) {
    return Number.isInteger(n) ? String(n) : n.toFixed(1);
  }

  // ---- Tip controls ----
  function setTip(percent, fromCustom) {
    state.tipPercent = percent;
    tipBtns.forEach((b) => {
      const active = !fromCustom && Number(b.dataset.tip) === percent;
      b.classList.toggle("is-active", active);
      b.setAttribute("aria-pressed", active ? "true" : "false");
    });
    customLabel.classList.toggle("is-active", !!fromCustom);
    if (!fromCustom) customTip.value = "";
    render();
  }

  tipBtns.forEach((b) =>
    b.addEventListener("click", () => setTip(Number(b.dataset.tip), false))
  );

  customTip.addEventListener("input", () => {
    if (customTip.value === "") {
      setTip(18, false); // empty custom falls back to 18%
      return;
    }
    let v = Math.min(100, Math.max(0, parseFloat(customTip.value) || 0));
    setTip(v, true);
  });
  customTip.addEventListener("focus", () => customLabel.classList.add("is-active"));

  // ---- Money fields ----
  billInput.addEventListener("input", () => {
    sanitizeMoneyField(billInput);
    state.bill = parseMoney(billInput.value);
    render();
  });
  taxInput.addEventListener("input", () => {
    sanitizeMoneyField(taxInput);
    state.tax = parseMoney(taxInput.value);
    render();
  });
  const formatOnBlur = (input, key) => () => {
    if (input.value !== "") input.value = parseMoney(input.value).toFixed(2);
    state[key] = parseMoney(input.value);
    render();
  };
  billInput.addEventListener("blur", formatOnBlur(billInput, "bill"));
  taxInput.addEventListener("blur", formatOnBlur(taxInput, "tax"));

  // ---- People ----
  const MIN_PEOPLE = 1, MAX_PEOPLE = 20;
  function setPeople(n) {
    state.people = Math.min(MAX_PEOPLE, Math.max(MIN_PEOPLE, n));
    peopleCount.textContent = state.people;
    peopleRange.value = state.people;
    minusPeople.disabled = state.people <= MIN_PEOPLE;
    plusPeople.disabled = state.people >= MAX_PEOPLE;
    render();
  }
  minusPeople.addEventListener("click", () => setPeople(state.people - 1));
  plusPeople.addEventListener("click", () => setPeople(state.people + 1));
  peopleRange.addEventListener("input", () => setPeople(Number(peopleRange.value)));

  // ---- Toggles ----
  tipOnTotal.addEventListener("change", () => {
    state.tipOnTotal = tipOnTotal.checked;
    render();
  });
  roundUp.addEventListener("change", () => {
    state.roundUp = roundUp.checked;
    render();
  });

  // ---- Reset ----
  resetBtn.addEventListener("click", (e) => {
    e.preventDefault();
    state.bill = 0; state.tax = 0; state.tipPercent = 18;
    state.tipOnTotal = false; state.roundUp = false;
    billInput.value = ""; taxInput.value = "";
    tipOnTotal.checked = false; roundUp.checked = false;
    customTip.value = "";
    setTip(18, false);
    setPeople(2);
    billInput.focus();
    showToast("Fresh bill — enter a new amount");
  });

  // ---- Copy ----
  copyBtn.addEventListener("click", async () => {
    const { tip, total, perPerson, cushion } = compute();
    const lines = [
      `Even Split — ${state.people} ${state.people === 1 ? "person" : "people"}`,
      `Bill (pre-tax): ${money.format(state.bill)}`,
      `Tip (${formatPct(state.tipPercent)}%${state.tipOnTotal ? " of total" : ""}): ${money.format(tip)}`,
      `Tax: ${money.format(state.tax)}`,
      `Total: ${money.format(total)}`,
      `Each person: ${money.format(perPerson)}${state.roundUp && cushion > 0.0049 ? " (rounded up)" : ""}`,
    ];
    const text = lines.join("\n");
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = text; document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy"); } catch {}
      ta.remove();
    }
    copyBtn.classList.add("is-copied");
    copyLabel.textContent = "Copied!";
    showToast(`${money.format(perPerson)} each · copied to clipboard`);
    setTimeout(() => {
      copyBtn.classList.remove("is-copied");
      copyLabel.textContent = "Copy the split";
    }, 1800);
  });

  // ---- Toast ----
  let toastTimer;
  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("is-visible"), 2400);
  }

  // ---- Init ----
  function init() {
    billInput.value = DEFAULTS.bill;
    taxInput.value = DEFAULTS.tax;
    state.bill = parseMoney(DEFAULTS.bill);
    state.tax = parseMoney(DEFAULTS.tax);
    setTip(DEFAULTS.tip, false);
    setPeople(DEFAULTS.people);
  }
  init();
})();
