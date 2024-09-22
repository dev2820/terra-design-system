import { Switch, SwitchRootProps } from '@ark-ui/react';
import { IDENTIFIER } from 'env';

import { ElementRef, forwardRef } from 'react';

import { cx } from '../cx';
import { tv, VariantProps } from '../tv';

export const switchVariants = tv({
  base: `${IDENTIFIER.scope} switch`,
  slots: {
    root: 'flex items-center relative data-disabled:opacity-60',
    control:
      'inline-flex items-center bg-muted rounded-full cursor-pointer flex-shrink-0 transition duration-normal transition-[background] ease-default data-checked:bg-primary data-disabled:cursor-not-allowed',
    thumb:
      'bg-white rounded-full shadow-xs transition duration-normal transition-[transform,background] ease-default data-checked:translate-x-[100%] data-checked:bg-white',
  },
  variants: {
    size: {
      sm: {
        root: 'gap-2',
        control: 'w-7 p-0.5',
        thumb: 'w-3 h-3',
      },
      md: {
        root: 'gap-3',
        control: 'w-9 p-0.5',
        thumb: 'w-4 h-4',
      },
      lg: {
        root: 'gap-4',
        control: 'w-11 p-0.5',
        thumb: 'w-5 h-5',
      },
    },
  },

  defaultVariants: {
    size: 'md',
  },
});

export type RootProps = Omit<SwitchRootProps, 'children'> &
  VariantProps<typeof switchVariants>;

const Root = forwardRef<ElementRef<typeof Switch.Root>, RootProps>(
  function (props, ref) {
    const { size, className, ...rest } = props;
    const classes = switchVariants({ size });

    return (
      <Switch.Root
        ref={ref}
        className={cx(classes.root(), className)}
        {...rest}
      >
        <Switch.Control className={classes.control()}>
          <Switch.Thumb className={classes.thumb()} />
        </Switch.Control>
        <Switch.HiddenInput />
      </Switch.Root>
    );
  },
);

Root.displayName = 'Switch';

export { Root };
