import { IDENTIFIER } from 'env';
import { LoaderCircleIcon } from 'lucide-react';

import { forwardRef, type ComponentProps, type ReactNode } from 'react';

import { cx } from '../cx';
import { AsChildProps, Slot } from '../Slot';
import { tv, VariantProps } from '../tv';

const buttonVariants = tv({
  base: [
    `${IDENTIFIER.scope} button`,
    'trds-inline-flex trds-justify-center trds-place-items-center trds-whitespace-nowrap trds-rounded-lg trds-text-md trds-font-medium trds-gap-2 trds-transition-colors trds-cursor-pointer',
    'disabled:trds-cursor-not-allowed disabled:trds-opacity-40',
  ],
  variants: {
    variant: {
      filled: '',
      outline: 'trds-border trds-border-solid',
      ghost: 'trds-bg-transparent',
    },
    theme: {
      primary: '',
      grayscale: '',
      whiteAlpha: '',
      error: '',
    },
    size: {
      xs: 'trds-h-8 trds-px-2',
      sm: 'trds-h-9 trds-px-3',
      md: 'trds-h-10 trds-px-4',
      lg: 'trds-h-11 trds-px-6',
    },
    loading: {
      true: 'disabled:trds-cursor-wait',
    },
  },
  compoundVariants: [
    {
      theme: 'primary',
      variant: 'filled',
      class:
        'trds-bg-primary-500 trds-text-white disabled:trds-bg-primary enabled:hover:trds-bg-primary-600 enabled:active:trds-bg-primary-700',
    },
    {
      theme: 'grayscale',
      variant: 'filled',
      class:
        'trds-bg-grayscale-100 trds-text-grayscale-800 disabled:trds-bg-grayscale enabled:hover:trds-bg-grayscale-200 enabled:active:trds-bg-grayscale-300',
    },
    {
      theme: 'whiteAlpha',
      variant: 'filled',
      class:
        'trds-bg-whiteAlpha-500 trds-text-white disabled:trds-bg-whiteAlpha enabled:hover:trds-bg-whiteAlpha-600 enabled:active:trds-bg-whiteAlpha-700',
    },
    {
      theme: 'error',
      variant: 'filled',
      class:
        'trds-bg-error-500 trds-text-white disabled:trds-bg-error enabled:hover:trds-bg-error-600 enabled:active:trds-bg-error-700',
    },
    {
      theme: 'primary',
      variant: 'outline',
      class:
        'trds-bg-transparent trds-text-primary trds-border-primary enabled:hover:trds-bg-primary-100 enabled:active:trds-bg-primary-200',
    },
    {
      theme: 'grayscale',
      variant: 'outline',
      class:
        'trds-bg-transparent trds-text-grayscale-800 trds-border-grayscale-300 disabled:trds-bg-transparent enabled:hover:trds-bg-grayscale-50 enabled:active:trds-bg-grayscale-100',
    },
    {
      theme: 'whiteAlpha',
      variant: 'outline',
      class:
        'trds-bg-transparent trds-text-white trds-border-whiteAlpha-300 disabled:trds-bg-transparent enabled:hover:trds-bg-whiteAlpha-100 enabled:active:trds-bg-whiteAlpha-200',
    },
    {
      theme: 'error',
      variant: 'outline',
      class:
        'trds-bg-transparent trds-text-black trds-border-error-300 disabled:trds-bg-transparent enabled:hover:trds-bg-error-100 enabled:active:trds-bg-error-200',
    },
    {
      theme: 'primary',
      variant: 'ghost',
      class:
        'trds-bg-transparent trds-text-primary-500 disabled:trds-bg-transparent enabled:hover:trds-bg-primary-100 enabled:active:trds-bg-primary-200',
    },
    {
      theme: 'grayscale',
      variant: 'ghost',
      class:
        'trds-bg-transparent trds-text-grayscale-800 disabled:trds-bg-transparent enabled:hover:trds-bg-grayscale-50 enabled:active:trds-bg-grayscale-100',
    },
    {
      theme: 'whiteAlpha',
      variant: 'ghost',
      class:
        'trds-bg-transparent trds-text-white disabled:trds-bg-transparent enabled:hover:trds-bg-whiteAlpha-100 enabled:active:trds-bg-whiteAlpha-200',
    },
    {
      theme: 'error',
      variant: 'ghost',
      class:
        'trds-bg-transparent trds-text-black disabled:trds-bg-transparent enabled:hover:trds-bg-error-100 enabled:active:trds-bg-error-200',
    },
  ],
  defaultVariants: {
    variant: 'filled',
    theme: 'grayscale',
    size: 'md',
    loading: false,
  },
});

export type ButtonProps = AsChildProps<ComponentProps<'button'>> & {
  style?: React.CSSProperties;
  className?: string;
  disabled?: boolean;
} & VariantProps<typeof buttonVariants> & {
    loading?: boolean;
    loadingIcon?: ReactNode;
    rightIcon?: ReactNode;
    leftIcon?: ReactNode;
  };
const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function (props, ref) {
    const {
      loading = false,
      loadingIcon = (
        <LoaderCircleIcon className="trds-animate-spin" size={20} />
      ),
      leftIcon,
      rightIcon,
      variant,
      disabled = false,
      size,
      theme,
      className,
      children,
      asChild,
      ...rest
    } = props;
    const Comp = asChild ? Slot : 'button';

    return (
      <Comp
        className={cx(
          buttonVariants({ variant, theme, size, loading }),
          className,
        )}
        disabled={disabled || loading}
        aria-busy={loading}
        ref={ref}
        {...rest}
      >
        {loading && loadingIcon}
        {leftIcon}
        {children}
        {rightIcon}
      </Comp>
    );
  },
);

export { Button, buttonVariants };
