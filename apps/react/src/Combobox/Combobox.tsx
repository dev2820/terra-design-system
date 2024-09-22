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
import { tv, type VariantProps } from '../tv';

export const comboboxVariant = tv({
  base: `${IDENTIFIER.scope} combobox`,
  slots: {
    root: 'flex flex-col gap-1.5 w-full',
    control: 'relative',
    trigger: 'absolute bottom-0 right-0 top-0 text-muted cursor-pointer',
    input: 'w-full',
    content:
      'bg-white rounded-lg shadow-lg flex flex-col z-dropdown data-hidden:hidden data-open:animate-fade-in data-closed:animate-fade-out focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-boundary focus-visible:outline-offset-2',
    item: 'flex items-center justify-between rounded-md cursor-pointer transition-fast transition-[background,color] ease-default hover:bg-layer1 data-highlighted:bg-layer1 disabled:text-muted disabled:cursor-not-allowed disabled:hover:bg-transparent disabled:hover:text-muted',
    itemGroupLabel: 'font-semibold text-sm',
    itemIndicator: 'text-black',
    itemText: '',
    itemGroup: '',
    positioner: '',
  },
  variants: {
    size: {
      sm: {
        content: 'p-0.5 gap-1',
        item: 'text-sm px-2 h-9',
        itemIndicator: '[&_:where(svg)]:w-4 [&_:where(svg)]:h-4',
        itemGroupLabel: 'px-2 py-1.5',
        label: 'text-sm',
        trigger: 'right-2.5',
      },
      md: {
        content: 'p-1 gap-1',
        item: 'text-md px-2 h-10',
        itemIndicator: '[&_:where(svg)]:w-4 [&_:where(svg)]:h-4',
        itemGroupLabel: 'px-2 py-1.5',
        label: 'text-sm',
        trigger: 'right-3',
      },
      lg: {
        content: 'p-1.5 gap-1',
        item: 'text-md px-2 h-11',
        itemIndicator: '[&_:where(svg)]:w-5 [&_:where(svg)]:h-5',
        itemGroupLabel: 'px-2 py-1.5',
        label: 'text-sm',
        trigger: 'right-3.5',
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
