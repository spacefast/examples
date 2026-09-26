import { SITE_TAGLINE, SITE_TITLE } from "../config.js";
import { Link } from "./common.jsx";

export function Header({ theme, onToggleTheme }) {
  return (
    <header className="site-header">
      <div className="container site-header-inner">
        <Link to="/" className="brand" aria-label={`${SITE_TITLE} — home`}>
          <span className="brand-mark" aria-hidden="true">¶</span>
          <span className="brand-text">
            <span className="brand-title">{SITE_TITLE}</span>
            <span className="brand-tagline">{SITE_TAGLINE}</span>
          </span>
        </Link>
        <button
          type="button"
          className="theme-toggle"
          onClick={onToggleTheme}
          aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
          title={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
        >
          {theme === "dark" ? "☀" : "☾"}
        </button>
      </div>
    </header>
  );
}
