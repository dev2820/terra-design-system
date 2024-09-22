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
    root: 'flex flex-col data-vertical:flex-col data-horizontal:flex-row',
    item: 'flex items-center cursor-pointer data-disabled:cursor-not-allowed',
    itemControl: [
      'bg-transparent border-boundary rounded-full border-2 transition duration-normal ease-default',
      'data-checked:bg-transparent data-checked:border-primary data-checked:outline data-checked:outline-primary',
      'data-disabled:border-muted data-disabled:text-muted data-disabled:border-muted data-disabled:outline-muted',
    ],
    itemText: 'font-medium data-disabled:text-muted',
  },
  variants: {
    size: {
      sm: {
        root: 'data-vertical:gap-3 data-horizontal:gap-4',
        item: 'gap-2',
        itemControl:
          'w-4 h-4 data-checked:outline-[4px] data-checked:outline-offset-[-5px]',
        itemText: 'text-sm',
      },
      md: {
        root: 'data-vertical:gap-4 data-horizontal:gap-6',
        item: 'gap-3',
        itemControl:
          'w-5 h-5 data-checked:outline-[5px] data-checked:outline-offset-[-6px]',
        itemText: 'text-md',
      },
      lg: {
        root: 'data-vertical:gap-5 data-horizontal:gap-8',
        item: 'gap-4',
        itemControl:
          'w-6 h-6 data-checked:outline-[6px] data-checked:outline-offset-[-7px]',
        itemText: 'text-lg',
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
