import { Combobox } from '@ark-ui/react/combobox';
import { IDENTIFIER } from 'env';
import { CheckIcon } from 'lucide-react';

import {
  ComponentProps,
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
} from 'react';

import { createReactContext } from '../create-react-context';
import { cx } from '../cx';
import { tv, type VariantProps } from '../tv';

export const comboboxVariant = tv({
  base: `${IDENTIFIER.scope} combobox`,
  slots: {
    root: 'trds-flex trds-flex-col trds-gap-1.5 trds-w-full',
    control: 'trds-relative',
    trigger:
      'trds-absolute trds-bottom-0 trds-right-0 trds-top-0 trds-text-fg-muted trds-cursor-pointer',
    clearTrigger:
      'trds-absolute trds-bottom-0 trds-right-8 trds-top-0 trds-text-fg-muted trds-cursor-pointer',
    input:
      'trds-w-full trds-bg-layer-input trds-text-fg-input trds-border-boundary-input',
    content:
      'trds-bg-layer-popover trds-text-fg-popover trds-rounded-lg trds-shadow-lg trds-flex trds-flex-col trds-z-dropdown data-hidden:trds-hidden data-open:trds-animate-fade-in data-closed:trds-animate-fade-out focus-visible:trds-outline-2 focus-visible:trds-outline-solid focus-visible:trds-outline-boundary focus-visible:trds-outline-offset-2',
    item: 'trds-flex trds-items-center trds-justify-between trds-rounded-md trds-cursor-pointer trds-transition-fast trds-transition-[background,color] trds-duration-normal trds-ease-in-out data-highlighted:trds-bg-layer-hover disabled:trds-text-fg-muted disabled:trds-cursor-not-allowed disabled:hover:trds-bg-transparent disabled:hover:trds-text-fg-muted',
    itemGroupLabel: 'trds-font-semibold trds-text-sm',
    itemIndicator: 'trds-text-fg-indicator',
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
  VariantProps<typeof comboboxVariant>;
const Root = forwardRef<ElementRef<typeof Combobox.Root>, RootProps>(
  function (props, ref) {
    const { size, className, children, ...rest } = props;
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
          {...rest}
        >
          {children}
        </Combobox.Root>
      </ComboboxProvider>
    );
  },
);

export type ControlProps = ComponentProps<typeof Control>;
const Control = forwardRef<
  ElementRef<typeof Combobox.Control>,
  ComponentPropsWithoutRef<typeof Combobox.Control>
>(function (props, ref) {
  const { className, ...rest } = props;
  const { classes } = useComboboxContext();

  return (
    <Combobox.Control
      className={cx(classes.control(), className)}
      ref={ref}
      {...rest}
    />
  );
});
export type ContentProps = ComponentProps<typeof Content>;
const Content = forwardRef<
  ElementRef<typeof Combobox.Content>,
  ComponentPropsWithoutRef<typeof Combobox.Content>
>(function (props, ref) {
  const { className, ...rest } = props;
  const { classes } = useComboboxContext();

  return (
    <Combobox.Content
      className={cx(classes.content(), className)}
      ref={ref}
      {...rest}
    />
  );
});

export type InputProps = ComponentProps<typeof Input>;
const Input = forwardRef<
  ElementRef<typeof Combobox.Input>,
  ComponentPropsWithoutRef<typeof Combobox.Input>
>(function (props, ref) {
  const { className, ...rest } = props;
  const { classes } = useComboboxContext();

  return (
    <Combobox.Input
      className={cx(classes.input(), className)}
      ref={ref}
      {...rest}
    />
  );
});

export type PositionerProps = ComponentProps<typeof Positioner>;
const Positioner = forwardRef<
  ElementRef<typeof Combobox.Positioner>,
  ComponentPropsWithoutRef<typeof Combobox.Positioner>
>(function (props, ref) {
  const { className, ...rest } = props;
  const { classes } = useComboboxContext();

  return (
    <Combobox.Positioner
      className={cx(classes.positioner(), className)}
      ref={ref}
      {...rest}
    />
  );
});

export type TriggerProps = ComponentProps<typeof Trigger>;
const Trigger = forwardRef<
  ElementRef<typeof Combobox.Trigger>,
  ComponentPropsWithoutRef<typeof Combobox.Trigger>
>(function (props, ref) {
  const { className, ...rest } = props;
  const { classes } = useComboboxContext();

  return (
    <Combobox.Trigger
      className={cx(classes.trigger(), className)}
      ref={ref}
      {...rest}
    />
  );
});

export type ClearTriggerProps = ComponentProps<typeof ClearTrigger>;
const ClearTrigger = forwardRef<
  ElementRef<typeof Combobox.ClearTrigger>,
  ComponentPropsWithoutRef<typeof Combobox.ClearTrigger>
>(function (props, ref) {
  const { className, ...rest } = props;
  const { classes } = useComboboxContext();

  return (
    <Combobox.ClearTrigger
      className={cx(classes.clearTrigger(), className)}
      ref={ref}
      {...rest}
    />
  );
});

export type ItemGroupLabelProps = ComponentProps<typeof ItemGroupLabel>;
const ItemGroupLabel = forwardRef<
  ElementRef<typeof Combobox.ItemGroupLabel>,
  ComponentPropsWithoutRef<typeof Combobox.ItemGroupLabel>
>(function (props, ref) {
  const { className, ...rest } = props;
  const { classes } = useComboboxContext();

  return (
    <Combobox.ItemGroupLabel
      className={cx(classes.itemGroupLabel(), className)}
      ref={ref}
      {...rest}
    />
  );
});

export type ItemGroupProps = ComponentProps<typeof ItemGroup>;
const ItemGroup = forwardRef<
  ElementRef<typeof Combobox.ItemGroup>,
  ComponentPropsWithoutRef<typeof Combobox.ItemGroup>
>(function (props, ref) {
  const { className, ...rest } = props;
  const { classes } = useComboboxContext();

  return (
    <Combobox.ItemGroup
      className={cx(classes.itemGroup(), className)}
      ref={ref}
      {...rest}
    />
  );
});
export type ItemTextProps = ComponentProps<typeof ItemText>;
const ItemText = forwardRef<
  ElementRef<typeof Combobox.ItemText>,
  ComponentPropsWithoutRef<typeof Combobox.ItemText>
>(function (props, ref) {
  const { className, ...rest } = props;
  const { classes } = useComboboxContext();

  return (
    <Combobox.ItemText
      className={cx(classes.itemText(), className)}
      ref={ref}
      {...rest}
    />
  );
});
export type ItemIndicatorProps = ComponentProps<typeof ItemIndicator>;
const ItemIndicator = forwardRef<
  ElementRef<typeof Combobox.ItemIndicator>,
  ComponentPropsWithoutRef<typeof Combobox.ItemIndicator>
>(function (props, ref) {
  const { className, children, ...rest } = props;
  const { size, classes } = useComboboxContext();

  return (
    <Combobox.ItemIndicator
      className={cx(classes.itemIndicator(), className)}
      ref={ref}
      {...rest}
    >
      {children ?? <CheckIcon size={convertSizeToNumber(size)} />}
    </Combobox.ItemIndicator>
  );
});

export type ItemProps = ComponentProps<typeof Item>;
const Item = forwardRef<
  ElementRef<typeof Combobox.Item>,
  ComponentPropsWithoutRef<typeof Combobox.Item>
>(function (props, ref) {
  const { className, ...rest } = props;
  const { classes } = useComboboxContext();

  return (
    <Combobox.Item
      className={cx(classes.item(), className)}
      ref={ref}
      {...rest}
    />
  );
});

export {
  Root,
  Item,
  ItemGroup,
  ItemGroupLabel,
  ItemText,
  ItemIndicator,
  Positioner,
  Control,
  Content,
  Trigger,
  Input,
  ClearTrigger,
};

const convertSizeToNumber = (size?: 'sm' | 'md' | 'lg') => {
  if (size === 'sm') {
    return 16;
  }
  if (size === 'md') {
    return 20;
  }
  if (size === 'lg') {
    return 24;
  }

  return 20;
};
