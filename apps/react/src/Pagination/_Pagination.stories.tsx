import { Pagination, type PaginationProps } from './index';

/**
 * based on https://ark-ui.com/react/docs/components/pagination
 */
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
  render: (props: PaginationProps) => {
    return <Pagination {...props} />;
  },
};

export const SibilingCount = {
  args: {
    count: 100,
    pageSize: 10,
    defaultPage: 1,
    siblingCount: 2,
  },
  render: (props: PaginationProps) => {
    return <Pagination {...props} />;
  },
};

export const Type = {
  args: {
    count: 100,
    pageSize: 10,
    defaultPage: 1,
  },
  render: (props: PaginationProps) => {
    return <Pagination {...props} type="link" />;
  },
};
