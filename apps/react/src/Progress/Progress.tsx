import { progressAnatomy } from '@ark-ui/anatomy';
import { Progress, type ProgressRootProps } from '@ark-ui/react/progress';
import { IDENTIFIER } from 'env';

import { forwardRef } from 'react';

import { cx, RecipeVariantProps, sva } from '../../styled-system/css';

export const progressVariants = sva({
  className: `${IDENTIFIER.scope} progress`,
  slots: progressAnatomy.keys(),
  base: {
    root: {
      alignItems: 'center',
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5',
      width: 'full',
    },
    label: {
      fontWeight: 'medium',
      textStyle: 'sm',
    },
    track: {
      backgroundColor: 'neutral.300',
      borderRadius: 'full',
      overflow: 'hidden',
      width: 'full',
    },
    range: {
      backgroundColor: 'primary',
      height: 'full',
      transition: 'width 0.2s ease-in-out',
      '--translate-x': '-100%',
    },
    circleTrack: {
      stroke: 'neutral.300',
    },
    circleRange: {
      stroke: 'primary',
      transitionProperty: 'stroke-dasharray, stroke',
      transitionDuration: '0.6s',
    },
    valueText: {
      textStyle: 'sm',
    },
  },
  variants: {
    size: {
      sm: {
        track: {
          height: '1.5',
        },
        circle: {
          '--size': '36px',
          '--thickness': '4px',
        },
      },
      md: {
        track: {
          height: '2',
        },
        circle: {
          '--size': '40px',
          '--thickness': '4px',
        },
      },
      lg: {
        track: {
          height: '2.5',
        },
        circle: {
          '--size': '44px',
          '--thickness': '4px',
        },
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export type RootProps = ProgressRootProps &
  RecipeVariantProps<typeof progressVariants> & {
    variant?: 'linear' | 'circular';
  };

const Root = forwardRef<HTMLDivElement, RootProps>(function (props, ref) {
  const { size, children, className, variant = 'linear', ...rest } = props;
  const classes = progressVariants({ size });

  return (
    <Progress.Root ref={ref} className={cx(classes.root, className)} {...rest}>
      {children && (
        <Progress.Label className={classes.label}>{children}</Progress.Label>
      )}
      {variant === 'linear' && (
        <>
          <Progress.Track className={classes.track}>
            <Progress.Range className={classes.range} />
          </Progress.Track>
        </>
      )}
      {variant === 'circular' && (
        <Progress.Circle className={classes.circle}>
          <Progress.CircleTrack className={classes.circleTrack} />
          <Progress.CircleRange className={classes.circleRange} />
        </Progress.Circle>
      )}
    </Progress.Root>
  );
});

Root.displayName = 'Progress';

export { Root };
