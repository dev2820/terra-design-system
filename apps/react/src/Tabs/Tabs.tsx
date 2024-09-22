import { Tabs, type TabsRootProps } from '@ark-ui/react/tabs';
import { IDENTIFIER } from 'env';

import {
  ComponentProps,
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
} from 'react';

import { createReactContext } from '../create-react-context';
import { cx } from '../cx';
import { tv, VariantProps } from '../tv';

export const tabsVariant = tv({
  base: `${IDENTIFIER.scope} tabs`,
  slots: {
    root: 'flex w-full data-horizontal:flex-col data-vertical:flex-row',
    list: 'flex flex-shrink-0 data-horizontal:flex-row data-vertical:flex-col overflow-auto relative scrollbar-none [&::-webkit-scrollbar]:hidden',
    trigger: [
      'inline-flex items-center text-fg-caption cursor-pointer flex-shrink-0 font-semibold gap-2 justify-center',
      'transition duration-normal transition-[color,background,border-color] ease-default',
      'whitespace-nowrap z-elevated data-disabled:text-muted data-disabled:cursor-not-allowed hover:text-neutral-800 data-selected:text-neutral-800 data-vertical:justify-start',
    ],
    content: '',
    indicator: '',
  },
  variants: {
    variant: {
      enclosed: {
        list: 'rounded-lg border border-boundary px-1 bg-layer1 dark:bg-neutral-800 data-horizontal:items-center data-vertical:h-fit data-vertical:py-1',
        indicator:
          'bg-white light:bg-fg-caption dark:bg-neutral-700 shadow-md rounded-lg transition-duration-normal h-[var(--height)] w-[var(--width)]',
      },
      line: {
        list: 'data-horizontal:shadow-[0_-1px_0_0_inset_var(--colors-boundary, "9ca3af")] data-horizontal:gap-4 data-vertical:shadow-[1px_0_0_0_inset_var(--colors-boundary,"9ca3af")] data-vertical:gap-1',
        indicator:
          'bg-primary-500 data-horizontal:bottom-0 data-horizontal:h-[2px] data-horizontal:w-[var(--width)] data-vertical:left-0 data-vertical:h-[var(--height)] data-vertical:w-[2px]',
        content: 'pt-4',
        trigger: 'data-horizontal:pb-2.5',
      },
      outline: {
        list: 'data-horizontal:mb-[-1px] data-vertical:mr-[-1px]',
        trigger: [
          ' border border-transparent',
          'data-horizontal:rounded-t-md data-vertical:rounded-tl-md data-vertical:rounded-bl-md',
          'data-selected:bg-white data-selected:border-boundary data-selected:[&[data-orientation="horizontal"]]:border-b-transparent data-selected:[&[data-orientation="vertical"]]:border-r-transparent',
        ],
        content: 'bg-white border border-boundary border-[1px] w-full',
      },
    },
    size: {
      sm: {
        trigger: '[&_svg]:w-4 [&_svg]:h-4',
      },
      md: {
        trigger: '[&_svg]:w-5 [&_svg]:h-5',
      },
      lg: {
        trigger: '[&_svg]:w-5 [&_svg]:h-5',
      },
    },
  },
  defaultVariants: {
    variant: 'line',
    size: 'md',
  },
  compoundVariants: [
    {
      size: 'sm',
      variant: 'enclosed',
      class: {
        list: 'h-10',
        trigger: 'h-8 min-w-8 text-sm px-3',
        content: 'p-3.5',
      },
    },
    {
      size: 'md',
      variant: 'enclosed',
      class: {
        list: 'h-11',
        trigger: 'h-9 min-w-9 text-sm px-3.5',
        content: 'p-4',
      },
    },
    {
      size: 'lg',
      variant: 'enclosed',
      class: {
        list: 'h-12',
        trigger: 'h-10 min-w-10 text-sm px-4',
        content: 'p-4.5',
      },
    },
    {
      size: 'sm',
      variant: 'outline',
      class: {
        trigger: 'h-9 min-w-9 text-sm px-3.5',
        content: 'p-3.5',
      },
    },
    {
      size: 'md',
      variant: 'outline',
      class: {
        trigger: 'h-10 min-w-10 text-sm px-4',
        content: 'p-4',
      },
    },
    {
      size: 'lg',
      variant: 'outline',
      class: {
        trigger: 'h-11 min-w-11 text-md px-[18px]',
        content: 'p-[18px]',
      },
    },
    {
      size: 'sm',
      variant: 'line',
      class: {
        trigger: 'text-sm h-9 min-w-9 px-2.5',
        content: 'pt-3',
      },
    },
    {
      size: 'md',
      variant: 'line',
      class: {
        trigger: 'text-md h-10 min-w-10 px-3',
        content: 'pt-4',
      },
    },
    {
      size: 'lg',
      variant: 'line',
      class: {
        trigger: 'text-md h-11 min-w-11 px-3.5',
        content: 'pt-5',
      },
    },
  ],
});

