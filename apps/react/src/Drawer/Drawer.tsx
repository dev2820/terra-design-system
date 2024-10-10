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
      'trds-backdrop-blur-[4px] trds-bg-blackAlpha-700 trds-h-[100vh] trds-w-[100vw] trds-left-0 trds-top-0 trds-fixed trds-z-overlay data-open:trds-animate-backdrop-in data-closed:trds-animate-backdrop-out dark:trds-bg-whiteAlpha-700',
    positioner:
      'trds-flex trds-items-center trds-justify-center trds-fixed trds-z-modal',
    content:
      'trds-bg-white trds-shadow-lg trds-grid trds-grid-cols-[1fr] trds-grid-rows-[auto_1fr_auto] trds-grid-areas-[header,body,footer] trds-h-full trds-w-full',
    header:
      'trds-flex trds-flex-col trds-gap-1 trds-grid-area-header trds-pt-4 md:trds-pt-6 trds-pb-4 trds-px-4 md:trds-px-6',
    body: 'trds-flex trds-flex-col trds-grid-area-body trds-overflow-auto trds-p-4 md:trds-p-6',
    footer:
      'trds-flex trds-grid-area-footer trds-justify-end trds-py-4 trds-px-4 md:trds-px-6',
    title: 'trds-text-fg-title trds-font-semibold trds-text-xl',
    description: 'trds-text-fg-description trds-text-sm',
    trigger: '',
    closeTrigger: '',
  },
  variants: {
    variant: {
      left: {
        positioner:
          'trds-left-0 trds-top-0 trds-h-[100dvh] trds-max-w-[100vw] trds-w-sm',
        content:
          'data-open:trds-animate-drawer-in-left data-closed:trds-animate-drawer-out-left',
      },
      right: {
        positioner:
          'trds-right-0 trds-top-0 trds-h-[100dvh] trds-max-w-[100vw] trds-w-sm',
        content:
          'data-open:trds-animate-drawer-in-right data-closed:trds-animate-drawer-out-right',
      },
      bottom: {
        positioner:
          'trds-bottom-0 trds-w-[100dvw] trds-max-h-[100vh] trds-h-sm',
        content:
          'data-open:trds-animate-drawer-in-bottom data-closed:trds-animate-drawer-out-bottom',
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
