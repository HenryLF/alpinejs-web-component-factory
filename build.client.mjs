import { build } from "esbuild";

const config = {
  entryPoints: ["src/WebComponentFactory.ts"],
};
await build({
  outfile: "dist/WebComponentFactory.js",
  minify: false,
  ...config,
});
await build({
  outfile: "dist/WebComponentFactory.min.js",
  minify: true,
  ...config,
});
await build({
  ...config,
  entryPoints : ["example/index.ts"],
  outdir: "example/",
  minify: false,
  bundle: true,
});
