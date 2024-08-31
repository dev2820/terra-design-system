import { IDENTIFIER } from 'env';

import { forwardRef, type ComponentProps } from 'react';

import { Button } from '../Button';
import { cx } from '../cx';
import { tv, VariantProps } from '../tv';

const iconButtonVariants = tv({
  variants: {
    size: {
      xs: 'trds-h-8 trds-w-8 trds-px-0 trds-py-0',
      sm: 'trds-h-9 trds-w-9 trds-px-0 trds-py-0',
      md: 'trds-h-10 trds-w-10 trds-px-0 trds-py-0',
      lg: 'trds-h-11 trds-w-11 trds-px-0 trds-py-0',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export type IconButtonProps = ComponentProps<typeof Button> &
  VariantProps<typeof iconButtonVariants>;

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function (props, ref) {
    const { loading, size, className, children, ...rest } = props;

    const classes = iconButtonVariants({ size });

    return (
      <Button
        className={cx(IDENTIFIER.scope, classes, className)}
        ref={ref}
        {...rest}
        size={size}
        loading={loading}
      >
        {loading ? null : children}
      </Button>
    );
  },
);

export { IconButton };
