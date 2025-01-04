/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin';
import {
  colors as semanticColors,
  duration as semanticDuration,
  opacity as semanticOpacity,
} from 'theme/semanticToken';
import { colors, duration, zIndex, keyframes, animations } from 'theme/token';

export default {
  content: ['./src/**/*.{js,jsx,ts,tsx,mdx}'],
  prefix: 'trds-',
  theme: {
    colors: { ...colors },
    transitionDuration: { ...duration },
    zIndex: { ...zIndex },
    keyframes: { ...keyframes },
    animation: { ...animations },
    extend: {
      colors: { ...semanticColors },
      transitionDuration: { ...semanticDuration },
      opacity: { ...semanticOpacity },
      data: {
        open: 'state="open"',
        closed: 'state="closed"',
        checked: 'state="checked"',
        invalid: 'invalid',
        focus: 'focus',
        indeterminate: 'state="indeterminate"',
        highlighted: 'highlighted',
        readonly: 'readonly',
        current: 'current',
        disabled: 'disabled',
        today: 'today',
        selected: 'selected',
        vertical: 'orientation="vertical"',
        horizontal: 'orientation="horizontal"',
        'placeholder-shown': 'placeholder-shown',
        'in-range': 'in-range',
      },
    },
  },
  variants: {
    extend: {
      backgroundColor: ['hover', 'active', 'no-hover'],
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
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
        '.trds-break-anywhere': {
          'overflow-wrap': 'anywhere',
        },
        '.trds-custom-translate': {
          translate: 'var(--x) var(--y) 0',
          scale: 'var(--scale)',
        },
      });
    },
  ],
};
