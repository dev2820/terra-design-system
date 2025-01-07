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
      danger: '',
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
      class:
        'trds-bg-primary trds-text-primary-fg trds-border-primary-boundary',
    },
    {
      variant: 'filled',
      theme: 'danger',
      class: 'trds-bg-danger trds-text-danger-fg trds-border-danger',
    },
    {
      variant: 'filled',
      theme: 'warning',
      class: 'trds-bg-warning trds-text-warning-fg trds-border-warning',
    },
    {
      variant: 'filled',
      theme: 'success',
      class: 'trds-bg-success trds-text-success-fg trds-border-success',
    },
    {
      variant: 'filled',
      theme: 'info',
      class: 'trds-bg-info trds-text-info-fg trds-border-info',
    },
    /**
     * subtle
     */
    {
      variant: 'subtle',
      theme: 'primary',
      class:
        'trds-bg-primary-alpha trds-text-primary trds-border-primary-alpha',
    },
    {
      variant: 'subtle',
      theme: 'danger',
      class: 'trds-bg-danger-alpha trds-text-danger trds-border-danger-alpha',
    },
    {
      variant: 'subtle',
      theme: 'warning',
      class:
        'trds-bg-warning-alpha trds-text-warning trds-border-warning-alpha',
    },
    {
      variant: 'subtle',
      theme: 'success',
      class:
        'trds-bg-success-alpha trds-text-success trds-border-success-alpha',
    },
    {
      variant: 'subtle',
      theme: 'info',
      class: 'trds-bg-info-alpha trds-text-info trds-border-info-alpha',
    },

    /**
     * outline
     */
    {
      variant: 'outline',
      theme: 'primary',
      class: 'trds-text-primary trds-border-primary-boundary',
    },
    {
      variant: 'outline',
      theme: 'danger',
      class: 'trds-text-danger trds-border-danger',
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
