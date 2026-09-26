# Migrate a full Netlify project

This example keeps a realistic `netlify.toml` with build contexts, redirects,
headers, Functions settings, a scheduled function, an Edge Function, a build
plugin, and form handling. It then shows the explicit Spacefast equivalents.

```sh
npm install
sf publish --dry-run --allow-unsupported-platform-features
sf publish --allow-unsupported-platform-features
```

The dry run reports the detected build and the acknowledged compatibility
boundaries without uploading anything. The allow flag is intentional here: the legacy config remains in Git for a
dual-platform cutover, so the CLI continues to report features that require a
port.

| Netlify surface | Spacefast port |
| --- | --- |
| `[build]` command, publish directory, environment | Detected directly from `netlify.toml`; import environment with `sf env import --from netlify` |
| `[[redirects]]` and `[[headers]]` | Canonical rules in `site/_redirects` and `site/_headers`; copied to the output |
| `netlify/functions/newsletter.mjs` | `spacefast/functions/newsletter.ts` in the Functions file router |
| scheduled `weekly-digest` function | `spacefast/functions/weekly-digest.ts` plus `site/sf.jsonc` cron |
| Edge Function geolocation banner | Browser-safe fallback content; port request-time behavior deliberately if it is still needed |
| Netlify Forms | The form posts JSON to `/newsletter` instead of relying on HTML scraping |
| `[context.*]` overrides | Not imported; set per-environment values with `sf env set` |
| build plugin | Runs during the Spacefast build (installed plugins and Netlify's official list); Lighthouse skips itself because there is no `DEPLOY_URL` |

Once Spacefast is the only deploy target, delete the obsolete `netlify/`
directory, plugin/context sections, and the allow flag. Keep `netlify.toml` only
if its supported build settings remain useful.
