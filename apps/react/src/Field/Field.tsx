import { fieldAnatomy } from '@ark-ui/anatomy';
import { Field, FieldRootProps } from '@ark-ui/react/field';

import {
  type ComponentProps,
  type ComponentPropsWithoutRef,
  forwardRef,
  type ElementRef,
} from 'react';

import { sva, cx, RecipeVariantProps } from '../../styled-system/css';
import { createReactContext } from '../create-react-context';

export const fieldVariants = sva({
  className: 'field',
  slots: fieldAnatomy.keys(),
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1.5',
    },
    label: {
      color: 'neutral.900',
      fontWeight: 'medium',
      textStyle: 'sm',
      _disabled: {
        color: 'disabled',
      },
    },
    helperText: {
      alignItems: 'center',
      display: 'inline-flex',
      color: 'neutral.400',
      gap: '1',
      textStyle: 'sm',
      _disabled: {
        color: 'disabled',
      },
    },
    errorText: {
      alignItems: 'center',
      color: 'error.500',
      display: 'inline-flex',
      gap: '1',
      textStyle: 'sm',
      _disabled: {
        color: 'disabled',
      },
    },
  },
});

type FieldProviderProps = {
  classes: ReturnType<typeof fieldVariants>;
};

const [FieldProvider, useFieldContext] = createReactContext<FieldProviderProps>(
  {
    name: 'field',
    hookName: 'useFieldContext',
    providerName: 'FieldProvider',
    defaultValue: {
      classes: {},
    },
  },
);

export type RootProps = FieldRootProps &
  RecipeVariantProps<typeof fieldVariants>;

const Root = forwardRef<
  ElementRef<typeof Field.Root>,
  ComponentPropsWithoutRef<typeof Field.Root>
>(function (props, ref) {
  const { children, className, ...rest } = props;

  const classes = fieldVariants();
  const ctx = {
    classes,
  };

  return (
    <FieldProvider value={ctx}>
      <Field.Root className={cx(classes.root, className)} {...rest} ref={ref}>
        {children}
      </Field.Root>
    </FieldProvider>
  );
});

export type LabelProps = ComponentProps<typeof Label>;
const Label = forwardRef<
  ElementRef<typeof Field.Label>,
  ComponentPropsWithoutRef<typeof Field.Label>
>(function (props, ref) {
  const { children, className, ...rest } = props;
  const { classes } = useFieldContext();

  return (
    <Field.Label className={cx(classes.label, className)} ref={ref} {...rest}>
      {children}
    </Field.Label>
  );
});

export type HelperTextProps = ComponentProps<typeof HelperText>;
const HelperText = forwardRef<
  ElementRef<typeof Field.HelperText>,
  ComponentPropsWithoutRef<typeof Field.HelperText>
>(function (props, ref) {
  const { children, className, ...rest } = props;
  const { classes } = useFieldContext();

  return (
    <Field.HelperText
      className={cx(classes.helperText, className)}
      ref={ref}
      {...rest}
    >
      {children}
    </Field.HelperText>
  );
});

export type ErrorTextProps = ComponentProps<typeof ErrorText>;
const ErrorText = forwardRef<
  ElementRef<typeof Field.ErrorText>,
  ComponentPropsWithoutRef<typeof Field.ErrorText>
>(function (props, ref) {
  const { children, className, ...rest } = props;
  const { classes } = useFieldContext();

  return (
    <Field.ErrorText
      className={cx(classes.errorText, className)}
      ref={ref}
      {...rest}
    >
      {children}
    </Field.ErrorText>
  );
});

export { Root, Label, HelperText, ErrorText };
