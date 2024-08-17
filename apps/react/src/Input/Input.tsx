import { IDENTIFIER } from 'env';

import { InputHTMLAttributes, forwardRef } from 'react';

import { cva, cx } from '../../styled-system/css';

const inputVariants = cva({
  base: {
    display: 'flex',
    flexDir: '',
    height: 10,
    rounded: 'lg',
    border: '1px solid',
    borderColor: 'neutral.300',
    background: 'white',
    paddingX: 3,
    paddingY: 2,
    fontSize: 'sm',
    outline: 0,
    transitionDuration: 'normal',
    transitionProperty: 'box-shadow, border-color',
    transitionTimingFunction: 'default',
    _file: {
      border: 0,
      bg: 'transparent',
      fontSize: 'sm',
      fontWeight: 'medium',
    },
    _placeholder: {
      color: 'neutral.400',
    },
    _disabled: {
      cursor: 'not-allowed',
      opacity: 50,
    },
    _focusWithin: {
      borderColor: 'primary.500',
      boxShadow: '0 0 0 2px var(--shadow-color)',
      shadowColor: 'primary.500',
    },
  },
  variants: {
    invalid: {
      true: {
        borderColor: 'error.500',
      },
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
