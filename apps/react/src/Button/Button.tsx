import { LoaderCircleIcon } from 'lucide-react';

import type { ComponentProps, ReactNode } from 'react';

import { cx, cva, type RecipeVariantProps, css } from '../../styled-system/css';

const buttonVariants = cva({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    whiteSpace: 'nowrap',
    rounded: 'md',
    fontSize: 'md',
    fontWeight: 'medium',
    gap: '1',
    transition: ['colors'],
    _hover: {},
    _active: {},
  },
  variants: {
    variant: {
      filled: {},
      outline: {},
      ghost: {},
    },
    color: {
      primary: {},
      secondary: {},
    },
    size: {
      lg: {},
      md: {},
      sm: {},
      icon: {},
    },
    disabled: {
      true: {
        cursor: 'not-allowed',
      },
    },
    loading: {
      true: {
        cursor: 'wait',
      },
    },
  },
  defaultVariants: {
    variant: 'filled',
    color: 'primary',
    size: 'md',
    disabled: false,
  },
  compoundVariants: [],
});

export type ButtonProps = ComponentProps<'button'> &
  RecipeVariantProps<typeof buttonVariants> & {
    loading: boolean;
    loadingIcon?: ReactNode;
    rightIcon?: ReactNode;
    leftIcon?: ReactNode;
  };

export function Button({
  type = 'button',
  loading = false,
  loadingIcon = (
    <LoaderCircleIcon className={css({ animation: 'spin' })} size={16} />
  ),
  leftIcon,
  rightIcon,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cx(buttonVariants({ disabled, loading }))}
      type={type}
      {...props}
    >
      {leftIcon}
      {loading && loadingIcon}
      {children}
      {rightIcon}
    </button>
  );
}
