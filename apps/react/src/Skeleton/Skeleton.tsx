import { IDENTIFIER } from 'env';

import { ComponentProps, forwardRef } from 'react';

import { cx } from '../cx';
import { tv } from '../tv';

export type SkeletonProps = ComponentProps<'div'> & {
  isLoaded?: boolean;
  round?: boolean;
};

export const skeletonVariants = tv({
  base: 'trds-animate-shimmer trds-bg-muted trds-bg-clip-padding-box trds-text-transparent trds-cursor-default trds-pointer-events-none trds-select-none before::trds-invisible after::trds-invisible [&_*]:trds-invisible',
  variants: {
    round: {
      true: 'trds-rounded-full',
      false: 'trds-rounded-lg',
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
            IDENTIFIER.scope,
            'trds-animate-fade-in-once',
            className,
          )}
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
