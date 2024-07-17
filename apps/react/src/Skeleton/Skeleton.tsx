import { ComponentProps, forwardRef } from 'react';

import { css, cva, cx } from '../../styled-system/css';

export type SkeletonProps = ComponentProps<'div'> & {
  isLoaded?: boolean;
  round?: boolean;
};

export const skeletonVariants = cva({
  base: {
    animation: 'shimmer',
    animationDuration: '3s',
    animationIterationCount: 'infinite',
    backgroundClip: 'padding-box',
    backgroundColor: 'neutral.400',
    color: 'transparent',
    cursor: 'default',
    pointerEvents: 'none',
    userSelect: 'none',
    '&::before, &::after, *': {
      visibility: 'hidden',
    },
  },
  variants: {
    round: {
      true: {
        borderRadius: 'full',
      },
      false: {
        borderRadius: 'lg',
      },
    },
  },
  defaultVariants: {
    round: true,
  },
});

export const Skeleton = forwardRef<HTMLDivElement, SkeletonProps>(
  function (props, ref) {
    const { round = false, isLoaded, className, ...otherProps } = props;

    if (isLoaded) {
      return (
        <div
          ref={ref}
          className={cx(
            css({
              animation: 'fade-in',
              animationDuration: '0.2s',
              animationIterationCount: 1,
            }),
            className,
          )}
          {...otherProps}
        />
      );
    }
    return (
      <div
        ref={ref}
        className={cx(skeletonVariants({ round }), className)}
        {...otherProps}
      />
    );
  },
);

Skeleton.displayName = 'Skeleton';
