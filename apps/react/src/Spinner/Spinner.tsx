import { IDENTIFIER } from 'env';

import { forwardRef, type ComponentProps } from 'react';

import { cx } from '../cx';
import { tv, VariantProps } from '../tv';

const spinnerVariants = tv({
  base: 'inline-block border-2 border-transparent border-solid rounded-full w-[var(--size)] h-[var(--size)] animate-spin border-b-neutral-800 border-l-neutral-800',
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
        {label && <span className="sr-only">{label}</span>}
      </div>
    );
  },
);
