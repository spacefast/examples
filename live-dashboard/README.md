# Live dashboard through a connector

A one-file dashboard of euro exchange rates. The page has no backend, no build
step, and no API key: it calls the Space's own
`/__spacefast/connectors/rates/<tool>` route, and Spacefast answers with your
team's connection.

> Connectors are in **Private Beta**. Your team needs to be in the Connectors
> program; until it is, `sf connectors create` answers `feature_unavailable`.

| File | What it does |
| --- | --- |
| `sf.jsonc` | Declares the `rates` role: one `team` connection, two read tools, pinned arguments, and a 15-minute cache |
| `index.html` | Imports `/__spacefast/client.js`, watches both tools every 60 seconds, and renders each state the route answers |
| `styles.css` | Light and dark styles |

The data comes from [Frankfurter](https://frankfurter.dev), a free, open-source
API for European Central Bank reference rates. It needs no account and no key,
and it publishes an OpenAPI spec, so anyone can reproduce this example.

## Set it up

You need `spacefast` 0.9.0 or later. Run these from this directory, signed in
to the team that will own the Space.

```sh
# 1. Register the connector from its OpenAPI spec.
sf connectors create https://api.frankfurter.dev/v1/openapi.json --slug frankfurter

# 2. Connect it for the team. The API takes no credential, so this connects at once.
sf connectors connections connect frankfurter --owner team

# 3. Publish. A role with exactly one eligible connection binds itself.
sf publish

# 4. Let the connection serve sites. Owners and admins turn it on:
sf connectors connections update <connection-id> --serving
#    Members ask instead, and an owner or admin approves:
sf connectors serving create rates
```

`sf connectors connections list` prints the connection id, and
`sf connectors bindings` shows whether `rates` is bound and ready.

Team roles serve Spaces that need a sign-in. To let anyone with the share link
(or the public) read through this role, a team owner or admin also runs:

```sh
sf connectors public-serving set rates --enable
```

## What the page proves

- **No key in the browser.** The page only names a role and a tool. The
  connection and its credential stay with Spacefast.
- **Pinned arguments.** `base` and `symbols` are fixed in `sf.jsonc` and applied
  on the server. A page that sends a different value gets
  `connector_arg_pinned`, so this page can only read the four rates it declares.
- **A tool allowlist.** The role lists two read tools. Any other tool on the
  connector answers `connector_tool_not_allowed`.
- **One shared read.** Every viewer asking the same question in the same
  15 minutes shares one upstream request (`cache: "15m"`). The 60-second
  refresh on the page only checks that shared answer. When the answer came
  from that shared read, the footer shows when it was fetched upstream
  (`cachedAt`); otherwise it shows when the page received it.
- **Real states.** Before anything is connected, the route answers a state
  instead of data, and the page shows its message:

| State | When | What the page shows |
| --- | --- | --- |
| `loading` | First request in flight | "Reading rates…" |
| `ok` | Bound, connected, serving | Four rate tiles with 30-day sparklines |
| `unbound` | No connection bound to `rates` yet | "The site owner needs to connect this service." |
| `connect_required` | A role needs the viewer's own account (visitor roles) | The message and a **Connect** button to `connectUrl` |
| `forbidden` (HTTP 403, `connection_forbidden`) | Site serving is off, public serving is not allowed, or team policy blocks the connector | "You do not have permission to use this connection." |
| Any other error | The service or route is unavailable | The route's message and **Try again** |

`forbidden` arrives as an RFC 9457 problem, so the client reports it as
`state: "error"` with `error.code === "connection_forbidden"`. The tile data
from the last good answer stays on screen when a refresh fails.

The two tools are separate reads with separate states. If the 30-day history
read is loading, waiting for approval, needs a connection, or fails, the rate
tiles still show and the history read's own message takes the sparklines'
place.

## The same page in React

With a build step, install the client and let `sf dev` or `sf publish` write
the typed `spacefast.generated.ts` from this role (or run `sf client`):

```sh
npm install @spacefast/client react
```

```tsx
import { useConnector } from "@spacefast/client/react";
import { space } from "./spacefast.generated";

export function Rates() {
  const latest = useConnector(space.connectors.rates["currentRates.getLatest"], {}, { every: "60s" });

  if (latest.state === "loading") return <p>Reading rates…</p>;
  if (!latest.data) return <p>{latest.message}</p>;
  return (
    <ul>
      {Object.entries(latest.data.rates).map(([symbol, rate]) => (
        <li key={symbol}>
          EUR → {symbol}: {rate}
        </li>
      ))}
    </ul>
  );
}
```

The generated types leave out the pinned `base` and `symbols`, so the
arguments object is empty.

## Boundaries

- `/__spacefast/client.js` and the connectors route exist only on a published
  Space. Opened from disk or a plain static server, the page says so instead of
  showing rates. `sf build` still packs it.
- This repository's workflow builds the example but never publishes it. The
  Space needs a team in the Connectors program and a connection with site
  serving, which only a person with those rights can set up, so publishing is
  the manual steps above.
