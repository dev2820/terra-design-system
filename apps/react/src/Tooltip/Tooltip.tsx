import { tooltipAnatomy } from '@ark-ui/anatomy';
import { Tooltip, TooltipRootProps } from '@ark-ui/react';
import { IDENTIFIER } from 'env';

import {
  type ComponentProps,
  type ComponentPropsWithoutRef,
  forwardRef,
  type ElementRef,
} from 'react';

import { sva, cx } from '../../styled-system/css';
import { createReactContext } from '../create-react-context';

export const tooltipVariants = sva({
  className: `${IDENTIFIER.scope} tooltip`,
  slots: tooltipAnatomy.keys(),
  base: {
    content: {
      borderRadius: 'md',
      boxShadow: 'sm',
      fontWeight: 'semibold',
      px: '3',
      py: '2',
      textStyle: 'xs',
      maxWidth: '2xs',
      zIndex: 'tooltip',
      _open: {
        animation: 'fade-in 0.25s ease-out',
      },
      _closed: {
        animation: 'fade-out 0.2s ease-out',
      },
    },
    arrow: {
      '--arrow-size': 'var(--sizes-2)',
    },
    arrowTip: {
      borderColor: 'neutral.800',
      borderTopWidth: '1px',
      borderLeftWidth: '1px',
    },
  },
  variants: {
    theme: {
      neutral: {
        content: {
          background: 'neutral.800',
          color: 'white',
        },
        arrow: {
          '--arrow-background': 'var(--colors-neutral-800)',
        },
        arrowTip: {
          borderColor: 'neutral.800',
        },
      },
      primary: {
        content: {
          background: 'primary.500',
          color: 'primary.foreground',
        },
        arrow: {
          '--arrow-background': 'var(--colors-primary-500)',
        },
        arrowTip: {
          borderColor: 'primary.500',
        },
      },
    },
  },
  defaultVariants: {
    theme: 'neutral',
  },
});

type TooltipProviderProps = {
  classes: ReturnType<typeof tooltipVariants>;
};

const [TooltipProvider, useTooltipContext] =
  createReactContext<TooltipProviderProps>({
    name: 'tooltip',
    hookName: 'useTooltipContext',
    providerName: 'TooltipProvider',
    defaultValue: {
      classes: {},
    },
  });

export type RootProps = TooltipRootProps & { theme: 'neutral' | 'primary' };
function Root(props: RootProps) {
  const { theme, children, closeDelay = 200, openDelay = 100, ...rest } = props;
  const classes = tooltipVariants({ theme });
  const ctx = {
    classes,
  };

  return (
    <TooltipProvider value={ctx}>
      <Tooltip.Root openDelay={openDelay} closeDelay={closeDelay} {...rest}>
        {children}
      </Tooltip.Root>
    </TooltipProvider>
  );
}

export type TriggerProps = ComponentProps<typeof Trigger>;
const Trigger = forwardRef<
  ElementRef<typeof Tooltip.Trigger>,
  ComponentPropsWithoutRef<typeof Tooltip.Trigger>
>(function (props, ref) {
  const { classes } = useTooltipContext();
  const { children, className, ...rest } = props;

  return (
    <Tooltip.Trigger
      className={cx(classes.trigger, className)}
      ref={ref}
      {...rest}
    >
      {children}
    </Tooltip.Trigger>
  );
});

export type ContentProps = ComponentProps<typeof Content>;
const Content = forwardRef<
  ElementRef<typeof Tooltip.Content>,
  ComponentPropsWithoutRef<typeof Tooltip.Content>
>(function (props, ref) {
  const { classes } = useTooltipContext();
  const { children, className, ...rest } = props;

  return (
    <Tooltip.Positioner>
      <Tooltip.Content
        className={cx(classes.content, className)}
        ref={ref}
        {...rest}
      >
        {children}
      </Tooltip.Content>
    </Tooltip.Positioner>
  );
});

export type ArrowProps = ComponentProps<typeof Arrow>;
const Arrow = forwardRef<
  ElementRef<typeof Tooltip.Arrow>,
  ComponentPropsWithoutRef<typeof Tooltip.Arrow>
>(function (props, ref) {
  const { classes } = useTooltipContext();
  const { children, className, ...rest } = props;

  return (
    <Tooltip.Arrow className={cx(classes.arrow, className)} {...rest} ref={ref}>
      <Tooltip.ArrowTip className={classes.arrowTip} />
    </Tooltip.Arrow>
  );
});

export { Root, Trigger, Content, Arrow };
