import { avatarAnatomy } from '@ark-ui/anatomy';
import { Avatar as _Avatar } from '@ark-ui/react';
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

import { RecipeVariantProps, cx, sva } from '../../styled-system/css';

export const avatarVariants = sva({
  className: 'avatar',
  slots: avatarAnatomy.keys(),
  base: {
    root: {
      rounded: 'full',
      overflow: 'hidden',
    },
    fallback: {
      bg: 'neutral.200',
    },
    image: {
      bg: 'neutral.200',
    },
  },
  variants: {
    size: {
      sm: {
        root: {
          w: 8,
          h: 8,
        },
        fallback: {
          w: 8,
          h: 8,
        },
        image: {
          w: 8,
          h: 8,
        },
      },
      md: {
        root: {
          w: 10,
          h: 10,
        },
        fallback: {
          w: 10,
          h: 10,
        },
        image: {
          w: 10,
          h: 10,
        },
      },
      lg: {
        root: {
          w: 12,
          h: 12,
        },
        fallback: {
          w: 12,
          h: 12,
        },
        image: {
          w: 12,
          h: 12,
        },
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
    RecipeVariantProps<typeof avatarVariants> & {
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
    <_Avatar.Root ref={ref} className={cx(classes.root, className)} {...rest}>
      <_Avatar.Image
        src={src}
        alt={alt}
        className={classes.image}
        asChild={isNotNil(child)}
      >
        {child}
      </_Avatar.Image>
      <_Avatar.Fallback className={classes.fallback} asChild>
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

  return 10;
};
