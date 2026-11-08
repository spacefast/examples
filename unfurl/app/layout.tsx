import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Unfurl — see what your link looks like when you paste it",
    template: "%s · Unfurl",
  },
  description:
    "Paste any URL. The server fetches it, reads its OpenGraph and Twitter-card metadata, and renders the preview card chat apps would show.",
  openGraph: {
    title: "Unfurl — see what your link looks like when you paste it",
    description:
      "Paste any URL. The server fetches it, reads its OpenGraph and Twitter-card metadata, and renders the preview card chat apps would show.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="skip" href="#main">
          Skip to content
        </a>
        <div className="glow" aria-hidden="true" />
        <header className="masthead">
          <a className="wordmark" href="/">
            <span className="wordmark-mark" aria-hidden="true">
              ↗
            </span>
            Unfurl
          </a>
          <p className="masthead-note">
            Next.js SSR on the <strong>Spacefast Functions</strong> runtime
          </p>
        </header>
        {children}
        <footer className="footer">
          <p>
            Built with a Next.js Route Handler, a server-rendered page, and middleware — running on
            the Spacefast Functions runtime. Static files serve straight off disk; everything else
            wakes the worker.
          </p>
          <p className="footer-links">
            <a href="https://spacefast.com/docs/functions">Functions docs</a>
            <span aria-hidden="true">·</span>
            <a href="https://spacefast.com/docs/frameworks">Next.js on Spacefast</a>
            <span aria-hidden="true">·</span>
            <a href="/api/unfurl?url=https://spacefast.com">Try the API</a>
          </p>
        </footer>
        {/* Shared Spacefast badge. Must stay the last thing in the body. */}
        <script src="https://spacefast.com/badge.js" data-example="unfurl"></script>
      </body>
    </html>
  );
}
