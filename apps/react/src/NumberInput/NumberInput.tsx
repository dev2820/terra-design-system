import {
  NumberInput as _NumberInput,
  NumberInputRootProps,
} from '@ark-ui/react';
import { IDENTIFIER } from 'env';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';

import { forwardRef } from 'react';

import { cx } from '../cx';
import { tv, VariantProps } from '../tv';

const trigger = [
  'trds-inline-flex trds-items-center trds-justify-center',
  'trds-border-boundary trds-text-fg trds-cursor-pointer',
  'trds-transition trds-duration-normal trds-transition-[background,border-color,color,box-shadow] trds-ease-in-out',
  '[&_:where(svg)]:trds-w-4 [&_:where(svg)]:trds-h-4',
  'hover:trds-bg-layer-hover hover:trds-text-fg',
  'data-disabled:trds-bg-transparent data-disabled:trds-text-fg-muted data-disabled:trds-opacity-50 data-disabled:trds-cursor-not-allowed',
];
const numberInputVariants = tv({
  base: `${IDENTIFIER.scope} numberInput`,
  slots: {
    root: 'trds-flex trds-flex-col trds-gap-1.5',
    control:
      'trds-bg-layer-input trds-border trds-border-boundary-input trds-rounded-lg trds-grid trds-divide-x-[1px] trds-grid-cols-[1fr_32px] trds-grid-rows-[1fr_1fr] trds-overflow-hidden trds-transition trds-duration-normal trds-transition-[border-color,box-shadow] trds-ease-in-out focus-within:trds-border-primary-boundary focus-within:trds-shadow-[0_0_0_1px_var(--shadow-color)] focus-within:trds-shadow-primary',
    input:
      'trds-bg-layer-input trds-text-fg-input trds-border-none trds-row-span-2 trds-outline-none trds-w-full placeholder:trds-text-fg-placeholder disabled:trds-cursor-not-allowed disabled:trds-opacity-50',
    incrementTrigger: cx('', trigger, 'trds-border-b'),
    decrementTrigger: cx('', trigger),
  },
  variants: {
    invalid: {
      true: {
        control: 'trds-border-danger',
      },
    },
    size: {
      md: {
        control: 'trds-ps-3 trds-h-10 trds-min-w-10 trds-text-md',
      },
      lg: {
        control: 'trds-ps-3.5 trds-h-11 trds-min-w-11 trds-text-md',
      },
      xl: {
        control: 'trds-ps-4 trds-h-12 trds-min-w-12 trds-text-lg',
      },
    },
  },
  defaultVariants: {
    size: 'md',
    invalid: false,
  },
});

export type NumberInputProps = Omit<NumberInputRootProps, 'children'> &
  VariantProps<typeof numberInputVariants> & {
    placeholder?: string;
    invalid?: boolean;
  };

const NumberInput = forwardRef<HTMLDivElement, NumberInputProps>(
  function (props, ref) {
    const { placeholder, invalid, size, className, ...rest } = props;
    const classes = numberInputVariants({ size, invalid });

    return (
      <_NumberInput.Root
        ref={ref}
        className={cx(classes.root(), className)}
        {...rest}
      >
        <_NumberInput.Control className={classes.control()}>
          <_NumberInput.Input
            className={classes.input()}
            placeholder={placeholder}
          />
          <_NumberInput.IncrementTrigger className={classes.incrementTrigger()}>
            <ChevronUpIcon />
          </_NumberInput.IncrementTrigger>
          <_NumberInput.DecrementTrigger className={classes.decrementTrigger()}>
            <ChevronDownIcon />
          </_NumberInput.DecrementTrigger>
        </_NumberInput.Control>
      </_NumberInput.Root>
    );
  },
);

NumberInput.displayName = 'NumberInput';

export { NumberInput };
