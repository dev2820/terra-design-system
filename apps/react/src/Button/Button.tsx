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
    'disabled:trds-cursor-not-allowed disabled:trds-opacity-50',
  ],
  variants: {
    variant: {
      filled: '',
      outline: 'trds-border trds-border-solid',
      ghost: 'trds-bg-transparent',
    },
    theme: {
      primary: '',
      neutral: '',
      whiteAlpha: '',
      blackAlpha: '',
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
        'trds-bg-primary trds-text-fg-primary disabled:trds-bg-primary hover:trds-bg-primary-hover enabled:active:trds-bg-primary-pressed',
    },
    {
      theme: 'neutral',
      variant: 'filled',
      class:
        'trds-bg-neutral trds-text-fg-neutral disabled:trds-bg-neutral enabled:hover:trds-bg-neutral-hover enabled:active:trds-bg-neutral-pressed',
    },
    {
      theme: 'whiteAlpha',
      variant: 'filled',
      class:
        'trds-bg-whiteAlpha-500 trds-text-white disabled:trds-bg-whiteAlpha enabled:hover:trds-bg-whiteAlpha-600 enabled:active:trds-bg-whiteAlpha-700',
    },
    {
      theme: 'blackAlpha',
      variant: 'filled',
      class:
        'trds-bg-blackAlpha-500 trds-text-black disabled:trds-bg-blackAlpha enabled:hover:trds-bg-blackAlpha-600 enabled:active:trds-bg-blackAlpha-700',
    },
    {
      theme: 'primary',
      variant: 'outline',
      class:
        'trds-bg-transparent trds-text-primary-500 trds-border-primary-500 enabled:hover:trds-bg-primary-100 enabled:active:trds-bg-primary-200',
    },
    {
      theme: 'neutral',
      variant: 'outline',
      class:
        'trds-bg-transparent trds-text-neutral-500 trds-border-neutral-300 disabled:trds-bg-transparent enabled:hover:trds-bg-neutral-100 enabled:active:trds-bg-neutral-200',
    },
    {
      theme: 'whiteAlpha',
      variant: 'outline',
      class:
        'trds-bg-transparent trds-text-white trds-border-whiteAlpha-300 disabled:trds-bg-transparent enabled:hover:trds-bg-whiteAlpha-100 enabled:active:trds-bg-whiteAlpha-200',
    },
    {
      theme: 'blackAlpha',
      variant: 'outline',
      class:
        'trds-bg-transparent trds-text-black trds-border-blackAlpha-300 disabled:trds-bg-transparent enabled:hover:trds-bg-blackAlpha-100 enabled:active:trds-bg-blackAlpha-200',
    },
    {
      theme: 'primary',
      variant: 'ghost',
      class:
        'trds-bg-transparent trds-text-primary-500 disabled:trds-bg-transparent enabled:hover:trds-bg-primary-100 enabled:active:trds-bg-primary-200',
    },
    {
      theme: 'neutral',
      variant: 'ghost',
      class:
        'trds-bg-transparent trds-text-neutral-500 disabled:trds-bg-transparent enabled:hover:trds-bg-neutral-100 enabled:active:trds-bg-neutral-200',
    },
    {
      theme: 'whiteAlpha',
      variant: 'ghost',
      class:
        'trds-bg-transparent trds-text-white disabled:trds-bg-transparent enabled:hover:trds-bg-whiteAlpha-100 enabled:active:trds-bg-whiteAlpha-200',
    },
    {
      theme: 'blackAlpha',
      variant: 'ghost',
      class:
        'trds-bg-transparent trds-text-black disabled:trds-bg-transparent enabled:hover:trds-bg-blackAlpha-100 enabled:active:trds-bg-blackAlpha-200',
    },
  ],
  defaultVariants: {
    variant: 'filled',
    theme: 'neutral',
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
