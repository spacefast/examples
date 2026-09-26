import { useCallback, useEffect, useState } from "react";

// --- Tiny hash router ------------------------------------------------------
// A hash router keeps deep links working even on a plain static host, and the
// `_redirects` SPA fallback covers the path-style URLs. Routes we support:
//   #/            → list
//   #/post/:id    → detail
export function parseHash(hash) {
  const clean = (hash || "").replace(/^#/, "");
  const postMatch = clean.match(/^\/post\/(\d+)/);
  if (postMatch) return { name: "post", id: Number(postMatch[1]) };
  return { name: "list" };
}

export function useHashRoute() {
  const [route, setRoute] = useState(() => parseHash(window.location.hash));
  useEffect(() => {
    const onChange = () => {
      setRoute(parseHash(window.location.hash));
      window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
    };
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  return route;
}

export function navigate(to) {
  if (window.location.hash === to) return;
  window.location.hash = to;
}

// --- Theme -----------------------------------------------------------------
// Persisted light/dark with a sensible default from the OS preference.
const THEME_KEY = "reading-room-theme";

function initialTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  if (saved === "light" || saved === "dark") return saved;
  return window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

export function useTheme() {
  const [theme, setTheme] = useState(initialTheme);
  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem(THEME_KEY, theme);
  }, [theme]);
  const toggle = useCallback(() => setTheme((t) => (t === "dark" ? "light" : "dark")), []);
  return { theme, toggle };
}

// --- Async data ------------------------------------------------------------
// Generic loader with status, abort-on-unmount, and a retry counter so the
// error state can offer a working "Try again" button.
export function useAsync(loader, deps) {
  const [state, setState] = useState({ status: "loading", data: null, error: null });
  const [attempt, setAttempt] = useState(0);
  const retry = useCallback(() => setAttempt((n) => n + 1), []);

  useEffect(() => {
    let active = true;
    const controller = new AbortController();
    setState({ status: "loading", data: null, error: null });
    loader(controller.signal)
      .then((data) => {
        if (active) setState({ status: "success", data, error: null });
      })
      .catch((err) => {
        if (!active || (err && err.name === "AbortError")) return;
        setState({ status: "error", data: null, error: err });
      });
    return () => {
      active = false;
      controller.abort();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, attempt]);

  return { ...state, retry };
}

// Debounce a fast-changing value (the search box) so we don't hammer the API.
export function useDebounced(value, ms = 350) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), ms);
    return () => clearTimeout(id);
  }, [value, ms]);
  return debounced;
}
