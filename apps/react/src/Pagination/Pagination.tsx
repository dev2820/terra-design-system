import { Pagination } from '@ark-ui/react';
import { IDENTIFIER } from 'env';
import { ChevronLeftIcon, ChevronRightIcon, EllipsisIcon } from 'lucide-react';

import {
  type ComponentPropsWithoutRef,
  forwardRef,
  type ElementRef,
} from 'react';

import { cx } from '../cx';
import { IconButton } from '../IconButton';
import { Link } from '../Link';
import { tv } from '../tv';

export const paginationVariants = tv({
  base: `${IDENTIFIER.scope} pagination`,
  slots: {
    root: 'flex gap-1',
    item: 'font-tabular-nums',
    prevTrigger: '',
    nextTrigger: '',
    ellipsis: 'inline-flex items-center text-neutral-900 font-semibold px-2',
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
        className={cx(classes.root(), className)}
        type={type}
        {...rest}
      >
        <Pagination.PrevTrigger className={classes.prevTrigger()} asChild>
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
                  className={classes.item()}
                  {...page}
                  asChild
                >
                  {type === 'button' ? (
                    <IconButton
                      variant={
                        pagination.page === page.value ? 'filled' : 'ghost'
                      }
                      size="sm"
                      data-active={
                        pagination.page === page.value ? true : undefined
                      }
                      theme={
                        pagination.page === page.value ? 'primary' : 'neutral'
                      }
                    >
                      {page.value}
                    </IconButton>
                  ) : (
                    <Link
                      theme={
                        pagination.page === page.value ? 'primary' : 'neutral'
                      }
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
                  className={classes.ellipsis()}
                >
                  <EllipsisIcon size={16} />
                </Pagination.Ellipsis>
              ),
            )
          }
        </Pagination.Context>
        <Pagination.NextTrigger className={classes.nextTrigger()} asChild>
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
