import { sliderAnatomy } from '@ark-ui/anatomy';
import { Slider } from '@ark-ui/react';
import { IDENTIFIER } from 'env';

import {
  type ComponentProps,
  type ComponentPropsWithoutRef,
  forwardRef,
  type ElementRef,
  ReactNode,
} from 'react';

import { sva, cx, RecipeVariantProps } from '../../styled-system/css';

export const sliderVariants = sva({
  className: `${IDENTIFIER.scope} slider`,
  slots: sliderAnatomy.keys(),
  base: {
    root: {
      display: 'flex',
      flexDirection: 'column',
      gap: '1',
      width: 'full',
    },
    control: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
    },
    track: {
      backgroundColor: 'neutral.200',
      borderRadius: 'full',
      overflow: 'hidden',
      flex: '1',
    },
    range: {
      background: 'primary',
    },
    thumb: {
      background: 'white',
      borderColor: 'primary',
      borderRadius: 'full',
      borderWidth: '2px',
      boxShadow: 'md',
      outline: 'none',
      zIndex: '1',
    },
    markerGroup: {
      mt: '-1',
    },
    marker: {
      color: 'currentColor',
      _before: {
        background: 'white',
        borderRadius: 'full',
        content: "''",
        display: 'block',
        left: '50%',
        position: 'relative',
        transform: 'translateX(-50%)',
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
  variants: {
    size: {
      sm: {
        control: {
          height: '4',
        },
        range: {
          height: '1.5',
        },
        track: {
          height: '1.5',
        },
        thumb: {
          height: '4',
          width: '4',
        },
        marker: {
          _before: {
            height: '1',
            top: '-2.5',
            width: '2px',
          },
          textStyle: 'sm',
        },
      },
      md: {
        control: {
          height: '5',
        },
        range: {
          height: '2',
        },
        track: {
          height: '2',
        },
        thumb: {
          height: '5',
          width: '5',
        },
        marker: {
          _before: {
            height: '1',
            top: '-3',
            width: '2px',
          },
          textStyle: 'sm',
        },
      },
      lg: {
        control: {
          height: '6',
        },
        range: {
          height: '2.5',
        },
        track: {
          height: '2.5',
        },
        thumb: {
          height: '6',
          width: '6',
        },
        marker: {
          _before: {
            height: '1.5',
            top: '-15px',
            width: '2px',
          },
          textStyle: 'md',
        },
      },
    },
  },
});

export type RootProps = ComponentProps<typeof Root>;
const Root = forwardRef<
  ElementRef<typeof Slider.Root>,
  Omit<ComponentPropsWithoutRef<typeof Slider.Root>, 'children'> &
    RecipeVariantProps<typeof sliderVariants> & {
      markers?: { value: number; marker: ReactNode }[];
      multiple?: boolean;
    }
>(({ size, multiple = false, markers = [], className, ...props }, ref) => {
  const classes = sliderVariants({ size });

  return (
    <Slider.Root ref={ref} className={cx(classes.root, className)} {...props}>
      <Slider.Control className={classes.control}>
        <Slider.Track className={classes.track}>
          <Slider.Range className={classes.range} />
        </Slider.Track>
        <Slider.Thumb index={0} className={classes.thumb}>
          <Slider.HiddenInput />
        </Slider.Thumb>
        {multiple && (
          <Slider.Thumb index={1} className={classes.thumb}>
            <Slider.HiddenInput />
          </Slider.Thumb>
        )}
      </Slider.Control>
      {markers.length > 0 && (
        <Slider.MarkerGroup className={classes.markerGroup}>
          {markers.map(({ value, marker }) => (
            <Slider.Marker value={value} className={classes.marker}>
              {marker}
            </Slider.Marker>
          ))}
        </Slider.MarkerGroup>
      )}
    </Slider.Root>
  );
});

export { Root };
