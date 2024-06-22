import { forwardRef, type ComponentProps, type ReactNode } from 'react';

import { cx, cva, type RecipeVariantProps } from '../../styled-system/css';

const linkVariants = cva({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    whiteSpace: 'nowrap',
    gap: 1,
    transition: ['colors'],
    cursor: 'pointer',
    textUnderlinePosition: 'under',
    textDecorationThickness: 4,
    fontWeight: 'bold',
    color: 'primary.500',
    _hover: {
      textDecoration: 'underline',
    },
    _active: {
      color: 'primary.600',
    },
    _visited: {
      color: 'primary.600',
    },
  },
});

export type LinkProps = ComponentProps<'a'> &
  RecipeVariantProps<typeof linkVariants> & {
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
    disabled?: boolean;
  };

const Link = forwardRef<HTMLAnchorElement, LinkProps>(function (props, ref) {
  const {
    type = 'link',
    leftIcon,
    rightIcon,
    className,
    children,
    ...rest
  } = props;

  return (
    <a
      className={cx(linkVariants({}), className)}
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
