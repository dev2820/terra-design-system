import { IDENTIFIER } from 'env';

import { forwardRef, type ComponentProps, type ReactNode } from 'react';

import { cx } from '../cx';
import { tv, VariantProps } from '../tv';

const linkVariants = tv({
  base: [
    'trds-inline-flex trds-items-center trds-justify-start trds-whitespace-nowrap trds-gap-1 trds-transition-colors trds-cursor-pointer trds-underline-offset-8 trds-underline-under trds-decoration-[2px] trds-font-bold',
    'hover:trds-underline',
  ],
  variants: {
    theme: {
      neutral:
        'trds-text-neutral-500 active:trds-text-neutral-800 visited:trds-text-neutral-800 hover:trds-text-neutral-700',
      primary:
        'trds-text-primary-500 active:trds-text-primary-800 visited:trds-text-primary-800 hover:trds-text-primary-700',
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
