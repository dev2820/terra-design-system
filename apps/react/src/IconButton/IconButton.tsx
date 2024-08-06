import { forwardRef, type ComponentProps } from 'react';

import { cx, cva, type RecipeVariantProps } from '../../styled-system/css';
import { Button } from '../Button';

const iconButtonVariants = cva({
  base: {},
  variants: {
    size: {
      xs: {
        h: 8,
        w: 8,
        px: 0,
        py: 0,
      },
      sm: {
        h: 9,
        w: 9,
        px: 0,
        py: 0,
      },
      md: {
        h: 10,
        w: 10,
        px: 0,
        py: 0,
      },
      lg: {
        h: 11,
        w: 11,
        px: 0,
        py: 0,
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export type IconButtonProps = ComponentProps<typeof Button> &
  RecipeVariantProps<typeof iconButtonVariants>;

const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  function (props, ref) {
    const { loading, size, className, children, ...rest } = props;

    const classes = iconButtonVariants({ size });

    return (
      <Button
        className={cx(classes, className)}
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
