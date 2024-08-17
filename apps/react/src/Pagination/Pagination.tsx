import { paginationAnatomy } from '@ark-ui/anatomy';
import { Pagination } from '@ark-ui/react';
import { IDENTIFIER } from 'env';
import { ChevronLeftIcon, ChevronRightIcon, EllipsisIcon } from 'lucide-react';

import {
  type ComponentPropsWithoutRef,
  forwardRef,
  type ElementRef,
} from 'react';

import { sva, cx } from '../../styled-system/css';
import { IconButton } from '../IconButton';
import { Link } from '../Link';

export const paginationVariants = sva({
  className: `${IDENTIFIER.scope} pagination`,
  slots: paginationAnatomy.keys(),
  base: {
    root: {
      display: 'flex',
      gap: '1',
    },
    item: {
      fontVariantNumeric: 'tabular-nums',
    },
    ellipsis: {
      alignItems: 'center',
      color: 'neutral.900',
      display: 'inline-flex',
      fontWeight: 'semibold',
      px: '2',
    },
  },
});

export type RootProps = ComponentPropsWithoutRef<typeof Pagination.Root>;

const Root = forwardRef<ElementRef<typeof Pagination.Root>, RootProps>(
  (props, ref) => {
    const { type = 'button', children, className, ...rest } = props;
    const classes = paginationVariants();

    return (
      <Pagination.Root
        ref={ref}
        className={cx(classes.root, className)}
        type={type}
        {...rest}
      >
        <Pagination.PrevTrigger className={classes.prevTrigger} asChild>
          {type === 'button' ? (
            <IconButton variant="ghost" size="sm">
              <ChevronLeftIcon size={24} />
            </IconButton>
          ) : (
            <Link theme="neutral">
              <ChevronLeftIcon size={24} />
            </Link>
          )}
        </Pagination.PrevTrigger>
        <Pagination.Context>
          {pagination =>
            pagination.pages.map((page, index) =>
              page.type === 'page' ? (
                <Pagination.Item
                  key={index}
                  className={classes.item}
                  {...page}
                  asChild
                >
                  {type === 'button' ? (
                    <IconButton
                      variant="ghost"
                      size="sm"
                      data-active={
                        pagination.page === page.value ? true : undefined
                      }
                    >
                      {page.value}
                    </IconButton>
                  ) : (
                    <Link
                      theme="neutral"
                      data-active={
                        pagination.page === page.value ? true : undefined
                      }
                    >
                      {page.value}
                    </Link>
                  )}
                </Pagination.Item>
              ) : (
                <Pagination.Ellipsis
                  key={index}
                  index={index}
                  className={classes.ellipsis}
                >
                  <EllipsisIcon size={16} />
                </Pagination.Ellipsis>
              ),
            )
          }
        </Pagination.Context>
        <Pagination.NextTrigger className={classes.nextTrigger} asChild>
          {type === 'button' ? (
            <IconButton variant="ghost" size="sm">
              <ChevronRightIcon size={24} />
            </IconButton>
          ) : (
            <Link theme="neutral">
              <ChevronRightIcon size={24} />
            </Link>
          )}
        </Pagination.NextTrigger>
      </Pagination.Root>
    );
  },
);

export { Root };
