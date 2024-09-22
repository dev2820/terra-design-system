import { IDENTIFIER } from 'env';

import { ComponentProps, forwardRef } from 'react';

import { cx } from '../cx';
import { tv } from '../tv';

export type SkeletonProps = ComponentProps<'div'> & {
  isLoaded?: boolean;
  round?: boolean;
};

export const skeletonVariants = tv({
  base: 'animate-shimmer bg-muted bg-clip-padding-box text-transparent cursor-default pointer-events-none select-none before::invisible after::invisible [&_*]:invisible',
  variants: {
    round: {
      true: 'rounded-full',
      false: 'rounded-lg',
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
          className={cx(IDENTIFIER.scope, 'animate-fade-in-once', className)}
          {...otherProps}
        />
      );
    }
    return (
      <div
        ref={ref}
        className={cx(IDENTIFIER.scope, skeletonVariants({ round }), className)}
        {...otherProps}
      />
    );
  },
);

Skeleton.displayName = 'Skeleton';
