import { defineConfig } from "tsdown";

export default defineConfig({
  entry: "src/index.ts",
  format: "esm",
  platform: "neutral",
  dts: true,
  sourcemap: true,
  minify: false,
  deps: {
    neverBundle: true,
  },
});
