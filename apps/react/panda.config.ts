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
      keyframes: {
        'collapse-in': {
          from: { height: '0px' },
          to: { height: 'var(--height)' },
        },
        'collapse-out': {
          from: { height: 'var(--height)' },
          to: { height: '0px' },
        },
        'fade-in': {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        'fade-out': {
          from: { opacity: 1 },
          to: { opacity: 0 },
        },
        shimmer: {
          '0%': {
            backgroundColor: 'rgba(165, 165, 165, 0.15)',
          },
          '50%': {
            backgroundColor: 'rgba(165, 165, 165, 0.4)',
          },
          '100%': {
            backgroundColor: 'rgba(165, 165, 165, 0.15)',
          },
        },
      },
    },
  },

  // The output directory for your css system
  outdir: 'styled-system',
  outExtension: 'js',
});
