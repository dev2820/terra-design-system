import { IDENTIFIER } from 'env';

import { InputHTMLAttributes, forwardRef } from 'react';

import { cx } from '../cx';
import { tv } from '../tv';

const inputVariants = tv({
  base: [
    'trds-flex',
    'trds-h-10 trds-rounded-lg trds-border trds-border-boundary trds-bg-white trds-px-3 trds-py-2 trds-text-sm trds-outline-0 trds-transition-[box-shadow] trds-transition-[border-color] trds-duration-normal',
    'file:trds-border-0 file:trds-bg-transparent file:trds-text-sm file:trds-font-medium',
    'placeholder:trds-text-fg-placeholder',
    'disabled:trds-cursor-not-allowed disabled:trds-opacity-50',
    'focus-within:trds-border-primary-500 focus-within:trds-shadow-[0_0_0_2px_var(--shadow-color)] focus-within:trds-shadow-primary-500',
  ],
  variants: {
    invalid: {
      true: 'trds-border-error-500',
    },
  },
});

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  invalid?: boolean;
};

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ invalid = false, className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cx(IDENTIFIER.scope, inputVariants({ invalid }), className)}
        ref={ref}
        aria-invalid={invalid}
        {...props}
      />
    );
  },
);
Input.displayName = 'Input';

export { Input };
