# Gatsby on Spacefast

A compact Gatsby 5 site with multiple routes and a custom 404 page. Spacefast
detects `gatsby`, runs the package build script, and publishes `public/`.

```sh
npm install
npm run dev
sf publish
```

No adapter is required for Gatsby's static output. Keep generated `.cache/`
and `public/` directories out of Git; the CLI builds them when needed.
