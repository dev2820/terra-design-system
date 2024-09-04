import { Switch, SwitchRootProps } from '@ark-ui/react';
import { IDENTIFIER } from 'env';

import { ElementRef, forwardRef } from 'react';

import { cx } from '../cx';
import { tv, VariantProps } from '../tv';

export const switchVariants = tv({
  base: `${IDENTIFIER.scope} switch`,
  slots: {
    root: 'trds-flex trds-items-center trds-relative data-disabled:trds-opacity-60',
    control:
      'trds-inline-flex trds-items-center trds-bg-muted trds-rounded-full trds-cursor-pointer trds-flex-shrink-0 trds-transition trds-duration-normal trds-transition-[background] trds-ease-default data-checked:trds-bg-primary data-disabled:trds-cursor-not-allowed',
    thumb:
      'trds-bg-white trds-rounded-full trds-shadow-xs trds-transition trds-duration-normal trds-transition-[transform,background] trds-ease-default data-checked:trds-translate-x-[100%] data-checked:trds-bg-white',
  },
  variants: {
    size: {
      sm: {
        root: 'trds-gap-2',
        control: 'trds-w-7 trds-p-0.5',
        thumb: 'trds-w-3 trds-h-3',
      },
      md: {
        root: 'trds-gap-3',
        control: 'trds-w-9 trds-p-0.5',
        thumb: 'trds-w-4 trds-h-4',
      },
      lg: {
        root: 'trds-gap-4',
        control: 'trds-w-11 trds-p-0.5',
        thumb: 'trds-w-5 trds-h-5',
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
