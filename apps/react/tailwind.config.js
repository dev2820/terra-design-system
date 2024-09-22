/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin';
import {
  colors as semanticColors,
  duration as semanticDuration,
} from 'theme/semanticToken';
import { colors, duration, zIndex, keyframes, animations } from 'theme/token';

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx,mdx}'],
  theme: {
    colors: { ...colors },
    duration: { ...duration },
    zIndex: { ...zIndex },
    keyframes: { ...keyframes },
    animation: { ...animations },
    extend: {
      colors: { ...semanticColors },
      duration: { ...semanticDuration },
      data: {
        open: 'state="open"',
        closed: 'state="closed"',
        checked: 'state="checked"',
        highlighted: 'highlighted',
        indeterminate: 'indeterminate',
        readonly: 'readonly',
        current: 'current',
        disabled: 'disabled',
        today: 'today',
        selected: 'selected',
        vertical: 'orientation="vertical"',
        horizontal: 'orientation="horizontal"',
        'in-range': 'in-range',
        focus: 'focus',
        invalid: 'invalid',
      },
    },
  },
  plugins: [
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        {
          'translate-z': value => ({
            '--tw-translate-z': value,
            transform: ` translate3d(var(--tw-translate-x), var(--tw-translate-y), var(--tw-translate-z)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y))`,
          }), // this is actual CSS
        },
        { values: theme('translate'), supportsNegativeValues: true },
      );
    }),
    function ({ addBase }) {
      addBase({
        '[hidden]': {
          display: 'none !important',
        },
        '.break-anywhere': {
          'overflow-wrap': 'anywhere',
        },
        '.custom-translate': {
          translate: 'var(--x) var(--y) 0',
          scale: 'var(--scale)',
        },
      });
    },
  ],
};
