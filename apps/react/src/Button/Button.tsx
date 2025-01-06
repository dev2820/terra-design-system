import { IDENTIFIER } from 'env';
import { LoaderCircleIcon } from 'lucide-react';

import { forwardRef, type ComponentProps, type ReactNode } from 'react';

import { cx } from '../cx';
import { tv, VariantProps } from '../tv';

const buttonVariants = tv({
  base: [
    `${IDENTIFIER.scope} button`,
    'trds-inline-flex trds-justify-center trds-place-items-center trds-whitespace-nowrap trds-rounded-lg trds-text-md trds-font-medium trds-gap-2 trds-transition-colors trds-duration-normal trds-cursor-pointer',
    'disabled:trds-cursor-not-allowed disabled:trds-opacity-muted',
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
      danger: '',
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
    // filled
    {
      theme: 'primary',
      variant: 'filled',
      class:
        'trds-bg-primary trds-text-primary-inverse disabled:trds-bg-primary hover:trds-bg-primary-strong active:trds-bg-primary-stronger',
    },
    {
      theme: 'neutral',
      variant: 'filled',
      class:
        'trds-bg-neutral trds-text-neutral-inverse disabled:trds-bg-neutral hover:trds-bg-neutral-strong active:trds-bg-neutral-stronger',
    },
    {
      theme: 'whiteAlpha',
      variant: 'filled',
      class:
        'trds-bg-whiteAlpha-500 trds-text-whiteAlpha-900 disabled:trds-bg-whiteAlpha hover:trds-bg-whiteAlpha-600 active:trds-bg-whiteAlpha-700',
    },
    {
      theme: 'danger',
      variant: 'filled',
      class:
        'trds-bg-danger trds-text-danger-inverse disabled:trds-bg-danger hover:trds-bg-danger-strong active:trds-bg-danger-stronger',
    },
    // outline
    {
      theme: 'primary',
      variant: 'outline',
      class:
        'trds-bg-transparent trds-text-primary-fg trds-border-primary-boundary hover:trds-bg-primary-alpha active:trds-bg-primary-alpha2',
    },
    {
      theme: 'neutral',
      variant: 'outline',
      class:
        'trds-bg-transparent trds-text-neutral-fg trds-border-neutral-boundary disabled:trds-bg-transparent hover:trds-bg-neutral-alpha active:trds-bg-neutral-alpha2',
    },
    {
      theme: 'whiteAlpha',
      variant: 'outline',
      class:
        'trds-bg-transparent trds-text-white trds-border-whiteAlpha-300 disabled:trds-bg-transparent hover:trds-bg-whiteAlpha-100 active:trds-bg-whiteAlpha-200',
    },
    {
      theme: 'danger',
      variant: 'outline',
      class:
        'trds-bg-transparent trds-text-danger-fg trds-border-danger-boundary disabled:trds-bg-transparent hover:trds-bg-danger-alpha active:trds-bg-danger-alpha2',
    },
    // ghost
    {
      theme: 'primary',
      variant: 'ghost',
      class:
        'trds-bg-transparent trds-text-primary-fg disabled:trds-bg-transparent hover:trds-bg-primary-alpha active:trds-bg-primary-alpha2',
    },
    {
      theme: 'neutral',
      variant: 'ghost',
      class:
        'trds-bg-transparent trds-text-neutral-fg disabled:trds-bg-transparent hover:trds-bg-neutral-alpha active:trds-bg-neutral-alpha2',
    },
    {
      theme: 'whiteAlpha',
      variant: 'ghost',
      class:
        'trds-bg-transparent trds-text-white disabled:trds-bg-transparent hover:trds-bg-whiteAlpha-100 active:trds-bg-whiteAlpha-200',
    },
    {
      theme: 'danger',
      variant: 'ghost',
      class:
        'trds-bg-transparent trds-text-danger-fg disabled:trds-bg-transparent hover:trds-bg-danger-alpha active:trds-bg-danger-alpha2',
    },
  ],
  defaultVariants: {
    variant: 'filled',
    theme: 'neutral',
    size: 'md',
    loading: false,
  },
});

export type ButtonProps = ComponentProps<'button'> & {} & VariantProps<
    typeof buttonVariants
  > & {
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
      disabled,
      size,
      theme,
      className,
      children,
      ...rest
    } = props;

    return (
      <button
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
      </button>
    );
  },
);

export { Button, buttonVariants };
