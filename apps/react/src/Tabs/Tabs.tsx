import { tabsAnatomy } from '@ark-ui/anatomy';
import { Tabs, type TabsRootProps } from '@ark-ui/react/tabs';

import {
  ComponentProps,
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
} from 'react';

import { RecipeVariantProps, cx, sva } from '../../styled-system/css';
import { createReactContext } from '../create-react-context';

export const tabsVariant = sva({
  className: 'tabs',
  slots: tabsAnatomy.keys(),
  base: {
    root: {
      display: 'flex',
      width: 'full',
      _horizontal: {
        flexDirection: 'column',
      },
      _vertical: {
        flexDirection: 'row',
      },
    },
    list: {
      display: 'flex',
      flexShrink: '0',
      _horizontal: {
        flexDirection: 'row',
      },
      _vertical: {
        flexDirection: 'column',
      },
      overflow: 'auto',
      position: 'relative',
      scrollbarWidth: 'none',
      '&::-webkit-scrollbar': {
        display: 'none',
      },
    },
    trigger: {
      alignItems: 'center',
      color: 'neutral.400',
      cursor: 'pointer',
      display: 'inline-flex',
      flexShrink: '0',
      fontWeight: 'semibold',
      gap: '2',
      justifyContent: 'center',
      transitionDuration: 'normal',
      transitionProperty: 'color, background, border-color',
      transitionTimingFunction: 'default',
      whiteSpace: 'nowrap',
      zIndex: '1',
      _disabled: {
        color: 'disabled',
        cursor: 'not-allowed',
        _hover: {
          color: 'disabled',
        },
      },
      _hover: {
        color: 'neutral.800',
      },
      _selected: {
        color: 'neutral.800',
        _hover: {
          color: 'neutral.800',
        },
      },
      _vertical: {
        justifyContent: 'flex-start',
      },
    },
    content: {},
    indicator: {},
  },
  defaultVariants: {
    size: 'md',
    variant: 'line',
  },
  variants: {
    variant: {
      enclosed: {
        list: {
          borderRadius: 'lg',
          borderWidth: '1px',
          borderColor: 'neutral.400',
          px: '1',
          backgroundColor: {
            base: 'neutral.200',
            _light: 'neutral.200',
            _dark: 'neutral.800',
          },
          _horizontal: {
            alignItems: 'center',
          },
          _vertical: {
            height: 'fit-content!',
            py: '1',
          },
        },
        indicator: {
          backgroundColor: {
            base: 'white',
            _light: 'neutral.400',
            _dark: 'neutral.700',
          },
          boxShadow: 'xs',
          borderRadius: 'lg',
          '--transition-duration': '200ms!',
          height: 'var(--height)',
          width: 'var(--width)',
        },
      },
      line: {
        list: {
          _horizontal: {
            boxShadow: '0 -1px 0 0 inset var(--colors-neutral-400)',
            gap: '4',
          },
          _vertical: {
            boxShadow: '1px 0 0 0 inset var(--colors-neutral-400)',
            gap: '1',
          },
        },
        indicator: {
          background: 'primary.500',
          _horizontal: {
            bottom: '0',
            height: '2px',
            width: 'var(--width)',
          },
          _vertical: {
            height: 'var(--height)',
            left: '0',
            width: '2px',
          },
        },
        content: {
          pt: '4',
        },
        trigger: {
          _horizontal: {
            pb: '2.5',
          },
        },
      },
      outline: {
        list: {
          _horizontal: {
            mb: '-1px',
          },
          _vertical: {
            mr: '-1px',
          },
        },
        trigger: {
          borderColor: 'transparent',
          borderWidth: '1px',
          _horizontal: {
            borderTopRadius: 'md',
          },
          _vertical: {
            borderTopLeftRadius: 'md',
            borderBottomLeftRadius: 'md',
          },
          _selected: {
            background: 'white',
            borderColor: 'neutral.400',
            _horizontal: {
              borderBottomColor: 'transparent',
            },
            _vertical: {
              borderRightColor: 'transparent',
            },
          },
        },
        content: {
          background: 'white',
          borderWidth: '1px',
          borderColor: 'neutral.400',
          width: 'full',
        },
      },
    },
    size: {
      sm: {
        trigger: {
          '& svg': {
            width: '4',
            height: '4',
          },
        },
      },
      md: {
        trigger: {
          '& svg': {
            width: '5',
            height: '5',
          },
        },
      },
      lg: {
        trigger: {
          '& svg': {
            width: '5',
            height: '5',
          },
        },
      },
    },
  },
  compoundVariants: [
    {
      size: 'sm',
      variant: 'enclosed',
      css: {
        list: {
          height: '10',
        },
        trigger: {
          h: '8',
          minW: '8',
          textStyle: 'sm',
          px: '3',
        },
        content: {
          p: '3.5',
        },
      },
    },
    {
      size: 'md',
      variant: 'enclosed',
      css: {
        list: {
          height: '11',
        },
        trigger: {
          h: '9',
          minW: '9',
          textStyle: 'sm',
          px: '3.5',
        },
        content: {
          p: '4',
        },
      },
    },
    {
      size: 'lg',
      variant: 'enclosed',
      css: {
        list: {
          height: '12',
        },
        trigger: {
          h: '10',
          minW: '10',
          textStyle: 'sm',
          px: '4',
        },
        content: {
          p: '4.5',
        },
      },
    },
    {
      size: 'sm',
      variant: 'outline',
      css: {
        trigger: {
          h: '9',
          minW: '9',
          textStyle: 'sm',
          px: '3.5',
        },
        content: {
          p: '3.5',
        },
      },
    },
    {
      size: 'md',
      variant: 'outline',
      css: {
        trigger: {
          h: '10',
          minW: '10',
          textStyle: 'sm',
          px: '4',
        },
        content: {
          p: '4',
        },
      },
    },
    {
      size: 'lg',
      variant: 'outline',
      css: {
        trigger: {
          h: '11',
          minW: '11',
          textStyle: 'md',
          px: '4.5',
        },
        content: {
          p: '4.5',
        },
      },
    },
    {
      size: 'sm',
      variant: 'line',
      css: {
        trigger: {
          fontSize: 'sm',
          h: '9',
          minW: '9',
          px: '2.5',
        },
        content: {
          pt: '3',
        },
      },
    },
    {
      size: 'md',
      variant: 'line',
      css: {
        trigger: {
          fontSize: 'md',
          h: '10',
          minW: '10',
          px: '3',
        },
        content: {
          pt: '4',
        },
      },
    },
    {
      size: 'lg',
      variant: 'line',
      css: {
        trigger: {
          px: '3.5',
          h: '11',
          minW: '11',
          fontSize: 'md',
        },
        content: {
          pt: '5',
        },
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
    classes: {},
  },
});

export type RootProps = TabsRootProps & RecipeVariantProps<typeof tabsVariant>;
const Root = forwardRef<ElementRef<typeof Tabs.Root>, RootProps>(
  function (props, ref) {
    const { size, variant, className, children, ...rest } = props;
    const classes = tabsVariant({ size, variant });
    const ctx = {
      classes,
    };

    return (
      <TabsProvider value={ctx}>
        <Tabs.Root ref={ref} className={cx(classes.root, className)} {...rest}>
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
    <Tabs.List className={cx(classes.list, className)} ref={ref} {...rest}>
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
      className={cx(classes.indicator, className)}
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
      className={cx(classes.trigger, className)}
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
      className={cx(classes.content, className)}
      ref={ref}
      {...rest}
    >
      {children}
    </Tabs.Content>
  );
});

export { Root, Content, Trigger, List, Indicator };
