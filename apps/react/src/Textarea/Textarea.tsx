import { IDENTIFIER } from 'env';

import { forwardRef, type ComponentProps } from 'react';

import { cx } from '../cx';
import { tv, VariantProps } from '../tv';

const textareaVariants = tv({
  base: 'appearance-none bg-none border-boundary rounded-lg border min-w-0 outline-0 relative transition duration-normal transition-[border-color,box-shadow] w-full disabled:opacity-40 disabled:cursor-not-allowed placeholder:text-fg-placeholder focus:border-primary-500 focus:shadow-[0_0_0_1px_var(--shadow-color)] focus:[--shadow-color:#8b5cf6]',
  variants: {
    size: {
      sm: 'p-2.5 text-sm',
      md: 'p-3 text-md',
      lg: 'p-3.5 text-md',
    },
    invalid: {
      true: 'border-error-500',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export type TextareaProps = ComponentProps<'textarea'> &
  VariantProps<typeof textareaVariants>;

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  function (props, ref) {
    const { size, invalid, disabled = false, className, ...rest } = props;

    return (
      <textarea
        className={cx(
          IDENTIFIER.scope,
          textareaVariants({ size, invalid }),
          className,
        )}
        disabled={disabled}
        aria-disabled={disabled}
        ref={ref}
        {...rest}
      ></textarea>
    );
  },
);

export { Textarea, textareaVariants };
