import { IDENTIFIER } from 'env';

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
    _disabled: {
      color: 'disabled',
      cursor: 'not-allowed',
      _active: {
        color: 'disabled',
      },
      _visited: {
        color: 'disabled',
      },
      _hover: {
        color: 'disabled',
        textDecoration: 'none',
      },
    },
  },
  variants: {
    theme: {
      neutral: {
        color: 'neutral.400',
        _active: {
          color: 'neutral.700',
        },
        _visited: {
          color: 'neutral.700',
        },
        _hover: {
          textDecoration: 'underline',
          color: 'neutral.700',
        },
      },
      primary: {
        color: 'primary.400',
        _active: {
          color: 'primary.700',
        },
        _visited: {
          color: 'primary.700',
        },
        _hover: {
          textDecoration: 'underline',
          color: 'primary.700',
        },
      },
    },
  },
  defaultVariants: {
    theme: 'primary',
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
