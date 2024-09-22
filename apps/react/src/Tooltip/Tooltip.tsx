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
      'rounded-md shadow-sm font-semibold px-3 py-2 text-xs max-w-40 z-tooltip data-open:animate-fade-in data-closed:animate-fade-out',
    arrow: '[--arrow-size:8px]',
    arrowTip: 'border-neutral-800 border-t-[1px] border-l-[1px]',
    trigger: '',
  },
  variants: {
    theme: {
      neutral: {
        content: 'bg-neutral-800 text-white',
        arrow: '[--arrow-background:var(--colors-neutral-800,#1f2937)]',
        arrowTip: 'border-neutral-800',
      },
      primary: {
        content: 'bg-primary-500 text-fg-primary',
        arrow: '[--arrow-background:var(--colors-primary-500,#8b5cf6)]',
        arrowTip: 'border-primary-500',
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
