import {
  RadioGroup,
  RadioGroupItemProps,
  type RadioGroupRootProps,
} from '@ark-ui/react/radio-group';
import { IDENTIFIER } from 'env';

import { ElementRef, forwardRef } from 'react';

import { createReactContext } from '../create-react-context';
import { cx } from '../cx';
import { tv, VariantProps } from '../tv';

export const radioGroupVariant = tv({
  base: `${IDENTIFIER.scope} radioGroup`,
  slots: {
    root: 'trds-flex trds-flex-col data-vertical:trds-flex-col data-horizontal:trds-flex-row',
    item: 'trds-flex trds-items-center trds-cursor-pointer data-disabled:trds-cursor-not-allowed',
    itemControl: [
      'trds-bg-transparent trds-border-boundary trds-rounded-full trds-border-2 trds-transition trds-duration-normal trds-ease-default',
      'data-checked:trds-bg-transparent data-checked:trds-border-primary data-checked:trds-outline data-checked:trds-outline-primary',
      'data-disabled:trds-border-muted data-disabled:trds-text-muted data-disabled:trds-border-muted data-disabled:trds-outline-muted',
    ],
    itemText: 'trds-font-medium data-disabled:trds-text-muted',
  },
  variants: {
    size: {
      sm: {
        root: 'data-vertical:trds-gap-3 data-horizontal:trds-gap-4',
        item: 'trds-gap-2',
        itemControl:
          'trds-w-4 trds-h-4 data-checked:trds-outline-[4px] data-checked:trds-outline-offset-[-5px]',
        itemText: 'trds-text-sm',
      },
      md: {
        root: 'data-vertical:trds-gap-4 data-horizontal:trds-gap-6',
        item: 'trds-gap-3',
        itemControl:
          'trds-w-5 trds-h-5 data-checked:trds-outline-[5px] data-checked:trds-outline-offset-[-6px]',
        itemText: 'trds-text-md',
      },
      lg: {
        root: 'data-vertical:trds-gap-5 data-horizontal:trds-gap-8',
        item: 'trds-gap-4',
        itemControl:
          'trds-w-6 trds-h-6 data-checked:trds-outline-[6px] data-checked:trds-outline-offset-[-7px]',
        itemText: 'trds-text-lg',
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

type RadioGroupProviderProps = {
  classes: ReturnType<typeof radioGroupVariant>;
};

const [RadioGroupProvider, useRadioGroupContext] =
  createReactContext<RadioGroupProviderProps>({
    name: 'radioGroup',
    hookName: 'useRadioGroupContext',
    providerName: 'RadioGroupProvider',
    defaultValue: {
      classes: {} as ReturnType<typeof radioGroupVariant>,
    },
  });

export type RootProps = RadioGroupRootProps &
  VariantProps<typeof radioGroupVariant>;

export const Root = forwardRef<ElementRef<typeof RadioGroup.Root>, RootProps>(
  function (props, ref) {
    const { size, className, children, ...rest } = props;
    const classes = radioGroupVariant({ size });
    const ctx = {
      classes,
    };

    return (
      <RadioGroupProvider value={ctx}>
        <RadioGroup.Root
          ref={ref}
          className={cx(classes.root(), className)}
          {...rest}
        >
          <RadioGroup.Indicator />

          {children}
        </RadioGroup.Root>
      </RadioGroupProvider>
    );
  },
);

export type ItemProps = RadioGroupItemProps;

export const Item = forwardRef<ElementRef<typeof RadioGroup.Item>, ItemProps>(
  function (props, ref) {
    const { className, children, ...rest } = props;
    const { classes } = useRadioGroupContext();

    return (
      <RadioGroup.Item
        className={cx(classes.item(), className)}
        ref={ref}
        {...rest}
      >
        <RadioGroup.ItemControl
          className={classes.itemControl()}
        ></RadioGroup.ItemControl>
        <RadioGroup.ItemText className={classes.itemText()}>
          {children}
        </RadioGroup.ItemText>
        <RadioGroup.ItemHiddenInput />
      </RadioGroup.Item>
    );
  },
);
