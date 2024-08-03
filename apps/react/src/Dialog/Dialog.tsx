import { dialogAnatomy } from '@ark-ui/anatomy';
import { Dialog, DialogRootProps } from '@ark-ui/react/dialog';
import { Portal } from '@ark-ui/react/portal';

import {
  type ComponentProps,
  type ComponentPropsWithoutRef,
  forwardRef,
  type ElementRef,
} from 'react';

import { sva, cx, RecipeVariantProps } from '../../styled-system/css';
import { createReactContext } from '../create-react-context';

export const dialogVariants = sva({
  className: 'dialog',
  slots: dialogAnatomy.keys(),
  base: {
    backdrop: {
      backdropFilter: 'blur(4px)',
      background: 'blackAlpha.700',
      // background: {
      //   _light: 'blackAlpha.700',
      //   _dark: 'whiteAlpha.700',
      // },
      height: '100vh',
      left: '0',
      position: 'fixed',
      top: '0',
      width: '100vw',
      zIndex: 'overlay',
      _open: {
        animation: 'fade-in 0.2s ease-out',
      },
      _closed: {
        animation: 'fade-out 0.15s ease-out',
      },
    },
    positioner: {
      alignItems: 'center',
      display: 'flex',
      justifyContent: 'center',
      left: '0',
      overflow: 'auto',
      position: 'fixed',
      top: '0',
      width: '100vw',
      height: '100dvh',
      zIndex: 'modal',
    },
    content: {
      background: 'white',
      borderRadius: 'lg',
      boxShadow: 'lg',
      minW: 'sm',
      position: 'relative',
      transitionDuration: 'normal',
      _open: {
        animation: 'dialog-in 0.2s ease-out',
      },
      _closed: {
        animation: 'dialog-out 0.15s ease-out',
      },
    },
    title: {
      fontWeight: 'semibold',
      textStyle: 'lg',
    },
    description: {
      color: 'neutral.400',
      textStyle: 'sm',
    },
  },
});

type DialogProviderProps = {
  classes: ReturnType<typeof dialogVariants>;
};

const [DialogProvider, useDialogContext] =
  createReactContext<DialogProviderProps>({
    name: 'dialog',
    hookName: 'useDialogContext',
    providerName: 'DialogProvider',
    defaultValue: {
      classes: {},
    },
  });

export type RootProps = DialogRootProps &
  RecipeVariantProps<typeof dialogVariants>;

function Root({ children, ...props }: RootProps) {
  const classes = dialogVariants();
  const ctx = {
    classes,
  };

  return (
    <DialogProvider value={ctx}>
      <Dialog.Root lazyMount unmountOnExit {...props}>
        {children}
        <Dialog.Backdrop className={classes.backdrop} />
      </Dialog.Root>
    </DialogProvider>
  );
}

export type TriggerProps = ComponentProps<typeof Trigger>;
const Trigger = forwardRef<
  ElementRef<typeof Dialog.Trigger>,
  ComponentPropsWithoutRef<typeof Dialog.Trigger>
>(function (props, ref) {
  const { classes } = useDialogContext();
  const { children, className, ...rest } = props;

  return (
    <Dialog.Trigger
      className={cx(classes.trigger, className)}
      ref={ref}
      {...rest}
    >
      {children}
    </Dialog.Trigger>
  );
});

export type ContentProps = ComponentProps<typeof Content>;
const Content = forwardRef<
  ElementRef<typeof Dialog.Content>,
  ComponentPropsWithoutRef<typeof Dialog.Content>
>(function (props, ref) {
  const { classes } = useDialogContext();
  const { children, className, ...rest } = props;

  return (
    <Portal>
      <Dialog.Positioner className={classes.positioner}>
        <Dialog.Content
          className={cx(classes.content, className)}
          ref={ref}
          {...rest}
        >
          {children}
        </Dialog.Content>
      </Dialog.Positioner>
    </Portal>
  );
});

export type TitleProps = ComponentProps<typeof Title>;
const Title = forwardRef<
  ElementRef<typeof Dialog.Title>,
  ComponentPropsWithoutRef<typeof Dialog.Title>
>(function (props, ref) {
  const { classes } = useDialogContext();
  const { children, className, ...rest } = props;

  return (
    <Dialog.Title className={cx(classes.title, className)} ref={ref} {...rest}>
      {children}
    </Dialog.Title>
  );
});

export type DescriptionProps = ComponentProps<typeof Description>;
const Description = forwardRef<
  ElementRef<typeof Dialog.Description>,
  ComponentPropsWithoutRef<typeof Dialog.Description>
>(function (props, ref) {
  const { classes } = useDialogContext();
  const { children, className, ...rest } = props;

  return (
    <Dialog.Description
      className={cx(classes.description, className)}
      ref={ref}
      {...rest}
    >
      {children}
    </Dialog.Description>
  );
});

export type CloseTriggerProps = ComponentProps<typeof CloseTrigger>;
const CloseTrigger = forwardRef<
  ElementRef<typeof Dialog.CloseTrigger>,
  ComponentPropsWithoutRef<typeof Dialog.CloseTrigger>
>(function (props, ref) {
  const { classes } = useDialogContext();
  const { children, className, ...rest } = props;

  return (
    <Dialog.CloseTrigger
      className={cx(classes.closeTrigger, className)}
      ref={ref}
      {...rest}
    >
      {children}
    </Dialog.CloseTrigger>
  );
});

export { Root, Trigger, Content, Title, Description, CloseTrigger };
