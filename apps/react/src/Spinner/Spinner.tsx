import { IDENTIFIER } from 'env';

import { forwardRef, type ComponentProps } from 'react';

import { css, cva, cx, RecipeVariantProps } from '../../styled-system/css';

const spinnerVariants = cva({
  base: {
    display: 'inline-block',
    borderWidth: '2px',
    borderColor: 'transparent',
    borderStyle: 'solid',
    borderRadius: 'full',
    width: 'var(--size)',
    height: 'var(--size)',
    animation: 'spin',
    animationDuration: '600ms',
    borderBottomColor: 'neutral.800',
    borderLeftColor: 'neutral.800',
  },
  defaultVariants: {
    size: 'md',
  },
  variants: {
    size: {
      xs: { '--size': 'sizes.3' },
      sm: { '--size': 'sizes.4' },
      md: { '--size': 'sizes.6' },
      lg: { '--size': 'sizes.8' },
      xl: { '--size': 'sizes.12' },
    },
  },
});

const srOnly = css({
  position: 'absolute',
  width: '1px',
  height: '1px',
  padding: 0,
  margin: '-1px',
  overflow: 'hidden',
  clip: 'rect(0, 0, 0, 0)',
  whiteSpace: 'nowrap',
  borderWidth: 0,
});

export type SpinnerProps = ComponentProps<'div'> &
  RecipeVariantProps<typeof spinnerVariants> & {
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
        {label && <span className={srOnly}>{label}</span>}
      </div>
    );
  },
);
