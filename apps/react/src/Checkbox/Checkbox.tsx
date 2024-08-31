import { Checkbox as _Checkbox } from '@ark-ui/react';
import { IDENTIFIER } from 'env';
import { CheckIcon, MinusIcon } from 'lucide-react';

import {
  type ComponentProps,
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
} from 'react';

import { cx } from '../cx';
import { tv, VariantProps } from '../tv';

export const checkboxVariants = tv({
  base: `${IDENTIFIER.scope} checkbox`,
  slots: {
    root: 'group :focus-within:mt-4 trds-rounded-sm trds-inline-flex trds-flex-row trds-items-center trds-gap-2 trds-cursor-pointer data-[disabled]:trds-cursor-not-allowed data-[readonly]:trds-cursor-default',
    label: '',
    control: [
      'trds-border-2 trds-border-neutral-300 trds-rounded-sm trds-flex-none trds-box-border trds-inline-flex trds-place-items-center trds-transition-shadow trds-transition-bg trds-transition-border-color trds-duration-normal trds-ease-default',
      'data-[state="checked"]:trds-bg-primary-500 data-[state="checked"]:trds-text-white data-[state="checked"]:trds-border-primary-500',
      'data-[invalid]:trds-border-error-500',
      'data-[state="indeterminate"]:trds-bg-primary-500 data-[state="indeterminate"]:trds-text-white data-[state="indeterminate"]:trds-border-primary-500',
      'data-[disabled]:trds-bg-muted data-[disabled]:trds-border-muted',
      'data-[disabled]:data-[state="checked"]:trds-border-muted data-[disabled]:data-[state="checked"]:trds-bg-muted',
      'data-[disabled]:data-[state="indeterminate"]:trds-border-muted data-[disabled]:data-[state="indeterminate"]:trds-bg-muted',
      'data-[disabled]:trds-text-neutral-500',
      'data-[focus]:trds-shadow-[0_0_0_2px_var(--shadow-color)] data-[focus]:trds-shadow-primary-500',
    ],
    indicator: '',
    hiddenInput: '',
  },
  variants: {
    size: {
      sm: {
        control: 'trds-w-3 trds-h-3',
      },
      md: {
        control: 'trds-w-4 trds-h-4',
      },
      lg: {
        control: 'trds-w-5 trds-h-5',
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
    VariantProps<typeof checkboxVariants>
>((props, ref) => {
  const { size, className, children, ...rest } = props;
  const classes = checkboxVariants({ size });

  return (
    <_Checkbox.Root
      ref={ref}
      className={cx(classes.root(), className)}
      {...rest}
    >
      <_Checkbox.HiddenInput className={classes.hiddenInput()} />
      <_Checkbox.Control className={classes.control()}>
        <_Checkbox.Indicator asChild>
          <CheckIcon size={convertSizeToNumber(size)} strokeWidth={3} />
        </_Checkbox.Indicator>
        <_Checkbox.Indicator indeterminate asChild>
          <MinusIcon size={convertSizeToNumber(size)} strokeWidth={3} />
        </_Checkbox.Indicator>
      </_Checkbox.Control>
      {children && (
        <_Checkbox.Label className={classes.label()}>
          {children}
        </_Checkbox.Label>
      )}
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
