import { Avatar as _Avatar } from '@ark-ui/react';
import { IDENTIFIER } from 'env';
import { UserIcon } from 'lucide-react';
import { isNotNil } from 'utils';

import {
  type ComponentProps,
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
  ReactNode,
  Children,
} from 'react';

import { cx } from '../cx';
import { tv, VariantProps } from '../tv';

export const avatarVariants = tv({
  base: `${IDENTIFIER.scope} avatar`,
  slots: {
    root: 'trds-rounded-full trds-overflow-hidden',
    fallback: 'trds-bg-muted',
    image: 'trds-bg-muted',
  },
  variants: {
    size: {
      sm: {
        root: 'trds-w-8 trds-h-8',
        fallback: 'trds-w-8 trds-h-8',
        image: 'trds-w-8 trds-h-8',
      },
      md: {
        root: 'trds-w-10 trds-h-10',
        fallback: 'trds-w-10 trds-h-10',
        image: 'trds-w-10 trds-h-10',
      },
      lg: {
        root: 'trds-w-12 trds-h-12',
        fallback: 'trds-w-12 trds-h-12',
        image: 'trds-w-12 trds-h-12',
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export type AvatarProps = ComponentProps<typeof Avatar>;

const Avatar = forwardRef<
  ElementRef<typeof _Avatar.Root>,
  ComponentPropsWithoutRef<typeof _Avatar.Root> &
    VariantProps<typeof avatarVariants> & {
      alt?: string;
      src?: string;
      fallback?: ReactNode;
      children?: ReactNode;
    }
>((props, ref) => {
  const { fallback, src, alt, size, className, children, ...rest } = props;
  const classes = avatarVariants({ size });
  const child = children && Children.only(children);

  return (
    <_Avatar.Root ref={ref} className={cx(classes.root(), className)} {...rest}>
      <_Avatar.Image
        src={src}
        alt={alt}
        className={classes.image()}
        asChild={isNotNil(child)}
      >
        {child}
      </_Avatar.Image>
      <_Avatar.Fallback className={classes.fallback()} asChild>
        {fallback ?? <UserIcon size={convertSizeToNumber(size)} />}
      </_Avatar.Fallback>
    </_Avatar.Root>
  );
});

export { Avatar };

const convertSizeToNumber = (size?: 'sm' | 'md' | 'lg') => {
  if (size === 'sm') {
    return 32;
  }
  if (size === 'md') {
    return 40;
  }
  if (size === 'lg') {
    return 48;
  }

  return 40;
};
