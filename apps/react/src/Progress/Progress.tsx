import {
  Progress as _Progress,
  type ProgressRootProps,
} from '@ark-ui/react/progress';
import { IDENTIFIER } from 'env';

import { forwardRef } from 'react';

import { cx } from '../cx';
import { tv, VariantProps } from '../tv';

export const progressVariants = tv({
  base: `${IDENTIFIER.scope} progress`,
  slots: {
    root: 'trds-flex trds-items-center trds-flex-col trds-gap-1.5 trds-w-full',
    label: 'trds-font-medium trds-text-sm',
    track:
      'trds-bg-layer-track trds-rounded-full trds-overflow-hidden trds-w-full',
    range:
      'trds-bg-primary trds-h-full trds-transition-[width] trds-duration-[0.2s] trds-ease-in-out [--translate-x:-100%]',
    circle: '',
    circleTrack: 'trds-stroke-layer-track',
    circleRange:
      'trds-stroke-primary trds-transition-[stroke-dasharray,stroke] trds-duration-600',
    valueText: 'trds-text-sm',
  },
  variants: {
    size: {
      sm: {
        track: 'trds-h-1.5',
        circle: '[--size:36px] [--thickness:4px]',
      },
      md: {
        track: 'trds-h-2',
        circle: '[--size:40px] [--thickness:4px]',
      },
      lg: {
        track: 'trds-h-2.5',
        circle: '[--size:44px] [--thickness:4px]',
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export type ProgressProps = ProgressRootProps &
  VariantProps<typeof progressVariants> & {
    variant?: 'linear' | 'circular';
  };

const Progress = forwardRef<HTMLDivElement, ProgressProps>(
  function (props, ref) {
    const { size, children, className, variant = 'linear', ...rest } = props;
    const classes = progressVariants({ size });

    return (
      <_Progress.Root
        ref={ref}
        className={cx(classes.root(), className)}
        {...rest}
      >
        {children && (
          <_Progress.Label className={classes.label()}>
            {children}
          </_Progress.Label>
        )}
        {variant === 'linear' && (
          <>
            <_Progress.Track className={classes.track()}>
              <_Progress.Range className={classes.range()} />
            </_Progress.Track>
          </>
        )}
        {variant === 'circular' && (
          <_Progress.Circle className={classes.circle()}>
            <_Progress.CircleTrack className={classes.circleTrack()} />
            <_Progress.CircleRange className={classes.circleRange()} />
          </_Progress.Circle>
        )}
      </_Progress.Root>
    );
  },
);

Progress.displayName = 'Progress';

export { Progress };
