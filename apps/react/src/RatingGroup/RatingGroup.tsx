import {
  RatingGroup,
  RatingGroupContextProps,
  RatingGroupItemContextProps,
  type RatingGroupHiddenInputProps,
} from '@ark-ui/react/rating-group';
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

export const ratingGroupVariant = tv({
  base: `${IDENTIFIER.scope} ratingGroup`,
  slots: {
    root: 'trds-flex trds-flex-col trds-gap-1.5 trds-text-primary',
    control: 'trds-flex',
    label: '',
    item: 'trds-cursor-pointer trds-transition trds-duration-normal trds-transition-[color,fill] trds-ease-default trds-fill-transparent data-highlighted:trds-fill-current focus-visible:trds-outline-none data-disabled:trds-cursor-not-allowed data-disabled:trds-opacity-muted',
  },

  variants: {
    size: {
      sm: {
        control: 'trds-gap-0',
        item: '[&_svg:trds-w-4] [&_svg:trds-h-4]',
        label: 'trds-text-sm',
      },
      md: {
        control: 'trds-gap-0.5',
        item: '[&_svg:trds-w-5] [&_svg:trds-h-5]',
        label: 'trds-text-sm',
      },
      lg: {
        control: 'trds-gap-0.5',
        item: '[&_svg:trds-w-6] [&_svg:trds-h-6]',
        label: 'trds-text-md',
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

type RadioGroupProviderProps = {
  classes: ReturnType<typeof ratingGroupVariant>;
} & VariantProps<typeof ratingGroupVariant>;

const [RatingGroupProvider, useRatingGroupContext] =
  createReactContext<RadioGroupProviderProps>({
    name: 'radioGroup',
    hookName: 'useRadioGroupContext',
    providerName: 'RadioGroupProvider',
    defaultValue: {
      classes: {} as ReturnType<typeof ratingGroupVariant>,
      size: 'md',
    },
  });

export type RootProps = ComponentProps<typeof Root>;
const Root = forwardRef<
  ElementRef<typeof RatingGroup.Root>,
  ComponentPropsWithoutRef<typeof RatingGroup.Root> &
    VariantProps<typeof ratingGroupVariant>
>(function (props, ref) {
  const { size, className, children, ...rest } = props;
  const classes = ratingGroupVariant({ size });
  const ctx = {
    classes,
    size,
  };

  return (
    <RatingGroupProvider value={ctx}>
      <RatingGroup.Root
        ref={ref}
        className={cx(classes.root(), className)}
        {...rest}
      >
        {children}
      </RatingGroup.Root>
    </RatingGroupProvider>
  );
});

export type LabelProps = ComponentProps<typeof Label>;
const Label = forwardRef<
  ElementRef<typeof RatingGroup.Label>,
  ComponentPropsWithoutRef<typeof RatingGroup.Label>
>(function (props, ref) {
  const { className, ...rest } = props;
  const { classes } = useRatingGroupContext();

  return (
    <RatingGroup.Label
      className={cx(classes.label(), className)}
      ref={ref}
      {...rest}
    />
  );
});
Label.displayName = 'RatingGroup.Label';

export type ItemProps = ComponentProps<typeof Item>;
const Item = forwardRef<
  ElementRef<typeof RatingGroup.Item>,
  ComponentPropsWithoutRef<typeof RatingGroup.Item>
>(function (props, ref) {
  const { className, ...rest } = props;
  const { classes } = useRatingGroupContext();

  return (
    <RatingGroup.Item
      className={cx(classes.item(), className)}
      ref={ref}
      {...rest}
    />
  );
});
Item.displayName = 'RatingGroup.Item';

export type ControlProps = ComponentProps<typeof Control>;
const Control = forwardRef<
  ElementRef<typeof RatingGroup.Control>,
  ComponentPropsWithoutRef<typeof RatingGroup.Control>
>(function (props, ref) {
  const { className, ...rest } = props;
  const { classes } = useRatingGroupContext();

  return (
    <RatingGroup.Control
      className={cx(classes.control(), className)}
      ref={ref}
      {...rest}
    />
  );
});
Control.displayName = 'RatingGroup.Control';

export type HiddenInputProps = RatingGroupHiddenInputProps;
const HiddenInput = RatingGroup.HiddenInput;

export type ContextProps = RatingGroupContextProps;
const Context = RatingGroup.Context;

export type ItemContextProps = RatingGroupItemContextProps;
const ItemContext = RatingGroup.ItemContext;

const convertSizeToNumber = (size?: 'sm' | 'md' | 'lg') => {
  if (size === 'sm') {
    return 12;
  }
  if (size === 'md') {
    return 16;
  }
  if (size === 'lg') {
    return 20;
  }

  return 16;
};

const FullStarIcon = (props: ComponentProps<'svg'>) => {
  const { size } = useRatingGroupContext();

  return (
    <svg
      width={convertSizeToNumber(size)}
      height={convertSizeToNumber(size)}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M15.09 8.26L12 2L8.91 8.26L2 9.27L7 14.14L5.82 21.02L12 17.77L18.18 21.02L17 14.14L22 9.27L15.09 8.26Z"
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const HalfStarIcon = (props: ComponentProps<'svg'>) => {
  const { size } = useRatingGroupContext();

  return (
    <svg
      width={convertSizeToNumber(size)}
      height={convertSizeToNumber(size)}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M15.09 8.26L12 2L8.91 8.26L2 9.27L7 14.14L5.82 21.02L12 17.77L18.18 21.02L17 14.14L22 9.27L15.09 8.26Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.82 21.02L12 17.77V2L8.91 8.26L2 9.27L7 14.14L5.82 21.02Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const EmptyStarIcon = (props: ComponentProps<'svg'>) => {
  const { size } = useRatingGroupContext();

  return (
    <svg
      width={convertSizeToNumber(size)}
      height={convertSizeToNumber(size)}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M15.09 8.26L12 2L8.91 8.26L2 9.27L7 14.14L5.82 21.02L12 17.77L18.18 21.02L17 14.14L22 9.27L15.09 8.26Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

export {
  Root,
  Item,
  HiddenInput,
  Control,
  FullStarIcon,
  HalfStarIcon,
  EmptyStarIcon,
  Context,
  ItemContext,
};
