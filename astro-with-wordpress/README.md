# Astro with WordPress on Spacefast

This site fetches public WordPress posts during `astro build` through
`@spacefast/wordpress`, then publishes a static snapshot. WordPress remains the
editor; readers never wait for WordPress at request time.

The example uses WordPress.org News when no source is configured, so it builds
immediately. For your own site, either set `WORDPRESS_URL` or add a WordPress
data source to the Space in **Settings → Data sources**. Repository builds
receive that source automatically through `SPACEFAST_DATA_SOURCES`.

```sh
npm install
npm run dev
sf publish
```

`@spacefast/astro` validates routing conventions and emits them into `dist/`.
`@spacefast/wordpress` handles REST URL normalization, pagination metadata, and
data-source discovery.
