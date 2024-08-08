import { segmentGroupAnatomy } from '@ark-ui/anatomy';
import {
  SegmentGroup,
  SegmentGroupItemProps,
  type SegmentGroupRootProps,
} from '@ark-ui/react/segment-group';

import {
  ComponentProps,
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
} from 'react';

import { RecipeVariantProps, cx, sva } from '../../styled-system/css';
import { createReactContext } from '../create-react-context';

export const segmentGroupVariant = sva({
  className: 'segmentGroup',
  slots: segmentGroupAnatomy.keys(),
  base: {
    root: {
      alignItems: 'flex-start',
      display: 'flex',
      borderColor: 'neutral.200',
      flexDirection: {
        _horizontal: 'row',
        _vertical: 'column',
      },
      gap: {
        _horizontal: '4',
        _vertical: '1',
      },
      borderBottomWidth: {
        _horizontal: '1px',
      },
      borderLeftWidth: {
        _vertical: '1px',
      },
    },
    indicator: {
      borderColor: 'neutral.800',
      _horizontal: {
        bottom: '0',
        borderBottomWidth: '2px',
        transform: 'translateY(1px)',
        width: 'var(--width)',
      },
      _vertical: {
        borderLeftWidth: '2px',
        height: 'var(--height)',
        transform: 'translateX(-1px)',
      },
    },
    item: {
      color: 'neutral.400',
      cursor: 'pointer',
      fontWeight: 'medium',
      transitionDuration: 'normal',
      transitionProperty: 'color',
      transitionTimingFunction: 'default',
      _hover: {
        color: 'neutral.700',
      },
      _checked: {
        fontWeight: 'semibold',
        color: 'neutral.700',
        _hover: {
          color: 'neutral.700',
        },
      },
      _disabled: {
        color: 'disabled',
        cursor: 'not-allowed',
        _hover: {
          color: 'disabled',
        },
      },
      px: {
        _horizontal: '1',
        _vertical: '3',
      },
      pb: {
        _horizontal: '3',
      },
      py: {
        _vertical: '1.5',
      },
    },
  },
  variants: {
    size: {
      sm: {
        item: {
          textStyle: 'sm',
        },
      },
      md: {
        item: {
          textStyle: 'md',
        },
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
      classes: {},
    },
  });

export type RootProps = SegmentGroupRootProps &
  RecipeVariantProps<typeof segmentGroupVariant>;

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
          className={cx(classes.root, className)}
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
        className={cx(classes.item, className)}
        ref={ref}
        {...rest}
      >
        <SegmentGroup.ItemControl
          className={classes.itemControl}
        ></SegmentGroup.ItemControl>
        <SegmentGroup.ItemText className={classes.itemText}>
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
      className={cx(classes.indicator, className)}
      ref={ref}
      {...rest}
    />
  );
});

export { Root, Item, Indicator };
