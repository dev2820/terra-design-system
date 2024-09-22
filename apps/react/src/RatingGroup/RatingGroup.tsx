import { RatingGroup } from '@ark-ui/react';
import { IDENTIFIER } from 'env';

import { ComponentProps, ElementRef, forwardRef } from 'react';

import { cx } from '../cx';
import { tv, VariantProps } from '../tv';

export const ratingGroupVariant = tv({
  base: `${IDENTIFIER.scope} ratingGroup`,
  slots: {
    root: 'flex flex-col gap-1.5 text-primary',
    control: 'flex',
    item: 'cursor-pointer transition duration-normal transition-[color,fill] ease-default fill-transparent data-highlighted:fill-current focus-visible:outline-none data-disabled:cursor-not-allowed data-disabled:opacity-40',
  },

  variants: {
    size: {
      sm: {
        control: 'gap-0',
        item: '[&_svg:w-4] [&_svg:h-4]',
        label: 'text-sm',
      },
      md: {
        control: 'gap-0.5',
        item: '[&_svg:w-5] [&_svg:h-5]',
        label: 'text-sm',
      },
      lg: {
        control: 'gap-0.5',
        item: '[&_svg:w-6] [&_svg:h-6]',
        label: 'text-md',
      },
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export type RootProps = RatingGroup.RootProps &
  VariantProps<typeof ratingGroupVariant> & {};

export const Root = forwardRef<ElementRef<typeof RatingGroup.Root>, RootProps>(
  function (props, ref) {
    const { size, className, children, ...rest } = props;
    const classes = ratingGroupVariant({ size });
    const starSize = convertSizeToNumber(size);
    return (
      <RatingGroup.Root
        ref={ref}
        className={cx(classes.root(), className)}
        {...rest}
      >
        <RatingGroup.Control className={classes.control()}>
          <RatingGroup.Context>
            {({ items }) =>
              items.map(item => (
                <RatingGroup.Item
                  key={item}
                  index={item}
                  className={classes.item()}
                >
                  <RatingGroup.ItemContext>
                    {({ half, highlighted }) => {
                      if (half && highlighted) {
                        return <HalfStarIcon size={starSize} />;
                      }
                      if (highlighted) {
                        return <FullStarIcon size={starSize} />;
                      }
                      return <EmptyStarIcon size={starSize} />;
                    }}
                  </RatingGroup.ItemContext>
                </RatingGroup.Item>
              ))
            }
          </RatingGroup.Context>
        </RatingGroup.Control>
        <RatingGroup.HiddenInput />
      </RatingGroup.Root>
    );
  },
);

const convertSizeToNumber = (size?: 'sm' | 'md' | 'lg') => {
  if (size === 'sm') {
    return 12;
  }
  if (size === 'md') {
    return 16;
  }
  if (size === 'lg') {
    return 20;
  }

  return 16;
};

const FullStarIcon = (props: ComponentProps<'svg'> & { size: number }) => {
  const { size, ...rest } = props;
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M15.09 8.26L12 2L8.91 8.26L2 9.27L7 14.14L5.82 21.02L12 17.77L18.18 21.02L17 14.14L22 9.27L15.09 8.26Z"
        stroke="currentColor"
        fill="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const HalfStarIcon = (props: ComponentProps<'svg'> & { size: number }) => {
  const { size, ...rest } = props;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M15.09 8.26L12 2L8.91 8.26L2 9.27L7 14.14L5.82 21.02L12 17.77L18.18 21.02L17 14.14L22 9.27L15.09 8.26Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.82 21.02L12 17.77V2L8.91 8.26L2 9.27L7 14.14L5.82 21.02Z"
        fill="currentColor"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const EmptyStarIcon = (props: ComponentProps<'svg'> & { size: number }) => {
  const { size, ...rest } = props;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="transparent"
      xmlns="http://www.w3.org/2000/svg"
      {...rest}
    >
      <path
        d="M15.09 8.26L12 2L8.91 8.26L2 9.27L7 14.14L5.82 21.02L12 17.77L18.18 21.02L17 14.14L22 9.27L15.09 8.26Z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
