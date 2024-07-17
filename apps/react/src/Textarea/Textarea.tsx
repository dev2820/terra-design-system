import { forwardRef, type ComponentProps } from 'react';

import { cx, cva, type RecipeVariantProps } from '../../styled-system/css';

const textareaVariants = cva({
  base: {
    appearance: 'none',
    background: 'none',
    borderColor: 'neutral.300',
    borderRadius: 'lg',
    borderWidth: '1px',
    minWidth: 0,
    outline: 0,
    position: 'relative',
    transitionDuration: 'normal',
    transitionProperty: 'border-color, box-shadow',
    width: 'full',
    _disabled: {
      opacity: 0.4,
      cursor: 'not-allowed',
    },
    _placeholder: {
      color: 'neutral.400',
    },
    _focus: {
      borderColor: 'primary.500',
      boxShadow: '0 0 0 1px var(--shadow-color)',
      shadowColor: 'primary.500',
    },
  },
  defaultVariants: {
    size: 'md',
  },
  variants: {
    size: {
      sm: { p: '2.5', fontSize: 'sm' },
      md: { p: '3', fontSize: 'md' },
      lg: { p: '3.5', fontSize: 'md' },
    },
    invalid: {
      true: {
        borderColor: 'error.500',
      },
    },
  },
});

export type TextareaProps = ComponentProps<'textarea'> &
  RecipeVariantProps<typeof textareaVariants>;

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function (props, ref) {
    const { size, invalid, disabled = false, className, ...rest } = props;

    return (
      <textarea
        className={cx(textareaVariants({ size, invalid }), className)}
        disabled={disabled}
        aria-disabled={disabled}
        ref={ref}
        {...rest}
      ></textarea>
    );
  },
);

export { Textarea, textareaVariants };
