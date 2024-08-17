import { comboboxAnatomy } from '@ark-ui/anatomy';
import { Portal } from '@ark-ui/react';
import {
  Combobox,
  type ComboboxItemGroupProps,
  type ComboboxItemProps,
} from '@ark-ui/react/combobox';
import { IDENTIFIER } from 'env';
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react';

import { ElementRef, forwardRef, ReactNode } from 'react';

import { RecipeVariantProps, cx, sva } from '../../styled-system/css';
import { createReactContext } from '../create-react-context';
import { Input } from '../Input';

export const comboboxVariant = sva({
  className: `${IDENTIFIER.scope} combobox`,
  slots: comboboxAnatomy.keys(),
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5',
      width: 'full',
    },
    control: {
      position: 'relative',
    },
    trigger: {
      bottom: '0',
      color: 'neutral.800',
      position: 'absolute',
      right: '0',
      top: '0',
      cursor: 'pointer',
    },
    input: {
      w: 'full',
    },
    content: {
      background: 'white',
      borderRadius: 'lg',
      boxShadow: 'lg',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 'dropdown',
      '&[aria-hidden]': {
        display: 'none',
      },
      _open: {
        animation: 'fade-in 0.25s ease-out',
      },
      _closed: {
        animation: 'fade-out 0.2s ease-out',
      },
      _focusVisible: {
        outlineOffset: '2px',
        outline: '2px solid',
        outlineColor: 'neutral.300',
      },
    },
    item: {
      alignItems: 'center',
      borderRadius: 'md',
      cursor: 'pointer',
      display: 'flex',
      justifyContent: 'space-between',
      transitionDuration: 'fast',
      transitionProperty: 'background, color',
      transitionTimingFunction: 'default',
      _hover: {
        background: 'neutral.300',
      },
      _highlighted: {
        background: 'neutral.300',
      },
      _disabled: {
        color: 'disabled',
        cursor: 'not-allowed',
        _hover: {
          background: 'transparent',
          color: 'disabled',
        },
      },
    },
    itemGroupLabel: {
      fontWeight: 'semibold',
      textStyle: 'sm',
    },
    itemIndicator: {
      color: 'black',
    },
  },
  defaultVariants: {
    size: 'md',
  },
  variants: {
    size: {
      sm: {
        content: { p: '0.5', gap: '1' },
        item: { textStyle: 'sm', px: '2', height: '9' },
        itemIndicator: {
          '& :where(svg)': {
            width: '4',
            height: '4',
          },
        },
        itemGroupLabel: {
          px: '2',
          py: '1.5',
        },
        label: { textStyle: 'sm' },
        trigger: { right: '2.5' },
      },
      md: {
        content: { p: '1', gap: '1' },
        item: { textStyle: 'md', px: '2', height: '10' },
        itemIndicator: {
          '& :where(svg)': {
            width: '4',
            height: '4',
          },
        },
        itemGroupLabel: {
          px: '2',
          py: '1.5',
        },
        label: { textStyle: 'sm' },
        trigger: { right: '3' },
      },
      lg: {
        content: { p: '1.5', gap: '1' },
        item: { textStyle: 'md', px: '2', height: '11' },
        itemIndicator: {
          '& :where(svg)': {
            width: '5',
            height: '5',
          },
        },
        itemGroupLabel: {
          px: '2',
          py: '1.5',
        },
        label: { textStyle: 'sm' },
        trigger: { right: '3.5' },
      },
    },
  },
});

type ComboboxProviderProps = {
  classes: ReturnType<typeof comboboxVariant>;
} & RecipeVariantProps<typeof comboboxVariant>;

const [ComboboxProvider, useComboboxContext] =
  createReactContext<ComboboxProviderProps>({
    name: 'combobox',
    hookName: 'useComboboxContext',
    providerName: 'ComboboxProvider',
    defaultValue: {
      classes: {},
      size: 'md',
    },
  });

export type RootProps = Combobox.RootProps<Combobox.CollectionItem> &
  RecipeVariantProps<typeof comboboxVariant> & {
    placeholder?: string;
  };

export const Root = forwardRef<ElementRef<typeof Combobox.Root>, RootProps>(
  function (props, ref) {
    const { size, placeholder, className, children, ...rest } = props;
    const classes = comboboxVariant({ size });
    const ctx = {
      classes,
      size,
    };

    return (
      <ComboboxProvider value={ctx}>
        <Combobox.Root
          ref={ref}
          className={cx(classes.root, className)}
          positioning={{ sameWidth: true }}
          lazyMount
          unmountOnExit
          {...rest}
        >
          <Combobox.Control className={classes.control}>
            <Combobox.Input
              placeholder="Select a Framework"
              className={classes.input}
              asChild
            >
              <Input />
            </Combobox.Input>
            <Combobox.Trigger asChild className={classes.trigger}>
              <button aria-label="open">
                <ChevronsUpDownIcon size={20} />
              </button>
            </Combobox.Trigger>
          </Combobox.Control>
          <Portal>
            <Combobox.Positioner className={classes.positioner}>
              <Combobox.Content className={classes.content}>
                {children}
              </Combobox.Content>
            </Combobox.Positioner>
          </Portal>
        </Combobox.Root>
      </ComboboxProvider>
    );
  },
);

export type ItemGroupProps = ComboboxItemGroupProps & {
  label?: ReactNode;
};

export const ItemGroup = forwardRef<
  ElementRef<typeof Combobox.ItemGroup>,
  ItemGroupProps
>(function (props, ref) {
  const { label, className, children, ...rest } = props;
  const { classes } = useComboboxContext();

  return (
    <Combobox.ItemGroup
      className={cx(classes.itemGroup, className)}
      ref={ref}
      {...rest}
    >
      <Combobox.ItemGroupLabel className={classes.itemGroupLabel}>
        {label}
      </Combobox.ItemGroupLabel>
      {children}
    </Combobox.ItemGroup>
  );
});

export type ItemProps = ComboboxItemProps;

export const Item = forwardRef<ElementRef<typeof Combobox.Item>, ItemProps>(
  function (props, ref) {
    const { className, children, ...rest } = props;
    const { classes, size } = useComboboxContext();

    return (
      <Combobox.Item
        className={cx(classes.item, className)}
        ref={ref}
        {...rest}
      >
        <Combobox.ItemText className={cx(classes.itemText)}>
          {children}
        </Combobox.ItemText>
        <Combobox.ItemIndicator className={cx(classes.itemIndicator)}>
          <CheckIcon size={convertSizeToNumber(size)} />
        </Combobox.ItemIndicator>
      </Combobox.Item>
    );
  },
);

const convertSizeToNumber = (size?: 'sm' | 'md' | 'lg') => {
  if (size === 'sm') {
    return 28;
  }
  if (size === 'md') {
    return 32;
  }
  if (size === 'lg') {
    return 36;
  }

  return 32;
};
