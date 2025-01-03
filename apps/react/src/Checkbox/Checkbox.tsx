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
    root: 'group trds-text-fg focus-within:mt-4 trds-rounded-sm trds-inline-flex trds-flex-row trds-items-center trds-gap-2 trds-cursor-pointer data-disabled:trds-cursor-not-allowed data-readonly:trds-cursor-default',
    label: '',
    control: [
      'trds-text-primary-inverse',
      'trds-border-2 trds-border-boundary trds-rounded-sm trds-flex-none trds-box-border trds-inline-flex trds-place-items-center trds-transition-all trds-duration-normal trds-ease-default',
      'data-checked:trds-bg-primary data-checked:trds-text-primary-inverse data-checked:trds-border-primary',
      'data-invalid:trds-border-danger',
      'data-indeterminate:trds-bg-primary data-indeterminate:trds-text-primary-inverse data-indeterminate:trds-border-primary',
      'data-disabled:trds-bg-layer-muted data-disabled:trds-border-boundary-muted',
      'data-disabled:data-checked:trds-border-boundary-muted data-disabled:data-checked:trds-bg-layer-muted',
      'data-disabled:data-indeterminate:trds-border-boundary-muted data-disabled:data-indeterminate:trds-bg-layer-muted',
      'data-disabled:trds-text-highlight',
      'data-focus:trds-shadow-[0_0_0_2px_var(--shadow-color)] data-focus:trds-shadow-primary',
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
        <_Checkbox.Indicator className={classes.indicator()} asChild>
          <CheckIcon size={convertSizeToNumber(size)} strokeWidth={3} />
        </_Checkbox.Indicator>
        <_Checkbox.Indicator
          className={classes.indicator()}
          indeterminate
          asChild
        >
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
