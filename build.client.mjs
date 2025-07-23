import { build } from "esbuild";

const config = {
  entryPoints: ["src/wcFactory.ts"],
};
await build({
  outfile: "dist/wcFactory.js",
  minify: false,
  ...config,
});
await build({
  outfile: "dist/wcFactory.min.js",
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
