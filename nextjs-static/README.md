# Static Next.js on Spacefast

This App Router project uses `output: "export"`, so every route becomes a file
in `out/`. It needs no server runtime.

```sh
npm install
npm run dev
sf publish
```

`sf publish` sees `output: "export"`, runs the build, and ships `out/` as plain
files. No worker is packaged.
