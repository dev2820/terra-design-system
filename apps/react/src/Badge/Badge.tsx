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
      class: 'trds-bg-primary-500 trds-text-white trds-border-primary',
    },
    {
      variant: 'filled',
      theme: 'error',
      class: 'trds-bg-error trds-text-white trds-border-error',
    },
    {
      variant: 'filled',
      theme: 'warning',
      class: 'trds-bg-warning trds-text-white trds-border-warning',
    },
    {
      variant: 'filled',
      theme: 'success',
      class: 'trds-bg-success trds-text-white trds-border-success',
    },
    {
      variant: 'filled',
      theme: 'info',
      class: 'trds-bg-info trds-text-white trds-border-info',
    },
    /**
     * subtle
     */
    {
      variant: 'subtle',
      theme: 'primary',
      class:
        'trds-bg-primary-subtle trds-text-primary trds-border-primary-subtle',
    },
    {
      variant: 'subtle',
      theme: 'error',
      class: 'trds-bg-error-subtle trds-text-error trds-border-error-subtle',
    },
    {
      variant: 'subtle',
      theme: 'warning',
      class:
        'trds-bg-warning-subtle trds-text-warning trds-border-warning-subtle',
    },
    {
      variant: 'subtle',
      theme: 'success',
      class:
        'trds-bg-success-subtle trds-text-success trds-border-success-subtle',
    },
    {
      variant: 'subtle',
      theme: 'info',
      class: 'trds-bg-info-subtle trds-text-info trds-border-info-subtle',
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
