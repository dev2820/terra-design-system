import { checkboxAnatomy } from '@ark-ui/anatomy';
import { Checkbox as _Checkbox } from '@ark-ui/react';
import { IDENTIFIER } from 'env';
import { CheckIcon, MinusIcon } from 'lucide-react';

import {
  type ComponentProps,
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from 'react';

import { RecipeVariantProps, cx, sva } from '../../styled-system/css';

export const checkboxVariants = sva({
  className: `${IDENTIFIER.scope} checkbox`,
  slots: checkboxAnatomy.keys(),
  base: {
    root: {
      rounded: 'sm',
      display: 'inline-flex',
      flexDir: 'row',
      alignItems: 'center',
      gap: 2,
      cursor: 'pointer',
      _disabled: {
        cursor: 'not-allowed',
      },
      '&[data-readonly]': {
        cursor: 'default',
      },
    },
    label: {},
    control: {
      border: '2px solid',
      borderColor: 'neutral.300',
      rounded: 'sm',
      flex: 'none',
      boxSizing: 'border-box',
      display: 'inline-flex',
      placeItems: 'center',
      transitionProperty: 'box-shadow, background-color, border-color',
      transitionDuration: 'normal',
      transitionTimingFunction: 'default',
      _checked: {
        bg: 'primary.500',
        color: 'white',
        borderColor: 'primary.500',
      },
      _invalid: {
        borderColor: 'error.500',
      },
      _disabled: {
        bg: 'disabled',
        borderColor: 'disabled',
        color: 'neutral.500',
      },
      _indeterminate: {
        bg: 'primary.500',
        color: 'white',
        borderColor: 'primary.500',
      },
      _focus: {
        boxShadow: '0 0 0 2px var(--shadow-color)',
        shadowColor: 'primary.500',
      },
    },
    indicator: {},
  },
  variants: {
    size: {
      sm: {
        control: {
          w: 3,
          h: 3,
        },
      },
      md: {
        control: {
          w: 4,
          h: 4,
        },
      },
      lg: {
        control: {
          w: 5,
          h: 5,
        },
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export type CheckboxProps = ComponentProps<typeof Checkbox>;
const Checkbox = forwardRef<
  ElementRef<typeof _Checkbox.Root>,
  ComponentPropsWithoutRef<typeof _Checkbox.Root> &
    RecipeVariantProps<typeof checkboxVariants>
>((props, ref) => {
  const { size, className, children, ...rest } = props;
  const classes = checkboxVariants({ size });

  return (
    <_Checkbox.Root ref={ref} className={cx(classes.root, className)} {...rest}>
      <_Checkbox.HiddenInput />
      <_Checkbox.Control className={classes.control}>
        <_Checkbox.Indicator asChild>
          <CheckIcon size={convertSizeToNumber(size)} />
        </_Checkbox.Indicator>
        <_Checkbox.Indicator indeterminate asChild>
          <MinusIcon size={convertSizeToNumber(size)} />
        </_Checkbox.Indicator>
      </_Checkbox.Control>
      <_Checkbox.Label className={classes.label}>{children}</_Checkbox.Label>
    </_Checkbox.Root>
  );
});

export { Checkbox };

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
