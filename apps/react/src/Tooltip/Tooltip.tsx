import { Tooltip, TooltipRootProps } from '@ark-ui/react';
import { IDENTIFIER } from 'env';

import {
  type ComponentProps,
  type ComponentPropsWithoutRef,
  forwardRef,
  type ElementRef,
} from 'react';

import { createReactContext } from '../create-react-context';
import { cx } from '../cx';
import { tv } from '../tv';

export const tooltipVariants = tv({
  base: `${IDENTIFIER.scope} tooltip`,
  slots: {
    content:
      'trds-rounded-md trds-shadow-sm trds-font-semibold trds-px-3 trds-py-2 trds-text-xs trds-max-w-40 trds-z-tooltip data-open:trds-animate-fade-in data-closed:trds-animate-fade-out',
    arrow: '[--arrow-size:8px]',
    arrowTip: 'trds-border-neutral-800 trds-border-t-[1px] trds-border-l-[1px]',
    trigger: '',
  },
  variants: {
    theme: {
      neutral: {
        content: 'trds-bg-neutral-800 trds-text-white',
        arrow: '[--arrow-background:var(--colors-neutral-800,#1f2937)]',
        arrowTip: 'trds-border-neutral-800',
      },
      primary: {
        content: 'trds-bg-primary-500 trds-text-fg-primary',
        arrow: 'trds-[--arrow-background:var(--colors-primary-500,#8b5cf6)]',
        arrowTip: 'trds-border-primary-500',
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
      classes: {} as ReturnType<typeof tooltipVariants>,
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
      className={cx(classes.trigger(), className)}
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
        className={cx(classes.content(), className)}
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
    <Tooltip.Arrow
      className={cx(classes.arrow(), className)}
      {...rest}
      ref={ref}
    >
      <Tooltip.ArrowTip className={classes.arrowTip()} />
    </Tooltip.Arrow>
  );
});

export { Root, Trigger, Content, Arrow };
