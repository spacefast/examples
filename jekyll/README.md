# Jekyll on Spacefast

A small editorial site that exercises Spacefast's built-in Jekyll detection.
The CLI finds `Gemfile` and `_config.yml`, runs Bundler with
`JEKYLL_ENV=production`, and publishes the configured `_site` directory.

```sh
bundle install
bundle exec jekyll serve
sf publish
```

Important files:

- `_config.yml` declares the build destination and permalink shape.
- `_layouts/default.html` supplies the shared document chrome.
- `_posts/` proves Markdown, front matter, dates, and generated post routes.
