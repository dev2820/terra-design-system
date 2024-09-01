import { Portal } from '@ark-ui/react';
import {
  Combobox,
  type ComboboxItemGroupProps,
  type ComboboxItemProps,
} from '@ark-ui/react/combobox';
import { IDENTIFIER } from 'env';
import { CheckIcon, ChevronsUpDownIcon } from 'lucide-react';

import { ElementRef, forwardRef, ReactNode } from 'react';

import { createReactContext } from '../create-react-context';
import { cx } from '../cx';
import { Input } from '../Input';
import { tv, VariantProps } from '../tv';

export const comboboxVariant = tv({
  base: `${IDENTIFIER.scope} combobox`,
  slots: {
    root: 'trds-flex trds-flex-col trds-gap-1.5 trds-w-full',
    control: 'trds-relative',
    trigger:
      'trds-absolute trds-bottom-0 trds-right-0 trds-top-0 trds-text-muted trds-cursor-pointer',
    input: 'trds-w-full',
    content:
      'trds-bg-white trds-rounded-lg trds-shadow-lg trds-flex trds-flex-col trds-z-dropdown data-hidden:trds-hidden data-open:trds-animate-fade-in data-closed:trds-animate-fade-out focus-visible:trds-outline-2 focus-visible:trds-outline-solid focus-visible:trds-outline-neutral-300 focus-visible:trds-outline-offset-2',
    item: 'trds-flex trds-items-center trds-justify-between trds-rounded-md trds-cursor-pointer trds-transition-fast trds-transition-[background,color] trds-ease-default hover:trds-bg-neutral-100 data-highlighted:trds-bg-neutral-100 disabled:trds-text-disabled disabled:trds-cursor-not-allowed disabled:hover:trds-bg-transparent disabled:hover:trds-text-disabled',
    itemGroupLabel: 'trds-font-semibold trds-text-sm',
    itemIndicator: 'trds-text-black',
    itemText: '',
    itemGroup: '',
    positioner: '',
  },
  variants: {
    size: {
      sm: {
        content: 'trds-p-0.5 trds-gap-1',
        item: 'trds-text-sm trds-px-2 trds-h-9',
        itemIndicator: '[&_:where(svg)]:trds-w-4 [&_:where(svg)]:trds-h-4',
        itemGroupLabel: 'trds-px-2 trds-py-1.5',
        label: 'trds-text-sm',
        trigger: 'trds-right-2.5',
      },
      md: {
        content: 'trds-p-1 trds-gap-1',
        item: 'trds-text-md trds-px-2 trds-h-10',
        itemIndicator: '[&_:where(svg)]:trds-w-4 [&_:where(svg)]:trds-h-4',
        itemGroupLabel: 'trds-px-2 trds-py-1.5',
        label: 'trds-text-sm',
        trigger: 'trds-right-3',
      },
      lg: {
        content: 'trds-p-1.5 trds-gap-1',
        item: 'trds-text-md trds-px-2 trds-h-11',
        itemIndicator: '[&_:where(svg)]:trds-w-5 [&_:where(svg)]:trds-h-5',
        itemGroupLabel: 'trds-px-2 trds-py-1.5',
        label: 'trds-text-sm',
        trigger: 'trds-right-3.5',
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

type ComboboxProviderProps = {
  classes: ReturnType<typeof comboboxVariant>;
} & VariantProps<typeof comboboxVariant>;

const [ComboboxProvider, useComboboxContext] =
  createReactContext<ComboboxProviderProps>({
    name: 'combobox',
    hookName: 'useComboboxContext',
    providerName: 'ComboboxProvider',
    defaultValue: {
      classes: {} as ReturnType<typeof comboboxVariant>,
      size: 'md',
    },
  });

export type RootProps = Combobox.RootProps<Combobox.CollectionItem> &
  VariantProps<typeof comboboxVariant> & {
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
          className={cx(classes.root(), className)}
          positioning={{ sameWidth: true }}
          lazyMount
          unmountOnExit
          {...rest}
        >
          <Combobox.Control className={classes.control()}>
            <Combobox.Input
              placeholder="Select a Framework"
              className={classes.input()}
              asChild
            >
              <Input />
            </Combobox.Input>
            <Combobox.Trigger asChild className={classes.trigger()}>
              <button aria-label="open">
                <ChevronsUpDownIcon size={20} />
              </button>
            </Combobox.Trigger>
          </Combobox.Control>
          <Portal>
            <Combobox.Positioner className={classes.positioner()}>
              <Combobox.Content className={classes.content()}>
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
      className={cx(classes.itemGroup(), className)}
      ref={ref}
      {...rest}
    >
      <Combobox.ItemGroupLabel className={classes.itemGroupLabel()}>
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
        className={cx(classes.item(), className)}
        ref={ref}
        {...rest}
      >
        <Combobox.ItemText className={cx(classes.itemText())}>
          {children}
        </Combobox.ItemText>
        <Combobox.ItemIndicator className={cx(classes.itemIndicator())}>
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
