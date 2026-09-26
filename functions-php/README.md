# PHP Functions

A complete static site with native PHP endpoints. Files in `functions/` become
routes without a framework, router, or dependency install:

| Source | Route | What it demonstrates |
| --- | --- | --- |
| `functions/hello.php` | `/hello` | JSON and form request bodies through `sf_body()` |
| `functions/echo.php` | `/echo` | Input validation and explicit response statuses |
| `functions/viewer.php` | `/viewer` | Platform-verified visitor identity through `sf_auth()` |

The browser UI calls all three routes and renders their real JSON responses.

## Run it

```sh
sf publish
```

PHP runs on the published version; there is no local PHP Functions emulation
yet.

`sf build` packages the static files and PHP handlers together. Any
`functions/**/*.php` file with plain path segments is a route
(`functions/api/index.php` serves `/api`). Files with bracketed segments, and
PHP outside `functions/`, are served as inert attachments, never executed.

PHP Functions run inside a jailed tenant process. Spacefast owns dynamic cache
headers, strips platform secrets before the handler starts, and provides the
`sf_*` helpers without requiring Composer or a bootstrap file.
