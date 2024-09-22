import { Portal } from '@ark-ui/react';
import {
  Select,
  type SelectItemGroupProps,
  type SelectItemProps,
} from '@ark-ui/react/select';
import { IDENTIFIER } from 'env';
import { CheckIcon, ChevronDownIcon } from 'lucide-react';

import { ElementRef, forwardRef, ReactNode } from 'react';

import { createReactContext } from '../create-react-context';
import { cx } from '../cx';
import { tv, VariantProps } from '../tv';

export const selectVariant = tv({
  base: `${IDENTIFIER.scope} select`,
  slots: {
    root: 'flex flex-col gap-1.5 w-full',
    content:
      'bg-white rounded-lg shadow-lg flex flex-col z-dropdown data-open:animate-fade-in data-closed:animate-fade-out focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-boundary focus-visible:outline-offset-2',
    item: 'flex items-center justify-between rounded-md cursor-pointer transition-fast transition-[background,color] ease-default hover:bg-layer1 hover:text-black data-highlighted:bg-layer1 data-highlighted:text-black data-selected:text-black data-disabled:text-muted data-disabled:cursor-not-allowed',
    itemGroupLabel: 'font-semibold text-sm',
    itemIndicator: 'text-black',
    label: 'text-neutral-500 font-medium',
    trigger:
      'appearance-none inline-flex items-center justify-between border-boundary rounded-lg cursor-pointer text-fg-title inline-flex relative outline-0 transition duration-normal transition-[background,box-shadow,border-color] ease-default w-full border-[1px] focus:border-boundary focus:shadow-[0_0_0_2px_var(--shadow-color)] focus:shadow-primary-500 placeholder-shown:text-fg-placeholder disabled:text-muted disabled:cursor-not-allowed disabled:[&_:where(svg)]:text-muted [&_:where(svg)]:text-subtle',
    control: '',
    valueText: '',
    indicator: '',
    positioner: '',
    itemGroup: '',
    itemText: '',
  },
  variants: {
    size: {
      sm: {
        content: 'p-0.5 gap-1',
        item: 'text-sm px-2 h-9',
        itemIndicator: '[&_:where(svg)]:w-4 [&_:where(svg)]:h-4',
        itemGroupLabel: 'px-2 py-1.5',
        label: 'text-sm',
        trigger:
          'px-2.5 h-9 min-w-9 text-sm gap-2 [&_:where(svg)]:w-4 [&_:where(svg)]:h-4',
      },
      md: {
        content: 'p-1 gap-1',
        item: 'text-md px-2 h-10',
        itemIndicator: '[&_:where(svg)]:w-4 [&_:where(svg)]:h-4',
        itemGroupLabel: 'px-2 py-1.5',
        label: 'text-sm',
        trigger:
          'px-3 h-10 min-w-10 text-md gap-2 [&_:where(svg)]:w-4 [&_:where(svg)]:h-4',
      },
      lg: {
        content: 'p-1.5 gap-1',
        item: 'text-md px-2 h-11',
        itemIndicator: '[&_:where(svg)]:w-5 [&_:where(svg)]:h-5',
        itemGroupLabel: 'px-2 py-1.5',
        label: 'text-sm',
        trigger:
          'px-3.5 h-11 min-w-11 text-md gap-2 [&_:where(svg)]:w-5 [&_:where(svg)]:h-5',
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

type SelectProviderProps = {
  classes: ReturnType<typeof selectVariant>;
} & VariantProps<typeof selectVariant>;

const [SelectProvider, useSelectContext] =
  createReactContext<SelectProviderProps>({
    name: 'select',
    hookName: 'useSelectContext',
    providerName: 'SelectProvider',
    defaultValue: {
      classes: {} as ReturnType<typeof selectVariant>,
      size: 'md',
    },
  });

export type RootProps = Select.RootProps<Select.CollectionItem> &
  VariantProps<typeof selectVariant> & {
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
          className={cx(classes.root(), className)}
          positioning={{ sameWidth: true }}
          {...rest}
        >
          <Select.Control className={classes.control()}>
            <Select.Trigger className={classes.trigger()}>
              <Select.ValueText
                placeholder={placeholder}
                className={classes.valueText()}
              />
              <Select.Indicator className={classes.indicator()}>
                <ChevronDownIcon size={convertSizeToNumber(size)} />
              </Select.Indicator>
            </Select.Trigger>
          </Select.Control>
          <Portal>
            <Select.Positioner className={classes.positioner()}>
              <Select.Content className={classes.content()}>
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
      className={cx(classes.itemGroup(), className)}
      ref={ref}
      {...rest}
    >
      <Select.ItemGroupLabel className={classes.itemGroupLabel()}>
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
      <Select.Item
        className={cx(classes.item(), className)}
        ref={ref}
        {...rest}
      >
        <Select.ItemText className={cx(classes.itemText())}>
          {children}
        </Select.ItemText>
        <Select.ItemIndicator className={cx(classes.itemIndicator())}>
          <CheckIcon size={convertSizeToNumber(size)} />
        </Select.ItemIndicator>
      </Select.Item>
    );
  },
);

const convertSizeToNumber = (size?: 'sm' | 'md' | 'lg') => {
  if (size === 'sm') {
    return 20;
  }
  if (size === 'md') {
    return 24;
  }
  if (size === 'lg') {
    return 28;
  }

  return 24;
};
