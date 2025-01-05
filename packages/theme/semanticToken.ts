import * as TOKEN from './token';

export const colors = {
  primary: {
    DEFAULT: `var(--my-colors-primary, ${TOKEN.colors.violet[800]})`,
    50: `var(--my-colors-primary-50, ${TOKEN.colors.violet[50]})`,
    100: `var(--my-colors-primary-100, ${TOKEN.colors.violet[100]})`,
    200: `var(--my-colors-primary-200, ${TOKEN.colors.violet[200]})`,
    300: `var(--my-colors-primary-300, ${TOKEN.colors.violet[300]})`,
    400: `var(--my-colors-primary-400, ${TOKEN.colors.violet[400]})`,
    500: `var(--my-colors-primary-500, ${TOKEN.colors.violet[500]})`,
    600: `var(--my-colors-primary-600, ${TOKEN.colors.violet[600]})`,
    700: `var(--my-colors-primary-700, ${TOKEN.colors.violet[700]})`,
    800: `var(--my-colors-primary-800, ${TOKEN.colors.violet[800]})`,
    900: `var(--my-colors-primary-900, ${TOKEN.colors.violet[900]})`,
    stronger: `var(--my-colors-primary-stronger, ${TOKEN.colors.violet[700]})`,
    strong: `var(--my-colors-primary-strong, ${TOKEN.colors.violet[600]})`,
    subtle: `var(--my-colors-primary-subtle, ${TOKEN.colors.violet[400]})`,
    subtler: `var(--my-colors-primary-subtler, ${TOKEN.colors.violet[300]})`, //used
    subtlest: `var(--my-colors-primary-subtlest, ${TOKEN.colors.violet[200]})`, //used
    alpha: `var(--my-colors-primary-alpha, ${TOKEN.colors.violet[500]}1F)`, //used
    alpha2: `var(--my-colors-primary-alpha2, ${TOKEN.colors.violet[500]}3D)`, //used
    dark: `var(--my-colors-primary-dark, ${TOKEN.colors.violet[600]})`,
    hover: `var(--my-colors-primary-hover, ${TOKEN.colors.violet[600]})`,
    pressed: `var(--my-colors-primary-pressed, ${TOKEN.colors.violet[700]})`,
    visited: `var(--my-colors-primary-visited, ${TOKEN.colors.violet[700]})`,
    fill: `var(--my-colors-primary-fill, ${TOKEN.colors.violet[200]})`,
    fg: `var(--my-colors-primary-fg, ${TOKEN.colors.violet[500]})`,
    inverse: `var(--my-colors-primary-inverse, ${TOKEN.colors.white})`,
    layer: `var(--my-colors-primary-layer, ${TOKEN.colors.violet[50]})`,
    boundary: `var(--my-colors-primary-boundary, ${TOKEN.colors.violet[500]})`,
    shadow: `var(--my-colors-primary-shadow, ${TOKEN.colors.violet[500]})`, //used
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
    subtlest: `var(--my-colors-primary-subtlest, ${TOKEN.colors.violet[200]})`, //used
    subtler: `var(--my-colors-primary-subtler, ${TOKEN.colors.violet[300]})`, //used
    subtle: `var(--my-colors-neutral-subtle, ${TOKEN.colors.gray[50]})`,
    strong: `var(--my-colors-neutral-strong, ${TOKEN.colors.gray[200]})`,
    stronger: `var(--my-colors-neutral-stronger, ${TOKEN.colors.gray[300]})`,
    alpha: `var(--my-colors-neutral-alpha, ${TOKEN.colors.gray[500]}1F)`, //used
    alpha2: `var(--my-colors-neutral-alpha2, ${TOKEN.colors.gray[500]}3D)`, //used
    visited: `var(--my-colors-neutral-visited, ${TOKEN.colors.gray[400]})`,
    fg: `var(--my-colors-neutral-fg, ${TOKEN.colors.gray[800]})`,
    inverse: `var(--my-colors-neutral-inverse, ${TOKEN.colors.gray[800]})`,
    title: `var(--my-colors-neutral-title, ${TOKEN.colors.gray[900]})`,
    description: `var(--my-colors-neutral-title, ${TOKEN.colors.gray[800]})`,
    boundary: `var(--my-colors-neutral-boundary, ${TOKEN.colors.gray[200]})`,
  },
  info: {
    DEFAULT: `var(--my-colors-info, ${TOKEN.colors.blue[500]})`,
    50: `var(--my-colors-info-50, ${TOKEN.colors.blue[50]})`,
    100: `var(--my-colors-info-100, ${TOKEN.colors.blue[100]})`,
    200: `var(--my-colors-info-200, ${TOKEN.colors.blue[200]})`,
    300: `var(--my-colors-info-300, ${TOKEN.colors.blue[300]})`,
    400: `var(--my-colors-info-400, ${TOKEN.colors.blue[400]})`,
    500: `var(--my-colors-info-500, ${TOKEN.colors.blue[500]})`,
    600: `var(--my-colors-info-600, ${TOKEN.colors.blue[600]})`,
    700: `var(--my-colors-info-700, ${TOKEN.colors.blue[700]})`,
    800: `var(--my-colors-info-800, ${TOKEN.colors.blue[800]})`,
    900: `var(--my-colors-info-900, ${TOKEN.colors.blue[900]})`,
    stronger: `var(--my-colors-info-stronger, ${TOKEN.colors.blue[700]})`,
    strong: `var(--my-colors-info-strong, ${TOKEN.colors.blue[600]})`,
    subtle: `var(--my-colors-info-subtle, ${TOKEN.colors.blue[400]})`,
    subtler: `var(--my-colors-info-subtler, ${TOKEN.colors.blue[300]})`, //used
    subtlest: `var(--my-colors-info-subtlest, ${TOKEN.colors.blue[200]})`, //used
    alpha: `var(--my-colors-info-alpha, ${TOKEN.colors.blue[500]}1F)`, //used
    alpha2: `var(--my-colors-info-alpha2, ${TOKEN.colors.blue[500]}3D)`, //used
    dark: `var(--my-colors-info-dark, ${TOKEN.colors.blue[600]})`,
    hover: `var(--my-colors-info-hover, ${TOKEN.colors.blue[600]})`,
    pressed: `var(--my-colors-info-pressed, ${TOKEN.colors.blue[700]})`,
    fg: `var(--my-colors-info-fg, ${TOKEN.colors.blue[500]})`,
    inverse: `var(--my-colors-info-inverse, ${TOKEN.colors.white})`,
    layer: `var(--my-colors-info-layer, ${TOKEN.colors.blue[50]})`,
    boundary: `var(--my-colors-info-boundary, ${TOKEN.colors.blue[200]})`,
  },
  success: {
    DEFAULT: `var(--my-colors-success, ${TOKEN.colors.green[500]})`,
    50: `var(--my-colors-success-50, ${TOKEN.colors.green[50]})`,
    100: `var(--my-colors-success-100, ${TOKEN.colors.green[100]})`,
    200: `var(--my-colors-success-200, ${TOKEN.colors.green[200]})`,
    300: `var(--my-colors-success-300, ${TOKEN.colors.green[300]})`,
    400: `var(--my-colors-success-400, ${TOKEN.colors.green[400]})`,
    500: `var(--my-colors-success-500, ${TOKEN.colors.green[500]})`,
    600: `var(--my-colors-success-600, ${TOKEN.colors.green[600]})`,
    700: `var(--my-colors-success-700, ${TOKEN.colors.green[700]})`,
    800: `var(--my-colors-success-800, ${TOKEN.colors.green[800]})`,
    900: `var(--my-colors-success-900, ${TOKEN.colors.green[900]})`,
    stronger: `var(--my-colors-success-stronger, ${TOKEN.colors.green[700]})`,
    strong: `var(--my-colors-success-strong, ${TOKEN.colors.green[600]})`,
    subtle: `var(--my-colors-success-subtle, ${TOKEN.colors.green[400]})`,
    subtler: `var(--my-colors-success-subtler, ${TOKEN.colors.green[300]})`, //used
    subtlest: `var(--my-colors-success-subtlest, ${TOKEN.colors.green[200]})`, //used
    alpha: `var(--my-colors-success-alpha, ${TOKEN.colors.green[500]}1F)`, //used
    alpha2: `var(--my-colors-success-alpha2, ${TOKEN.colors.green[500]}3D)`, //used
    dark: `var(--my-colors-success-dark, ${TOKEN.colors.green[600]})`,
    hover: `var(--my-colors-success-hover, ${TOKEN.colors.green[600]})`,
    pressed: `var(--my-colors-success-pressed, ${TOKEN.colors.green[700]})`,
    fg: `var(--my-colors-success-fg, ${TOKEN.colors.green[500]})`,
    inverse: `var(--my-colors-success-inverse, ${TOKEN.colors.white})`,
    layer: `var(--my-colors-success-layer, ${TOKEN.colors.green[50]})`,
    boundary: `var(--my-colors-success-boundary, ${TOKEN.colors.green[200]})`,
  },
  danger: {
    DEFAULT: `var(--my-colors-danger, ${TOKEN.colors.red[500]})`,
    50: `var(--my-colors-danger-50, ${TOKEN.colors.red[50]})`,
    100: `var(--my-colors-danger-100, ${TOKEN.colors.red[100]})`,
    200: `var(--my-colors-danger-200, ${TOKEN.colors.red[200]})`,
    300: `var(--my-colors-danger-300, ${TOKEN.colors.red[300]})`,
    400: `var(--my-colors-danger-400, ${TOKEN.colors.red[400]})`,
    500: `var(--my-colors-danger-500, ${TOKEN.colors.red[500]})`,
    600: `var(--my-colors-danger-600, ${TOKEN.colors.red[600]})`,
    700: `var(--my-colors-danger-700, ${TOKEN.colors.red[700]})`,
    800: `var(--my-colors-danger-800, ${TOKEN.colors.red[800]})`,
    900: `var(--my-colors-danger-900, ${TOKEN.colors.red[900]})`,
    stronger: `var(--my-colors-danger-stronger, ${TOKEN.colors.red[700]})`,
    strong: `var(--my-colors-danger-strong, ${TOKEN.colors.red[600]})`,
    subtle: `var(--my-colors-danger-subtle, ${TOKEN.colors.red[400]})`,
    subtler: `var(--my-colors-danger-subtler, ${TOKEN.colors.red[300]})`, //used
    subtlest: `var(--my-colors-danger-subtlest, ${TOKEN.colors.red[200]})`, //used
    alpha: `var(--my-colors-danger-alpha, ${TOKEN.colors.red[500]}1F)`, //used
    alpha2: `var(--my-colors-danger-alpha2, ${TOKEN.colors.red[500]}3D)`, //used
    dark: `var(--my-colors-danger-dark, ${TOKEN.colors.red[600]})`,
    hover: `var(--my-colors-danger-hover, ${TOKEN.colors.red[600]})`,
    pressed: `var(--my-colors-danger-pressed, ${TOKEN.colors.red[700]})`,
    fg: `var(--my-colors-danger-fg, ${TOKEN.colors.red[500]})`,
    inverse: `var(--my-colors-danger-inverse, ${TOKEN.colors.white})`,
    layer: `var(--my-colors-danger-layer, ${TOKEN.colors.red[50]})`,
    boundary: `var(--my-colors-danger-boundary, ${TOKEN.colors.red[200]})`,
  },
  warning: {
    DEFAULT: `var(--my-colors-warning, ${TOKEN.colors.yellow[500]})`,
    50: `var(--my-colors-warning-50, ${TOKEN.colors.yellow[50]})`,
    100: `var(--my-colors-warning-100, ${TOKEN.colors.yellow[100]})`,
    200: `var(--my-colors-warning-200, ${TOKEN.colors.yellow[200]})`,
    300: `var(--my-colors-warning-300, ${TOKEN.colors.yellow[300]})`,
    400: `var(--my-colors-warning-400, ${TOKEN.colors.yellow[400]})`,
    500: `var(--my-colors-warning-500, ${TOKEN.colors.yellow[500]})`,
    600: `var(--my-colors-warning-600, ${TOKEN.colors.yellow[600]})`,
    700: `var(--my-colors-warning-700, ${TOKEN.colors.yellow[700]})`,
    800: `var(--my-colors-warning-800, ${TOKEN.colors.yellow[800]})`,
    900: `var(--my-colors-warning-900, ${TOKEN.colors.yellow[900]})`,
    stronger: `var(--my-colors-warning-stronger, ${TOKEN.colors.yellow[700]})`,
    strong: `var(--my-colors-warning-strong, ${TOKEN.colors.yellow[600]})`,
    subtle: `var(--my-colors-warning-subtle, ${TOKEN.colors.yellow[400]})`,
    subtler: `var(--my-colors-warning-subtler, ${TOKEN.colors.yellow[300]})`, //used
    subtlest: `var(--my-colors-warning-subtlest, ${TOKEN.colors.yellow[200]})`, //used
    alpha: `var(--my-colors-warning-alpha, ${TOKEN.colors.yellow[500]}1F)`, //used
    alpha2: `var(--my-colors-warning-alpha2, ${TOKEN.colors.yellow[500]}3D)`, //used
    dark: `var(--my-colors-warning-dark, ${TOKEN.colors.yellow[600]})`,
    hover: `var(--my-colors-warning-hover, ${TOKEN.colors.yellow[700]})`,
    pressed: `var(--my-colors-warning-pressed, ${TOKEN.colors.yellow[800]})`,
    fg: `var(--my-colors-warning-fg, ${TOKEN.colors.yellow[500]})`,
    inverse: `var(--my-colors-warning-inverse, ${TOKEN.colors.white})`,
    layer: `var(--my-colors-warning-layer, ${TOKEN.colors.yellow[50]})`,
    boundary: `var(--my-colors-warning-boundary, ${TOKEN.colors.yellow[200]})`,
  },
  muted: {
    // deprecated
    DEFAULT: `var(--my-colors-muted, ${TOKEN.colors.gray[400]})`,
    fg: `var(--my-colors-muted-fg, ${TOKEN.colors.gray[400]})`,
    bg: `var(--my-colors-muted-bg, ${TOKEN.colors.gray[100]})`,
  },
  transparent: {
    DEFAULT: `var(--my-colors-transparent, ${TOKEN.colors.transparent})`,
    fg: `var(--my-colors-transparent-fg, ${TOKEN.colors.transparent})`,
  },
  placeholder: {
    DEFAULT: `var(--my-colors-placeholder, ${TOKEN.colors.gray[400]})`,
  },
  fg: {
    DEFAULT: `var(--my-colors-fg, ${TOKEN.colors.gray[800]})`,
    primary: `var(--my-colors-fg-primary, ${TOKEN.colors.white})`,
    success: `var(--my-colors-fg-success, ${TOKEN.colors.white})`,
    info: `var(--my-colors-fg-info, ${TOKEN.colors.white})`,
    warning: `var(--my-colors-fg-warning, ${TOKEN.colors.white})`,
    error: `var(--my-colors-fg-error, ${TOKEN.colors.white})`,
    neutral: `var(--my-colors-fg-neutral, ${TOKEN.colors.black})`,

    title: `var(--my-colors-fg-title, ${TOKEN.colors.gray[900]})`,
    label: `var(--my-colors-fg-label, ${TOKEN.colors.gray[900]})`,
    description: `var(--my-colors-fg-description, ${TOKEN.colors.gray[800]})`,
    placeholder: `var(--my-colors-fg-placeholder, ${TOKEN.colors.gray[400]})`,
    caption: `var(--my-colors-fg-caption, ${TOKEN.colors.gray[500]})`,
    trigger: `var(--my-colors-fg-trigger, ${TOKEN.colors.gray[800]})`,
    highlight: `var(--my-colors-fg-highlight, ${TOKEN.colors.gray[800]})`,
    muted: `var(--my-colors-fg-muted, ${TOKEN.colors.gray[400]})`,
    input: `var(--my-colors-fg-input, ${TOKEN.colors.gray[800]})`,
    popover: `var(--my-colors-fg-popover, ${TOKEN.colors.gray[800]})`,
    indicator: `var(--my-colors-fg-indicator, ${TOKEN.colors.black})`,
  },
  boundary: {
    DEFAULT: `var(--my-colors-boundary, ${TOKEN.colors.gray[300]})`,
    muted: `var(--my-colors-boundary-muted, ${TOKEN.colors.gray[200]})`,
    swatch: `var(--my-colors-boundary-swatch, ${TOKEN.colors.white})`,
    trigger: `var(--my-colors-boundary-trigger, ${TOKEN.colors.gray[200]})`,
    radio: `var(--my-colors-boundary-radio, ${TOKEN.colors.gray[300]})`,
    input: `var(--my-colors-boundary-input, ${TOKEN.colors.gray[300]})`,
    invalid: `var(--my-colors-boundary-invalid, ${TOKEN.colors.red[500]})`,
    popover: `var(--my-colors-boundary-popover, ${TOKEN.colors.white})`,
  },
  layer: {
    fill: `var(--my-colors-layer-fill, ${TOKEN.colors.gray[50]})`,
    hover: `var(--my-colors-layer-hover, ${TOKEN.colors.gray[100]})`,
    pressed: `var(--my-colors-layer-pressed, ${TOKEN.colors.gray[200]})`,
    indicator: `var(--my-colors-layer-indicator, ${TOKEN.colors.gray[50]})`,
    thumb: `var(--my-colors-layer-thumb, ${TOKEN.colors.white})`,
    marker: `var(--my-colors-layer-marker, ${TOKEN.colors.white})`,
    trigger: `var(--my-colors-layer-trigger, ${TOKEN.colors.white})`,
    alpha: `var(--my-colors-layer-alpha, ${TOKEN.colors.transparent})`,
    alpha2: `var(--my-colors-layer-alpha2, ${TOKEN.colors.blackAlpha[200]})`,
    alpha3: `var(--my-colors-layer-alpha3, ${TOKEN.colors.blackAlpha[300]})`,
    card: `var(--my-colors-layer-card, ${TOKEN.colors.white})`,
    popover: `var(--my-colors-layer-popover, ${TOKEN.colors.white})`,
    modal: `var(--my-colors-layer-modal, ${TOKEN.colors.white})`,
    muted: `var(--my-colors-layer-muted, ${TOKEN.colors.gray[200]})`,
    input: `var(--my-colors-layer-input, ${TOKEN.colors.white})`,
    dropzone: `var(--my-colors-layer-dropzone, ${TOKEN.colors.white})`,
    track: `var(--my-colors-layer-track, ${TOKEN.colors.gray[300]})`,
  },
  //deprecated
  layer1: `var(--my-colors-layer1, ${TOKEN.colors.gray[100]})`,
  base: `var(--my-colors-base, ${TOKEN.colors.white})`,
  dimmed: `var(--my-colors-dimmed, ${TOKEN.colors.blackAlpha[700]})`, // used
  spinner: `var(--my-colors-spinner, ${TOKEN.colors.gray[800]})`, // used
  caret: `var(--my-colors-caret, ${TOKEN.colors.black})`,
} as const;

