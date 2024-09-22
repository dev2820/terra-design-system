import { NumberInput, NumberInputRootProps } from '@ark-ui/react';
import { IDENTIFIER } from 'env';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';

import { forwardRef } from 'react';

import { cx } from '../cx';
import { tv, VariantProps } from '../tv';

const trigger = [
  'inline-flex items-center justify-center',
  'border-boundary text-neutral-500 cursor-pointer',
  'transition duration-normal transition-[background,border-color,color,box-shadow] ease-default',
  '[&_:where(svg)]:w-4 [&_:where(svg)]:h-4',
  'hover:bg-layer1 hover:text-neutral-500',
  'data-disabled:bg-transparent data-disabled:text-muted data-disabled:opacity-50 data-disabled:cursor-not-allowed',
];
const numberInputVariants = tv({
  base: `${IDENTIFIER.scope} numberInput`,
  slots: {
    root: 'flex flex-col gap-1.5',
    control:
      'border border-boundary rounded-lg grid divide-x-[1px] grid-cols-[1fr_32px] grid-rows-[1fr_1fr] overflow-hidden transition duration-normal transition-[border-color,box-shadow] ease-default focus-within:border-primary-500 focus-within:shadow-[0_0_0_1px_var(--shadow-color)] focus-within:shadow-primary-500',
    input:
      'bg-transparent border-none row-span-2 outline-none w-full placeholder:text-placeholder disabled:cursor-not-allowed disabled:opacity-50',
    incrementTrigger: [...trigger, 'border-b'],
    decrementTrigger: trigger,
  },
  variants: {
    invalid: {
      true: {
        control: 'border-error-500',
      },
    },
    size: {
      md: {
        control: 'ps-3 h-10 min-w-10 text-md',
      },
      lg: {
        control: 'ps-3.5 h-11 min-w-11 text-md',
      },
      xl: {
        control: 'ps-4 h-12 min-w-12 text-lg',
      },
    },
  },
  defaultVariants: {
    size: 'md',
    invalid: false,
  },
});

export type RootProps = Omit<NumberInputRootProps, 'children'> &
  VariantProps<typeof numberInputVariants> & {
    placeholder?: string;
    invalid?: boolean;
  };

const Root = forwardRef<HTMLDivElement, RootProps>(function (props, ref) {
  const { placeholder, invalid, size, className, ...rest } = props;
  const classes = numberInputVariants({ size, invalid });

  return (
    <NumberInput.Root
      ref={ref}
      className={cx(classes.root(), className)}
      {...rest}
    >
      <NumberInput.Control className={classes.control()}>
        <NumberInput.Input
          className={classes.input()}
          placeholder={placeholder}
        />
        <NumberInput.IncrementTrigger className={classes.incrementTrigger()}>
          <ChevronUpIcon />
        </NumberInput.IncrementTrigger>
        <NumberInput.DecrementTrigger className={classes.decrementTrigger()}>
          <ChevronDownIcon />
        </NumberInput.DecrementTrigger>
      </NumberInput.Control>
    </NumberInput.Root>
  );
});

Root.displayName = 'NumberInput';

export { Root };
