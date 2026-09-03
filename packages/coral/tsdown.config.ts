import { defineConfig } from "tsdown";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    accordion: "src/accordion/index.ts",
    "use-render": "src/core/index.ts",
  },
  format: "esm",
  platform: "neutral",
  dts: true,
  sourcemap: true,
  minify: false,
  deps: {
    neverBundle: true,
  },
});
