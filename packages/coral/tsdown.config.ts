import { defineConfig } from "tsdown";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    accordion: "src/accordion/index.ts",
    avatar: "src/avatar/index.ts",
    field: "src/field/index.ts",
    fieldset: "src/fieldset/index.ts",
    input: "src/input/index.ts",
    meter: "src/meter/index.ts",
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
