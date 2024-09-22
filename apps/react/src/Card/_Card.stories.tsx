import { Avatar, Button, Input } from '../index';
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
          <Card.Description>Welcome! Begin your journey here.</Card.Description>
        </Card.Header>
        <Card.Content className="flex flex-col">
          <Input type="text" placeholder="your email" className="mb-2" />
          <Input type="password" placeholder="your password" />
        </Card.Content>
        <Card.Footer className="flex flex-row gap-4">
          <Button className="flex-1">Sign in</Button>
          <Button theme="primary" className="flex-1">
            🚀 Sign up
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
      <div className="flex flex-row gap-4">
        {variants.map(variant => (
          <Card.Root variant={variant} key={variant} {...props}>
            <Card.Header>
              <Avatar src="https://i.pravatar.cc/500" size="lg" />
            </Card.Header>
            <Card.Content className="text-neutral-500">
              An adventurer at heart and a visionary by nature, Alex has
              journeyed through the unknown, bringing light to the darkest
              corners of the world.
            </Card.Content>
            <Card.Footer>
              <span className="text-md font-bold text-neutral-400">
                - Meet Alex Winters
              </span>
            </Card.Footer>
          </Card.Root>
        ))}
      </div>
    );
  },
};
