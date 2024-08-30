/** @type {import('tailwindcss').Config} */
import {
  colors as semanticColors,
  duration as semanticDuration,
  fontSizes as semanticFontSizes,
} from 'theme/tailwind/semanticToken';
import { colors, duration } from 'theme/tailwind/token';

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx,mdx}'],
  prefix: 'trds-',
  theme: {
    colors: { ...colors },
    duration: { ...duration },
    extend: {
      colors: {
        ...semanticColors,
      },
      duration: { ...semanticDuration },
      data: {
        open: 'state="open"',
        close: 'state="close"',
        current: 'current="true"',
        readonly: 'readonly="true"',
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
      },
      animation: {
        'collapse-in': 'collapseIn 0.15s ease-in-out',
        'collapse-out': 'collapseOut 0.15s ease-in-out',
      },
    },
  },
  plugins: [],
};
