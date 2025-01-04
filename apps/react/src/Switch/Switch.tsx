import { Switch } from '@ark-ui/react/switch';
import { IDENTIFIER } from 'env';

import {
  ComponentProps,
  ComponentPropsWithoutRef,
  ElementRef,
  forwardRef,
} from 'react';

import { createReactContext } from '../create-react-context';
import { cx } from '../cx';
import { tv, VariantProps } from '../tv';

export const switchVariants = tv({
  base: `${IDENTIFIER.scope} switch`,
  slots: {
    root: 'trds-cursor-pointer trds-text-fg trds-flex trds-items-center trds-relative data-disabled:trds-opacity-60',
    control:
      'trds-inline-flex trds-items-center trds-bg-layer-muted trds-rounded-full trds-cursor-pointer trds-flex-shrink-0 trds-transition trds-duration-normal trds-transition-[background] data-checked:trds-bg-primary data-disabled:trds-cursor-not-allowed',
    thumb:
      'trds-bg-layer-thumb trds-rounded-full trds-shadow-xs trds-transition trds-duration-normal trds-transition-[transform,background] trds-ease-in-out data-checked:trds-translate-x-[100%] data-checked:trds-bg-white',
    label: '',
  },
  variants: {
    size: {
      sm: {
        root: 'trds-gap-2',
        control: 'trds-w-7 trds-p-0.5',
        thumb: 'trds-w-3 trds-h-3',
      },
      md: {
        root: 'trds-gap-3',
        control: 'trds-w-9 trds-p-0.5',
        thumb: 'trds-w-4 trds-h-4',
      },
      lg: {
        root: 'trds-gap-4',
        control: 'trds-w-11 trds-p-0.5',
        thumb: 'trds-w-5 trds-h-5',
      },
    },
  },

  defaultVariants: {
    size: 'md',
  },
});

type SwitchProviderProps = {
  classes: ReturnType<typeof switchVariants>;
} & VariantProps<typeof switchVariants>;

const [SwitchProvider, useSwitchContext] =
  createReactContext<SwitchProviderProps>({
    name: 'switch',
    hookName: 'useSwitchContext',
    providerName: 'SwitchProvider',
    defaultValue: {
      classes: {} as ReturnType<typeof switchVariants>,
      size: 'md',
    },
  });

export type RootProps = ComponentProps<typeof Root>;
const Root = forwardRef<
  ElementRef<typeof Switch.Root>,
  ComponentPropsWithoutRef<typeof Switch.Root> &
    VariantProps<typeof switchVariants>
>(function (props, ref) {
  const { size, className, children, ...rest } = props;
  const classes = switchVariants({ size });
  const ctx = { classes };

  return (
    <SwitchProvider value={ctx}>
      <Switch.Root
        ref={ref}
        className={cx(classes.root(), className)}
        {...rest}
      >
        {children}
      </Switch.Root>
    </SwitchProvider>
  );
});
Root.displayName = 'Switch.Root';

export type LabelProps = ComponentProps<typeof Label>;
const Label = forwardRef<
  ElementRef<typeof Switch.Label>,
  ComponentPropsWithoutRef<typeof Switch.Label>
>(function (props, ref) {
  const { className, ...rest } = props;
  const { classes } = useSwitchContext();

  return (
    <Switch.Label
      className={cx(classes.label(), className)}
      ref={ref}
      {...rest}
    />
  );
});
Label.displayName = 'Slider.Label';

export type ThumbProps = ComponentProps<typeof Thumb>;
const Thumb = forwardRef<
  ElementRef<typeof Switch.Thumb>,
  ComponentPropsWithoutRef<typeof Switch.Thumb>
>(function (props, ref) {
  const { className, ...rest } = props;
  const { classes } = useSwitchContext();

  return (
    <Switch.Thumb
      className={cx(classes.thumb(), className)}
      ref={ref}
      {...rest}
    />
  );
});
Thumb.displayName = 'Slider.Thumb';

export type ControlProps = ComponentProps<typeof Control>;
const Control = forwardRef<
  ElementRef<typeof Switch.Control>,
  ComponentPropsWithoutRef<typeof Switch.Control>
>(function (props, ref) {
  const { className, ...rest } = props;
  const { classes } = useSwitchContext();

  return (
    <Switch.Control
      className={cx(classes.control(), className)}
      ref={ref}
      {...rest}
    />
  );
});
Control.displayName = 'Slider.Control';

export type HiddenInputProps = ComponentProps<typeof HiddenInput>;
const HiddenInput = forwardRef<
  ElementRef<typeof Switch.HiddenInput>,
  ComponentPropsWithoutRef<typeof Switch.HiddenInput>
>(function (props, ref) {
  const { className, ...rest } = props;
  const { classes } = useSwitchContext();

  return (
    <Switch.HiddenInput
      className={cx(classes.control(), className)}
      ref={ref}
      {...rest}
    />
  );
});
HiddenInput.displayName = 'Slider.HiddenInput';

export { Root, HiddenInput, Control, Thumb, Label };
