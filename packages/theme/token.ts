export const colors = {
  transparent: 'transparent',
  black: '#000000',
  white: '#FFFFFF',
  whiteAlpha: {
    50: 'rgba(255, 255, 255, 0.04)',
    100: 'rgba(255, 255, 255, 0.06)',
    200: 'rgba(255, 255, 255, 0.08)',
    300: 'rgba(255, 255, 255, 0.16)',
    400: 'rgba(255, 255, 255, 0.24)',
    500: 'rgba(255, 255, 255, 0.36)',
    600: 'rgba(255, 255, 255, 0.48)',
    700: 'rgba(255, 255, 255, 0.64)',
    800: 'rgba(255, 255, 255, 0.80)',
    900: 'rgba(255, 255, 255, 0.92)',
  },
  blackAlpha: {
    50: 'rgba(0, 0, 0, 0.04)',
    100: 'rgba(0, 0, 0, 0.06)',
    200: 'rgba(0, 0, 0, 0.08)',
    300: 'rgba(0, 0, 0, 0.16)',
    400: 'rgba(0, 0, 0, 0.24)',
    500: 'rgba(0, 0, 0, 0.36)',
    600: 'rgba(0, 0, 0, 0.48)',
    700: 'rgba(0, 0, 0, 0.64)',
    800: 'rgba(0, 0, 0, 0.80)',
    900: 'rgba(0, 0, 0, 0.92)',
  },
  red: {
    50: '#fef2f2',
    100: '#fee2e2',
    200: '#fecaca',
    300: '#fca5a5',
    400: '#f87171',
    500: '#ef4444',
    600: '#dc2626',
    700: '#b91c1c',
    800: '#991b1b',
    900: '#7f1d1d',
  },
  blue: {
    50: '#eff6ff',
    100: '#dbeafe',
    200: '#bfdbfe',
    300: '#93c5fd',
    400: '#60a5fa',
    500: '#3b82f6',
    600: '#2563eb',
    700: '#1d4ed8',
    800: '#1e40af',
    900: '#1e3a8a',
  },
  green: {
    50: '#f0fdf4',
    100: '#dcfce7',
    200: '#bbf7d0',
    300: '#86efac',
    400: '#4ade80',
    500: '#22c55e',
    600: '#16a34a',
    700: '#15803d',
    800: '#166534',
    900: '#14532d',
  },
  orange: {
    50: '#fff7ed',
    100: '#ffedd5',
    200: '#fed7aa',
    300: '#fdba74',
    400: '#fb923c',
    500: '#f97316',
    600: '#ea580c',
    700: '#c2410c',
    800: '#9a3412',
    900: '#7c2d12',
  },
  yellow: {
    50: '#fefce8',
    100: '#fef9c3',
    200: '#fef08a',
    300: '#fde047',
    400: '#facc15',
    500: '#eab308',
    600: '#ca8a04',
    700: '#a16207',
    800: '#854d0e',
    900: '#713f12',
  },
  gray: {
    50: '#f9fafb',
    100: '#f3f4f6',
    200: '#e5e7eb',
    300: '#d1d5db',
    400: '#9ca3af',
    500: '#6b7280',
    600: '#4b5563',
    700: '#374151',
    800: '#1f2937',
    900: '#111827',
  },
  violet: {
    50: '#f5f3ff',
    100: '#ede9fe',
    200: '#ddd6fe',
    300: '#c4b5fd',
    400: '#a78bfa',
    500: '#8b5cf6',
    600: '#7c3aed',
    700: '#6d28d9',
    800: '#5b21b6',
    900: '#4c1d95',
  },
} as const;

export const spacing = {
  0: '0rem',
  1: '0.25rem', // 4px
  2: '0.5rem', // 8px
  3: '0.75rem', // 12px
  4: '1rem', // 16px
  5: '1.25rem', // 20px
  6: '1.5rem', // 24px
  8: '2rem', // 32px
  10: '2.5rem', // 40px
  12: '3rem', // 48px
  14: '3.5rem', // 56px
  16: '4rem', // 64px
  20: '5rem', // 80px
  24: '6rem', // 96px
  28: '7rem', // 112px
  32: '8rem', // 128px
  36: '9rem', // 144px
  40: '10rem', // 160px
  44: '11rem', // 176px
  48: '12rem', // 192px
  52: '13rem', // 208px
  56: '14rem', // 224px
  60: '15rem', // 240px
  64: '16rem', // 256px
  72: '18rem', // 288px
  80: '20rem', // 320px
  96: '24rem', // 384px
} as const;

export const fonts = {
  body: 'Inter, sans-serif',
  heading: 'Roboto Mono, sans-serif',
} as const;

export const fontSizes = {
  xs: '0.75rem', // 12px
  sm: '0.875rem', // 14px
  md: '1rem', // 16px
  lg: '1.125rem', // 18px
  xl: '1.25rem', // 20px
  '2xl': '1.5rem', // 24px
  '3xl': '1.875rem', // 30px
  '4xl': '2.25rem', // 36px
  '5xl': '3rem', // 48px
  '6xl': '3.75rem', // 60px
} as const;

export const fontWeights = {
  thin: 100,
  extraLight: 200,
  light: 300,
  normal: 400,
  medium: 500,
  semiBold: 600,
  bold: 700,
  extraBold: 800,
  black: 900,
} as const;

export const lineHeights = {
  normal: '1.5',
} as const;

export const radii = {
  none: '0px',
  sm: '2px',
  md: '4px',
  lg: '8px',
  xl: '12px',
  '2xl': '16px',
  '3xl': '24px',
  full: '9999px',
} as const;

export const shadows = {
  none: 'none',
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
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
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.06)',
  outline: '0 0 0 3px rgba(66, 153, 225, 0.5)',
} as const;

export const opacity = {
  0: '0',
  10: '0.1',
  20: '0.2',
  30: '0.3',
  40: '0.4',
  50: '0.5',
  60: '0.6',
  70: '0.7',
  80: '0.8',
  90: '0.9',
  100: '1',
} as const;

export const zIndex = {
  auto: 'auto',
  base: '0',
  elevated: '1',
  dropdown: '1000',
  overlay: '1100',
  modal: '1200',
  popover: '1300',
  tooltip: '1400',
};

export const duration = {
  0: '0s',
  50: '50ms',
  100: '100ms',
  150: '150ms',
  200: '200ms',
  300: '300ms',
  500: '500ms',
  700: '700ms',
  800: '800ms',
  1000: '1000ms',
  2000: '2000ms',
  3000: '3000ms',
};

export const keyframes = {
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
  drawerInBottom: {
    from: {
      transform: 'translateY(100%)',
    },
    to: {
      transform: 'translateY(0px)',
    },
  },
  drawerOutBottom: {
    from: {
      transform: 'translateY(0px)',
    },
    to: {
      transform: 'translateY(100%)',
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
  spin: {
    '0%': {
      transform: 'rotate(0deg)',
    },
    '100%': {
      transform: 'rotate(360deg)',
    },
  },
};

export const animations = {
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
  'drawer-in-bottom': 'drawerInBottom 0.25s ease-out',
  'drawer-out-bottom': 'drawerOutBottom 0.25s ease-out',
  'dialog-in': 'dialogIn 0.25s ease-out',
  'dialog-out': 'dialogOut 0.25s ease-out',
  shimmer: 'shimmer 2s ease-in-out infinite',
  'fade-in-once': 'fadeIn 0.2s ease-in 1',
  spin: 'spin 0.5s linear infinite',
};
