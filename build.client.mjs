import { build } from "esbuild";

const config = {
  entryPoints: ["src/WebComponentFactory.ts"],
};
await build({
  outfile: "dist/WebComponentFactory.bundle.js",
  minify: false,
  ...config,
});
await build({
  outfile: "dist/WebComponentFactory.bundle.min.js",
  minify: true,
  ...config,
});
await build({
  outfile: "dist/WebComponentFactory.js",
  minify: true,
  bundle: false,
  ...config,
});
await build({
  ...config,
  entryPoints: ["example/index.ts"],
  outdir: "example/",
  minify: false,
  bundle: true,
});
await build({
  ...config,
  entryPoints: ["example.ts"],
  outdir: ".",
  minify: false,
  bundle: true,
});