type TabsProviderProps = {
  classes: ReturnType<typeof tabsVariant>;
};

const [TabsProvider, useTabsContext] = createReactContext<TabsProviderProps>({
  name: 'tabs',
  hookName: 'useTabsContext',
  providerName: 'TabsProvider',
  defaultValue: {
    classes: {} as ReturnType<typeof tabsVariant>,
  },
});

export type RootProps = TabsRootProps & VariantProps<typeof tabsVariant>;
const Root = forwardRef<ElementRef<typeof Tabs.Root>, RootProps>(
  function (props, ref) {
    const { size, variant, className, children, ...rest } = props;
    const classes = tabsVariant({ size, variant });
    const ctx = {
      classes,
    };

    return (
      <TabsProvider value={ctx}>
        <Tabs.Root
          ref={ref}
          className={cx(classes.root(), className)}
          {...rest}
        >
          {children}
        </Tabs.Root>
      </TabsProvider>
    );
  },
);

export type ListProps = ComponentProps<typeof List>;
const List = forwardRef<
  ElementRef<typeof Tabs.List>,
  ComponentPropsWithoutRef<typeof Tabs.List>
>(function (props, ref) {
  const { className, children, ...rest } = props;
  const { classes } = useTabsContext();

  return (
    <Tabs.List className={cx(classes.list(), className)} ref={ref} {...rest}>
      {children}
    </Tabs.List>
  );
});

export type IndicatorProps = ComponentProps<typeof Indicator>;
const Indicator = forwardRef<
  ElementRef<typeof Tabs.Indicator>,
  ComponentPropsWithoutRef<typeof Tabs.Indicator>
>(function (props, ref) {
  const { className, ...rest } = props;
  const { classes } = useTabsContext();

  return (
    <Tabs.Indicator
      className={cx(classes.indicator(), className)}
      ref={ref}
      {...rest}
    />
  );
});

export type TriggerProps = ComponentProps<typeof Trigger>;
const Trigger = forwardRef<
  ElementRef<typeof Tabs.Trigger>,
  ComponentPropsWithoutRef<typeof Tabs.Trigger>
>(function (props, ref) {
  const { className, children, ...rest } = props;
  const { classes } = useTabsContext();

  return (
    <Tabs.Trigger
      className={cx(classes.trigger(), className)}
      ref={ref}
      {...rest}
    >
      {children}
    </Tabs.Trigger>
  );
});

export type ContentProps = ComponentProps<typeof Content>;
const Content = forwardRef<
  ElementRef<typeof Tabs.Content>,
  ComponentPropsWithoutRef<typeof Tabs.Content>
>(function (props, ref) {
  const { className, children, ...rest } = props;
  const { classes } = useTabsContext();

  return (
    <Tabs.Content
      className={cx(classes.content(), className)}
      ref={ref}
      {...rest}
    >
      {children}
    </Tabs.Content>
  );
});

export { Root, Content, Trigger, List, Indicator };
