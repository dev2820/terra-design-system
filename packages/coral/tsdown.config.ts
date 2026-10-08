import { defineConfig } from "tsdown";

export default defineConfig({
  entry: {
    index: "src/index.ts",
    accordion: "src/accordion/index.ts",
    avatar: "src/avatar/index.ts",
    checkbox: "src/checkbox/index.ts",
    field: "src/field/index.ts",
    fieldset: "src/fieldset/index.ts",
    input: "src/input/index.ts",
    meter: "src/meter/index.ts",
    progress: "src/progress/index.ts",
    "radio-group": "src/radio-group/index.ts",
    separator: "src/separator/index.ts",
    switch: "src/switch/index.ts",
    toggle: "src/toggle/index.ts",
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
