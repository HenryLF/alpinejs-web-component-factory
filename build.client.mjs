import { build } from "esbuild";
await build({
  entryPoints: ["src/wcFactory.ts"],
  outfile: "dist/wcFactory.js",
  minify: false,
  allowOverwrite: true,
  target: ["es2020", "chrome58", "edge16", "firefox57", "node12", "safari11"],
});
await build({
  entryPoints: ["src/wcFactory.ts"],
  outfile: "dist/wcFactory.min.js",
  minify: true,
  allowOverwrite: true,
  target: ["es2020", "chrome58", "edge16", "firefox57", "node12", "safari11"],

});
