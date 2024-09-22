import { Dialog, DialogRootProps } from '@ark-ui/react/dialog';
import { Portal } from '@ark-ui/react/portal';
import { IDENTIFIER } from 'env';

import {
  type ComponentProps,
  type ComponentPropsWithoutRef,
  forwardRef,
  type ElementRef,
} from 'react';

import { createReactContext } from '../create-react-context';
import { cx } from '../cx';
import { tv, VariantProps } from '../tv';

export const dialogVariants = tv({
  base: `${IDENTIFIER.scope} dialog`,
  slots: {
    backdrop:
      'backdrop-blur-[4px] bg-blackAlpha-700 h-[100vh] w-[100vw] left-0 top-0 fixed z-overlay data-open:animate-backdrop-in data-closed:animate-backdrop-out dark:bg-whiteAlpha-700',
    positioner:
      'flex items-center justify-center fixed left-0 top-0 w-[100vw] h-[100dvh] overflow-auto z-modal',
    content:
      'bg-white rounded-lg shadow-lg min-w-sm relative duration-normal data-open:animate-dialog-in data-closed:animate-dialog-out',
    title: 'text-fg-title font-semibold text-lg mb-4',
    description: 'text-fg-description text-sm mb-4',
    trigger: '',
    closeTrigger: '',
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
      classes: {} as ReturnType<typeof dialogVariants>,
    },
  });

export type RootProps = DialogRootProps & VariantProps<typeof dialogVariants>;

function Root({ children, ...props }: RootProps) {
  const classes = dialogVariants();
  const ctx = {
    classes,
  };

  return (
    <DialogProvider value={ctx}>
      <Dialog.Root lazyMount unmountOnExit {...props}>
        {children}
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
      className={cx(classes.trigger(), className)}
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
      <Dialog.Backdrop className={classes.backdrop()} />
      <Dialog.Positioner className={classes.positioner()}>
        <Dialog.Content
          className={cx(classes.content(), className)}
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
    <Dialog.Title
      className={cx(classes.title(), className)}
      ref={ref}
      {...rest}
    >
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
      className={cx(classes.description(), className)}
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
      className={cx(classes.closeTrigger(), className)}
      ref={ref}
      {...rest}
    >
      {children}
    </Dialog.CloseTrigger>
  );
});

export { Root, Trigger, Content, Title, Description, CloseTrigger };
