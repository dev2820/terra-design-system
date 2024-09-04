/** @type {import('tailwindcss').Config} */
import plugin from 'tailwindcss/plugin';
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
        closed: 'state="closed"',
        checked: 'state="checked"',
        highlighted: 'highlighted',
        disabled: 'disabled',
        today: 'today',
        selected: 'selected',
        vertical: 'orientation="vertical"',
        horizontal: 'orientation="horizontal"',
        'in-range': 'in-range',
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
        backdropIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        backdropOut: {
          from: { opacity: '1' },
          to: { opacity: '0' },
        },
        drawerInLeft: {
          from: {
            transform: 'translateX(-100%)',
          },
          to: {
            transform: 'translateX(0px)',
          },
        },
        drawerOutLeft: {
          from: {
            transform: 'translateX(0px)',
          },
          to: {
            transform: 'translateX(-100%)',
          },
        },
        drawerInRight: {
          from: {
            transform: 'translateX(100%)',
          },
          to: {
            transform: 'translateX(0px)',
          },
        },
        drawerOutRight: {
          from: {
            transform: 'translateX(0px)',
          },
          to: {
            transform: 'translateX(100%)',
          },
        },
        dialogIn: {
          from: {
            opacity: '0',
            transform: 'translateY(30px)',
            scale: '0.95',
          },
          to: {
            opacity: '1',
            transform: 'translateY(0px)',
            scale: '1',
          },
        },
        dialogOut: {
          from: {
            opacity: '1',
            scale: '1',
          },
          to: {
            opacity: '0',
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
      animation: {
        'collapse-in': 'collapseIn 0.15s ease-in-out',
        'collapse-out': 'collapseOut 0.15s ease-in-out',
        'fade-in': 'fadeIn 0.25s ease-out',
        'fade-out': 'fadeOut 0.25s ease-out',
        'backdrop-in': 'backdropIn 0.2s ease-out',
        'backdrop-out': 'backdropOut 0.15s ease-out',
        'drawer-in-left': 'drawerInLeft 0.25s ease-out',
        'drawer-in-right': 'drawerInRight 0.25s ease-out',
        'drawer-out-left': 'drawerOutLeft 0.25s ease-out',
        'drawer-out-right': 'drawerOutRight 0.25s ease-out',
        'dialog-in': 'dialogIn 0.25s ease-out',
        'dialog-out': 'dialogOut 0.25s ease-out',
        shimmer: 'shimmer 2s ease-in-out infinite',
        'fade-in-once': 'fadeIn 0.2s ease-in 1',
        spin: 'spin 0.6s linear infinite',
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
