import { toastAnatomy } from '@ark-ui/anatomy';
import { Toast, ToastRootProps } from '@ark-ui/react';
import { IDENTIFIER } from 'env';

import {
  type ComponentProps,
  type ComponentPropsWithoutRef,
  forwardRef,
  type ElementRef,
} from 'react';

import { sva, cx } from '../../styled-system/css';
import { createReactContext } from '../create-react-context';

export const toastVariants = sva({
  className: `${IDENTIFIER.scope} toast`,
  slots: toastAnatomy.keys(),
  base: {
    root: {
      background: 'white',
      borderRadius: 'lg',
      boxShadow: 'lg',
      minWidth: 'xs',
      height: 'var(--height)',
      width: 'var(--width)',
      opacity: 'var(--opacity)',
      overflowWrap: 'anywhere',
      p: '4',
      position: 'relative',
      scale: 'var(--scale)',
      translate: 'var(--x) var(--y) 0',
      willChange: 'translate, opacity, scale',
      zIndex: 'var(--z-index)',
      transitionDuration: 'slow',
      transitionProperty: 'translate, scale, opacity, height',
      transitionTimingFunction: 'default',
    },
    title: {
      color: 'neutral.800',
      fontWeight: 'semibold',
      textStyle: 'sm',
    },
    description: {
      color: 'neutral.400',
      textStyle: 'sm',
    },
    actionTrigger: {
      mt: '2',
    },
    closeTrigger: {
      position: 'absolute',
      top: '3',
      right: '3',
    },
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
      classes: {},
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
      <Toast.Root className={cx(classes.root, className)} {...rest} ref={ref}>
        {children}
      </Toast.Root>
    </ToastProvider>
  );
});

export type TitleProps = ComponentProps<typeof Title>;
const Title = forwardRef<
  ElementRef<typeof Toast.Title>,
  ComponentPropsWithoutRef<typeof Toast.Title>
>(function (props, ref) {
  const { classes } = useToastContext();
  const { children, className, ...rest } = props;

  return (
    <Toast.Title className={cx(classes.title, className)} ref={ref} {...rest}>
      {children}
    </Toast.Title>
  );
});

export type DescriptionProps = ComponentProps<typeof Description>;
const Description = forwardRef<
  ElementRef<typeof Toast.Description>,
  ComponentPropsWithoutRef<typeof Toast.Description>
>(function (props, ref) {
  const { classes } = useToastContext();
  const { children, className, ...rest } = props;

  return (
    <Toast.Description
      className={cx(classes.description, className)}
      ref={ref}
      {...rest}
    >
      {children}
    </Toast.Description>
  );
});

export type CloseTriggerProps = ComponentProps<typeof CloseTrigger>;
const CloseTrigger = forwardRef<
  ElementRef<typeof Toast.CloseTrigger>,
  ComponentPropsWithoutRef<typeof Toast.CloseTrigger>
>(function (props, ref) {
  const { classes } = useToastContext();
  const { children, className, ...rest } = props;

  return (
    <Toast.CloseTrigger
      className={cx(classes.closeTrigger, className)}
      ref={ref}
      {...rest}
    >
      {children}
    </Toast.CloseTrigger>
  );
});

export type ActionTriggerProps = ComponentProps<typeof ActionTrigger>;
const ActionTrigger = forwardRef<
  ElementRef<typeof Toast.ActionTrigger>,
  ComponentPropsWithoutRef<typeof Toast.ActionTrigger>
>(function (props, ref) {
  const { classes } = useToastContext();
  const { children, className, ...rest } = props;

  return (
    <Toast.ActionTrigger
      className={cx(classes.actionTrigger, className)}
      ref={ref}
      {...rest}
    >
      {children}
    </Toast.ActionTrigger>
  );
});

export {
  Toaster,
  createToaster,
  type ToasterProps,
  type CreateToasterProps,
  type CreateToasterReturn,
} from '@ark-ui/react';
export { Root, ActionTrigger, CloseTrigger, Title, Description };
