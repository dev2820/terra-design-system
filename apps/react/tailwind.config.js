/** @type {import('tailwindcss').Config} */
import {
  colors as semanticColors,
  duration as semanticDuration,
} from 'theme/tailwind/semanticToken';
import { colors, duration, zIndex } from 'theme/tailwind/token';

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx,mdx}'],
  prefix: 'trds-',
  theme: {
    colors: { ...colors },
    duration: { ...duration },
    zIndex: { ...zIndex },
    extend: {
      colors: {
        ...semanticColors,
      },
      duration: { ...semanticDuration },
      data: {
        open: 'state="open"',
        close: 'state="close"',
      },
      keyframes: {
        collapseIn: {
          from: { height: '0px' },
          to: { height: 'var(--height)' },
        },
        collapseOut: {
          from: { height: 'var(--height)' },
          to: { height: '0px' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        fadeOut: {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
      },
      animation: {
        'collapse-in': 'collapseIn 0.15s ease-in-out',
        'collapse-out': 'collapseOut 0.15s ease-in-out',
        'fade-in': 'fadeIn 0.25s ease-out',
        'fade-out': 'fadeOut 0.25s ease-out',
      },
    },
  },
  plugins: [],
};
