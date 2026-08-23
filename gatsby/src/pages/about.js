import * as React from "react";

import { Layout } from "../components/layout";

export default function AboutPage() {
  return (
    <Layout>
      <article className="prose">
        <p className="eyebrow">About Common Ground</p>
        <h1>A small guide with a strict filter.</h1>
        <p>We collect places that reward attention: the corner table with the best light, the path that stays quiet after lunch, the room where people still listen to a whole record.</p>
        <p>This example is intentionally straightforward. Gatsby owns the build. Spacefast detects it and serves the generated <code>public</code> directory.</p>
        <a href="/">← Return to the guide</a>
      </article>
    </Layout>
  );
}

export const Head = () => <title>About · Common Ground</title>;
