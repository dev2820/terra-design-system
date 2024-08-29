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
      neutral: {
        root: 'trds-text-neutral-500 trds-bg-neutral-50 trds-border-neutral-200',
        title: 'trds-text-neutral-500',
      },
      info: {
        root: 'trds-text-info-500 trds-bg-info-50 trds-border-info-200',
        title: 'trds-text-info-500',
      },
      success: {
        root: 'trds-text-success-500 trds-bg-success-50 trds-border-success-200',
        title: 'trds-text-success-500',
      },
      warning: {
        root: 'trds-text-warning-500 trds-bg-warning-50 trds-border-warning-200',
        title: 'trds-text-warning-500',
      },
      error: {
        root: 'trds-text-error-500 trds-bg-error-50 trds-border-error-200',
        title: 'trds-text-error-500',
      },
    },
  },
  defaultVariants: {
    theme: 'neutral',
  },
});

type AlertProviderProps = {
  theme: 'info' | 'success' | 'warning' | 'error' | 'neutral';
};

const [AlertProvider, useAlertContext] = createReactContext<{
  theme: 'info' | 'success' | 'warning' | 'error' | 'neutral';
  classes: ReturnType<typeof alertVariants>;
}>({
  name: 'alert',
  hookName: 'useAlertContext',
  providerName: 'AlertProvider',
  defaultValue: {
    theme: 'neutral',
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

export { Root, Title, Description };
