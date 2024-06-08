export const colors = {
  black: {
    value: '#000000',
  },
  white: {
    value: '#FFFFFF',
  },
  whiteAlpha: {
    50: { value: 'rgba(255, 255, 255, 0.04)' },
    100: { value: 'rgba(255, 255, 255, 0.06)' },
    200: { value: 'rgba(255, 255, 255, 0.08)' },
    300: { value: 'rgba(255, 255, 255, 0.16)' },
    400: { value: 'rgba(255, 255, 255, 0.24)' },
    500: { value: 'rgba(255, 255, 255, 0.36)' },
    600: { value: 'rgba(255, 255, 255, 0.48)' },
    700: { value: 'rgba(255, 255, 255, 0.64)' },
    800: { value: 'rgba(255, 255, 255, 0.80)' },
    900: { value: 'rgba(255, 255, 255, 0.92)' },
  },
  blackAlpha: {
    50: { value: 'rgba(0, 0, 0, 0.04)' },
    100: { value: 'rgba(0, 0, 0, 0.06)' },
    200: { value: 'rgba(0, 0, 0, 0.08)' },
    300: { value: 'rgba(0, 0, 0, 0.16)' },
    400: { value: 'rgba(0, 0, 0, 0.24)' },
    500: { value: 'rgba(0, 0, 0, 0.36)' },
    600: { value: 'rgba(0, 0, 0, 0.48)' },
    700: { value: 'rgba(0, 0, 0, 0.64)' },
    800: { value: 'rgba(0, 0, 0, 0.80)' },
    900: { value: 'rgba(0, 0, 0, 0.92)' },
  },
  red: {
    50: { value: '#fef2f2' },
    100: { value: '#fee2e2' },
    200: { value: '#fecaca' },
    300: { value: '#fca5a5' },
    400: { value: '#f87171' },
    500: { value: '#ef4444' },
    600: { value: '#dc2626' },
    700: { value: '#b91c1c' },
    800: { value: '#991b1b' },
    900: { value: '#7f1d1d' },
  },
  blue: {
    50: { value: '#eff6ff' },
    100: { value: '#dbeafe' },
    200: { value: '#bfdbfe' },
    300: { value: '#93c5fd' },
    400: { value: '#60a5fa' },
    500: { value: '#3b82f6' },
    600: { value: '#2563eb' },
    700: { value: '#1d4ed8' },
    800: { value: '#1e40af' },
    900: { value: '#1e3a8a' },
  },
  green: {
    50: { value: '#f0fdf4' },
    100: { value: '#dcfce7' },
    200: { value: '#bbf7d0' },
    300: { value: '#86efac' },
    400: { value: '#4ade80' },
    500: { value: '#22c55e' },
    600: { value: '#16a34a' },
    700: { value: '#15803d' },
    800: { value: '#166534' },
    900: { value: '#14532d' },
  },
  yellow: {
    50: { value: '#fefce8' },
    100: { value: '#fef9c3' },
    200: { value: '#fef08a' },
    300: { value: '#fde047' },
    400: { value: '#facc15' },
    500: { value: '#eab308' },
    600: { value: '#ca8a04' },
    700: { value: '#a16207' },
    800: { value: '#854d0e' },
    900: { value: '#713f12' },
  },
  gray: {
    50: { value: '#f9fafb' },
    100: { value: '#f3f4f6' },
    200: { value: '#e5e7eb' },
    300: { value: '#d1d5db' },
    400: { value: '#9ca3af' },
    500: { value: '#6b7280' },
    600: { value: '#4b5563' },
    700: { value: '#374151' },
    800: { value: '#1f2937' },
    900: { value: '#111827' },
  },
  violet: {
    50: { value: '#f5f3ff' },
    100: { value: '#ede9fe' },
    200: { value: '#ddd6fe' },
    300: { value: '#c4b5fd' },
    400: { value: '#a78bfa' },
    500: { value: '#8b5cf6' },
    600: { value: '#7c3aed' },
    700: { value: '#6d28d9' },
    800: { value: '#5b21b6' },
    900: { value: '#4c1d95' },
  },
} as const;

