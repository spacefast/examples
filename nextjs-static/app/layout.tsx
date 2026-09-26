import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Edition No. 12", template: "%s · Edition No. 12" },
  description: "A fully static Next.js journal published on Spacefast.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <header className="site-header">
          <a href="/" className="brand">EDITION / 12</a>
          <nav aria-label="Primary navigation"><a href="/">Index</a><a href="/about/">Colophon</a></nav>
        </header>
        <main>{children}</main>
        <footer><span>Independent observations</span><span>Next.js static export → Spacefast</span></footer>
      </body>
    </html>
  );
}
