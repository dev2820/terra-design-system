import { IDENTIFIER } from 'env';

import { ComponentProps, forwardRef } from 'react';

import { cx } from '../cx';
import { tv, VariantProps } from '../tv';

const badgeVariants = tv({
  base: [
    IDENTIFIER.scope,
    'badge',
    'trds-inline-flex trds-items-center trds-whitespace-nowrap trds-rounded-full trds-text-xs trds-font-semibold trds-border trds-px-[10px] trds-py-[2px] trds-transition-colors',
  ],
  variants: {
    variant: {
      filled: '',
      subtle: '',
      outline: 'trds-bg-transparent',
    },
    theme: {
      primary: '',
      info: '',
      success: '',
      error: '',
      warning: '',
    },
  },
  compoundVariants: [
    /**
     * filled
     */
    {
      variant: 'filled',
      theme: 'primary',
      class: 'trds-bg-primary-500 trds-text-fg-primary trds-border-primary',
    },
    {
      variant: 'filled',
      theme: 'error',
      class: 'trds-bg-error trds-text-fg-error trds-border-error',
    },
    {
      variant: 'filled',
      theme: 'warning',
      class: 'trds-bg-warning trds-text-fg-warning trds-border-warning',
    },
    {
      variant: 'filled',
      theme: 'success',
      class: 'trds-bg-success trds-text-fg-success trds-border-success',
    },
    {
      variant: 'filled',
      theme: 'info',
      class: 'trds-bg-info trds-text-fg-info trds-border-info',
    },
    /**
     * subtle
     */
    {
      variant: 'subtle',
      theme: 'primary',
      class:
        'trds-bg-primary-light trds-text-primary trds-border-primary-light',
    },
    {
      variant: 'subtle',
      theme: 'error',
      class: 'trds-bg-error-light trds-text-error trds-border-error-light',
    },
    {
      variant: 'subtle',
      theme: 'warning',
      class:
        'trds-bg-warning-light trds-text-warning trds-border-warning-light',
    },
    {
      variant: 'subtle',
      theme: 'success',
      class:
        'trds-bg-success-light trds-text-success trds-border-success-light',
    },
    {
      variant: 'subtle',
      theme: 'info',
      class: 'trds-bg-info-light trds-text-info trds-border-info-light',
    },

    /**
     * outline
     */
    {
      variant: 'outline',
      theme: 'primary',
      class: 'trds-text-primary trds-border-primary',
    },
    {
      variant: 'outline',
      theme: 'error',
      class: 'trds-text-error trds-border-error',
    },
    {
      variant: 'outline',
      theme: 'warning',
      class: 'trds-text-warning trds-border-warning',
    },
    {
      variant: 'outline',
      theme: 'success',
      class: 'trds-text-success trds-border-success',
    },
    {
      variant: 'outline',
      theme: 'info',
      class: 'trds-text-info trds-border-info',
    },
  ],
  defaultVariants: {
    variant: 'filled',
    theme: 'primary',
  },
});

export type BadgeProps = ComponentProps<'span'> &
  VariantProps<typeof badgeVariants>;
const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function (props, ref) {
  const { children, variant, theme, className, ...rest } = props;

  return (
    <span
      className={cx(badgeVariants({ variant, theme }), className)}
      ref={ref}
      {...rest}
    >
      {children}
    </span>
  );
});

export { Badge, badgeVariants };
