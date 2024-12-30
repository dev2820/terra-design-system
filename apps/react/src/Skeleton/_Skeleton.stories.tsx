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
        <div className="trds-w-24 trds-h-24">Hello World</div>
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
            <div className="trds-w-96 trds-h-72"></div>
          </Skeleton>
        </Card.Content>
        <Card.Footer>
          <div className="trds-flex trds-flex-row trds-gap-4">
            <Skeleton round>
              <div className="trds-w-16 trds-h-16 trds-rounded-full">!</div>
            </Skeleton>
            <div>
              <Skeleton>
                <div className="trds-w-40 trds-h-6 trds-rounded-full trds-mb-2">
                  Something Something Something Blar Blar Blar
                </div>
              </Skeleton>
              <Skeleton style={{ width: '100px' }}>
                <div
                  className="trds-h-6 trds-rounded-full"
                  style={{ width: '100px' }}
                >
                  Maybe Name
                </div>
              </Skeleton>
            </div>
          </div>
        </Card.Footer>
      </Card.Root>
    );
  },
};
