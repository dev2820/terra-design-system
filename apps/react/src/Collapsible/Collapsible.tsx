import { Collapsible } from '@ark-ui/react/collapsible';
import { IDENTIFIER } from 'env';

import {
  type ComponentProps,
  type ComponentPropsWithoutRef,
  forwardRef,
  type ElementRef,
} from 'react';

import { createReactContext } from '../create-react-context';
import { cx } from '../cx';
import { tv } from '../tv';

export const collapsibleVariants = tv({
  base: `${IDENTIFIER.scope} collapsible`,
  slots: {
    root: 'trds-w-full trds-text-fg',
    trigger: [
      'trds-w-full trds-h-10 trds-px-4 trds-cursor-pointer',
      'data-disabled:trds-opacity-muted data-disabled:trds-cursor-not-allowed',
      '[&>svg]:trds-origin-center [&>svg]:trds-duration-normal [&>svg]:trds-transition-all [&[data-state="open"]>svg]:-trds-rotate-180',
    ],
    content: [
      'trds-px-4 trds-border-t trds-border-boundary trds-overflow-hidden',
      'data-open:trds-animate-collapse-in data-closed:trds-animate-collapse-out',
      'data-disabled:trds-opacity-muted data-disabled:trds-cursor-not-allowed',
    ],
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
      classes: {} as ReturnType<typeof collapsibleVariants>,
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
        className={cx(classes.root(), className)}
        {...props}
      >
        {children}
      </Collapsible.Root>
    </CollapsibleProvider>
  );
});
Root.displayName = 'Collapsible.Root';

export type TriggerProps = ComponentProps<typeof Trigger>;
const Trigger = forwardRef<
  ElementRef<typeof Collapsible.Trigger>,
  ComponentPropsWithoutRef<typeof Collapsible.Trigger>
>(function (props, ref) {
  const { classes } = useCollapsibleContext();
  const { children, className, ...rest } = props;

  return (
    <Collapsible.Trigger
      className={cx(classes.trigger(), className)}
      ref={ref}
      {...rest}
    >
      {children}
    </Collapsible.Trigger>
  );
});
Trigger.displayName = 'Collapsible.Trigger';

export type ContentProps = ComponentProps<typeof Content>;
const Content = forwardRef<
  ElementRef<typeof Collapsible.Content>,
  ComponentPropsWithoutRef<typeof Collapsible.Content>
>(function (props, ref) {
  const { classes } = useCollapsibleContext();
  const { children, className, ...rest } = props;

  return (
    <Collapsible.Content
      className={cx(classes.content(), className)}
      ref={ref}
      {...rest}
    >
      {children}
    </Collapsible.Content>
  );
});
Content.displayName = 'Collapsible.Content';

export { Root, Trigger, Content };
