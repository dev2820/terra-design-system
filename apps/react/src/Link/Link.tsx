import { IDENTIFIER } from 'env';

import { forwardRef, type ComponentProps, type ReactNode } from 'react';

import { cx } from '../cx';
import { AsChildProps, Slot } from '../Slot';
import { tv, VariantProps } from '../tv';

const linkVariants = tv({
  base: [
    `${IDENTIFIER.scope} link`,
    'trds-inline-flex trds-items-center trds-justify-start trds-whitespace-nowrap trds-gap-1 trds-transition-colors trds-cursor-pointer',
    'trds-underline-offset-2 trds-underline-under trds-decoration-[2px] trds-underline',
  ],
  variants: {
    theme: {
      grayscale:
        'trds-text-grayscale-500 active:trds-text-grayscale-800 hover:trds-text-grayscale-700 trds-border-grayscale-500',
      primary:
        'trds-text-primary active:trds-text-primary-pressed hover:trds-text-primary-hover trds-border-primary',
    },
  },
  defaultVariants: {
    theme: 'primary',
  },
});

export type LinkProps = AsChildProps<ComponentProps<'a'>> & {
  style?: React.CSSProperties;
  className?: string;
} & VariantProps<typeof linkVariants> & {
    leftIcon?: ReactNode;
    rightIcon?: ReactNode;
  };

const Link = forwardRef<HTMLAnchorElement, LinkProps>(function (props, ref) {
  const { theme, leftIcon, rightIcon, className, children, asChild, ...rest } =
    props;
  const Comp = asChild ? Slot : 'a';

  return (
    <Comp
      className={cx(linkVariants({ theme }), className)}
      ref={ref}
      {...rest}
    >
      <span>
        {leftIcon}
        {children}
        {rightIcon}
      </span>
    </Comp>
  );
});
Link.displayName = 'Link';

export { Link, linkVariants };
