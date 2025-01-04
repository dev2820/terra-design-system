import {
  SegmentGroup,
  SegmentGroupItemProps,
  type SegmentGroupRootProps,
} from '@ark-ui/react/segment-group';
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

export const segmentGroupVariant = tv({
  base: `${IDENTIFIER.scope} segmentGroup`,
  slots: {
    root: 'trds-flex trds-items-start trds-border-boundary-indicator data-horizontal:trds-flex-row data-vertical:trds-flex-col data-horizontal:trds-gap-4 data-vertical:trds-gap-1 data-horizontal:trds-border-b-[1px] data-vertical:trds-border-l-[1px]',
    indicator:
      'trds-border-primary-boundary data-horizontal:trds-bottom-0 data-horizontal:trds-border-b-[2px] data-horizontal:trds-translate-y-[1px] data-horizontal:trds-w-[var(--width)] data-vertical:trds-border-l-[2px] data-vertical:trds-h-[var(--height)] data-vertical:trds-translate-x-[-1px]',
    item: 'trds-text-fg-trigger trds-cursor-pointer trds-font-normal trds-duration-normal trds-transition-[color] data-checked:trds-text-primary hover:trds-text-primary data-disabled:trds-text-muted data-disabled:trds-cursor-not-allowed data-horizontal:trds-px-1 data-vertical:trds-px-3 data-horizontal:trds-pb-3 data-vertical:trds-py-1.5',
    itemControl: '',
    itemText: '',
  },
  variants: {
    size: {
      sm: {
        itemText: 'trds-text-sm',
      },
      md: {
        itemText: 'trds-text-md',
      },
      lg: {
        itemText: 'trds-text-lg',
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

type SegmentGroupProviderProps = {
  classes: ReturnType<typeof segmentGroupVariant>;
};

const [SegmentGroupProvider, useSegmentGroupContext] =
  createReactContext<SegmentGroupProviderProps>({
    name: 'segmentGroup',
    hookName: 'useSegmentGroupContext',
    providerName: 'SegmentGroupProvider',
    defaultValue: {
      classes: {} as ReturnType<typeof segmentGroupVariant>,
    },
  });

export type RootProps = SegmentGroupRootProps &
  VariantProps<typeof segmentGroupVariant>;

const Root = forwardRef<ElementRef<typeof SegmentGroup.Root>, RootProps>(
  function (props, ref) {
    const { size, className, children, ...rest } = props;
    const classes = segmentGroupVariant({ size });
    const ctx = {
      classes,
    };

    return (
      <SegmentGroupProvider value={ctx}>
        <SegmentGroup.Root
          ref={ref}
          className={cx(classes.root(), className)}
          {...rest}
        >
          {children}
        </SegmentGroup.Root>
      </SegmentGroupProvider>
    );
  },
);
Root.displayName = 'SegmentGroup.Root';

export type ItemProps = SegmentGroupItemProps;
const Item = forwardRef<ElementRef<typeof SegmentGroup.Item>, ItemProps>(
  function (props, ref) {
    const { className, ...rest } = props;
    const { classes } = useSegmentGroupContext();

    return (
      <SegmentGroup.Item
        className={cx(classes.item(), className)}
        ref={ref}
        {...rest}
      />
    );
  },
);
Item.displayName = 'SegmentGroup.Item';

export type ItemHiddenInputProps = ComponentProps<typeof ItemHiddenInput>;
const ItemHiddenInput = forwardRef<
  ElementRef<typeof SegmentGroup.ItemHiddenInput>,
  ComponentPropsWithoutRef<typeof SegmentGroup.ItemHiddenInput>
>(function (props, ref) {
  const { className, ...rest } = props;

  return (
    <SegmentGroup.ItemHiddenInput
      className={cx(className)}
      ref={ref}
      {...rest}
    />
  );
});
ItemHiddenInput.displayName = 'SegmentGroup.ItemHiddenInput';

export type ItemTextProps = ComponentProps<typeof ItemText>;
const ItemText = forwardRef<
  ElementRef<typeof SegmentGroup.ItemText>,
  ComponentPropsWithoutRef<typeof SegmentGroup.ItemText>
>(function (props, ref) {
  const { className, ...rest } = props;
  const { classes } = useSegmentGroupContext();

  return (
    <SegmentGroup.ItemText
      className={cx(classes.itemText(), className)}
      ref={ref}
      {...rest}
    />
  );
});
ItemText.displayName = 'SegmentGroup.ItemText';

export type ItemControlProps = ComponentProps<typeof ItemControl>;
const ItemControl = forwardRef<
  ElementRef<typeof SegmentGroup.ItemControl>,
  ComponentPropsWithoutRef<typeof SegmentGroup.ItemControl>
>(function (props, ref) {
  const { className, ...rest } = props;
  const { classes } = useSegmentGroupContext();

  return (
    <SegmentGroup.ItemControl
      className={cx(classes.itemControl(), className)}
      ref={ref}
      {...rest}
    />
  );
});
ItemControl.displayName = 'SegmentGroup.ItemControl';

export type IndicatorProps = ComponentProps<typeof Indicator>;
const Indicator = forwardRef<
  ElementRef<typeof SegmentGroup.Indicator>,
  ComponentPropsWithoutRef<typeof SegmentGroup.Indicator>
>(function (props, ref) {
  const { className, ...rest } = props;
  const { classes } = useSegmentGroupContext();

  return (
    <SegmentGroup.Indicator
      className={cx(classes.indicator(), className)}
      ref={ref}
      {...rest}
    />
  );
});
Indicator.displayName = 'SegmentGroup.Indicator';

export { Root, Item, Indicator, ItemControl, ItemText, ItemHiddenInput };
