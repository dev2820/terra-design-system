import { Popover, PopoverRootProps, Portal } from '@ark-ui/react';
import { IDENTIFIER } from 'env';

import {
  type ComponentProps,
  type ComponentPropsWithoutRef,
  forwardRef,
  type ElementRef,
  Fragment,
} from 'react';

import { createReactContext } from '../create-react-context';
import { cx } from '../cx';
import { tv } from '../tv';

export const popoverVariants = tv({
  base: `${IDENTIFIER.scope} popover`,
  slots: {
    positioner: 'relative',
    content:
      'relative bg-white rounded-lg shadow-lg flex flex-col max-w-sm z-popover p-4 data-open:animate-fade-in data-closed:animate-fade-out data-hidden:hidden',
    title: 'font-medium text-sm mb-4',
    description: 'text-fg-description text-sm',
    closeTrigger: 'text-fg-description absolute right-2 top-2',
    trigger: '',
    arrow: '[--arrow-size:8px] [--arrow-background:#fff]',
    arrowTip: 'border-layer1 border-t border-l',
  },
});

type PopoverProviderProps = {
  classes: ReturnType<typeof popoverVariants>;
  portalled: PopoverRootProps['portalled'];
};
const [PopoverProvider, usePopoverContext] =
  createReactContext<PopoverProviderProps>({
    name: 'popover',
    hookName: 'usePopoverContext',
    providerName: 'PopoverProvider',
    defaultValue: {
      classes: {} as ReturnType<typeof popoverVariants>,
      portalled: false,
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
      <Popover.Root portalled={portalled} {...rest}>
        {children}
      </Popover.Root>
    </PopoverProvider>
  );
}

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

export type ContentProps = ComponentProps<typeof Content>;
const Content = forwardRef<
  ElementRef<typeof Popover.Content>,
  ComponentPropsWithoutRef<typeof Popover.Content>
>(function (props, ref) {
  const { classes, portalled } = usePopoverContext();
  const { children, className, ...rest } = props;

  const Wrap = portalled ? Portal : Fragment;

  return (
    <Wrap>
      <Popover.Positioner>
        <Popover.Content
          className={cx(classes.content(), className)}
          ref={ref}
          {...rest}
        >
          {children}
        </Popover.Content>
      </Popover.Positioner>
    </Wrap>
  );
});

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
      {...rest}
      ref={ref}
    >
      <Popover.ArrowTip className={classes.arrowTip()} />
    </Popover.Arrow>
  );
});

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

export { Root, Trigger, Content, CloseTrigger, Title, Description, Arrow };
