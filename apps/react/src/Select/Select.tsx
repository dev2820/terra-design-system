import { selectAnatomy } from '@ark-ui/anatomy';
import { Portal } from '@ark-ui/react';
import {
  Select,
  type SelectItemGroupProps,
  type SelectItemProps,
} from '@ark-ui/react/select';
import { IDENTIFIER } from 'env';
import { CheckIcon, ChevronDownIcon } from 'lucide-react';

import { ElementRef, forwardRef, ReactNode } from 'react';

import { RecipeVariantProps, cx, sva } from '../../styled-system/css';
import { createReactContext } from '../create-react-context';

export const selectVariant = sva({
  className: `${IDENTIFIER.scope} select`,
  slots: selectAnatomy.keys(),
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5',
      width: 'full',
    },
    content: {
      background: 'white',
      borderRadius: 'lg',
      boxShadow: 'lg',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 'dropdown',
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
        color: 'black',
      },
      _highlighted: {
        background: 'neutral.300',
        color: 'black',
      },
      _selected: {
        color: 'black',
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
    label: {
      color: 'neutral.500',
      fontWeight: 'medium',
    },
    trigger: {
      appearance: 'none',
      alignItems: 'center',
      borderColor: 'neutral.300',
      borderRadius: 'lg',
      cursor: 'pointer',
      color: 'neutral.800',
      display: 'inline-flex',
      justifyContent: 'space-between',
      outline: 0,
      position: 'relative',
      transitionDuration: 'normal',
      transitionProperty: 'background, box-shadow, border-color',
      transitionTimingFunction: 'default',
      width: 'full',
      borderWidth: '1px',
      _focus: {
        borderColor: 'neutral.300',
        boxShadow: '0 0 0 2px var(--shadow-color)',
        shadowColor: 'primary.500',
      },
      _placeholderShown: {
        color: 'neutral.400',
      },
      _disabled: {
        color: 'disabled',
        cursor: 'not-allowed',
        '& :where(svg)': {
          color: 'disabled',
        },
      },
      '& :where(svg)': {
        color: 'subtle',
      },
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
        trigger: {
          px: '2.5',
          h: '9',
          minW: '9',
          fontSize: 'sm',
          gap: '2',
          '& :where(svg)': {
            width: '4',
            height: '4',
          },
        },
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
        trigger: {
          px: '3',
          h: '10',
          minW: '10',
          fontSize: 'md',
          gap: '2',
          '& :where(svg)': {
            width: '4',
            height: '4',
          },
        },
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
        trigger: {
          px: '3.5',
          h: '11',
          minW: '11',
          fontSize: 'md',
          gap: '2',
          '& :where(svg)': {
            width: '5',
            height: '5',
          },
        },
      },
    },
  },
});

type SelectProviderProps = {
  classes: ReturnType<typeof selectVariant>;
} & RecipeVariantProps<typeof selectVariant>;

const [SelectProvider, useSelectContext] =
  createReactContext<SelectProviderProps>({
    name: 'select',
    hookName: 'useSelectContext',
    providerName: 'SelectProvider',
    defaultValue: {
      classes: {},
      size: 'md',
    },
  });

export type RootProps = Select.RootProps<Select.CollectionItem> &
  RecipeVariantProps<typeof selectVariant> & {
    placeholder?: string;
  };

export const Root = forwardRef<ElementRef<typeof Select.Root>, RootProps>(
  function (props, ref) {
    const { size, placeholder, className, children, ...rest } = props;
    const classes = selectVariant({ size });
    const ctx = {
      classes,
      size,
    };

    return (
      <SelectProvider value={ctx}>
        <Select.Root
          ref={ref}
          className={cx(classes.root, className)}
          positioning={{ sameWidth: true }}
          {...rest}
        >
          <Select.Control className={classes.control}>
            <Select.Trigger className={classes.trigger}>
              <Select.ValueText
                placeholder={placeholder}
                className={classes.valueText}
              />
              <Select.Indicator className={classes.indicator}>
                <ChevronDownIcon size={convertSizeToNumber(size)} />
              </Select.Indicator>
            </Select.Trigger>
          </Select.Control>
          <Portal>
            <Select.Positioner className={classes.positioner}>
              <Select.Content className={classes.content}>
                {children}
              </Select.Content>
            </Select.Positioner>
          </Portal>
          <Select.HiddenSelect />
        </Select.Root>
      </SelectProvider>
    );
  },
);

export type ItemGroupProps = SelectItemGroupProps & {
  label?: ReactNode;
};

export const ItemGroup = forwardRef<
  ElementRef<typeof Select.ItemGroup>,
  ItemGroupProps
>(function (props, ref) {
  const { label, className, children, ...rest } = props;
  const { classes } = useSelectContext();

  return (
    <Select.ItemGroup
      className={cx(classes.itemGroup, className)}
      ref={ref}
      {...rest}
    >
      <Select.ItemGroupLabel className={classes.itemGroupLabel}>
        {label}
      </Select.ItemGroupLabel>
      {children}
    </Select.ItemGroup>
  );
});

export type ItemProps = SelectItemProps;

export const Item = forwardRef<ElementRef<typeof Select.Item>, ItemProps>(
  function (props, ref) {
    const { className, children, ...rest } = props;
    const { classes, size } = useSelectContext();

    return (
      <Select.Item className={cx(classes.item, className)} ref={ref} {...rest}>
        <Select.ItemText className={cx(classes.itemText)}>
          {children}
        </Select.ItemText>
        <Select.ItemIndicator className={cx(classes.itemIndicator)}>
          <CheckIcon size={convertSizeToNumber(size)} />
        </Select.ItemIndicator>
      </Select.Item>
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
