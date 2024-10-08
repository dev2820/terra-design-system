import { IDENTIFIER } from 'env';

import { forwardRef, type ComponentProps, type ReactNode } from 'react';

import { cx } from '../cx';
import { tv, VariantProps } from '../tv';

const linkVariants = tv({
  base: [
    'trds-inline-flex trds-items-center trds-justify-start trds-whitespace-nowrap trds-gap-1 trds-transition-colors trds-cursor-pointer trds-underline-offset-2 trds-underline-under trds-decoration-[2px] trds-underline',
  ],
  variants: {
    theme: {
      neutral:
        'trds-text-neutral-500 active:trds-text-neutral-800 hover:trds-text-neutral-700 trds-border-neutral-500',
      primary:
        'trds-text-primary active:trds-text-primary-pressed hover:trds-text-primary-hover trds-border-primary',
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
