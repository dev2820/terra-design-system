import { Collapsible } from '@ark-ui/react';
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
    root: 'w-full bg-white rounded-md',
    trigger: [
      'w-full h-10 px-4 cursor-pointer',
      'data-[disabled]:opacity-40 data-[disabled]:cursor-not-allowed',
      '[&>svg]:origin-center [&>svg]:duration-normal [&>svg]:transition-all [&[data-state="open"]>svg]:-rotate-180',
    ],
    content: [
      'px-4 border-t border-boundary overflow-hidden',
      'data-open:animate-collapse-in data-closed:animate-collapse-out',
      'data-[disabled]:opacity-40 data-[disabled]:cursor-not-allowed',
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

export { Root, Trigger, Content };
