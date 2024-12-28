import { Dialog, DialogRootProps } from '@ark-ui/react/dialog';
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
Trigger.displayName = 'Drawer.Trigger';

export type BackdropProps = ComponentProps<typeof Backdrop>;
const Backdrop = forwardRef<
  ElementRef<typeof Dialog.Backdrop>,
  ComponentPropsWithoutRef<typeof Dialog.Backdrop>
>(function (props, ref) {
  const { classes } = useDrawerContext();
  const { children, className, ...rest } = props;

  return <Dialog.Backdrop className={classes.backdrop()} {...rest} ref={ref} />;
});
Backdrop.displayName = 'Drawer.Backdrop';

export type PositionerProps = ComponentProps<typeof Positioner>;
const Positioner = forwardRef<
  ElementRef<typeof Dialog.Positioner>,
  ComponentPropsWithoutRef<typeof Dialog.Positioner>
>(function (props, ref) {
  const { classes } = useDrawerContext();
  const { children, className, ...rest } = props;

  return (
    <Dialog.Positioner className={classes.positioner()} {...rest} ref={ref}>
      {children}
    </Dialog.Positioner>
  );
});
Positioner.displayName = 'Drawer.Positioner';

export type ContentProps = ComponentProps<typeof Content>;
const Content = forwardRef<
  ElementRef<typeof Dialog.Content>,
  ComponentPropsWithoutRef<typeof Dialog.Content>
>(function (props, ref) {
  const { classes } = useDrawerContext();
  const { children, className, ...rest } = props;

  return (
    <Dialog.Content
      className={cx(classes.content(), className)}
      ref={ref}
      {...rest}
    >
      {children}
    </Dialog.Content>
  );
});
Content.displayName = 'Drawer.Content';

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
Header.displayName = 'Drawer.Header';

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
Body.displayName = 'Drawer.Body';

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
Footer.displayName = 'Drawer.Footer';

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
Title.displayName = 'Drawer.Title';

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
Description.displayName = 'Drawer.Description';

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
CloseTrigger.displayName = 'Drawer.CloseTrigger';

export {
  Root,
  Trigger,
  Content,
  Header,
  Body,
  Footer,
  Title,
  Description,
  Backdrop,
  Positioner,
  CloseTrigger,
};
