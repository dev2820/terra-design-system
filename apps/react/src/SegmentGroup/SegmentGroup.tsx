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
    root: 'flex items-start border-boundary data-horizontal:flex-row data-vertical:flex-col data-horizontal:gap-4 data-vertical:gap-1 data-horizontal:border-b-[1px] data-vertical:border-l-[1px]',
    indicator:
      'border-primary data-horizontal:bottom-0 data-horizontal:border-b-[2px] data-horizontal:translate-y-[1px] data-horizontal:w-[var(--width)] data-vertical:border-l-[2px] data-vertical:h-[var(--height)] data-vertical:translate-x-[-1px]',
    item: 'text-caption cursor-pointer font-medium transition duration-normal transition-[color] ease-default hover:text-neutral-700 data-checked:font-semibold data-checked:text-fg-highlight hover:text-fg-highlight data-disabled:text-muted data-disabled:cursor-not-allowed data-horizontal:px-1 data-vertical:px-3 data-horizontal:pb-3 data-vertical:py-1.5',
    itemControl: '',
    itemText: '',
  },
  variants: {
    size: {
      sm: 'text-sm',
      md: 'text-md',
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

export type ItemProps = SegmentGroupItemProps;

const Item = forwardRef<ElementRef<typeof SegmentGroup.Item>, ItemProps>(
  function (props, ref) {
    const { className, children, ...rest } = props;
    const { classes } = useSegmentGroupContext();

    return (
      <SegmentGroup.Item
        className={cx(classes.item(), className)}
        ref={ref}
        {...rest}
      >
        <SegmentGroup.ItemControl
          className={classes.itemControl()}
        ></SegmentGroup.ItemControl>
        <SegmentGroup.ItemText className={classes.itemText()}>
          {children}
        </SegmentGroup.ItemText>
        <SegmentGroup.ItemHiddenInput />
      </SegmentGroup.Item>
    );
  },
);

export type IndicatorProps = ComponentProps<typeof Indicator>;
const Indicator = forwardRef<
  ElementRef<typeof SegmentGroup.Indicator>,
  ComponentPropsWithoutRef<typeof SegmentGroup.Indicator>
>(function (props, ref) {
  const { className, children, ...rest } = props;
  const { classes } = useSegmentGroupContext();

  return (
    <SegmentGroup.Indicator
      className={cx(classes.indicator(), className)}
      ref={ref}
      {...rest}
    />
  );
});

export { Root, Item, Indicator };
