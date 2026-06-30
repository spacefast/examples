export default function Header({ title, theme, onToggleTheme, onSettings }) {
  return (
    <header className="header">
      <div className="header__brand">
        <span className="header__mark" aria-hidden="true">
          <span /><span /><span />
          <span /><span /><span />
          <span /><span /><span />
        </span>
        <div>
          <p className="header__app">Tally</p>
          <h1 className="header__title">{title}</h1>
        </div>
      </div>
      <div className="header__actions">
        <button
          className="iconbtn"
          onClick={onToggleTheme}
          aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
          title={theme === "dark" ? "Light theme" : "Dark theme"}
        >
          {theme === "dark" ? "☀️" : "🌙"}
        </button>
        <button
          className="iconbtn"
          onClick={onSettings}
          aria-label="Settings"
          title="Settings"
        >
          ⚙️
        </button>
      </div>
    </header>
  );
}
