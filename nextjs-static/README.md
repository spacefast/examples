# Static Next.js on Spacefast

This App Router project uses `output: "export"`, so every route becomes a file
in `out/`. It needs no server runtime.

```sh
npm install
npm run build
sf publish out
```

Publish `out/`, not the source directory. A source-level Next.js publish is
treated as a server-rendered application; choosing the finished export makes
the all-static intent explicit.
