import { Avatar as _Avatar } from '@ark-ui/react';
import { IDENTIFIER } from 'env';
import { UserIcon } from 'lucide-react';
import { isNotNil, isNumber } from 'utils';

import {
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
  ReactNode,
  Children,
} from 'react';

import { cx } from '../cx';
import { tv, VariantProps } from '../tv';

const avatarVariants = tv({
  base: `${IDENTIFIER.scope} avatar`,
  slots: {
    root: 'rounded-full overflow-hidden',
    fallback: 'bg-muted w-full h-full',
    image: 'bg-muted',
  },
  variants: {
    size: {
      sm: {
        root: 'w-8 h-8',
        fallback: 'w-8 h-8',
        image: 'w-8 h-8',
      },
      md: {
        root: 'w-10 h-10',
        fallback: 'w-10 h-10',
        image: 'w-10 h-10',
      },
      lg: {
        root: 'w-12 h-12',
        fallback: 'w-12 h-12',
        image: 'w-12 h-12',
      },
      xl: {
        root: 'w-14 h-14',
        fallback: 'w-14 h-14',
        image: 'w-14 h-14',
      },
      '2xl': {
        root: 'w-16 h-16',
        fallback: 'w-16 h-16',
        image: 'w-16 h-16',
      },
      none: {
        root: '',
        fallback: '',
        image: '',
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

type AvatarProps = ComponentPropsWithoutRef<typeof _Avatar.Root> &
  Omit<VariantProps<typeof avatarVariants>, 'size'> & {
    alt?: string;
    src?: string;
    fallback?: ReactNode;
    children?: ReactNode;
    size?: VariantProps<typeof avatarVariants>['size'] | number;
  };

const Avatar = forwardRef<ElementRef<typeof _Avatar.Root>, AvatarProps>(
  (props, ref) => {
    const { fallback, src, alt, size, className, children, ...rest } = props;
    const classes = avatarVariants({ size: isNumber(size) ? 'none' : size });
    const child = children && Children.only(children);

    return (
      <_Avatar.Root
        ref={ref}
        className={cx(classes.root(), className)}
        {...rest}
      >
        <_Avatar.Image
          src={src}
          alt={alt}
          className={classes.image()}
          asChild={isNotNil(child)}
        >
          {child}
        </_Avatar.Image>
        <_Avatar.Fallback className={classes.fallback()} asChild>
          {fallback ?? (
            <UserIcon
              size={isNumber(size) ? size : convertSizeToNumber(size)}
            />
          )}
        </_Avatar.Fallback>
      </_Avatar.Root>
    );
  },
);

export { Avatar };
export type { AvatarProps };

const convertSizeToNumber = (
  size?: VariantProps<typeof avatarVariants>['size'],
) => {
  if (size === 'sm') {
    return 32;
  }
  if (size === 'md') {
    return 40;
  }
  if (size === 'lg') {
    return 48;
  }
  if (size === 'xl') {
    return 56;
  }
  if (size === '2xl') {
    return 64;
  }
  if (size === 'none') {
    return 0;
  }

  return 40;
};
