import type { Metadata } from "next";
import type { ReactNode } from "react";

import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Signal Desk", template: "%s · Signal Desk" },
  description: "A server-rendered Next.js field log on Spacefast.",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <header className="site-header"><a className="brand" href="/">Signal Desk</a><nav aria-label="Primary navigation"><a href="/">Dispatch</a><a href="/notes/runtime-boundaries">Field note</a><a href="/api/pulse">API</a></nav></header>
        <main>{children}</main>
        <footer><span>Request-aware by design.</span><span>Next.js runtime → Spacefast</span></footer>
      </body>
    </html>
  );
}