export const spacing = {
  0: { value: '0rem' },
  1: { value: '0.25rem' }, // 4px
  2: { value: '0.5rem' }, // 8px
  3: { value: '0.75rem' }, // 12px
  4: { value: '1rem' }, // 16px
  5: { value: '1.25rem' }, // 20px
  6: { value: '1.5rem' }, // 24px
  8: { value: '2rem' }, // 32px
  10: { value: '2.5rem' }, // 40px
  12: { value: '3rem' }, // 48px
  14: { value: '3.5rem' }, // 56px
  16: { value: '4rem' }, // 64px
  20: { value: '5rem' }, // 80px
  24: { value: '6rem' }, // 96px
  28: { value: '7rem' }, // 112px
  32: { value: '8rem' }, // 128px
  36: { value: '9rem' }, // 144px
  40: { value: '10rem' }, // 160px
  44: { value: '11rem' }, // 176px
  48: { value: '12rem' }, // 192px
  52: { value: '13rem' }, // 208px
  56: { value: '14rem' }, // 224px
  60: { value: '15rem' }, // 240px
  64: { value: '16rem' }, // 256px
  72: { value: '18rem' }, // 288px
  80: { value: '20rem' }, // 320px
  96: { value: '24rem' }, // 384px
} as const;

export const fonts = {
  body: { value: 'Inter, sans-serif' },
  heading: { value: 'Roboto Mono, sans-serif' },
} as const;

export const fontSizes = {
  xs: { value: '0.75rem' }, // 12px
  sm: { value: '0.875rem' }, // 14px
  md: { value: '1rem' }, // 16px
  lg: { value: '1.125rem' }, // 18px
  xl: { value: '1.25rem' }, // 20px
  '2xl': { value: '1.5rem' }, // 24px
  '3xl': { value: '1.875rem' }, // 30px
  '4xl': { value: '2.25rem' }, // 36px
  '5xl': { value: '3rem' }, // 48px
  '6xl': { value: '3.75rem' }, // 60px
} as const;

export const fontWeights = {
  thin: { value: 100 },
  extraLight: { value: 200 },
  light: { value: 300 },
  normal: { value: 400 },
  medium: { value: 500 },
  semiBold: { value: 600 },
  bold: { value: 700 },
  extraBold: { value: 800 },
  black: { value: 900 },
} as const;

export const lineHeights = {
  normal: { value: '1.5' },
} as const;

export const radii = {
  none: { value: '0px' },
  sm: { value: '2px' },
  md: { value: '4px' },
  lg: { value: '8px' },
  xl: { value: '12px' },
  '2xl': { value: '16px' },
  '3xl': { value: '24px' },
  full: { value: '9999px' },
} as const;

export const shadows = {
  none: { value: 'none' },
  sm: { value: '0 1px 2px 0 rgba(0, 0, 0, 0.05)' },
  md: {
    value:
      '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  },
  lg: {
    value:
      '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  },
  xl: {
    value:
      '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  },
  '2xl': { value: '0 25px 50px -12px rgba(0, 0, 0, 0.25)' },
  inner: { value: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)' },
  outline: { value: '0 0 0 3px rgba(66, 153, 225, 0.5)' },
} as const;

export const opacity = {
  0: { value: '0' },
  10: { value: '0.1' },
  20: { value: '0.2' },
  30: { value: '0.3' },
  40: { value: '0.4' },
  50: { value: '0.5' },
  60: { value: '0.6' },
  70: { value: '0.7' },
  80: { value: '0.8' },
  90: { value: '0.9' },
  100: { value: '1' },
} as const;

export const zIndex = {
  auto: { value: 'auto' },
  base: { value: '0' },
  dropdown: { value: '1000' },
  overlay: { value: '1100' },
  modal: { value: '1200' },
  popover: { value: '1300' },
  tooltip: { value: '1400' },
};
