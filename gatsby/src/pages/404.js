import * as React from "react";

import { Layout } from "../components/layout";

export default function NotFoundPage() {
  return (
    <Layout>
      <section className="not-found">
        <p className="eyebrow">404 · Off the route</p>
        <h1>This place isn't in the guide.</h1>
        <a className="button" href="/">Back to Common Ground</a>
      </section>
    </Layout>
  );
}

export const Head = () => <title>Not found · Common Ground</title>;
