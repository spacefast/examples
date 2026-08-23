import React, { useEffect, useMemo, useState } from "react";
import { recipes, categories, cuisines, diets, cook, findRecipe } from "./data.js";
import { formatQty, pluralizeUnit } from "./format.js";

/* ----------------------------- tiny hash router ---------------------------- */
function useHashRoute() {
  const [hash, setHash] = useState(() => window.location.hash || "#/");
  useEffect(() => {
    const onChange = () => setHash(window.location.hash || "#/");
    window.addEventListener("hashchange", onChange);
    return () => window.removeEventListener("hashchange", onChange);
  }, []);
  // scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [hash]);
  return hash;
}

function navigate(to) {
  window.location.hash = to;
}

function Link({ to, className, children, ...rest }) {
  return (
    <a
      href={to}
      className={className}
      onClick={(e) => {
        // let modified clicks open normally
        if (e.metaKey || e.ctrlKey || e.shiftKey) return;
        e.preventDefault();
        navigate(to);
      }}
      {...rest}
    >
      {children}
    </a>
  );
}

/* --------------------------------- chrome --------------------------------- */
function Header({ route }) {
  const [open, setOpen] = useState(false);
  const links = [
    ["#/", "Home"],
    ["#/recipes", "Recipes"],
    ["#/about", "About"],
  ];
  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="#/" className="brand" aria-label={`${cook.blog} — home`}>
          <span className="brand-mark" aria-hidden="true">
            <svg viewBox="0 0 32 32" width="28" height="28">
              <circle cx="16" cy="17" r="9" fill="none" stroke="currentColor" strokeWidth="2" />
              <line x1="25" y1="9" x2="31" y2="5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </span>
          <span className="brand-text">{cook.blog}</span>
        </Link>

        <button
          className="nav-toggle"
          aria-expanded={open}
          aria-label="Toggle navigation"
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`nav ${open ? "is-open" : ""}`} onClick={() => setOpen(false)}>
          {links.map(([to, label]) => {
            const active = to === "#/" ? route === "#/" : route.startsWith(to);
            return (
              <Link key={to} to={to} className={active ? "active" : ""}>
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div>
          <p className="footer-brand">{cook.blog}</p>
          <p className="footer-tag">{cook.tagline}</p>
        </div>
        <nav className="footer-links" aria-label="Footer">
          <Link to="#/recipes">All recipes</Link>
          <Link to="#/about">About Nora</Link>
          <a href="#/recipes">Newsletter</a>
        </nav>
        <p className="footer-fine">
          © {new Date().getFullYear()} {cook.name}. Made for the love of dinner.
        </p>
      </div>
    </footer>
  );
}

/* -------------------------------- newsletter ------------------------------- */
function Newsletter({ variant = "block" }) {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  function submit(e) {
    e.preventDefault();
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
      setError("That email doesn't look quite right — mind checking it?");
      return;
    }
    setError("");
    setDone(true);
  }

  return (
    <section className={`newsletter newsletter--${variant}`} aria-labelledby="nl-title">
      <div className="newsletter-copy">
        <h2 id="nl-title">Save this recipe — and get next week's</h2>
        <p>
          One thoughtful email each Friday: a new weeknight recipe, what's good at the
          market, and the occasional half-formed idea. No spam, ever.
        </p>
      </div>
      {done ? (
        <div className="newsletter-success" role="status">
          <strong>You're on the list{name ? `, ${name.split(" ")[0]}` : ""}! 🎉</strong>
          <p>Check your inbox Friday for the first one. Welcome to the kitchen.</p>
        </div>
      ) : (
        <form className="newsletter-form" onSubmit={submit} noValidate>
          <div className="field">
            <label htmlFor="nl-name">First name</label>
            <input
              id="nl-name"
              type="text"
              autoComplete="given-name"
              placeholder="Sam"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="field">
            <label htmlFor="nl-email">Email address</label>
            <input
              id="nl-email"
              type="email"
              autoComplete="email"
              placeholder="sam@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              aria-invalid={!!error}
              aria-describedby={error ? "nl-error" : undefined}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary">
            Send me Friday's recipe
          </button>
          {error && (
            <p id="nl-error" className="form-error" role="alert">
              {error}
            </p>
          )}
        </form>
      )}
    </section>
  );
}

/* --------------------------------- cards ----------------------------------- */
function RecipeCard({ r }) {
  return (
    <article className="card">
      <Link to={`#/recipe/${r.slug}`} className="card-media" aria-hidden="true" tabIndex={-1}>
        <img src={r.card} alt="" loading="lazy" width="640" height="427" />
      </Link>
      <div className="card-body">
        <div className="card-meta">
          <span className="pill">{r.category}</span>
          <span className="card-time">{r.prep + r.cook} min</span>
        </div>
        <h3 className="card-title">
          <Link to={`#/recipe/${r.slug}`}>{r.title}</Link>
        </h3>
        <p className="card-blurb">{r.blurb}</p>
        <div className="card-tags">
          {r.diets.slice(0, 3).map((d) => (
            <span key={d} className="tag">
              {d}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}

/* ---------------------------------- home ----------------------------------- */
function Home() {
  const featured = recipes.find((r) => r.featured) || recipes[0];
  const latest = recipes.filter((r) => r.slug !== featured.slug).slice(0, 6);
  return (
    <main>
      <section className="hero">
        <div className="hero-media">
          <img src={featured.hero} alt={`${featured.title}, photographed from above`} fetchpriority="high" />
        </div>
        <div className="hero-overlay">
          <div className="container">
            <p className="eyebrow">This week's table</p>
            <h1 className="hero-title">{featured.title}</h1>
            <p className="hero-blurb">{featured.blurb}</p>
            <div className="hero-actions">
              <Link to={`#/recipe/${featured.slug}`} className="btn btn-primary">
                Get the recipe
              </Link>
              <Link to="#/recipes" className="btn btn-ghost">
                Browse all recipes
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="container section">
        <div className="section-head">
          <h2>Fresh from the kitchen</h2>
          <Link to="#/recipes" className="see-all">
            See all {recipes.length} →
          </Link>
        </div>
        <div className="grid">
          {latest.map((r) => (
            <RecipeCard key={r.slug} r={r} />
          ))}
        </div>
      </section>

      <div className="container section">
        <Newsletter variant="block" />
      </div>
    </main>
  );
}

/* ------------------------------- recipe index ------------------------------ */
function FilterGroup({ legend, options, value, onChange }) {
  return (
    <fieldset className="filter-group">
      <legend>{legend}</legend>
      <div className="chips">
        <button
          type="button"
          className={`chip ${value === "" ? "is-active" : ""}`}
          onClick={() => onChange("")}
        >
          All
        </button>
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            className={`chip ${value === opt ? "is-active" : ""}`}
            aria-pressed={value === opt}
            onClick={() => onChange(value === opt ? "" : opt)}
          >
            {opt}
          </button>
        ))}
      </div>
    </fieldset>
  );
}

function RecipeIndex() {
  const [q, setQ] = useState("");
  const [category, setCategory] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [diet, setDiet] = useState("");

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return recipes.filter((r) => {
      if (category && r.category !== category) return false;
      if (cuisine && r.cuisine !== cuisine) return false;
      if (diet && !r.diets.includes(diet)) return false;
      if (needle) {
        const hay = `${r.title} ${r.blurb} ${r.category} ${r.cuisine} ${r.diets.join(" ")} ${r.ingredients
          .map((i) => i.item || i.text || "")
          .join(" ")}`.toLowerCase();
        if (!hay.includes(needle)) return false;
      }
      return true;
    });
  }, [q, category, cuisine, diet]);

  const hasFilters = q || category || cuisine || diet;

  return (
    <main className="container section">
      <header className="page-head">
        <p className="eyebrow">The recipe box</p>
        <h1>Every recipe, one place</h1>
        <p className="page-lede">
          {recipes.length} weeknight-friendly recipes. Filter by what you're in the mood for, or
          search by ingredient — type "lemon" and see what comes up.
        </p>
      </header>

      <div className="index-layout">
        <aside className="filters" aria-label="Filter recipes">
          <div className="search-field">
            <label htmlFor="search">Search recipes</label>
            <input
              id="search"
              type="search"
              placeholder="lemon, shrimp, one-pot…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </div>
          <FilterGroup legend="Course" options={categories} value={category} onChange={setCategory} />
          <FilterGroup legend="Cuisine" options={cuisines} value={cuisine} onChange={setCuisine} />
          <FilterGroup legend="Dietary" options={diets} value={diet} onChange={setDiet} />
          {hasFilters && (
            <button
              type="button"
              className="btn btn-ghost btn-block"
              onClick={() => {
                setQ("");
                setCategory("");
                setCuisine("");
                setDiet("");
              }}
            >
              Clear filters
            </button>
          )}
        </aside>

        <section className="index-results" aria-live="polite">
          <p className="result-count">
            {results.length} {results.length === 1 ? "recipe" : "recipes"}
            {hasFilters ? " match" : ""}
          </p>
          {results.length === 0 ? (
            <div className="empty">
              <p>No recipes match that yet — try clearing a filter or searching something else.</p>
            </div>
          ) : (
            <div className="grid">
              {results.map((r) => (
                <RecipeCard key={r.slug} r={r} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

/* ------------------------------- recipe page ------------------------------- */
function IngredientLine({ ing, multiplier }) {
  if (ing.text) return <li className="ing ing--note">{ing.text}</li>;
  const scaled = ing.qty * multiplier;
  const qty = formatQty(scaled);
  const unit = pluralizeUnit(ing.unit, scaled);
  return (
    <li className="ing">
      <label className="ing-check">
        <input type="checkbox" />
        <span className="ing-amount">
          {qty} {unit}
        </span>
        <span className="ing-item">
          {ing.item}
          {ing.note ? <span className="ing-note">, {ing.note}</span> : null}
        </span>
      </label>
    </li>
  );
}

function RecipePage({ slug }) {
  const r = findRecipe(slug);
  const [servings, setServings] = useState(r ? r.servings : 4);

  useEffect(() => {
    if (r) setServings(r.servings);
  }, [slug]); // reset scaler when navigating between recipes

  if (!r) {
    return (
      <main className="container section">
        <h1>Recipe not found</h1>
        <p>That recipe must have slipped off the counter. </p>
        <Link to="#/recipes" className="btn btn-primary">
          Back to all recipes
        </Link>
      </main>
    );
  }

  const multiplier = servings / r.servings;
  const total = r.prep + r.cook;

  return (
    <main className="recipe">
      <div className="recipe-hero">
        <img src={r.hero} alt={`${r.title}, ready to serve`} fetchpriority="high" />
      </div>

      <article className="container recipe-body">
        <nav className="crumbs" aria-label="Breadcrumb">
          <Link to="#/recipes">Recipes</Link>
          <span aria-hidden="true">/</span>
          <span>{r.category}</span>
        </nav>

        <header className="recipe-head">
          <div className="recipe-tags">
            <span className="pill">{r.cuisine}</span>
            {r.diets.map((d) => (
              <span key={d} className="tag">
                {d}
              </span>
            ))}
          </div>
          <h1>{r.title}</h1>
          <p className="recipe-intro">{r.intro}</p>
          <div className="byline">
            <img src={cook.avatar} alt="" width="40" height="40" />
            <span>
              By <strong>{cook.name}</strong>
            </span>
          </div>
        </header>

        <div className="stat-bar" role="group" aria-label="Times and yield">
          <div className="stat">
            <span className="stat-label">Prep</span>
            <span className="stat-value">{r.prep} min</span>
          </div>
          <div className="stat">
            <span className="stat-label">Cook</span>
            <span className="stat-value">{r.cook} min</span>
          </div>
          <div className="stat">
            <span className="stat-label">Total</span>
            <span className="stat-value">{total} min</span>
          </div>
          <div className="stat">
            <span className="stat-label">Serves</span>
            <span className="stat-value">{servings}</span>
          </div>
        </div>

        <div className="recipe-grid">
          <section className="ingredients" aria-labelledby="ing-title">
            <div className="ing-head">
              <h2 id="ing-title">Ingredients</h2>
              <button type="button" className="btn btn-ghost btn-print" onClick={() => window.print()}>
                <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true">
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 9V3h12v6M6 18H4a2 2 0 0 1-2-2v-4a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v4a2 2 0 0 1-2 2h-2M6 14h12v7H6z"
                  />
                </svg>
                Print card
              </button>
            </div>

            <div className="scaler" role="group" aria-labelledby="scaler-label">
              <div className="scaler-top">
                <span id="scaler-label" className="scaler-label">
                  Scale to <strong>{servings}</strong> {servings === 1 ? "serving" : "servings"}
                </span>
                {servings !== r.servings && (
                  <button
                    type="button"
                    className="scaler-reset"
                    onClick={() => setServings(r.servings)}
                  >
                    Reset
                  </button>
                )}
              </div>
              <div className="scaler-controls">
                <button
                  type="button"
                  className="step"
                  aria-label="Fewer servings"
                  disabled={servings <= 1}
                  onClick={() => setServings((s) => Math.max(1, s - 1))}
                >
                  −
                </button>
                <input
                  type="range"
                  min="1"
                  max="16"
                  value={servings}
                  aria-label="Number of servings"
                  onChange={(e) => setServings(Number(e.target.value))}
                />
                <button
                  type="button"
                  className="step"
                  aria-label="More servings"
                  disabled={servings >= 16}
                  onClick={() => setServings((s) => Math.min(16, s + 1))}
                >
                  +
                </button>
              </div>
              {multiplier !== 1 && (
                <p className="scaler-note">Quantities adjusted ×{(Math.round(multiplier * 100) / 100)}</p>
              )}
            </div>

            <ul className="ing-list">
              {r.ingredients.map((ing, i) => (
                <IngredientLine key={i} ing={ing} multiplier={multiplier} />
              ))}
            </ul>
          </section>

          <section className="method" aria-labelledby="method-title">
            <h2 id="method-title">Method</h2>
            <ol className="steps">
              {r.method.map((step, i) => (
                <li key={i}>
                  <span className="step-num">{i + 1}</span>
                  <p>{step}</p>
                </li>
              ))}
            </ol>
            <aside className="tip">
              <span className="tip-label">Nora's tip</span>
              <p>{r.tip}</p>
            </aside>
          </section>
        </div>

        {/* Print-only clean card */}
        <PrintCard r={r} servings={servings} multiplier={multiplier} />

        <div className="recipe-foot">
          <Newsletter variant="inline" />
        </div>
      </article>
    </main>
  );
}

function PrintCard({ r, servings, multiplier }) {
  return (
    <div className="print-card" aria-hidden="true">
      <div className="print-head">
        <h1>{r.title}</h1>
        <p className="print-meta">
          {cook.blog} · Prep {r.prep} min · Cook {r.cook} min · Serves {servings}
        </p>
      </div>
      <div className="print-cols">
        <div>
          <h2>Ingredients</h2>
          <ul>
            {r.ingredients.map((ing, i) =>
              ing.text ? (
                <li key={i}>{ing.text}</li>
              ) : (
                <li key={i}>
                  {formatQty(ing.qty * multiplier)} {pluralizeUnit(ing.unit, ing.qty * multiplier)} {ing.item}
                  {ing.note ? `, ${ing.note}` : ""}
                </li>
              )
            )}
          </ul>
        </div>
        <div>
          <h2>Method</h2>
          <ol>
            {r.method.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>
          <p className="print-tip">
            <strong>Tip:</strong> {r.tip}
          </p>
        </div>
      </div>
      <p className="print-foot">Recipe by {cook.name} · {cook.blog}</p>
    </div>
  );
}

/* ---------------------------------- about ---------------------------------- */
function About() {
  return (
    <main className="container section about">
      <div className="about-grid">
        <div className="about-photo">
          <img
            src="https://images.unsplash.com/photo-1577219491135-ce391730fb2c?w=900&q=80&auto=format&fit=crop"
            alt="Nora cooking at her stovetop, copper skillet in hand"
          />
        </div>
        <div className="about-copy">
          <p className="eyebrow">About the cook</p>
          <h1>Hi, I'm Nora.</h1>
          <p>
            I cook in a galley kitchen in Brooklyn that's roughly the size of a parking spot, with
            one good copper skillet that my grandmother left me and a permanent layer of olive oil on
            the backsplash. <strong>The Copper Skillet</strong> is where I keep the recipes I actually
            make on a Tuesday — the ones that come together fast, lean on the pantry, and taste like
            sunshine and lemons.
          </p>
          <p>
            I grew up between a Greek grandmother and a mother who believed dinner should never take
            longer than an episode of the news, so my cooking ended up Mediterranean at heart and
            impatient by nature. Everything here has been made on a weeknight, by me, usually while
            on the phone. If a recipe needs three pans and a candy thermometer, it didn't make the cut.
          </p>
          <p>
            My rules are simple: salt as you go, taste constantly, and don't be afraid of a little
            char. I hope something here ends up on your table soon.
          </p>
          <div className="about-stats">
            <div>
              <span className="num">{recipes.length}</span>
              <span className="lbl">recipes & counting</span>
            </div>
            <div>
              <span className="num">1</span>
              <span className="lbl">very loved skillet</span>
            </div>
            <div>
              <span className="num">~25</span>
              <span className="lbl">min, most dinners</span>
            </div>
          </div>
          <Link to="#/recipes" className="btn btn-primary">
            Start cooking
          </Link>
        </div>
      </div>
      <div className="section">
        <Newsletter variant="block" />
      </div>
    </main>
  );
}

/* ---------------------------------- app ------------------------------------ */
export default function App() {
  const hash = useHashRoute();

  let page;
  if (hash.startsWith("#/recipe/")) {
    const slug = decodeURIComponent(hash.slice("#/recipe/".length));
    page = <RecipePage slug={slug} />;
  } else if (hash.startsWith("#/recipes")) {
    page = <RecipeIndex />;
  } else if (hash.startsWith("#/about")) {
    page = <About />;
  } else {
    page = <Home />;
  }

  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Header route={hash} />
      <div id="main">{page}</div>
      <Footer />
    </>
  );
}
