import { Progress, type ProgressRootProps } from '@ark-ui/react/progress';
import { IDENTIFIER } from 'env';

import { forwardRef } from 'react';

import { cx } from '../cx';
import { tv, VariantProps } from '../tv';

export const progressVariants = tv({
  base: `${IDENTIFIER.scope} progress`,
  slots: {
    root: 'flex items-center flex-col gap-1.5 w-full',
    label: 'font-medium text-sm',
    track: 'bg-track rounded-full overflow-hidden w-full',
    range:
      'bg-primary h-full transition-[width] duration-[0.2s] ease-in-out [--translate-x:-100%]',
    circle: '',
    circleTrack: 'stroke-track',
    circleRange:
      'stroke-primary transition-[stroke-dasharray,stroke] duration-[0.6s]',
    valueText: 'text-sm',
  },
  variants: {
    size: {
      sm: {
        track: 'h-1.5',
        circle: '[--size:36px] [--thickness:4px]',
      },
      md: {
        track: 'h-2',
        circle: '[--size:40px] [--thickness:4px]',
      },
      lg: {
        track: 'h-2.5',
        circle: '[--size:44px] [--thickness:4px]',
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export type RootProps = ProgressRootProps &
  VariantProps<typeof progressVariants> & {
    variant?: 'linear' | 'circular';
  };

const Root = forwardRef<HTMLDivElement, RootProps>(function (props, ref) {
  const { size, children, className, variant = 'linear', ...rest } = props;
  const classes = progressVariants({ size });

  return (
    <Progress.Root
      ref={ref}
      className={cx(classes.root(), className)}
      {...rest}
    >
      {children && (
        <Progress.Label className={classes.label()}>{children}</Progress.Label>
      )}
      {variant === 'linear' && (
        <>
          <Progress.Track className={classes.track()}>
            <Progress.Range className={classes.range()} />
          </Progress.Track>
        </>
      )}
      {variant === 'circular' && (
        <Progress.Circle className={classes.circle()}>
          <Progress.CircleTrack className={classes.circleTrack()} />
          <Progress.CircleRange className={classes.circleRange()} />
        </Progress.Circle>
      )}
    </Progress.Root>
  );
});

Root.displayName = 'Progress';

export { Root };
