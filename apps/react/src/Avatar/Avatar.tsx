import { avatarAnatomy } from '@ark-ui/anatomy';
import { Avatar as _Avatar } from '@ark-ui/react';
import { UserIcon } from 'lucide-react';

import {
  type ComponentProps,
  type ComponentPropsWithoutRef,
  type ElementRef,
  forwardRef,
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
      bg: 'neutral.500',
    },
    image: {
      bg: 'neutral.500',
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
    }
>(({ src, alt, size, className, ...props }, ref) => {
  const classes = avatarVariants({ size });

  return (
    <_Avatar.Root ref={ref} className={cx(classes.root, className)} {...props}>
      <_Avatar.Image src={src} alt={alt} className={classes.image} />
      <_Avatar.Fallback className={classes.fallback}>
        <UserIcon size={size} />
      </_Avatar.Fallback>
    </_Avatar.Root>
  );
});

export { Avatar };
