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
    root: 'trds-flex trds-flex-col trds-gap-1.5 trds-w-full',
    content:
      'trds-bg-white trds-rounded-lg trds-shadow-lg trds-flex trds-flex-col trds-z-dropdown data-open:trds-animate-fade-in data-closed:trds-animate-fade-out focus-visible:trds-outline-2 focus-visible:trds-outline-solid focus-visible:trds-outline-neutral-300 focus-visible:trds-outline-offset-2',
    item: 'trds-flex trds-items-center trds-justify-between trds-rounded-md trds-cursor-pointer trds-transition-fast trds-transition-[background,color] trds-ease-default hover:trds-bg-neutral-100 hover:trds-text-black data-highlighted:trds-bg-neutral-100 data-highlighted:trds-text-black data-selected:trds-text-black data-disabled:trds-text-muted data-disabled:trds-cursor-not-allowed',
    itemGroupLabel: 'trds-font-semibold trds-text-sm',
    itemIndicator: 'trds-text-black',
    label: 'trds-text-neutral-500 trds-font-medium',
    trigger:
      'trds-appearance-none trds-inline-flex trds-items-center trds-justify-between trds-border-boundary trds-rounded-lg trds-cursor-pointer trds-text-fg-title trds-inline-flex trds-relative trds-outline-0 trds-transition trds-duration-normal trds-transition-[background,box-shadow,border-color] trds-ease-default trds-w-full trds-border-[1px] focus:trds-border-neutral-300 focus:trds-shadow-[0_0_0_2px_var(--shadow-color)] focus:trds-shadow-primary-500 placeholder-shown:trds-text-neutral-400 disabled:trds-text-muted disabled:trds-cursor-not-allowed disabled:[&_:where(svg)]:text-muted [&_:where(svg)]:text-subtle',
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
        content: 'trds-p-0.5 trds-gap-1',
        item: 'trds-text-sm trds-px-2 trds-h-9',
        itemIndicator: '[&_:where(svg)]:w-4 [&_:where(svg)]:h-4',
        itemGroupLabel: 'trds-px-2 trds-py-1.5',
        label: 'trds-text-sm',
        trigger:
          'trds-px-2.5 trds-h-9 trds-min-w-9 trds-text-sm trds-gap-2 [&_:where(svg)]:w-4 [&_:where(svg)]:h-4',
      },
      md: {
        content: 'trds-p-1 trds-gap-1',
        item: 'trds-text-md trds-px-2 trds-h-10',
        itemIndicator: '[&_:where(svg)]:w-4 [&_:where(svg)]:h-4',
        itemGroupLabel: 'trds-px-2 trds-py-1.5',
        label: 'trds-text-sm',
        trigger:
          'trds-px-3 trds-h-10 trds-min-w-10 trds-text-md trds-gap-2 [&_:where(svg)]:w-4 [&_:where(svg)]:h-4',
      },
      lg: {
        content: 'trds-p-1.5 trds-gap-1',
        item: 'trds-text-md trds-px-2 trds-h-11',
        itemIndicator: '[&_:where(svg)]:w-5 [&_:where(svg)]:h-5',
        itemGroupLabel: 'trds-px-2 trds-py-1.5',
        label: 'trds-text-sm',
        trigger:
          'trds-px-3.5 trds-h-11 trds-min-w-11 trds-text-md trds-gap-2 [&_:where(svg)]:w-5 [&_:where(svg)]:h-5',
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
