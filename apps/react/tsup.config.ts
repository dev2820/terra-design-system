import { defineConfig } from 'tsup';

export default defineConfig({
  entry: ['src/index.ts', 'src/Accordion/index.ts'],
  splitting: false,
  sourcemap: true,
  clean: true,
  platform: 'browser',
  format: ['esm', 'cjs'],
  dts: true,
});
