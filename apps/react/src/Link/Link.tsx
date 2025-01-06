import { IDENTIFIER } from 'env';

import { forwardRef, type ComponentProps, type ReactNode } from 'react';

import { cx } from '../cx';
import { AsChildProps, Slot } from '../Slot';
import { tv, VariantProps } from '../tv';

const linkVariants = tv({
  base: [
    `${IDENTIFIER.scope} link`,
    'trds-inline-flex trds-items-center trds-justify-start trds-whitespace-nowrap trds-gap-1 trds-transition-colors trds-duration-normal trds-cursor-pointer',
    'trds-underline-under trds-decoration-[2px] trds-underline-offset-2',
  ],
  variants: {
    theme: {
      default: 'trds-text-fg',
      primary:
        'trds-text-primary-fg hover:trds-text-primary-strong active:trds-text-primary-stronger',
    },
    variant: {
      plain: 'hover:trds-unerline',
      underline: 'trds-underline',
    },
  },
  defaultVariants: {
    theme: 'default',
    variant: 'underline',
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
      <span className="trds-flex trds-flex-row trds-gap-1 trds-place-items-center">
        {leftIcon}
        {children}
        {rightIcon}
      </span>
    </Comp>
  );
});
Link.displayName = 'Link';

export { Link, linkVariants };
