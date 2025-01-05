import { RadioGroup } from '@ark-ui/react/radio-group';
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

export const radioGroupVariant = tv({
  base: `${IDENTIFIER.scope} radioGroup`,
  slots: {
    root: 'trds-text-fg trds-flex trds-flex-col data-vertical:trds-flex-col data-horizontal:trds-flex-row',
    item: 'trds-flex trds-items-center trds-cursor-pointer data-disabled:trds-cursor-not-allowed',
    itemControl: [
      'trds-transition-colors trds-transition-[outline] trds-duration-faster',
      'trds-bg-transparent trds-border-boundary-radio trds-rounded-full trds-border-2',
      'hover:trds-bg-layer-hover',
      'data-checked:trds-bg-transparent data-checked:trds-border-primary-boundary data-checked:trds-outline data-checked:trds-outline-primary',
      'data-disabled:trds-border-muted data-disabled:trds-text-fg-muted data-disabled:trds-border-muted data-disabled:trds-outline-muted',
    ],
    itemText: 'trds-font-medium data-disabled:trds-text-fg-muted',
    indicator: '',
    label: '',
  },
  variants: {
    size: {
      sm: {
        root: 'data-vertical:trds-gap-3 data-horizontal:trds-gap-4',
        item: 'trds-gap-2',
        itemControl:
          'trds-w-4 trds-h-4 data-checked:trds-outline-[4px] data-checked:trds-outline-offset-[-8px]',
        itemText: 'trds-text-sm',
      },
      md: {
        root: 'data-vertical:trds-gap-4 data-horizontal:trds-gap-6',
        item: 'trds-gap-3',
        itemControl:
          'trds-w-5 trds-h-5 data-checked:trds-outline-[5px] data-checked:trds-outline-offset-[-10px]',
        itemText: 'trds-text-md',
      },
      lg: {
        root: 'data-vertical:trds-gap-5 data-horizontal:trds-gap-8',
        item: 'trds-gap-4',
        itemControl:
          'trds-w-6 trds-h-6 data-checked:trds-outline-[6px] data-checked:trds-outline-offset-[-12px]',
        itemText: 'trds-text-lg',
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

type RadioGroupProviderProps = {
  classes: ReturnType<typeof radioGroupVariant>;
};

const [RadioGroupProvider, useRadioGroupContext] =
  createReactContext<RadioGroupProviderProps>({
    name: 'radioGroup',
    hookName: 'useRadioGroupContext',
    providerName: 'RadioGroupProvider',
    defaultValue: {
      classes: {} as ReturnType<typeof radioGroupVariant>,
    },
  });

export type RootProps = ComponentProps<typeof Root>;
const Root = forwardRef<
  ElementRef<typeof RadioGroup.Root>,
  ComponentPropsWithoutRef<typeof RadioGroup.Root> &
    VariantProps<typeof radioGroupVariant>
>(function (props, ref) {
  const { size, className, children, ...rest } = props;
  const classes = radioGroupVariant({ size });
  const ctx = {
    classes,
  };

  return (
    <RadioGroupProvider value={ctx}>
      <RadioGroup.Root
        ref={ref}
        className={cx(classes.root(), className)}
        {...rest}
      >
        {children}
      </RadioGroup.Root>
    </RadioGroupProvider>
  );
});
Root.displayName = 'RadioGroup.Root';

export type LabelProps = ComponentProps<typeof Label>;
const Label = forwardRef<
  ElementRef<typeof RadioGroup.Label>,
  ComponentPropsWithoutRef<typeof RadioGroup.Label>
>(function (props, ref) {
  const { className, ...rest } = props;
  const { classes } = useRadioGroupContext();

  return (
    <RadioGroup.Label
      className={cx(classes.label(), className)}
      ref={ref}
      {...rest}
    />
  );
});
Label.displayName = 'RadioGroup.Label';

export type IndicatorProps = ComponentProps<typeof Indicator>;
const Indicator = forwardRef<
  ElementRef<typeof RadioGroup.Indicator>,
  ComponentPropsWithoutRef<typeof RadioGroup.Indicator>
>(function (props, ref) {
  const { className, ...rest } = props;
  const { classes } = useRadioGroupContext();

  return (
    <RadioGroup.Indicator
      className={cx(classes.indicator(), className)}
      ref={ref}
      {...rest}
    />
  );
});
Indicator.displayName = 'RadioGroup.Indicator';

export type ItemProps = ComponentProps<typeof Item>;
const Item = forwardRef<
  ElementRef<typeof RadioGroup.Item>,
  ComponentPropsWithoutRef<typeof RadioGroup.Item>
>(function (props, ref) {
  const { className, ...rest } = props;
  const { classes } = useRadioGroupContext();

  return (
    <RadioGroup.Item
      className={cx(classes.item(), className)}
      ref={ref}
      {...rest}
    />
  );
});
Item.displayName = 'RadioGroup.Item';

export type ItemControlProps = ComponentProps<typeof ItemControl>;
const ItemControl = forwardRef<
  ElementRef<typeof RadioGroup.ItemControl>,
  ComponentPropsWithoutRef<typeof RadioGroup.ItemControl>
>(function (props, ref) {
  const { className, ...rest } = props;
  const { classes } = useRadioGroupContext();

  return (
    <RadioGroup.ItemControl
      ref={ref}
      className={cx(classes.itemControl(), className)}
      {...rest}
    />
  );
});
ItemControl.displayName = 'RadioGroup.ItemControl';

export type ItemTextProps = ComponentProps<typeof ItemText>;
const ItemText = forwardRef<
  ElementRef<typeof RadioGroup.ItemText>,
  ComponentPropsWithoutRef<typeof RadioGroup.ItemText>
>(function (props, ref) {
  const { className, ...rest } = props;
  const { classes } = useRadioGroupContext();

  return (
    <RadioGroup.ItemText
      ref={ref}
      className={cx(classes.itemText(), className)}
      {...rest}
    />
  );
});
ItemText.displayName = 'RadioGroup.ItemText';

export type ItemHiddenInputProps = ComponentProps<typeof ItemHiddenInput>;
const ItemHiddenInput = forwardRef<
  ElementRef<typeof RadioGroup.ItemHiddenInput>,
  ComponentPropsWithoutRef<typeof RadioGroup.ItemHiddenInput>
>(function (props, ref) {
  const { className, ...rest } = props;

  return (
    <RadioGroup.ItemHiddenInput ref={ref} className={className} {...rest} />
  );
});
ItemHiddenInput.displayName = 'RadioGroup.ItemHiddenInput';

export { Root, Item, Indicator, ItemControl, ItemHiddenInput, ItemText, Label };
