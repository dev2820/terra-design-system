import { IDENTIFIER } from 'env';

import { forwardRef, type ComponentProps, type ReactNode } from 'react';

import { cx } from '../cx';
import { tv, VariantProps } from '../tv';

const linkVariants = tv({
  base: [
    'trds-relative trds-inline-flex trds-items-center trds-justify-start trds-whitespace-nowrap trds-gap-1 trds-transition-colors trds-cursor-pointer',
    'before:trds-duration-200',
    'before:trds-content-[""] before:trds-absolute before:trds-bottom-0 before:trds-left-0 before:trds-w-full before:trds-h-0.5 before:trds-opacity-0',
    'hover:before:trds-opacity-100',
  ],
  variants: {
    theme: {
      neutral:
        'trds-text-neutral-500 active:trds-text-neutral-800 hover:trds-text-neutral-700 before:trds-bg-neutral-700',
      primary:
        'trds-text-primary active:trds-text-primary-pressed hover:trds-text-primary-hover before:trds-bg-primary-hover',
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
