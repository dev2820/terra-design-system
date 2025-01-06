import { IDENTIFIER } from 'env';

import { forwardRef, type ComponentProps } from 'react';

import { cx } from '../cx';
import { tv, VariantProps } from '../tv';

const textareaVariants = tv({
  base: 'trds-text-fg trds-appearance-none trds-bg-transparent trds-border-boundary-input trds-rounded-lg trds-border trds-min-w-0 trds-outline-0 trds-relative trds-transition trds-duration-normal trds-w-full disabled:trds-opacity-muted disabled:trds-cursor-not-allowed placeholder:trds-text-fg-placeholder focus:trds-border-primary-boundary focus:trds-shadow-[0_0_0_1px] focus:trds-shadow-primary',
  variants: {
    size: {
      sm: 'trds-p-2.5 trds-text-sm',
      md: 'trds-p-3 trds-text-md',
      lg: 'trds-p-3.5 trds-text-md',
    },
    invalid: {
      true: 'trds-border-danger',
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
