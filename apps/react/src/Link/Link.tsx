import { IDENTIFIER } from 'env';

import { forwardRef, type ComponentProps, type ReactNode } from 'react';

import { cx } from '../cx';
import { tv, VariantProps } from '../tv';

const linkVariants = tv({
  base: [
    'inline-flex items-center justify-start whitespace-nowrap gap-1 transition-colors cursor-pointer underline-offset-4 underline-under decoration-[2px] font-bold',
    'hover:underline',
  ],
  variants: {
    theme: {
      neutral:
        'text-neutral-500 active:text-neutral-800 visited:text-neutral-800 hover:text-neutral-700',
      primary:
        'text-primary-500 active:text-primary-800 visited:text-primary-800 hover:text-primary-700',
    },
  },
  defaultVariants: {
    theme: 'primary',
  },
});

export type LinkProps = ComponentProps<'a'> &
  VariantProps<typeof linkVariants> & {
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
  };

const Link = forwardRef<HTMLAnchorElement, LinkProps>(function (props, ref) {
  const {
    type = 'link',
    theme,
    leftIcon,
    rightIcon,
    className,
    children,
    ...rest
  } = props;

  return (
    <a
      className={cx(IDENTIFIER.scope, linkVariants({ theme }), className)}
      type={type}
      ref={ref}
      {...rest}
    >
      {leftIcon}
      {children}
      {rightIcon}
    </a>
  );
});

export { Link, linkVariants };
