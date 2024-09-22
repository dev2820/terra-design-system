import { Card } from '../Card';
import { Skeleton, SkeletonProps } from './index';

export default {
  title: 'Components/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    isLoaded: {
      control: { type: 'boolean' },
    },
  },
  args: {
    isLoaded: false,
  },
};

export const Default = {
  args: {},
  render: (props: SkeletonProps) => {
    return (
      <Skeleton {...props}>
        <div>Hello World</div>
      </Skeleton>
    );
  },
};

export const IsLoaded = {
  args: {
    isLoaded: true,
  },
  render: (props: SkeletonProps) => {
    return (
      <Skeleton {...props}>
        <div>Hello World</div>
      </Skeleton>
    );
  },
};

export const Round = {
  args: {
    round: true,
  },
  render: (props: SkeletonProps) => {
    return (
      <Skeleton {...props}>
        <div className="w-24 h-24">Hello World</div>
      </Skeleton>
    );
  },
};

export const Example = {
  args: {},
  render: () => {
    return (
      <Card.Root>
        <Card.Header>
          <Skeleton>
            <Card.Title>Hello World</Card.Title>
          </Skeleton>
        </Card.Header>
        <Card.Content>
          <Skeleton>
            <div className="w-96 h-72"></div>
          </Skeleton>
        </Card.Content>
        <Card.Footer>
          <div className="flex flex-row gap-4">
            <Skeleton round>
              <div className="w-5 h-5 rounded-full">!</div>
            </Skeleton>
            <Skeleton>
              <div className="w-40 h-5 rounded-full">
                Something Something Something Blar Blar Blar
              </div>
            </Skeleton>
          </div>
        </Card.Footer>
      </Card.Root>
    );
  },
};
