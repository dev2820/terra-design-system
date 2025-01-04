import { IDENTIFIER } from 'env';

import { forwardRef, type ComponentProps } from 'react';

import { cx } from '../cx';
import { tv, VariantProps } from '../tv';

export const spinnerVariants = tv({
  base: 'trds-inline-block trds-border-2 trds-border-transparent trds-border-solid trds-rounded-full trds-w-[var(--size)] trds-h-[var(--size)] trds-animate-spin trds-border-b-spinner trds-border-l-spinner',
  variants: {
    size: {
      xs: '[--size:8px]',
      sm: '[--size:12px]',
      md: '[--size:20px]',
      lg: '[--size:24px]',
      xl: '[--size:44px]',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export type SpinnerProps = ComponentProps<'div'> &
  VariantProps<typeof spinnerVariants> & {
    label?: string;
  };

export const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  function (props, ref) {
    const { size, label = 'loading...', className, ...rest } = props;

    return (
      <div
        ref={ref}
        className={cx(IDENTIFIER.scope, spinnerVariants({ size }), className)}
        {...rest}
      >
        {label && <span className="trds-sr-only">{label}</span>}
      </div>
    );
  },
);
