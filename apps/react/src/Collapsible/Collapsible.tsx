import { collapsibleAnatomy } from '@ark-ui/anatomy';
import { Collapsible } from '@ark-ui/react';

import {
  type ComponentProps,
  type ComponentPropsWithoutRef,
  forwardRef,
  type ElementRef,
} from 'react';

import { sva, cx } from '../../styled-system/css';
import { createReactContext } from '../create-react-context';

export const collapsibleVariants = sva({
  className: 'collapsible',
  slots: collapsibleAnatomy.keys(),
  base: {
    root: {
      w: 'full',
      bg: 'white',
      rounded: 'md',
    },
    trigger: {
      w: 'full',
      h: 10,
      paddingX: 4,
      cursor: 'pointer',
      _disabled: {
        opacity: 40,
        cursor: 'not-allowed',
      },
    },
    content: {
      paddingX: 4,
      borderTop: '1px solid',
      borderColor: 'neutral.300',
      overflow: 'hidden',
      _open: {
        animation: 'collapse-in 0.15s ease-in-out',
      },
      _closed: {
        animation: 'collapse-out 0.15s ease-in-out',
      },
      _disabled: {
        opacity: 40,
        cursor: 'not-allowed',
      },
    },
  },
});

type CollapsibleProviderProps = {
  classes: ReturnType<typeof collapsibleVariants>;
};
const [CollapsibleProvider, useCollapsibleContext] =
  createReactContext<CollapsibleProviderProps>({
    name: 'collapsible',
    hookName: 'useCollapsibleContext',
    providerName: 'CollapsibleProvider',
    defaultValue: {
      classes: {},
    },
  });

export type RootProps = ComponentProps<typeof Root>;
const Root = forwardRef<
  ElementRef<typeof Collapsible.Root>,
  ComponentPropsWithoutRef<typeof Collapsible.Root> & CollapsibleProviderProps
>(({ children, className, ...props }, ref) => {
  const classes = collapsibleVariants();
  const ctx = {
    classes,
  };

  return (
    <CollapsibleProvider value={ctx}>
      <Collapsible.Root
        ref={ref}
        className={cx(classes.root, className)}
        {...props}
      >
        {children}
      </Collapsible.Root>
    </CollapsibleProvider>
  );
});

export type TriggerProps = ComponentProps<typeof Trigger>;
const Trigger = forwardRef<
  ElementRef<typeof Collapsible.Trigger>,
  ComponentPropsWithoutRef<typeof Collapsible.Trigger>
>(function (props, ref) {
  const { classes } = useCollapsibleContext();
  const { children, className, ...rest } = props;

  return (
    <Collapsible.Trigger
      className={cx(classes.trigger, className)}
      ref={ref}
      {...rest}
    >
      {children}
    </Collapsible.Trigger>
  );
});

export type ContentProps = ComponentProps<typeof Content>;
const Content = forwardRef<
  ElementRef<typeof Collapsible.Content>,
  ComponentPropsWithoutRef<typeof Collapsible.Content>
>(function (props, ref) {
  const { classes } = useCollapsibleContext();
  const { children, className, ...rest } = props;

  return (
    <Collapsible.Content
      className={cx(classes.content, className)}
      ref={ref}
      {...rest}
    >
      {children}
    </Collapsible.Content>
  );
});

export { Root, Trigger, Content };
