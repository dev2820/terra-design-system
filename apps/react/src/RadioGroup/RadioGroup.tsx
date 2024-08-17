import { radioGroupAnatomy } from '@ark-ui/anatomy';
import {
  RadioGroup,
  RadioGroupItemProps,
  type RadioGroupRootProps,
} from '@ark-ui/react/radio-group';
import { IDENTIFIER } from 'env';

import { ElementRef, forwardRef } from 'react';

import { RecipeVariantProps, cx, sva } from '../../styled-system/css';
import { createReactContext } from '../create-react-context';

export const radioGroupVariant = sva({
  className: `${IDENTIFIER.scope} radioGroup`,
  slots: radioGroupAnatomy.keys(),
  base: {
    root: {
      display: 'flex',
      flexDirection: {
        _vertical: 'column',
        _horizontal: 'row',
      },
    },
    item: {
      alignItems: 'center',
      cursor: 'pointer',
      display: 'flex',
      _disabled: {
        cursor: 'not-allowed',
      },
    },
    itemControl: {
      background: 'transparent',
      borderColor: 'neutral.300',
      borderRadius: 'full',
      borderWidth: '2px',
      transitionDuration: 'normal',
      transitionProperty: 'background',
      transitionTimingFunction: 'default',
      _checked: {
        background: 'transparent',
        borderColor: 'primary',
        outlineColor: 'primary',
        outlineStyle: 'solid',
      },
      _disabled: {
        borderColor: 'disabled',
        color: 'disabled',
        _hover: {
          bg: 'initial',
          color: 'disabled',
        },
        _checked: {
          borderColor: 'disabled',
          outlineColor: 'disabled',
        },
      },
    },
    itemText: {
      fontWeight: 'medium',
      _disabled: {
        color: 'disabled',
      },
    },
  },
  variants: {
    size: {
      sm: {
        root: {
          gap: {
            _vertical: '3',
            _horizontal: '4',
          },
        },
        item: {
          gap: '2',
        },
        itemControl: {
          width: '4',
          height: '4',
          _checked: {
            outlineWidth: '4px',
            outlineOffset: '-5px',
          },
        },
        itemText: {
          textStyle: 'sm',
        },
      },
      md: {
        root: {
          gap: {
            _vertical: '4',
            _horizontal: '6',
          },
        },
        item: {
          gap: '3',
        },
        itemControl: {
          width: '5',
          height: '5',
          _checked: {
            outlineWidth: '5px',
            outlineOffset: '-6px',
          },
        },
        itemText: {
          textStyle: 'md',
        },
      },
      lg: {
        root: {
          gap: {
            _vertical: '5',
            _horizontal: '8',
          },
        },
        item: {
          gap: '4',
        },
        itemControl: {
          width: '6',
          height: '6',
          _checked: {
            outlineWidth: '6px',
            outlineOffset: '-7px',
          },
        },
        itemText: {
          textStyle: 'lg',
        },
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
      classes: {},
    },
  });

export type RootProps = RadioGroupRootProps &
  RecipeVariantProps<typeof radioGroupVariant>;

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
          className={cx(classes.root, className)}
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
        className={cx(classes.item, className)}
        ref={ref}
        {...rest}
      >
        <RadioGroup.ItemControl
          className={classes.itemControl}
        ></RadioGroup.ItemControl>
        <RadioGroup.ItemText className={classes.itemText}>
          {children}
        </RadioGroup.ItemText>
        <RadioGroup.ItemHiddenInput />
      </RadioGroup.Item>
    );
  },
);
