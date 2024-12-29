import { ChevronLeftIcon, ChevronRightIcon, EllipsisIcon } from 'lucide-react';

import { IconButton } from '../IconButton';
import { Link } from '../Link';
import { Pagination, type PaginationProps } from './index';

export default {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
};

export const Default = {
  args: {
    count: 100,
    pageSize: 10,
    defaultPage: 1,
  },
  render: (props: PaginationProps['Root']) => {
    return (
      <Pagination.Root {...props}>
        <Pagination.PrevTrigger asChild>
          <IconButton variant="ghost" size="sm">
            <ChevronLeftIcon size={24} />
          </IconButton>
        </Pagination.PrevTrigger>
        <Pagination.Context>
          {pagination =>
            pagination.pages.map((page, index) =>
              page.type === 'page' ? (
                <Pagination.Item key={index} {...page} asChild>
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
                </Pagination.Item>
              ) : (
                <Pagination.Ellipsis key={index} index={index}>
                  <EllipsisIcon size={16} />
                </Pagination.Ellipsis>
              ),
            )
          }
        </Pagination.Context>
        <Pagination.NextTrigger asChild>
          <IconButton variant="ghost" size="sm">
            <ChevronRightIcon size={24} />
          </IconButton>
        </Pagination.NextTrigger>
      </Pagination.Root>
    );
  },
};

export const SibilingCount = {
  args: {
    count: 100,
    pageSize: 10,
    defaultPage: 1,
    siblingCount: 2,
  },
  render: (props: PaginationProps['Root']) => {
    return (
      <Pagination.Root {...props}>
        <Pagination.PrevTrigger asChild>
          <IconButton variant="ghost" size="sm">
            <ChevronLeftIcon size={24} />
          </IconButton>
        </Pagination.PrevTrigger>
        <Pagination.Context>
          {pagination =>
            pagination.pages.map((page, index) =>
              page.type === 'page' ? (
                <Pagination.Item key={index} {...page} asChild>
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
                </Pagination.Item>
              ) : (
                <Pagination.Ellipsis key={index} index={index}>
                  <EllipsisIcon size={16} />
                </Pagination.Ellipsis>
              ),
            )
          }
        </Pagination.Context>
        <Pagination.NextTrigger asChild>
          <IconButton variant="ghost" size="sm">
            <ChevronRightIcon size={24} />
          </IconButton>
        </Pagination.NextTrigger>
      </Pagination.Root>
    );
  },
};

export const LinkExample = {
  args: {
    count: 100,
    pageSize: 10,
    defaultPage: 1,
  },
  render: (props: PaginationProps['Root']) => {
    return (
      <Pagination.Root {...props}>
        <Pagination.PrevTrigger asChild>
          <Link theme="neutral">
            <ChevronLeftIcon size={24} />
          </Link>
        </Pagination.PrevTrigger>
        <Pagination.Context>
          {pagination =>
            pagination.pages.map((page, index) =>
              page.type === 'page' ? (
                <Pagination.Item key={index} {...page} asChild>
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
                </Pagination.Item>
              ) : (
                <Pagination.Ellipsis key={index} index={index}>
                  <EllipsisIcon size={16} />
                </Pagination.Ellipsis>
              ),
            )
          }
        </Pagination.Context>
        <Pagination.NextTrigger asChild>
          <Link theme="neutral">
            <ChevronRightIcon size={24} />
          </Link>
        </Pagination.NextTrigger>
      </Pagination.Root>
    );
  },
};
