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

export const drawerVariants = tv({
  base: `${IDENTIFIER.scope} drawer`,
  slots: {
    backdrop:
      'backdrop-blur-[4px] bg-blackAlpha-700 h-[100vh] w-[100vw] left-0 top-0 fixed z-overlay data-open:animate-backdrop-in data-closed:animate-backdrop-out dark:bg-whiteAlpha-700',
    positioner:
      'flex items-center justify-center fixed top-0 h-[100dvh] z-modal max-w-[100vw] w-sm',
    content:
      'bg-white shadow-lg grid grid-cols-[1fr] grid-rows-[auto_1fr_auto] grid-areas-[header,body,footer] h-full w-full',
    header:
      'flex flex-col gap-1 grid-area-header pt-4 md:pt-6 pb-4 px-4 md:px-6',
    body: 'flex flex-col grid-area-body overflow-auto p-4 md:p-6',
    footer: 'flex grid-area-footer justify-end py-4 px-4 md:px-6',
    title: 'text-fg-title font-semibold text-xl',
    description: 'text-fg-description text-sm',
    trigger: '',
    closeTrigger: '',
  },
  variants: {
    variant: {
      left: {
        positioner: 'left-0',
        content:
          'data-open:animate-drawer-in-left data-closed:animate-drawer-out-left',
      },
      right: {
        positioner: 'right-0',
        content:
          'data-open:animate-drawer-in-right data-closed:animate-drawer-out-right',
      },
    },
  },
  defaultVariants: {
    variant: 'right',
  },
});

type DrawerProviderProps = {
  classes: ReturnType<typeof drawerVariants>;
};

const [DrawerProvider, useDrawerContext] =
  createReactContext<DrawerProviderProps>({
    name: 'drawer',
    hookName: 'useDrawerContext',
    providerName: 'DrawerProvider',
    defaultValue: {
      classes: {} as ReturnType<typeof drawerVariants>,
    },
  });

export type RootProps = DialogRootProps & VariantProps<typeof drawerVariants>;

function Root({ children, variant, ...props }: RootProps) {
  const classes = drawerVariants({ variant });
  const ctx = {
    classes,
  };

  return (
    <DrawerProvider value={ctx}>
      <Dialog.Root lazyMount {...props}>
        {children}
      </Dialog.Root>
    </DrawerProvider>
  );
}

export type TriggerProps = ComponentProps<typeof Trigger>;
const Trigger = forwardRef<
  ElementRef<typeof Dialog.Trigger>,
  ComponentPropsWithoutRef<typeof Dialog.Trigger>
>(function (props, ref) {
  const { classes } = useDrawerContext();
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
  const { classes } = useDrawerContext();
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

export type HeaderProps = ComponentProps<typeof Header>;
const Header = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<'div'>>(
  function (props, ref) {
    const { classes } = useDrawerContext();
    const { children, className, ...rest } = props;

    return (
      <div className={cx(classes.header(), className)} ref={ref} {...rest}>
        {children}
      </div>
    );
  },
);

export type BodyProps = ComponentProps<typeof Body>;
const Body = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<'div'>>(
  function (props, ref) {
    const { classes } = useDrawerContext();
    const { children, className, ...rest } = props;

    return (
      <div className={cx(classes.body(), className)} ref={ref} {...rest}>
        {children}
      </div>
    );
  },
);

export type FooterProps = ComponentProps<typeof Footer>;
const Footer = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<'div'>>(
  function (props, ref) {
    const { classes } = useDrawerContext();
    const { children, className, ...rest } = props;

    return (
      <div className={cx(classes.footer(), className)} ref={ref} {...rest}>
        {children}
      </div>
    );
  },
);

export type TitleProps = ComponentProps<typeof Title>;
const Title = forwardRef<
  ElementRef<typeof Dialog.Title>,
  ComponentPropsWithoutRef<typeof Dialog.Title>
>(function (props, ref) {
  const { classes } = useDrawerContext();
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
  const { classes } = useDrawerContext();
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
  const { classes } = useDrawerContext();
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

export {
  Root,
  Trigger,
  Content,
  Header,
  Body,
  Footer,
  Title,
  Description,
  CloseTrigger,
};
