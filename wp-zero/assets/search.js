// The search box.
//
// No framework and no import map: `/api/search` is an ordinary HTTP endpoint on
// the Zero capsule, so plain `fetch` is the whole client. The index it searches
// was compiled from WordPress at build time and lives on the server, which is
// why typing here downloads a handful of results instead of a corpus.

const form = document.querySelector("[data-search]");
const input = form?.querySelector("input");
const panel = document.getElementById("search-panel");
const meta = document.getElementById("search-meta");
const list = document.getElementById("search-results");

if (form && input && panel && meta && list) {
  let timer;
  let latest = 0;

  const close = () => {
    panel.hidden = true;
    list.replaceChildren();
    meta.textContent = "";
  };

  const render = (payload) => {
    panel.hidden = false;
    list.replaceChildren();

    if (payload.results.length === 0) {
      meta.textContent = `Nothing for “${payload.query}” in ${payload.indexed} articles.`;
      return;
    }

    meta.textContent = `${payload.results.length} of ${payload.indexed} articles match “${payload.query}”.`;
    for (const hit of payload.results) {
      const item = document.createElement("li");
      const link = document.createElement("a");
      link.href = hit.url;
      const title = document.createElement("strong");
      title.textContent = hit.title;
      const excerpt = document.createElement("span");
      excerpt.textContent = hit.excerpt;
      link.append(title, excerpt);
      item.append(link);
      list.append(item);
    }
  };

  const run = async (query) => {
    const ticket = ++latest;
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`, {
        headers: { accept: "application/json" },
      });
      if (!response.ok) throw new Error(String(response.status));
      const payload = await response.json();
      // A slow response for an older keystroke must never overwrite a newer one.
      if (ticket === latest) render(payload);
    } catch {
      if (ticket !== latest) return;
      panel.hidden = false;
      list.replaceChildren();
      meta.textContent = "Search is unavailable right now.";
    }
  };

  input.addEventListener("input", () => {
    const query = input.value.trim();
    clearTimeout(timer);
    if (query.length < 2) {
      latest++;
      close();
      return;
    }
    timer = setTimeout(() => void run(query), 180);
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    clearTimeout(timer);
    const query = input.value.trim();
    if (query.length >= 2) void run(query);
  });

  input.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      input.value = "";
      latest++;
      close();
    }
  });
}
