# Blog with custom Spacefast Pages templates

This is an ordinary static blog plus the files Spacefast uses for its own
runtime pages:

- `_layout.html` wraps generated directory and preview pages.
- `_pages/404.html` replaces the not-found page.
- `_pages/access.html` replaces the sign-in/password/request screen while
  preserving the required `<sf-access-lanes>` slot.
- `theme.json` supplies the fallback palette and typography.
- `sf.jsonc` owns routing, metadata, headers, and access defaults.

```sh
sf pages validate
sf dev
sf publish
```

Custom `_pages` takeovers require a plan with Pages templates. The static blog
itself publishes normally on every plan.
