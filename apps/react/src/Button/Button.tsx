import { IDENTIFIER } from 'env';
import { LoaderCircleIcon } from 'lucide-react';

import { forwardRef, type ComponentProps, type ReactNode } from 'react';

import { cx, cva, type RecipeVariantProps, css } from '../../styled-system/css';

/**
 * TODO: Text Size도 지정하기
 */
const buttonVariants = cva({
  base: {
    display: 'inline-flex',
    justifyContent: 'center',
    placeItems: 'center',
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
        borderWidth: 1,
        borderStyle: 'solid',
        bg: 'white',
      },
      ghost: {
        bg: 'transparent',
      },
    },
    theme: {
      primary: {},
      neutral: {},
      whiteAlpha: {},
      blackAlpha: {},
    },
    size: {
      xs: {
        h: 8,
        paddingX: 2,
      },
      sm: {
        h: 9,
        paddingX: 3,
      },
      md: {
        h: 10,
        paddingX: 4,
      },
      lg: {
        h: 11,
        paddingX: 6,
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
    theme: 'neutral',
    size: 'md',
    loading: false,
  },
  compoundVariants: [
    {
      theme: 'primary',
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
      theme: 'neutral',
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
      theme: 'whiteAlpha',
      variant: 'filled',
      css: {
        bgColor: 'whiteAlpha.500',
        color: 'white',
        _disabled: {
          bg: 'whiteAlpha',
          _hover: {
            bg: 'whiteAlpha',
          },
          _active: {
            bg: 'whiteAlpha',
          },
        },
        _hover: {
          bg: 'whiteAlpha.600',
        },
        _active: {
          bg: 'whiteAlpha.700',
        },
      },
    },
    {
      theme: 'blackAlpha',
      variant: 'filled',
      css: {
        bgColor: 'blackAlpha.500',
        color: 'black',
        _disabled: {
          bg: 'blackAlpha',
          _hover: {
            bg: 'blackAlpha',
          },
          _active: {
            bg: 'blackAlpha',
          },
        },
        _hover: {
          bg: 'blackAlpha.600',
        },
        _active: {
          bg: 'blackAlpha.700',
        },
      },
    },
    {
      theme: 'primary',
      variant: 'outline',
      css: {
        bg: 'transparent',
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
      theme: 'neutral',
      variant: 'outline',
      css: {
        bg: 'transparent',
        color: 'neutral.500',
        borderColor: 'neutral.300',
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
      theme: 'whiteAlpha',
      variant: 'outline',
      css: {
        bg: 'transparent',
        color: 'white',
        borderColor: 'whiteAlpha.300',
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
          bg: 'whiteAlpha.100',
        },
        _active: {
          bg: 'whiteAlpha.200',
        },
      },
    },
    {
      theme: 'blackAlpha',
      variant: 'outline',
      css: {
        bg: 'transparent',
        color: 'black',
        borderColor: 'blackAlpha.300',
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
          bg: 'blackAlpha.100',
        },
        _active: {
          bg: 'blackAlpha.200',
        },
      },
    },
    {
      theme: 'primary',
      variant: 'ghost',
      css: {
        bg: 'transparent',
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
      theme: 'neutral',
      variant: 'ghost',
      css: {
        bg: 'transparent',
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
    {
      theme: 'whiteAlpha',
      variant: 'ghost',
      css: {
        bg: 'transparent',
        color: 'white',
        _disabled: {
          _hover: {
            bg: 'transparent',
          },
          _active: {
            bg: 'transparent',
          },
        },
        _hover: {
          bg: 'whiteAlpha.100',
        },
        _active: {
          bg: 'whiteAlpha.200',
        },
      },
    },
    {
      theme: 'blackAlpha',
      variant: 'ghost',
      css: {
        bg: 'transparent',
        color: 'black',
        _disabled: {
          _hover: {
            bg: 'transparent',
          },
          _active: {
            bg: 'transparent',
          },
        },
        _hover: {
          bg: 'blackAlpha.100',
        },
        _active: {
          bg: 'blackAlpha.200',
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
      theme,
      className,
      children,
      ...rest
    } = props;

    return (
      <button
        className={cx(
          IDENTIFIER.scope,
          buttonVariants({ variant, theme, size, loading }),
          className,
        )}
        type={type}
        disabled={disabled || loading}
        aria-disabled={disabled || loading}
        aria-busy={loading}
        ref={ref}
        {...rest}
      >
        {loading && loadingIcon}
        {leftIcon}
        {children}
        {rightIcon}
      </button>
    );
  },
);

export { Button, buttonVariants };
