import { defineConfig } from '@pandacss/dev';
import * as semanticTokens from 'theme/semanticToken';
import * as tokens from 'theme/token';

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  // Where to look for your css declarations
  include: ['./src/**/*.{js,jsx,ts,tsx}', './stories/**/*.{js,jsx,ts,tsx}'],

  // Files to exclude
  exclude: [],

  // Useful for theme customization
  theme: {
    extend: {
      tokens,
      semanticTokens,
    },
  },

  // The output directory for your css system
  outdir: 'styled-system',
  outExtension: 'js',
});
