import { Header } from "./components/Header.jsx";
import { PostDetail } from "./components/PostDetail.jsx";
import { PostList } from "./components/PostList.jsx";
import { SITE_TITLE } from "./config.js";
import { useHashRoute, useTheme } from "./hooks.js";

export default function App() {
  const route = useHashRoute();
  const { theme, toggle } = useTheme();

  return (
    <div className="app">
      <a className="skip-link" href="#main">Skip to content</a>
      <Header theme={theme} onToggleTheme={toggle} />
      <div id="main">
        {route.name === "post" ? <PostDetail id={route.id} /> : <PostList />}
      </div>
      <footer className="site-footer">
        <div className="container site-footer-inner">
          <span>{SITE_TITLE}</span>
          <span className="site-footer-note">
            Content via the WordPress REST API · Built with React + Vite ·{" "}
            <a href="https://spacefast.com" target="_blank" rel="noreferrer noopener">
              Published on Spacefast
            </a>
          </span>
        </div>
      </footer>
    </div>
  );
}
