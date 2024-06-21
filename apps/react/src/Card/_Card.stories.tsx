import { Avatar, Button } from '../../dist/index';
import { css, cx } from '../../styled-system/css';
import { flex } from '../../styled-system/patterns';
import { Card, type CardProps } from './index';

const variants = [
  'elevated',
  'outline',
  'filled',
] as CardProps['Root']['variant'][];

export default {
  title: 'Components/Card',
  component: Card.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      options: variants,
      control: { type: 'select' },
    },
  },
  args: {},
};
/**
 * TODO: 추후 Input component로 교체 필요
 */
export const Default = {
  args: {},
  render: (props: CardProps) => {
    return (
      <Card.Root {...props}>
        <Card.Header>
          <Card.Title>Sign in</Card.Title>
          <Card.Description>
            Welcome! Begin your journey here. Please sign in.
          </Card.Description>
        </Card.Header>
        <Card.Content className={css({ display: 'flex', flexDir: 'column' })}>
          <input type="text" placeholder="your email" />
          <input type="password" placeholder="your password" />
        </Card.Content>
        <Card.Footer>
          <Button
            variant="filled"
            theme="primary"
            className={css({ w: 'full' })}
          >
            🚀 Sign in
          </Button>
        </Card.Footer>
      </Card.Root>
    );
  },
};

export const Variant = {
  args: {},
  render: (props: CardProps) => {
    return (
      <div className={cx(flex({ direction: 'row', gap: 4 }))}>
        {variants.map(variant => (
          <Card.Root variant={variant} key={variant} {...props}>
            <Card.Header>
              <Avatar src="https://i.pravatar.cc/500" size="lg" />
            </Card.Header>
            <Card.Content>
              An adventurer at heart and a visionary by nature, Alex has
              journeyed through the unknown, bringing light to the darkest
              corners of the world.
            </Card.Content>
            <Card.Footer>
              <span className={css({ fontSize: 'md', fontWeight: 'bold' })}>
                - Meet Alex Winters
              </span>
            </Card.Footer>
          </Card.Root>
        ))}
      </div>
    );
  },
};
