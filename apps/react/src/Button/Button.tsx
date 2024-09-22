import { IDENTIFIER } from 'env';
import { LoaderCircleIcon } from 'lucide-react';

import { forwardRef, type ComponentProps, type ReactNode } from 'react';

import { cx } from '../cx';
import { tv, VariantProps } from '../tv';

const buttonVariants = tv({
  base: [
    `${IDENTIFIER.scope} button`,
    'inline-flex justify-center place-items-center whitespace-nowrap rounded-lg text-md font-medium gap-2 transition-colors cursor-pointer',
    'disabled:cursor-not-allowed disabled:opacity-50',
  ],
  variants: {
    variant: {
      filled: '',
      outline: 'border border-solid',
      ghost: 'bg-transparent',
    },
    theme: {
      primary: '',
      neutral: '',
      whiteAlpha: '',
      blackAlpha: '',
    },
    size: {
      xs: 'h-8 px-2',
      sm: 'h-9 px-3',
      md: 'h-10 px-4',
      lg: 'h-11 px-6',
    },
    loading: {
      true: 'disabled:cursor-wait',
    },
  },
  compoundVariants: [
    {
      theme: 'primary',
      variant: 'filled',
      class:
        'bg-primary text-fg-primary disabled:bg-primary enabled:hover:bg-primary-hover enabled:active:bg-primary-pressed',
    },
    {
      theme: 'neutral',
      variant: 'filled',
      class:
        'bg-neutral text-fg-neutral disabled:bg-neutral enabled:hover:bg-neutral-hover enabled:active:bg-neutral-pressed',
    },
    {
      theme: 'whiteAlpha',
      variant: 'filled',
      class:
        'bg-whiteAlpha-500 text-white disabled:bg-whiteAlpha enabled:hover:bg-whiteAlpha-600 enabled:active:bg-whiteAlpha-700',
    },
    {
      theme: 'blackAlpha',
      variant: 'filled',
      class:
        'bg-blackAlpha-500 text-black disabled:bg-blackAlpha enabled:hover:bg-blackAlpha-600 enabled:active:bg-blackAlpha-700',
    },
    {
      theme: 'primary',
      variant: 'outline',
      class:
        'bg-transparent text-primary-500 border-primary-500 enabled:hover:bg-primary-100 enabled:active:bg-primary-200',
    },
    {
      theme: 'neutral',
      variant: 'outline',
      class:
        'bg-transparent text-neutral-500 border-neutral-300 disabled:bg-transparent enabled:hover:bg-neutral-100 enabled:active:bg-neutral-200',
    },
    {
      theme: 'whiteAlpha',
      variant: 'outline',
      class:
        'bg-transparent text-white border-whiteAlpha-300 disabled:bg-transparent enabled:hover:bg-whiteAlpha-100 enabled:active:bg-whiteAlpha-200',
    },
    {
      theme: 'blackAlpha',
      variant: 'outline',
      class:
        'bg-transparent text-black border-blackAlpha-300 disabled:bg-transparent enabled:hover:bg-blackAlpha-100 enabled:active:bg-blackAlpha-200',
    },
    {
      theme: 'primary',
      variant: 'ghost',
      class:
        'bg-transparent text-primary-500 disabled:bg-transparent enabled:hover:bg-primary-100 enabled:active:bg-primary-200',
    },
    {
      theme: 'neutral',
      variant: 'ghost',
      class:
        'bg-transparent text-neutral-500 disabled:bg-transparent enabled:hover:bg-neutral-100 enabled:active:bg-neutral-200',
    },
    {
      theme: 'whiteAlpha',
      variant: 'ghost',
      class:
        'bg-transparent text-white disabled:bg-transparent enabled:hover:bg-whiteAlpha-100 enabled:active:bg-whiteAlpha-200',
    },
    {
      theme: 'blackAlpha',
      variant: 'ghost',
      class:
        'bg-transparent text-black disabled:bg-transparent enabled:hover:bg-blackAlpha-100 enabled:active:bg-blackAlpha-200',
    },
  ],
  defaultVariants: {
    variant: 'filled',
    theme: 'neutral',
    size: 'md',
    loading: false,
  },
});

export type ButtonProps = ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
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
      loadingIcon = <LoaderCircleIcon className="animate-spin" size={20} />,
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
