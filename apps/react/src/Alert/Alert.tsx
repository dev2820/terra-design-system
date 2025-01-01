import { IDENTIFIER } from 'env';

import { forwardRef, type ComponentProps } from 'react';

import { createReactContext } from '../create-react-context';
import { cx } from '../cx';
import { tv, VariantProps } from '../tv';

export const alertVariants = tv({
  base: `${IDENTIFIER.scope} alert`,
  slots: {
    root: 'trds-relative trds-p-4 trds-rounded-lg trds-border [&>svg]:trds-absolute [&>svg]:trds-top-5 [&>svg]:trds-left-4',
    title:
      '[svg+&]:trds-pl-8 trds-font-semibold trds-text-lg trds-leading-2 trds-mb-2 last:trds-mb-0 trds-text-title',
    description: 'trds-text-description trds-text-md [svg~&]:trds-pl-8',
  },
  variants: {
    theme: {
      info: {
        root: '[&>svg]:trds-text-info trds-bg-info-layer trds-border-info-boundary',
        title: 'trds-text-info',
      },
      success: {
        root: '[&>svg]:trds-text-success trds-bg-success-layer trds-border-success-boundary',
        title: 'trds-text-success',
      },
      warning: {
        root: '[&>svg]:trds-text-warning trds-bg-warning-layer trds-border-warning-boundary',
        title: 'trds-text-warning',
      },
      danger: {
        root: '[&>svg]:trds-text-danger trds-bg-danger-layer trds-border-danger-boundary',
        title: 'trds-text-danger',
      },
    },
  },
  defaultVariants: {
    theme: 'info',
  },
});

type AlertProviderProps = {
  theme: 'info' | 'success' | 'warning' | 'danger';
};

const [AlertProvider, useAlertContext] = createReactContext<{
  theme: 'info' | 'success' | 'warning' | 'danger';
  classes: ReturnType<typeof alertVariants>;
}>({
  name: 'alert',
  hookName: 'useAlertContext',
  providerName: 'AlertProvider',
  defaultValue: {
    theme: 'info',
    classes: {} as ReturnType<typeof alertVariants>,
  },
});

export type RootProps = ComponentProps<'div'> &
  VariantProps<typeof alertVariants> &
  AlertProviderProps;
const Root = forwardRef<HTMLDivElement, RootProps>(function (props, ref) {
  const { theme, children, className, ...rest } = props;
  const classes = alertVariants({ theme });

  const ctx = {
    theme,
    classes,
  };

  return (
    <AlertProvider value={ctx}>
      <div className={cx(classes.root(), className)} ref={ref} {...rest}>
        {children}
      </div>
    </AlertProvider>
  );
});
Root.displayName = 'Alert.Root';

export type TitleProps = ComponentProps<'h5'>;
const Title = forwardRef<HTMLHeadingElement, TitleProps>(function (props, ref) {
  const { children, className, ...rest } = props;
  const { classes } = useAlertContext();

  return (
    <h5 ref={ref} className={cx(classes.title(), className)} {...rest}>
      {children}
    </h5>
  );
});
Title.displayName = 'Alert.Title';

export type DescriptionProps = ComponentProps<'p'>;
const Description = forwardRef<HTMLParagraphElement, DescriptionProps>(
  function (props, ref) {
    const { children, className, ...rest } = props;
    const { classes } = useAlertContext();

    return (
      <p ref={ref} className={cx(classes.description(), className)} {...rest}>
        {children}
      </p>
    );
  },
);
Description.displayName = 'Alert.Description';

export { Root, Title, Description };
