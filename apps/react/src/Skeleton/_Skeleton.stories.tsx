import { css } from '../../styled-system/css';
import { Card } from '../Card';
import { Skeleton, SkeletonProps } from './index';

export default {
  title: 'Components/Skeleton',
  component: Skeleton,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
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
        <div className={css({ width: 100, height: 100 })}>Hello World</div>
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
            <div className={css({ width: 400, height: 300 })}></div>
          </Skeleton>
        </Card.Content>
        <Card.Footer>
          <div className={css({ display: 'flex', flexDir: 'row', gap: 4 })}>
            <Skeleton round>
              <div className={css({ width: 20, height: 20, rounded: 'full' })}>
                !
              </div>
            </Skeleton>
            <Skeleton>
              <div className={css({ width: 80, height: 20, rounded: 'full' })}>
                Something Something Something Blar Blar Blar
              </div>
            </Skeleton>
          </div>
        </Card.Footer>
      </Card.Root>
    );
  },
};
