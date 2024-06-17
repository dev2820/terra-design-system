import { LoaderCircleIcon } from 'lucide-react';

import { forwardRef, type ComponentProps, type ReactNode } from 'react';

import { cx, cva, type RecipeVariantProps, css } from '../../styled-system/css';

const buttonVariants = cva({
  base: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    whiteSpace: 'nowrap',
    rounded: 'lg',
    fontSize: 'md',
    fontWeight: 'medium',
    gap: '2',
    transition: ['colors'],
    cursor: 'pointer',
    _disabled: {
      cursor: 'not-allowed',
      opacity: 50,
    },
  },
  variants: {
    variant: {
      filled: {},
      outline: {
        border: '1px solid',
        bg: 'white',
      },
      ghost: {
        bg: 'transparent',
      },
    },
    colorScheme: {
      primary: {},
      neutral: {},
    },
    size: {
      sm: {
        h: 9,
        paddingX: 3,
      },
      md: {
        h: 10,
        paddingX: 4,
        paddingY: 2,
      },
      lg: {
        h: 11,
        paddingX: 8,
      },
      icon: {
        h: 10,
        w: 10,
      },
    },
    loading: {
      true: {
        _disabled: {
          cursor: 'wait',
        },
      },
    },
  },
  defaultVariants: {
    variant: 'filled',
    colorScheme: 'neutral',
    size: 'md',
    loading: false,
  },
  compoundVariants: [
    {
      colorScheme: 'primary',
      variant: 'filled',
      css: {
        bgColor: 'primary',
        color: 'primary.foreground',
        _disabled: {
          bg: 'primary',
          _hover: {
            bg: 'primary',
          },
          _active: {
            bg: 'primary',
          },
        },
        _hover: {
          bg: 'primary.600',
        },
        _active: {
          bg: 'primary.700',
        },
      },
    },
    {
      colorScheme: 'neutral',
      variant: 'filled',
      css: {
        bgColor: 'neutral',
        color: 'neutral.foreground',
        _disabled: {
          bg: 'neutral',
          _hover: {
            bg: 'neutral',
          },
          _active: {
            bg: 'neutral',
          },
        },
        _hover: {
          bg: 'neutral.200',
        },
        _active: {
          bg: 'neutral.300',
        },
      },
    },
    {
      colorScheme: 'primary',
      variant: 'outline',
      css: {
        color: 'primary.500',
        borderColor: 'primary.500',
        _disabled: {
          _hover: {
            bg: 'white',
          },
          _active: {
            bg: 'white',
          },
        },
        _hover: {
          bg: 'primary.100',
        },
        _active: {
          bg: 'primary.200',
        },
      },
    },
    {
      colorScheme: 'neutral',
      variant: 'outline',
      css: {
        color: 'neutral.500',
        borderColor: 'neutral.500',
        _disabled: {
          bg: 'transparent',
          _hover: {
            bg: 'transparent',
          },
          _active: {
            bg: 'transparent',
          },
        },
        _hover: {
          bg: 'neutral.100',
        },
        _active: {
          bg: 'neutral.200',
        },
      },
    },
    {
      colorScheme: 'primary',
      variant: 'ghost',
      css: {
        color: 'primary.500',
        _disabled: {
          _hover: {
            bg: 'transparent',
          },
          _active: {
            bg: 'transparent',
          },
        },
        _hover: {
          bg: 'primary.100',
        },
        _active: {
          bg: 'primary.200',
        },
      },
    },
    {
      colorScheme: 'neutral',
      variant: 'ghost',
      css: {
        color: 'neutral.500',
        _disabled: {
          _hover: {
            bg: 'transparent',
          },
          _active: {
            bg: 'transparent',
          },
        },
        _hover: {
          bg: 'neutral.100',
        },
        _active: {
          bg: 'neutral.200',
        },
      },
    },
  ],
});

export type ButtonProps = ComponentProps<'button'> &
  RecipeVariantProps<typeof buttonVariants> & {
    loading?: boolean;
    loadingIcon?: ReactNode;
    rightIcon?: ReactNode;
    leftIcon?: ReactNode;
  };

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function (props, ref) {
    const {
      type = 'button',
      loading = false,
      loadingIcon = (
        <LoaderCircleIcon className={css({ animation: 'spin' })} size={20} />
      ),
      leftIcon,
      rightIcon,
      disabled = false,
      variant,
      size,
      colorScheme,
      children,
      ...rest
    } = props;

    return (
      <button
        className={cx(buttonVariants({ variant, colorScheme, size, loading }))}
        type={type}
        disabled={disabled || loading}
        aria-disabled={disabled || loading}
        aria-busy={loading}
        ref={ref}
        {...rest}
      >
        {leftIcon}
        {children}
        {rightIcon}
        {loading && loadingIcon}
      </button>
    );
  },
);

export { Button, buttonVariants };
