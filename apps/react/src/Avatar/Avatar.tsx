import { Avatar as _Avatar } from '@ark-ui/react/avatar';
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
    root: 'trds-rounded-full trds-overflow-hidden',
    fallback: 'trds-bg-muted-bg',
    image: 'trds-bg-muted-bg',
  },
  variants: {
    size: {
      xs: {
        root: 'trds-w-6 trds-h-6',
        fallback: 'trds-w-6 trds-h-6',
        image: 'trds-w-6 trds-h-6',
      },
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
      xl: {
        root: 'trds-w-14 trds-h-14',
        fallback: 'trds-w-14 trds-h-14',
        image: 'trds-w-14 trds-h-14',
      },
      '2xl': {
        root: 'trds-w-16 trds-h-16',
        fallback: 'trds-w-16 trds-h-16',
        image: 'trds-w-16 trds-h-16',
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

export type AvatarProps = ComponentPropsWithoutRef<typeof _Avatar.Root> &
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
    const isNumberMode = isNumber(size);
    const classes = avatarVariants({ size: isNumberMode ? 'none' : size });
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
          style={{
            width: isNumberMode ? `${size}px` : undefined,
            height: isNumberMode ? `${size}px` : undefined,
          }}
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

const convertSizeToNumber = (
  size?: VariantProps<typeof avatarVariants>['size'],
) => {
  if (size === 'xs') {
    return 24;
  }
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
