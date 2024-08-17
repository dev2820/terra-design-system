import { defineConfig } from '@pandacss/dev';
import { IDENTIFIER } from 'env';
import * as semanticTokens from 'theme/semanticToken';
import * as tokens from 'theme/token';

export default defineConfig({
  // Whether to use css reset
  preflight: {
    scope: `.${IDENTIFIER.scope}`,
  },

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
        'backdrop-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'backdrop-out': {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'fade-out': {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
        'drawer-in-left': {
          from: {
            transform: 'translateX(-100%)',
          },
          to: {
            transform: 'translateX(0px)',
          },
        },
        'drawer-out-left': {
          from: {
            transform: 'translateX(0px)',
          },
          to: {
            transform: 'translateX(-100%)',
          },
        },
        'drawer-in-right': {
          from: {
            transform: 'translateX(100%)',
          },
          to: {
            transform: 'translateX(0px)',
          },
        },
        'drawer-out-right': {
          from: {
            transform: 'translateX(0px)',
          },
          to: {
            transform: 'translateX(100%)',
          },
        },
        'dialog-in': {
          from: {
            opacity: 0,
            transform: 'translateY(30px)',
            scale: '0.95',
          },
          to: {
            opacity: 1,
            transform: 'translateY(0px)',
            scale: '1',
          },
        },
        'dialog-out': {
          from: {
            opacity: 1,
            scale: '1',
          },
          to: {
            opacity: 0,
            scale: '0.95',
          },
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
