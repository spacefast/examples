// Number formatting helpers shared across the dashboard.

export function currencyM(n) {
  const m = n / 1_000_000;
  // $14.2M, $1.88M, $0.6M
  if (Math.abs(m) >= 10) return `$${m.toFixed(1)}M`;
  return `$${m.toFixed(2).replace(/0$/, "")}M`;
}

export function currency0(n) {
  return n.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  });
}

export function currencyK(n) {
  const sign = n < 0 ? "−" : "";
  const k = Math.abs(n) / 1000;
  return `${sign}$${k % 1 === 0 ? k.toFixed(0) : k.toFixed(1)}K`;
}

export function signedCurrencyM(n) {
  const sign = n < 0 ? "−" : "+";
  return `${sign}${currencyM(Math.abs(n))}`;
}

export function pct(n, digits = 0) {
  return `${(n * 100).toFixed(digits)}%`;
}

export function pct1(n) {
  return pct(n, 1);
}

export function months(n) {
  return `${n} mo`;
}

export function formatKpi(value, fmt) {
  switch (fmt) {
    case "currencyM":
      return currencyM(value);
    case "currency0":
      return currency0(value);
    case "pct":
      return pct(value, 0);
    case "months":
      return months(value);
    default:
      return String(value);
  }
}
