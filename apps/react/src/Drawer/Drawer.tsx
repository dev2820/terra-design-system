import { dialogAnatomy } from '@ark-ui/anatomy';
import { Dialog, DialogRootProps } from '@ark-ui/react/dialog';
import { Portal } from '@ark-ui/react/portal';
import { IDENTIFIER } from 'env';

import {
  type ComponentProps,
  type ComponentPropsWithoutRef,
  forwardRef,
  type ElementRef,
} from 'react';

import { sva, cx, RecipeVariantProps } from '../../styled-system/css';
import { createReactContext } from '../create-react-context';

export const drawerVariants = sva({
  className: `${IDENTIFIER.scope} drawer`,
  slots: dialogAnatomy.extendWith('header', 'body', 'footer').keys(),
  base: {
    backdrop: {
      backdropFilter: 'blur(4px)',
      background: {
        base: 'blackAlpha.700',
        _light: 'blackAlpha.700',
        _dark: 'whiteAlpha.700',
      },
      height: '100vh',
      left: '0',
      position: 'fixed',
      top: '0',
      width: '100vw',
      zIndex: 'overlay',
      _open: {
        animation: 'backdrop-in 0.2s ease-out',
      },
      _closed: {
        animation: 'backdrop-out 0.15s ease-out',
      },
    },
    positioner: {
      alignItems: 'center',
      display: 'flex',
      height: '100dvh',
      justifyContent: 'center',
      position: 'fixed',
      top: '0',
      width: { base: '100vw', sm: 'sm' },
      zIndex: 'modal',
    },
    content: {
      background: 'white',
      boxShadow: 'lg',
      display: 'grid',
      gridTemplateColumns: '1fr',
      gridTemplateRows: 'auto 1fr auto',
      gridTemplateAreas: `
        'header'
        'body'
        'footer'
      `,
      height: 'full',
      width: 'full',
      '&[aria-hidden]': {
        display: 'none',
      },
    },
    header: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1',
      gridArea: 'header',
      pt: { base: '4', md: '6' },
      pb: '4',
      px: { base: '4', md: '6' },
    },
    body: {
      display: 'flex',
      flexDirection: 'column',
      gridArea: 'body',
      overflow: 'auto',
      p: { base: '4', md: '6' },
    },
    footer: {
      display: 'flex',
      gridArea: 'footer',
      justifyContent: 'flex-end',
      py: '4',
      px: { base: '4', md: '6' },
    },
    title: {
      color: 'neutral.900',
      fontWeight: 'semibold',
      textStyle: 'xl',
    },
    description: {
      color: 'neutral.400',
      textStyle: 'sm',
    },
  },
  variants: {
    variant: {
      left: {
        positioner: {
          left: 0,
        },
        content: {
          _open: {
            animation: 'drawer-in-left 0.2s ease-out',
          },
          _closed: {
            animation: 'drawer-out-left 0.15s ease-out',
          },
        },
      },
      right: {
        positioner: {
          right: 0,
        },
        content: {
          _open: {
            animation: 'drawer-in-right 0.2s ease-out',
          },
          _closed: {
            animation: 'drawer-out-right 0.15s ease-out',
          },
        },
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
      classes: {},
    },
  });

export type RootProps = DialogRootProps &
  RecipeVariantProps<typeof drawerVariants>;

function Root({ children, variant, ...props }: RootProps) {
  const classes = drawerVariants({ variant });
  const ctx = {
    classes,
  };

  return (
    <DrawerProvider value={ctx}>
      <Dialog.Root lazyMount unmountOnExit {...props}>
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
  const { classes } = useDrawerContext();
  const { children, className, ...rest } = props;

  return (
    <Portal>
      <Dialog.Backdrop className={classes.backdrop} />
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

export type HeaderProps = ComponentProps<typeof Header>;
const Header = forwardRef<HTMLDivElement, ComponentPropsWithoutRef<'div'>>(
  function (props, ref) {
    const { classes } = useDrawerContext();
    const { children, className, ...rest } = props;

    return (
      <div className={cx(classes.header, className)} ref={ref} {...rest}>
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
      <div className={cx(classes.body, className)} ref={ref} {...rest}>
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
      <div className={cx(classes.footer, className)} ref={ref} {...rest}>
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
  const { classes } = useDrawerContext();
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
  const { classes } = useDrawerContext();
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
