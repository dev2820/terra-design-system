import { IDENTIFIER } from 'env';

import { InputHTMLAttributes, forwardRef } from 'react';

import { cx } from '../cx';
import { tv } from '../tv';

const inputVariants = tv({
  base: [
    'flex',
    'h-10 rounded-lg border border-boundary bg-white px-3 py-2 text-sm outline-0 transition-[box-shadow] transition-[border-color] duration-normal',
    'file:border-0 file:bg-transparent file:text-sm file:font-medium',
    'placeholder:text-fg-placeholder',
    'disabled:cursor-not-allowed disabled:opacity-50',
    'focus-within:border-primary focus-within:shadow-[0_0_0_1px_var(--shadow-color)] focus-within:shadow-primary',
  ],
  variants: {
    invalid: {
      true: 'border-error',
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
