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
      'trds-backdrop-blur-[4px] trds-bg-blackAlpha-700 trds-h-[100vh] trds-w-[100vw] trds-left-0 trds-top-0 trds-fixed trds-z-overlay data-open:trds-animate-backdrop-in data-closed:trds-animate-backdrop-out dark:trds-bg-whiteAlpha-700',
    positioner:
      'trds-flex trds-items-center trds-justify-center trds-fixed trds-left-0 trds-top-0 trds-w-[100vw] trds-h-[100dvh] trds-overflow-auto trds-z-modal',
    content:
      'trds-bg-white trds-rounded-lg trds-shadow-lg trds-min-w-sm trds-relative trds-duration-normal data-open:trds-animate-dialog-in data-closed:trds-animate-dialog-out',
    title: 'trds-text-fg-title trds-font-semibold trds-text-lg trds-mb-4',
    description: 'trds-text-fg-description trds-text-sm trds-mb-4',
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
