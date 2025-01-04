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
    root: 'trds-flex trds-w-full data-horizontal:trds-flex-col data-vertical:trds-flex-row',
    list: 'trds-flex trds-flex-shrink-0 data-horizontal:trds-flex-row data-vertical:trds-flex-col trds-overflow-auto trds-relative trds-scrollbar-none [&::-webkit-scrollbar]:trds-hidden',
    trigger: [
      'trds-inline-flex trds-items-center trds-text-fg-caption trds-cursor-pointer trds-flex-shrink-0 trds-font-semibold trds-gap-2 trds-justify-center',
      'trds-transition trds-duration-normal trds-transition-[color,background,border-color] trds-ease-in-out',
      'trds-whitespace-nowrap trds-z-elevated data-disabled:trds-text-muted data-disabled:trds-cursor-not-allowed hover:trds-text-neutral-800 data-selected:trds-text-neutral-800 data-vertical:trds-justify-start',
    ],
    content: '',
    indicator: '',
  },
  variants: {
    variant: {
      enclosed: {
        list: 'trds-rounded-lg trds-border trds-border-boundary trds-px-1 trds-bg-layer1 dark:trds-bg-neutral-800 data-horizontal:trds-items-center data-vertical:trds-h-fit data-vertical:trds-py-1',
        indicator:
          'trds-bg-white light:trds-bg-fg-caption dark:trds-bg-neutral-700 trds-shadow-md trds-rounded-lg trds-transition-duration-normal trds-h-[var(--height)] trds-w-[var(--width)]',
      },
      line: {
        list: 'data-horizontal:trds-shadow-[0_-1px_0_0_inset_var(--colors-boundary, "9ca3af")] data-horizontal:trds-gap-4 data-vertical:trds-shadow-[1px_0_0_0_inset_var(--colors-boundary,"9ca3af")] data-vertical:trds-gap-1',
        indicator:
          'trds-bg-primary data-horizontal:trds-bottom-0 data-horizontal:trds-h-[2px] data-horizontal:trds-w-[var(--width)] data-vertical:trds-left-0 data-vertical:trds-h-[var(--height)] data-vertical:trds-w-[2px]',
        content: 'trds-pt-4',
        trigger: 'data-horizontal:trds-pb-2.5',
      },
      outline: {
        list: 'data-horizontal:trds-mb-[-1px] data-vertical:trds-mr-[-1px]',
        trigger: [
          ' trds-border trds-border-transparent',
          'data-horizontal:trds-rounded-t-md data-vertical:trds-rounded-tl-md data-vertical:trds-rounded-bl-md',
          'data-selected:trds-bg-white data-selected:trds-border-boundary data-selected:[&[data-orientation="horizontal"]]:trds-border-b-transparent data-selected:[&[data-orientation="vertical"]]:trds-border-r-transparent',
        ],
        content:
          'trds-bg-white trds-border trds-border-boundary trds-border-[1px] trds-w-full',
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
        list: 'trds-h-10',
        trigger: 'trds-h-8 trds-min-w-8 trds-text-sm trds-px-3',
        content: 'trds-p-3.5',
      },
    },
    {
      size: 'md',
      variant: 'enclosed',
      class: {
        list: 'trds-h-11',
        trigger: 'trds-h-9 trds-min-w-9 trds-text-sm trds-px-3.5',
        content: 'trds-p-4',
      },
    },
    {
      size: 'lg',
      variant: 'enclosed',
      class: {
        list: 'trds-h-12',
        trigger: 'trds-h-10 trds-min-w-10 trds-text-sm trds-px-4',
        content: 'trds-p-4.5',
      },
    },
    {
      size: 'sm',
      variant: 'outline',
      class: {
        trigger: 'trds-h-9 trds-min-w-9 trds-text-sm trds-px-3.5',
        content: 'trds-p-3.5',
      },
    },
    {
      size: 'md',
      variant: 'outline',
      class: {
        trigger: 'trds-h-10 trds-min-w-10 trds-text-sm trds-px-4',
        content: 'trds-p-4',
      },
    },
    {
      size: 'lg',
      variant: 'outline',
      class: {
        trigger: 'trds-h-11 trds-min-w-11 trds-text-md trds-px-[18px]',
        content: 'trds-p-[18px]',
      },
    },
    {
      size: 'sm',
      variant: 'line',
      class: {
        trigger: 'trds-text-sm trds-h-9 trds-min-w-9 trds-px-2.5',
        content: 'trds-pt-3',
      },
    },
    {
      size: 'md',
      variant: 'line',
      class: {
        trigger: 'trds-text-md trds-h-10 trds-min-w-10 trds-px-3',
        content: 'trds-pt-4',
      },
    },
    {
      size: 'lg',
      variant: 'line',
      class: {
        trigger: 'trds-text-md trds-h-11 trds-min-w-11 trds-px-3.5',
        content: 'trds-pt-5',
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
Root.displayName = 'Tabs.Root';

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
List.displayName = 'Tabs.List';

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
Indicator.displayName = 'Tabs.Indicator';

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
Trigger.displayName = 'Tabs.Trigger';

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
Content.displayName = 'Tabs.Content';

export { Root, Content, Trigger, List, Indicator };
