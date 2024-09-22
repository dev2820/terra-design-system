import { Field, FieldRootProps } from '@ark-ui/react/field';
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

export const fieldVariants = tv({
  base: `${IDENTIFIER.scope} field`,
  slots: {
    root: 'flex flex-col gap-1.5',
    label: 'text-neutral-900 font-medium text-sm disabled:text-muted',
    helperText:
      'inline-flex items-center text-fg-description gap-1 text-sm disabled:text-muted',
    errorText:
      'inline-flex items-center text-error gap-1 text-sm disabled:text-muted',
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
      classes: {} as ReturnType<typeof fieldVariants>,
    },
  },
);

export type RootProps = FieldRootProps & VariantProps<typeof fieldVariants>;

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
      <Field.Root className={cx(classes.root(), className)} {...rest} ref={ref}>
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
    <Field.Label className={cx(classes.label(), className)} ref={ref} {...rest}>
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
      className={cx(classes.helperText(), className)}
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
      className={cx(classes.errorText(), className)}
      ref={ref}
      {...rest}
    >
      {children}
    </Field.ErrorText>
  );
});

export { Root, Label, HelperText, ErrorText };
