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
    root: 'group :focus-within:mt-4 rounded-sm inline-flex flex-row items-center gap-2 cursor-pointer data-disabled:cursor-not-allowed data-readonly:cursor-default',
    label: '',
    control: [
      'border-2 border-boundary rounded-sm flex-none box-border inline-flex place-items-center transition-shadow transition-bg transition-border-color duration-normal ease-default',
      'data-checked:bg-primary data-checked:text-white data-checked:border-primary',
      'data-invalid:border-error',
      'data-indeterminate:bg-primary data-indeterminate:text-white data-indeterminate:border-primary',
      'data-disabled:bg-muted data-disabled:border-muted',
      'data-disabled:data-checked:border-muted data-[disabled]:data-checked:bg-muted',
      'data-disabled:data-indeterminate:border-muted data-disabled:data-indeterminate:bg-muted',
      'data-disabled:text-highlight',
      'data-focus:shadow-[0_0_0_2px_var(--shadow-color)] data-focus:shadow-primary',
    ],
    indicator: '',
    hiddenInput: '',
  },
  variants: {
    size: {
      sm: {
        control: 'w-3 h-3',
      },
      md: {
        control: 'w-4 h-4',
      },
      lg: {
        control: 'w-5 h-5',
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
