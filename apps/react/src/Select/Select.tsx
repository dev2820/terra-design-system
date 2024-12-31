import {
  Select,
  type SelectItemGroupProps,
  type SelectItemProps,
} from '@ark-ui/react/select';
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

export const selectVariant = tv({
  base: `${IDENTIFIER.scope} select`,
  slots: {
    root: 'trds-flex trds-flex-col trds-gap-1.5 trds-w-full',
    content:
      'trds-bg-white trds-rounded-lg trds-shadow-lg trds-flex trds-flex-col trds-z-dropdown data-open:trds-animate-fade-in data-closed:trds-animate-fade-out focus-visible:trds-outline-2 focus-visible:trds-outline-solid focus-visible:trds-outline-boundary focus-visible:trds-outline-offset-2',
    item: 'trds-flex trds-items-center trds-justify-between trds-rounded-md trds-cursor-pointer trds-transition-fast trds-transition-[background,color] trds-ease-default hover:trds-bg-layer1 hover:trds-text-black data-highlighted:trds-bg-layer1 data-highlighted:trds-text-black data-selected:trds-text-black data-disabled:trds-text-muted data-disabled:trds-cursor-not-allowed',
    itemGroupLabel: 'trds-font-semibold trds-text-sm',
    itemIndicator: 'trds-text-black',
    label: 'trds-text-grayscale-500 trds-font-medium',
    trigger:
      'trds-appearance-none trds-inline-flex trds-items-center trds-justify-between trds-border-boundary trds-rounded-lg trds-cursor-pointer trds-text-fg-title trds-inline-flex trds-relative trds-outline-0 trds-transition trds-duration-normal trds-transition-[background,box-shadow,border-color] trds-ease-default trds-w-full trds-border-[1px] focus:trds-border-boundary focus:trds-shadow-[0_0_0_2px_var(--shadow-color)] focus:trds-shadow-primary-500 placeholder-shown:trds-text-fg-placeholder disabled:trds-text-muted disabled:trds-cursor-not-allowed disabled:[&_:where(svg)]:text-muted [&_:where(svg)]:text-subtle',
    control: '',
    valueText:
      'trds-flex-1 trds-whitespace-nowrap trds-text-left trds-overflow-hidden trds-text-ellipsis',
    indicator: '',
    positioner: '',
    itemGroup: '',
    itemText: '',
    clearTrigger: '',
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
  VariantProps<typeof selectVariant>;
const Root = forwardRef<ElementRef<typeof Select.Root>, RootProps>(
  function (props, ref) {
    const { size, className, children, ...rest } = props;
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
          {children}
        </Select.Root>
      </SelectProvider>
    );
  },
);

export type ItemGroupLabelProps = ComponentProps<typeof ItemGroupLabel>;
const ItemGroupLabel = forwardRef<
  ElementRef<typeof Select.ItemGroupLabel>,
  ComponentPropsWithoutRef<typeof Select.ItemGroupLabel>
>(function (props, ref) {
  const { className, ...rest } = props;
  const { classes } = useSelectContext();

  return (
    <Select.ItemGroupLabel
      className={cx(classes.itemGroupLabel(), className)}
      ref={ref}
      {...rest}
    />
  );
});
ItemGroupLabel.displayName = 'Select.ItemGroupLabel';

export type ItemIndicatorProps = ComponentProps<typeof ItemIndicator>;
const ItemIndicator = forwardRef<
  ElementRef<typeof Select.ItemIndicator>,
  ComponentPropsWithoutRef<typeof Select.ItemIndicator>
>(function (props, ref) {
  const { className, ...rest } = props;
  const { classes } = useSelectContext();

  return (
    <Select.ItemIndicator
      className={cx(classes.itemIndicator(), className)}
      ref={ref}
      {...rest}
    />
  );
});
ItemIndicator.displayName = 'Select.ItemIndicator';

export type ItemTextProps = ComponentProps<typeof ItemText>;
const ItemText = forwardRef<
  ElementRef<typeof Select.ItemText>,
  ComponentPropsWithoutRef<typeof Select.ItemText>
>(function (props, ref) {
  const { className, ...rest } = props;
  const { classes } = useSelectContext();

  return (
    <Select.ItemText
      className={cx(classes.itemText(), className)}
      ref={ref}
      {...rest}
    />
  );
});
ItemText.displayName = 'Select.ItemText';

export type HiddenSelectProps = ComponentProps<typeof HiddenSelect>;
const HiddenSelect = forwardRef<
  ElementRef<typeof Select.HiddenSelect>,
  ComponentPropsWithoutRef<typeof Select.HiddenSelect>
>(function (props, ref) {
  const { className, ...rest } = props;

  return <Select.HiddenSelect className={className} ref={ref} {...rest} />;
});
HiddenSelect.displayName = 'Select.HiddenSelect';

export type ContentProps = ComponentProps<typeof Content>;
const Content = forwardRef<
  ElementRef<typeof Select.Content>,
  ComponentPropsWithoutRef<typeof Select.Content>
>(function (props, ref) {
  const { className, ...rest } = props;
  const { classes } = useSelectContext();

  return (
    <Select.Content
      className={cx(classes.content(), className)}
      ref={ref}
      {...rest}
    />
  );
});
Content.displayName = 'Select.Content';

export type PositionerProps = ComponentProps<typeof Positioner>;
const Positioner = forwardRef<
  ElementRef<typeof Select.Positioner>,
  ComponentPropsWithoutRef<typeof Select.Positioner>
>(function (props, ref) {
  const { className, ...rest } = props;
  const { classes } = useSelectContext();

  return (
    <Select.Positioner
      className={cx(classes.positioner(), className)}
      ref={ref}
      {...rest}
    />
  );
});
Positioner.displayName = 'Select.Positioner';

export type IndicatorProps = ComponentProps<typeof Indicator>;
const Indicator = forwardRef<
  ElementRef<typeof Select.Indicator>,
  ComponentPropsWithoutRef<typeof Select.Indicator>
>(function (props, ref) {
  const { className, ...rest } = props;
  const { classes } = useSelectContext();

  return (
    <Select.Indicator
      className={cx(classes.indicator(), className)}
      ref={ref}
      {...rest}
    />
  );
});
Indicator.displayName = 'Select.Indicator';

export type ValueTextProps = ComponentProps<typeof ValueText>;
const ValueText = forwardRef<
  ElementRef<typeof Select.ValueText>,
  ComponentPropsWithoutRef<typeof Select.ValueText>
>(function (props, ref) {
  const { className, ...rest } = props;
  const { classes } = useSelectContext();

  return (
    <Select.ValueText
      className={cx(classes.valueText(), className)}
      ref={ref}
      {...rest}
    />
  );
});
ValueText.displayName = 'Select.ValueText';

export type TriggerProps = ComponentProps<typeof Trigger>;
const Trigger = forwardRef<
  ElementRef<typeof Select.Trigger>,
  ComponentPropsWithoutRef<typeof Select.Trigger>
>(function (props, ref) {
  const { className, ...rest } = props;
  const { classes } = useSelectContext();

  return (
    <Select.Trigger
      className={cx(classes.trigger(), className)}
      ref={ref}
      {...rest}
    />
  );
});
Trigger.displayName = 'Select.Trigger';

export type ControlProps = ComponentProps<typeof Control>;
const Control = forwardRef<
  ElementRef<typeof Select.Control>,
  ComponentPropsWithoutRef<typeof Select.Control>
>(function (props, ref) {
  const { className, ...rest } = props;
  const { classes } = useSelectContext();

  return (
    <Select.Control
      className={cx(classes.control(), className)}
      ref={ref}
      {...rest}
    />
  );
});
Control.displayName = 'Select.Control';

export type ItemGroupProps = SelectItemGroupProps;
const ItemGroup = forwardRef<
  ElementRef<typeof Select.ItemGroup>,
  ItemGroupProps
>(function (props, ref) {
  const { className, ...rest } = props;
  const { classes } = useSelectContext();

  return (
    <Select.ItemGroup
      className={cx(classes.itemGroup(), className)}
      ref={ref}
      {...rest}
    />
  );
});
ItemGroup.displayName = 'Select.ItemGroup';

export type ItemProps = SelectItemProps;
const Item = forwardRef<ElementRef<typeof Select.Item>, ItemProps>(
  function (props, ref) {
    const { className, ...rest } = props;
    const { classes } = useSelectContext();

    return (
      <Select.Item
        className={cx(classes.item(), className)}
        ref={ref}
        {...rest}
      />
    );
  },
);
Item.displayName = 'Select.Item';

export type ClearTriggerProps = ComponentProps<typeof ClearTrigger>;
const ClearTrigger = forwardRef<
  ElementRef<typeof Select.ClearTrigger>,
  ComponentPropsWithoutRef<typeof Select.ClearTrigger>
>(function (props, ref) {
  const { className, ...rest } = props;
  const { classes } = useSelectContext();

  return (
    <Select.ClearTrigger
      className={cx(classes.clearTrigger(), className)}
      ref={ref}
      {...rest}
    />
  );
});
ClearTrigger.displayName = 'Select.ClearTrigger';

export type LabelProps = ComponentProps<typeof Label>;
const Label = forwardRef<
  ElementRef<typeof Select.Label>,
  ComponentPropsWithoutRef<typeof Select.Label>
>(function (props, ref) {
  const { className, ...rest } = props;
  const { classes } = useSelectContext();

  return (
    <Select.Label
      className={cx(classes.label(), className)}
      ref={ref}
      {...rest}
    />
  );
});
Label.displayName = 'Select.Label';

export {
  Root,
  Item,
  ItemText,
  ValueText,
  ItemIndicator,
  ItemGroup,
  ItemGroupLabel,
  Trigger,
  Content,
  Control,
  Positioner,
  HiddenSelect,
  ClearTrigger,
  Indicator,
  Label,
};
