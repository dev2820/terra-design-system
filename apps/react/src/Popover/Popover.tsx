import { Popover, PopoverRootProps } from '@ark-ui/react';
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

export const popoverVariants = tv({
  base: `${IDENTIFIER.scope} popover`,
  slots: {
    positioner: 'trds-relative',
    content:
      'trds-relative trds-bg-white trds-rounded-lg trds-shadow-lg trds-flex trds-flex-col trds-max-w-sm trds-z-popover trds-p-4 data-open:trds-animate-fade-in data-closed:trds-animate-fade-out data-hidden:trds-hidden',
    title: 'trds-font-medium trds-text-sm trds-mb-4',
    description: 'trds-text-neutral-description trds-text-sm',
    closeTrigger:
      'trds-text-neutral-description trds-absolute trds-right-2 trds-top-2',
    trigger: '',
    arrow: '[--arrow-size:8px] [--arrow-background:#fff]',
    arrowTip: 'trds-border-layer1 trds-border-t trds-border-l',
  },
});

type PopoverProviderProps = {
  classes: ReturnType<typeof popoverVariants>;
};
const [PopoverProvider, usePopoverContext] =
  createReactContext<PopoverProviderProps>({
    name: 'popover',
    hookName: 'usePopoverContext',
    providerName: 'PopoverProvider',
    defaultValue: {
      classes: {} as ReturnType<typeof popoverVariants>,
    },
  });

export type RootProps = PopoverRootProps;
function Root(props: RootProps) {
  const { portalled, children, ...rest } = props;
  const classes = popoverVariants();
  const ctx = {
    classes,
    portalled,
  };

  return (
    <PopoverProvider value={ctx}>
      <Popover.Root {...rest}>{children}</Popover.Root>
    </PopoverProvider>
  );
}
Root.displayName = 'Popover.Root';

export type TriggerProps = ComponentProps<typeof Trigger>;
const Trigger = forwardRef<
  ElementRef<typeof Popover.Trigger>,
  ComponentPropsWithoutRef<typeof Popover.Trigger>
>(function (props, ref) {
  const { classes } = usePopoverContext();
  const { children, className, ...rest } = props;

  return (
    <Popover.Trigger
      className={cx(classes.trigger(), className)}
      ref={ref}
      {...rest}
    >
      {children}
    </Popover.Trigger>
  );
});
Trigger.displayName = 'Popover.Trigger';

export type PositionerProps = ComponentProps<typeof Positioner>;
const Positioner = forwardRef<
  ElementRef<typeof Popover.Positioner>,
  ComponentPropsWithoutRef<typeof Popover.Positioner>
>(function (props, ref) {
  const { classes } = usePopoverContext();
  const { children, className, ...rest } = props;

  return (
    <Popover.Positioner
      className={cx(classes.positioner(), className)}
      ref={ref}
      {...rest}
    >
      {children}
    </Popover.Positioner>
  );
});
Positioner.displayName = 'Popover.Positioner';

export type ContentProps = ComponentProps<typeof Content>;
const Content = forwardRef<
  ElementRef<typeof Popover.Content>,
  ComponentPropsWithoutRef<typeof Popover.Content>
>(function (props, ref) {
  const { classes } = usePopoverContext();
  const { children, className, ...rest } = props;

  return (
    <Popover.Content
      className={cx(classes.content(), className)}
      ref={ref}
      {...rest}
    >
      {children}
    </Popover.Content>
  );
});
Content.displayName = 'Popover.Content';

export type ArrowProps = ComponentProps<typeof Arrow>;
const Arrow = forwardRef<
  ElementRef<typeof Popover.Arrow>,
  ComponentPropsWithoutRef<typeof Popover.Arrow>
>(function (props, ref) {
  const { classes } = usePopoverContext();
  const { children, className, ...rest } = props;

  return (
    <Popover.Arrow
      className={cx(classes.arrow(), className)}
      ref={ref}
      {...rest}
    >
      <Popover.ArrowTip className={classes.arrowTip()} />
    </Popover.Arrow>
  );
});
Arrow.displayName = 'Popover.Arrow';

export type TitleProps = ComponentProps<typeof Title>;
const Title = forwardRef<
  ElementRef<typeof Popover.Title>,
  ComponentPropsWithoutRef<typeof Popover.Title>
>(function (props, ref) {
  const { classes } = usePopoverContext();
  const { children, className, ...rest } = props;

  return (
    <Popover.Title
      className={cx(classes.title(), className)}
      {...rest}
      ref={ref}
    >
      {children}
    </Popover.Title>
  );
});
Title.displayName = 'Popover.Title';

export type DescriptionProps = ComponentProps<typeof Description>;
const Description = forwardRef<
  ElementRef<typeof Popover.Description>,
  ComponentPropsWithoutRef<typeof Popover.Description>
>(function (props, ref) {
  const { classes } = usePopoverContext();
  const { children, className, ...rest } = props;

  return (
    <Popover.Description
      className={cx(classes.description(), className)}
      {...rest}
      ref={ref}
    >
      {children}
    </Popover.Description>
  );
});
Description.displayName = 'Popover.Description';

export type CloseTriggerProps = ComponentProps<typeof CloseTrigger>;
const CloseTrigger = forwardRef<
  ElementRef<typeof Popover.CloseTrigger>,
  ComponentPropsWithoutRef<typeof Popover.CloseTrigger>
>(function (props, ref) {
  const { classes } = usePopoverContext();
  const { children, className, ...rest } = props;

  return (
    <Popover.CloseTrigger
      className={cx(classes.closeTrigger(), className)}
      ref={ref}
      {...rest}
    >
      {children}
    </Popover.CloseTrigger>
  );
});
CloseTrigger.displayName = 'Popover.CloseTrigger';

export {
  Root,
  Trigger,
  Content,
  Positioner,
  CloseTrigger,
  Title,
  Description,
  Arrow,
};
