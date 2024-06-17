import { ComponentProps, forwardRef } from 'react';

import { cx, cva, type RecipeVariantProps } from '../../styled-system/css';

const badgeVariants = cva({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    whiteSpace: 'nowrap',
    rounded: 'full',
    fontSize: 'xs',
    fontWeight: 'semibold',
    border: '1px solid',
    paddingX: 2.5,
    paddingY: 0.5,
    transitionProperty: 'color',
  },
  variants: {
    variant: {
      filled: {
        borderColor: 'transparent',
      },
      subtle: {
        borderColor: 'transparent',
      },
      outline: {
        bg: 'transparent',
      },
    },
    theme: {
      primary: {},
      info: {},
      success: {},
      error: {},
      warning: {},
    },
  },
  compoundVariants: [
    /**
     * filled
     */
    {
      variant: 'filled',
      theme: 'primary',
      css: {
        bg: 'primary.500',
        color: 'primary.foreground',
      },
    },
    {
      variant: 'filled',
      theme: 'error',
      css: {
        bg: 'error',
        color: 'error.foreground',
      },
    },
    {
      variant: 'filled',
      theme: 'warning',
      css: {
        bg: 'warning',
        color: 'warning.foreground',
      },
    },
    {
      variant: 'filled',
      theme: 'success',
      css: {
        bg: 'success',
        color: 'success.foreground',
      },
    },
    {
      variant: 'filled',
      theme: 'info',
      css: {
        bg: 'info',
        color: 'info.foreground',
      },
    },
    /**
     * subtle
     */
    {
      variant: 'subtle',
      theme: 'primary',
      css: {
        bg: 'primary.light',
        color: 'primary',
      },
    },
    {
      variant: 'subtle',
      theme: 'error',
      css: {
        bg: 'error.light',
        color: 'error',
      },
    },
    {
      variant: 'subtle',
      theme: 'warning',
      css: {
        bg: 'warning.light',
        color: 'warning',
      },
    },
    {
      variant: 'subtle',
      theme: 'success',
      css: {
        bg: 'success.light',
        color: 'success',
      },
    },
    {
      variant: 'subtle',
      theme: 'info',
      css: {
        bg: 'info.light',
        color: 'info',
      },
    },
    /**
     * outline
     */
    {
      variant: 'outline',
      theme: 'primary',
      css: {
        color: 'primary',
        borderColor: 'primary',
      },
    },
    {
      variant: 'outline',
      theme: 'error',
      css: {
        color: 'error',
        borderColor: 'error',
      },
    },
    {
      variant: 'outline',
      theme: 'warning',
      css: {
        color: 'warning',
        borderColor: 'warning',
      },
    },
    {
      variant: 'outline',
      theme: 'success',
      css: {
        color: 'success',
        borderColor: 'success',
      },
    },
    {
      variant: 'outline',
      theme: 'info',
      css: {
        color: 'info',
        borderColor: 'info',
      },
    },
  ],
  defaultVariants: {
    variant: 'filled',
    theme: 'primary',
  },
});

export type BadgeProps = Omit<ComponentProps<'span'>, 'children'> &
  RecipeVariantProps<typeof badgeVariants> & {
    text: string;
  };

const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function (props, ref) {
  const { text, variant, theme, className, ...rest } = props;

  return (
    <span
      className={cx(badgeVariants({ variant, theme }), className)}
      ref={ref}
      {...rest}
    >
      {text}
    </span>
  );
});

export { Badge, badgeVariants };
