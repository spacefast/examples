import * as React from "react";

import "../styles/global.css";

export function Layout({ children }) {
  return (
    <>
      <header className="site-header">
        <a className="brand" href="/">Common Ground</a>
        <nav aria-label="Primary navigation">
          <a href="/#places">Places</a>
          <a href="/about/">About</a>
        </nav>
      </header>
      <main>{children}</main>
      <footer>
        <span>A field guide for better Saturdays.</span>
        <span>Gatsby → Spacefast</span>
      </footer>
    </>
  );
}
