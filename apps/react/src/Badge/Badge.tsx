import { IDENTIFIER } from 'env';

import { ComponentProps, forwardRef } from 'react';

import { cx } from '../cx';
import { tv, VariantProps } from '../tv';

const badgeVariants = tv({
  base: [
    IDENTIFIER.scope,
    'badge',
    'inline-flex items-center whitespace-nowrap rounded-full text-xs font-semibold border px-[10px] py-[2px] transition-colors',
  ],
  variants: {
    variant: {
      filled: '',
      subtle: '',
      outline: 'bg-transparent',
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
      class: 'bg-primary-500 text-fg-primary border-primary',
    },
    {
      variant: 'filled',
      theme: 'error',
      class: 'bg-error text-fg-error border-error',
    },
    {
      variant: 'filled',
      theme: 'warning',
      class: 'bg-warning text-fg-warning border-warning',
    },
    {
      variant: 'filled',
      theme: 'success',
      class: 'bg-success text-fg-success border-success',
    },
    {
      variant: 'filled',
      theme: 'info',
      class: 'bg-info text-fg-info border-info',
    },
    /**
     * subtle
     */
    {
      variant: 'subtle',
      theme: 'primary',
      class: 'bg-primary-light text-primary border-primary-light',
    },
    {
      variant: 'subtle',
      theme: 'error',
      class: 'bg-error-light text-error border-error-light',
    },
    {
      variant: 'subtle',
      theme: 'warning',
      class: 'bg-warning-light text-warning border-warning-light',
    },
    {
      variant: 'subtle',
      theme: 'success',
      class: 'bg-success-light text-success border-success-light',
    },
    {
      variant: 'subtle',
      theme: 'info',
      class: 'bg-info-light text-info border-info-light',
    },

    /**
     * outline
     */
    {
      variant: 'outline',
      theme: 'primary',
      class: 'text-primary border-primary',
    },
    {
      variant: 'outline',
      theme: 'error',
      class: 'text-error border-error',
    },
    {
      variant: 'outline',
      theme: 'warning',
      class: 'text-warning border-warning',
    },
    {
      variant: 'outline',
      theme: 'success',
      class: 'text-success border-success',
    },
    {
      variant: 'outline',
      theme: 'info',
      class: 'text-info border-info',
    },
  ],
  defaultVariants: {
    variant: 'filled',
    theme: 'primary',
  },
});

export type BadgeProps = Omit<ComponentProps<'span'>, 'children'> &
  VariantProps<typeof badgeVariants> & {
    text: string;
  };

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function (props, ref) {
  const { text, variant, theme, className, ...rest } = props;

  return (
    <span
      className={cx(
        IDENTIFIER.scope,
        badgeVariants({ variant, theme }),
        className,
      )}
      ref={ref}
      {...rest}
    >
      {text}
    </span>
  );
});

export { Badge, badgeVariants };
