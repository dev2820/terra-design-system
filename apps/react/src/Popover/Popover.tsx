import { popoverAnatomy } from '@ark-ui/anatomy';
import { Popover, PopoverRootProps, Portal } from '@ark-ui/react';

import {
  type ComponentProps,
  type ComponentPropsWithoutRef,
  forwardRef,
  type ElementRef,
  Fragment,
} from 'react';

import { sva, cx } from '../../styled-system/css';
import { createReactContext } from '../create-react-context';

export const popoverVariants = sva({
  className: 'popover',
  slots: popoverAnatomy.keys(),
  base: {
    positioner: {
      position: 'relative',
    },
    content: {
      background: 'white',
      borderRadius: 'lg',
      boxShadow: 'lg',
      display: 'flex',
      flexDirection: 'column',
      maxWidth: 'sm',
      zIndex: 'popover',
      p: '4',
      _open: {
        animation: 'fade-in 0.25s ease-out',
      },
      _closed: {
        animation: 'fade-out 0.2s ease-out',
      },
      '&[aria-hidden]': {
        display: 'none',
      },
    },
    title: {
      fontWeight: 'medium',
      textStyle: 'sm',
    },
    description: {
      color: 'neutral.400',
      textStyle: 'sm',
    },
    closeTrigger: {
      color: 'neutral.400',
    },
    arrow: {
      '--arrow-size': 'var(--sizes-3)',
      '--arrow-background': 'var(--colors-white)',
    },
    arrowTip: {
      borderColor: 'neutral.100',
      borderTopWidth: '1px',
      borderLeftWidth: '1px',
    },
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
      classes: {},
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
      className={cx(classes.trigger, className)}
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
          className={cx(classes.content, className)}
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
    <Popover.Arrow className={cx(classes.arrow, className)} {...rest} ref={ref}>
      <Popover.ArrowTip className={classes.arrowTip} />
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
    <Popover.Title className={cx(classes.title, className)} {...rest} ref={ref}>
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
      className={cx(classes.description, className)}
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
      className={cx(classes.closeTrigger, className)}
      ref={ref}
      {...rest}
    >
      {children}
    </Popover.CloseTrigger>
  );
});

export { Root, Trigger, Content, CloseTrigger, Title, Description, Arrow };
