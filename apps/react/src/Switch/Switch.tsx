import { switchAnatomy } from '@ark-ui/anatomy';
import { Switch, SwitchRootProps } from '@ark-ui/react';
import { IDENTIFIER } from 'env';

import { ElementRef, forwardRef } from 'react';

import { RecipeVariantProps, cx, sva } from '../../styled-system/css';

export const switchVariants = sva({
  className: `${IDENTIFIER.scope} switch`,
  slots: switchAnatomy.keys(),
  base: {
    root: {
      alignItems: 'center',
      display: 'flex',
      position: 'relative',
      _disabled: {
        opacity: 60,
      },
    },
    control: {
      alignItems: 'center',
      background: 'neutral.300',
      borderRadius: 'full',
      cursor: 'pointer',
      display: 'inline-flex',
      flexShrink: '0',
      transitionDuration: 'normal',
      transitionProperty: 'background',
      transitionTimingFunction: 'default',
      _checked: {
        background: 'primary',
      },
      _disabled: {
        cursor: 'not-allowed',
      },
    },
    thumb: {
      background: 'white',
      borderRadius: 'full',
      boxShadow: 'xs',
      transitionDuration: 'normal',
      transitionProperty: 'transform, background',
      transitionTimingFunction: 'default',
      _checked: {
        transform: 'translateX(100%)',
        background: { base: 'white', _dark: 'primary.foreground' },
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
  variants: {
    size: {
      sm: {
        root: {
          gap: '2',
        },
        control: {
          width: '7',
          p: '0.5',
        },
        thumb: {
          width: '3',
          height: '3',
        },
      },
      md: {
        root: {
          gap: '3',
        },
        control: {
          width: '9',
          p: '0.5',
        },
        thumb: {
          width: '4',
          height: '4',
        },
      },
      lg: {
        root: {
          gap: '4',
        },
        control: {
          width: '11',
          p: '0.5',
        },
        thumb: {
          width: '5',
          height: '5',
        },
      },
    },
  },
});

export type RootProps = Omit<SwitchRootProps, 'children'> &
  RecipeVariantProps<typeof switchVariants>;

const Root = forwardRef<ElementRef<typeof Switch.Root>, RootProps>(
  function (props, ref) {
    const { size, className, ...rest } = props;
    const classes = switchVariants({ size });

    return (
      <Switch.Root ref={ref} className={cx(classes.root, className)} {...rest}>
        <Switch.Control className={classes.control}>
          <Switch.Thumb className={classes.thumb} />
        </Switch.Control>
        <Switch.HiddenInput />
      </Switch.Root>
    );
  },
);

Root.displayName = 'Switch';

export { Root };
