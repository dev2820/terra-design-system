import * as TOKEN from './token';

export const colors = {
  primary: {
    DEFAULT: 'var(--my-colors-primary, {colors.violet.500})',
    50: 'var(--my-colors-primary-50, {colors.violet.50})',
    100: 'var(--my-colors-primary-100, {colors.violet.100})',
    200: 'var(--my-colors-primary-200, {colors.violet.200})',
    300: 'var(--my-colors-primary-300, {colors.violet.300})',
    400: 'var(--my-colors-primary-400, {colors.violet.400})',
    500: 'var(--my-colors-primary-500, {colors.violet.500})',
    600: 'var(--my-colors-primary-600, {colors.violet.600})',
    700: 'var(--my-colors-primary-700, {colors.violet.700})',
    800: 'var(--my-colors-primary-800, {colors.violet.800})',
    900: 'var(--my-colors-primary-900, {colors.violet.900})',
    light: 'var(--my-colors-primary-light, {colors.violet.200})',
    dark: 'var(--my-colors-primary-dark, {colors.violet.600})',
    foreground: 'var(--my-colors-primary-foreground, {colors.white})',
  },
  info: {
    DEFAULT: 'var(--my-colors-info, {colors.blue.500})',
    50: 'var(--my-colors-info-50, {colors.blue.50})',
    100: 'var(--my-colors-info-100, {colors.blue.100})',
    200: 'var(--my-colors-info-200, {colors.blue.200})',
    300: 'var(--my-colors-info-300, {colors.blue.300})',
    400: 'var(--my-colors-info-400, {colors.blue.400})',
    500: 'var(--my-colors-info-500, {colors.blue.500})',
    600: 'var(--my-colors-info-600, {colors.blue.600})',
    700: 'var(--my-colors-info-700, {colors.blue.700})',
    800: 'var(--my-colors-info-800, {colors.blue.800})',
    900: 'var(--my-colors-info-900, {colors.blue.900})',
    light: 'var(--my-colors-info-light, {colors.blue.200})',
    dark: 'var(--my-colors-info-dark, {colors.blue.600})',
    foreground: 'var(--my-colors-info-foreground, {colors.white})',
  },
  success: {
    DEFAULT: 'var(--my-colors-success, {colors.green.500})',
    50: 'var(--my-colors-success-50, {colors.green.50})',
    100: 'var(--my-colors-success-100, {colors.green.100})',
    200: 'var(--my-colors-success-200, {colors.green.200})',
    300: 'var(--my-colors-success-300, {colors.green.300})',
    400: 'var(--my-colors-success-400, {colors.green.400})',
    500: 'var(--my-colors-success-500, {colors.green.500})',
    600: 'var(--my-colors-success-600, {colors.green.600})',
    700: 'var(--my-colors-success-700, {colors.green.700})',
    800: 'var(--my-colors-success-800, {colors.green.800})',
    900: 'var(--my-colors-success-900, {colors.green.900})',
    light: 'var(--my-colors-success-light, {colors.green.200})',
    dark: 'var(--my-colors-success-dark, {colors.green.600})',
    foreground: 'var(--my-colors-success-foreground, {colors.white})',
  },
  error: {
    DEFAULT: 'var(--my-colors-error, {colors.red.500})',
    50: 'var(--my-colors-error-50, {colors.red.50})',
    100: 'var(--my-colors-error-100, {colors.red.100})',
    200: 'var(--my-colors-error-200, {colors.red.200})',
    300: 'var(--my-colors-error-300, {colors.red.300})',
    400: 'var(--my-colors-error-400, {colors.red.400})',
    500: 'var(--my-colors-error-500, {colors.red.500})',
    600: 'var(--my-colors-error-600, {colors.red.600})',
    700: 'var(--my-colors-error-700, {colors.red.700})',
    800: 'var(--my-colors-error-800, {colors.red.800})',
    900: 'var(--my-colors-error-900, {colors.red.900})',
    light: 'var(--my-colors-error-light, {colors.red.200})',
    dark: 'var(--my-colors-error-dark, {colors.red.600})',
    foreground: 'var(--my-colors-error-foreground, {colors.white})',
  },
  warning: {
    DEFAULT: 'var(--my-colors-warning, {colors.orange.500})',
    50: 'var(--my-colors-warning-50, {colors.orange.50})',
    100: 'var(--my-colors-warning-100, {colors.orange.100})',
    200: 'var(--my-colors-warning-200, {colors.orange.200})',
    300: 'var(--my-colors-warning-300, {colors.orange.300})',
    400: 'var(--my-colors-warning-400, {colors.orange.400})',
    500: 'var(--my-colors-warning-500, {colors.orange.500})',
    600: 'var(--my-colors-warning-600, {colors.orange.600})',
    700: 'var(--my-colors-warning-700, {colors.orange.700})',
    800: 'var(--my-colors-warning-800, {colors.orange.800})',
    900: 'var(--my-colors-warning-900, {colors.orange.900})',
    light: 'var(--my-colors-warning-light, {colors.orange.200})',
    dark: 'var(--my-colors-warning-dark, {colors.orange.600})',
    foreground: 'var(--my-colors-warning-foreground, {colors.white})',
  },
  neutral: {
    DEFAULT: `var(--my-colors-neutral, ${TOKEN.colors.gray[100]})`,
    50: `var(--my-colors-neutral-50, ${TOKEN.colors.gray[50]})`,
    100: `var(--my-colors-neutral-100, ${TOKEN.colors.gray[100]})`,
    200: `var(--my-colors-neutral-200, ${TOKEN.colors.gray[200]})`,
    300: `var(--my-colors-neutral-300, ${TOKEN.colors.gray[300]})`,
    400: `var(--my-colors-neutral-400, ${TOKEN.colors.gray[400]})`,
    500: `var(--my-colors-neutral-500, ${TOKEN.colors.gray[500]})`,
    600: `var(--my-colors-neutral-600, ${TOKEN.colors.gray[600]})`,
    700: `var(--my-colors-neutral-700, ${TOKEN.colors.gray[700]})`,
    800: `var(--my-colors-neutral-800, ${TOKEN.colors.gray[800]})`,
    900: `var(--my-colors-neutral-900, ${TOKEN.colors.gray[900]})`,
    foreground: `var(--my-colors-neutral-foreground, ${TOKEN.colors.black})`,
  },
  fg: {
    neutral: `var(--my-colors-fg-neutral, ${TOKEN.colors.black})`,
  },
  muted: {
    DEFAULT: `var(--my-colors-muted, ${TOKEN.colors.gray[300]})`,
  },
  boundary: `var(--my-colors-boundary, ${TOKEN.colors.gray[300]})`,
};

export const duration = {
  normal: {
    DEFAULT: 'var(--my-duration-normal, 300ms)',
  },
};
