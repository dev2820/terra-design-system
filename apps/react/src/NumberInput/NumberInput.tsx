import { numberInputAnatomy } from '@ark-ui/anatomy';
import { NumberInput, NumberInputRootProps } from '@ark-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react';

import { forwardRef } from 'react';

import { RecipeVariantProps, cx, sva } from '../../styled-system/css';

const trigger = {
  alignItems: 'center',
  borderColor: 'neutral.300',
  color: 'neutral.500',
  cursor: 'pointer',
  display: 'inline-flex',
  justifyContent: 'center',
  transitionDuration: 'normal',
  transitionProperty: 'background, border-color, color, box-shadow',
  transitionTimingFunction: 'default',
  '& :where(svg)': {
    width: 4,
    height: 4,
  },
  _hover: {
    background: 'neutral.200',
    color: 'neutral.500',
  },
  _disabled: {
    color: 'disabled',
    opacity: 50,
    cursor: 'not-allowed',
    _hover: {
      background: 'transparent',
      color: 'disabled',
    },
  },
};

const numberInputVariants = sva({
  className: 'numberInput',
  slots: numberInputAnatomy.keys(),
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5',
    },
    control: {
      borderColor: 'neutral.300',
      borderRadius: 'lg',
      borderWidth: '1px',

      display: 'grid',
      divideX: '1px',
      gridTemplateColumns: '1fr 32px',
      gridTemplateRows: '1fr 1fr',
      overflow: 'hidden',
      transitionDuration: 'normal',
      transitionProperty: 'border-color, box-shadow',
      transitionTimingFunction: 'default',
      _focusWithin: {
        borderColor: 'primary.500',
        boxShadow: '0 0 0 2px var(--shadow-color)',
        shadowColor: 'primary.500',
      },
    },
    input: {
      background: 'transparent',
      border: 'none',
      gridRow: '2',
      outline: 'none',
      width: 'full',
      _placeholder: {
        color: 'neutral.400',
      },
      _disabled: {
        cursor: 'not-allowed',
        opacity: 50,
      },
    },
    decrementTrigger: { ...trigger, borderTopWidth: '1px' },
    incrementTrigger: trigger,
  },
  variants: {
    invalid: {
      true: {
        control: {
          borderColor: 'error.500',
        },
      },
    },
    size: {
      md: {
        control: {
          ps: '3',
          h: '10',
          minW: '10',
          fontSize: 'md',
        },
      },
      lg: {
        control: {
          ps: '3.5',
          h: '11',
          minW: '11',
          fontSize: 'md',
        },
      },
      xl: {
        control: {
          ps: '4',
          h: '12',
          minW: '12',
          fontSize: 'lg',
        },
      },
    },
  },
  defaultVariants: {
    size: 'md',
    invalid: false,
  },
});

export type RootProps = Omit<NumberInputRootProps, 'children'> &
  RecipeVariantProps<typeof numberInputVariants> & {
    placeholder?: string;
    invalid?: boolean;
  };

const Root = forwardRef<HTMLDivElement, RootProps>(function (props, ref) {
  const { placeholder, invalid, size, className, ...rest } = props;
  const classes = numberInputVariants({ size, invalid });

  return (
    <NumberInput.Root
      ref={ref}
      className={cx(classes.root, className)}
      {...rest}
    >
      <NumberInput.Control className={classes.control}>
        <NumberInput.Input
          className={classes.input}
          placeholder={placeholder}
        />
        <NumberInput.IncrementTrigger className={classes.incrementTrigger}>
          <ChevronUpIcon />
        </NumberInput.IncrementTrigger>
        <NumberInput.DecrementTrigger className={classes.decrementTrigger}>
          <ChevronDownIcon />
        </NumberInput.DecrementTrigger>
      </NumberInput.Control>
    </NumberInput.Root>
  );
});

Root.displayName = 'NumberInput';

export { Root };
