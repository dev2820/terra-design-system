import { forwardRef, type ComponentProps } from 'react';

import { cx, sva, type RecipeVariantProps } from '../../styled-system/css';
import { createReactContext } from '../create-react-context';

export const alertVariants = sva({
  className: 'alert',
  slots: ['root', 'title', 'description'],
  base: {
    root: {
      position: 'relative',
      padding: 4,
      rounded: 'lg',
      border: '1px solid',
      '& > svg': {
        position: 'absolute',
        top: 6,
        left: 4,
      },
    },
    title: {
      'svg + &': {
        paddingLeft: 8,
      },
      fontWeight: 'semiBold',
      fontSize: 'lg',
      lineHeight: 2,
      mb: 2,
      color: 'neutral.800',
    },
    description: {
      color: 'neutral.600',
      fontSize: 'md',
      'svg ~ &': {
        paddingLeft: 8,
      },
    },
  },
  variants: {
    theme: {
      neutral: {
        root: {
          color: 'neutral.500',
          bg: 'neutral.50',
          borderColor: 'neutral.200',
        },
        title: {
          color: 'neutral.500',
        },
      },
      info: {
        root: {
          color: 'info.500',
          bg: 'info.50',
          borderColor: 'info.200',
        },
        title: {
          color: 'info.500',
        },
      },
      success: {
        root: {
          color: 'success.500',
          bg: 'success.50',
          borderColor: 'success.200',
        },
        title: {
          color: 'success.500',
        },
      },
      warning: {
        root: {
          color: 'warning.500',
          bg: 'warning.50',
          borderColor: 'warning.200',
        },
        title: {
          color: 'warning.500',
        },
      },
      error: {
        root: {
          color: 'error.500',
          bg: 'error.50',
          borderColor: 'error.200',
        },
        title: {
          color: 'error.500',
        },
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
const [AlertProvider, useAlertContext] = createReactContext<AlertProviderProps>(
  {
    name: 'alert',
    hookName: 'useAlertContext',
    providerName: 'AlertProvider',
    defaultValue: {
      theme: 'neutral',
    },
  },
);

export type RootProps = ComponentProps<'div'> &
  RecipeVariantProps<typeof alertVariants> &
  AlertProviderProps;

const Root = forwardRef<HTMLDivElement, RootProps>(function (props, ref) {
  const { theme, children, className, ...rest } = props;
  const classes = alertVariants({ theme });

  const ctx = {
    theme,
  };

  return (
    <AlertProvider value={ctx}>
      <div className={cx(classes.root, className)} ref={ref} {...rest}>
        {children}
      </div>
    </AlertProvider>
  );
});

export type TitleProps = ComponentProps<'h5'>;

const Title = forwardRef<HTMLHeadingElement, TitleProps>(function (props, ref) {
  const { children, className, ...rest } = props;
  const { theme } = useAlertContext();

  const classes = alertVariants({ theme });

  return (
    <h5 ref={ref} className={cx(classes.title, className)} {...rest}>
      {children}
    </h5>
  );
});

export type DescriptionProps = ComponentProps<'p'>;

const Description = forwardRef<HTMLParagraphElement, DescriptionProps>(
  function (props, ref) {
    const { children, className, ...rest } = props;
    const { theme } = useAlertContext();

    const classes = alertVariants({ theme });

    return (
      <p ref={ref} className={cx(classes.description, className)} {...rest}>
        {children}
      </p>
    );
  },
);

export { Root, Title, Description };
