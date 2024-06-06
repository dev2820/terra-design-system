import { Button, ButtonProps } from './Button';

export default {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export const Default = {
  args: {
    children: 'Hello 🐼!',
  },
  render: (props: ButtonProps) => {
    return <Button {...props} />;
  },
};
