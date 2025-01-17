import { IDENTIFIER } from 'env';

import { forwardRef, type ComponentProps, type ReactNode } from 'react';

import { cx } from '../cx';
import { tv, VariantProps } from '../tv';

const linkVariants = tv({
  base: [
    `${IDENTIFIER.scope} link`,
    'trds-inline-flex trds-items-center trds-justify-start trds-whitespace-nowrap trds-gap-1 trds-transition-colors trds-duration-normal trds-cursor-pointer',
    'trds-underline-under trds-decoration-[2px] trds-underline-offset-2',
  ],
  variants: {
    theme: {
      default: 'trds-text-fg',
      primary:
        'trds-text-primary hover:trds-text-primary-strong active:trds-text-primary-stronger',
    },
    variant: {
      plain: 'trds-no-underline hover:trds-underline',
      underline: 'trds-underline',
    },
  },
  defaultVariants: {
    theme: 'default',
    variant: 'underline',
  },
});

export type LinkProps = ComponentProps<'a'> &
  VariantProps<typeof linkVariants> & {
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
  };

const Link = forwardRef<HTMLAnchorElement, LinkProps>(function (props, ref) {
  const { theme, variant, leftIcon, rightIcon, className, children, ...rest } =
    props;

  return (
    <a
      className={cx(linkVariants({ theme, variant }), className)}
      ref={ref}
      {...rest}
    >
      {leftIcon}
      {children}
      {rightIcon}
    </a>
  );
});
Link.displayName = 'Link';

export { Link, linkVariants };