export const fontSizes = {
  heading: {
    DEFAULT: `var(--my-fontSizes-heading, ${TOKEN.fontSizes['4xl']})`,
    lg: `var(--my-fontSizes-heading-lg, ${TOKEN.fontSizes['5xl']})`,
    md: `var(--my-fontSizes-heading-md, ${TOKEN.fontSizes['4xl']})`,
    sm: `var(--my-fontSizes-heading-sm, ${TOKEN.fontSizes['3xl']})`,
  },
  body: {
    DEFAULT: `var(--my-fontSizes-body, ${TOKEN.fontSizes['lg']})`,
    lg: `var(--my-fontSizes-body-lg, ${TOKEN.fontSizes['xl']})`,
    md: `var(--my-fontSizes-body-md, ${TOKEN.fontSizes['lg']})`,
    sm: `var(--my-fontSizes-body-sm, ${TOKEN.fontSizes['md']})`,
  },
} as const;

export const duration = {
  normal: 'var(--my-duration-normal, 300ms)',
  fast: 'var(--my-duration-fast, 200ms)',
  faster: 'var(--my-duration-faster, 100ms)',
  fastest: 'var(--my-duration-fastest, 50ms)',
} as const;

export const opacity = {
  muted: `var(--my-opacity-muted, 0.4)`,
};
