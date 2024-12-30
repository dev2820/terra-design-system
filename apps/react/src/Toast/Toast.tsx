import { Toast, ToastRootProps } from '@ark-ui/react/toast';
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

export const toastVariants = tv({
  base: `${IDENTIFIER.scope} toast`,
  slots: {
    root: [
      'trds-bg-white trds-rounded-lg trds-shadow-lg trds-min-w-[20rem]',
      'trds-h-[var(--height)] trds-w-[var(--width)] trds-opacity-[var(--opacity)]',
      'trds-break-anywhere trds-p-4 trds-relative',
      'trds-custom-translate trds-will-change-[translate,opacity,scale] trds-z-[var(--z-index)] trds-transition trds-duration-normal trds-transition-[translate,scale,opacity,height] trds-ease-default',
    ],
    title: 'trds-text-fg-title trds-font-semibold trds-text-sm trds-mb-4',
    description: 'trds-text-fg-description trds-text-sm',
    actionTrigger: 'trds-mt-4',
    closeTrigger: 'trds-absolute trds-top-3 trds-right-3',
  },
});

type ToastProviderProps = {
  classes: ReturnType<typeof toastVariants>;
};

const [ToastProvider, useToastContext] = createReactContext<ToastProviderProps>(
  {
    name: 'toast',
    hookName: 'useToastContext',
    providerName: 'ToastProvider',
    defaultValue: {
      classes: {} as ReturnType<typeof toastVariants>,
    },
  },
);

export type RootProps = ToastRootProps;
const Root = forwardRef<
  ElementRef<typeof Toast.Root>,
  ComponentPropsWithoutRef<typeof Toast.Root>
>(function (props, ref) {
  const { children, className, ...rest } = props;
  const classes = toastVariants();
  const ctx = {
    classes,
  };

  return (
    <ToastProvider value={ctx}>
      <Toast.Root className={cx(classes.root(), className)} {...rest} ref={ref}>
        {children}
      </Toast.Root>
    </ToastProvider>
  );
});
Root.displayName = 'Toast.Root';

export type TitleProps = ComponentProps<typeof Title>;
const Title = forwardRef<
  ElementRef<typeof Toast.Title>,
  ComponentPropsWithoutRef<typeof Toast.Title>
>(function (props, ref) {
  const { classes } = useToastContext();
  const { children, className, ...rest } = props;

  return (
    <Toast.Title className={cx(classes.title(), className)} ref={ref} {...rest}>
      {children}
    </Toast.Title>
  );
});
Title.displayName = 'Toast.Title';

export type DescriptionProps = ComponentProps<typeof Description>;
const Description = forwardRef<
  ElementRef<typeof Toast.Description>,
  ComponentPropsWithoutRef<typeof Toast.Description>
>(function (props, ref) {
  const { classes } = useToastContext();
  const { children, className, ...rest } = props;

  return (
    <Toast.Description
      className={cx(classes.description(), className)}
      ref={ref}
      {...rest}
    >
      {children}
    </Toast.Description>
  );
});
Description.displayName = 'Toast.Description';

export type CloseTriggerProps = ComponentProps<typeof CloseTrigger>;
const CloseTrigger = forwardRef<
  ElementRef<typeof Toast.CloseTrigger>,
  ComponentPropsWithoutRef<typeof Toast.CloseTrigger>
>(function (props, ref) {
  const { classes } = useToastContext();
  const { children, className, ...rest } = props;

  return (
    <Toast.CloseTrigger
      className={cx(classes.closeTrigger(), className)}
      ref={ref}
      {...rest}
    >
      {children}
    </Toast.CloseTrigger>
  );
});
CloseTrigger.displayName = 'Toast.CloseTrigger';

export type ActionTriggerProps = ComponentProps<typeof ActionTrigger>;
const ActionTrigger = forwardRef<
  ElementRef<typeof Toast.ActionTrigger>,
  ComponentPropsWithoutRef<typeof Toast.ActionTrigger>
>(function (props, ref) {
  const { classes } = useToastContext();
  const { children, className, ...rest } = props;

  return (
    <Toast.ActionTrigger
      className={cx(classes.actionTrigger(), className)}
      ref={ref}
      {...rest}
    >
      {children}
    </Toast.ActionTrigger>
  );
});
ActionTrigger.displayName = 'Toast.ActionTrigger';

export {
  Toaster,
  createToaster,
  type ToasterProps,
  type CreateToasterProps,
  type CreateToasterReturn,
} from '@ark-ui/react/toast';

export { Root, ActionTrigger, CloseTrigger, Title, Description };
