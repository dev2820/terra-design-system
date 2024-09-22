import { IDENTIFIER } from 'env';

import { forwardRef, type ComponentProps } from 'react';

import { createReactContext } from '../create-react-context';
import { cx } from '../cx';
import { tv, VariantProps } from '../tv';

export const alertVariants = tv({
  base: `${IDENTIFIER.scope} alert`,
  slots: {
    root: 'relative p-4 rounded-lg border [&>svg]:absolute [&>svg]:top-5 [&>svg]:left-4',
    title:
      '[svg+&]:pl-8 font-semibold text-lg leading-2 mb-2 last:mb-0 text-title',
    description: 'text-description text-md [svg~&]:pl-8',
  },
  variants: {
    theme: {
      neutral: {
        root: 'text-neutral-500 bg-neutral-50 border-neutral-200',
        title: 'text-neutral-500',
      },
      info: {
        root: 'text-info-500 bg-info-50 border-info-200',
        title: 'text-info-500',
      },
      success: {
        root: 'text-success-500 bg-success-50 border-success-200',
        title: 'text-success-500',
      },
      warning: {
        root: 'text-warning-500 bg-warning-50 border-warning-200',
        title: 'text-warning-500',
      },
      error: {
        root: 'text-error-500 bg-error-50 border-error-200',
        title: 'text-error-500',
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
