import { Switch, SwitchProps } from './index';

const sizes = ['sm', 'md', 'lg'] as SwitchProps['size'][];

export default {
  title: 'Components/Switch',
  component: Switch,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      options: sizes,
      control: { type: 'select' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    invalid: {
      control: { type: 'boolean' },
    },
  },
  args: {
    size: sizes[1],
    disabled: false,
    invalid: false,
  },
};

export const Default = {
  args: {},
  render: (props: SwitchProps) => {
    return <Switch {...props}></Switch>;
  },
};

export const Sizes = {
  args: {},
  render: () => {
    return (
      <div className="flex flex-col items-center gap-4 w-36 h-48">
        <Switch size="sm" />
        <Switch size="md" />
        <Switch size="lg" />
      </div>
    );
  },
};

export const Disabled = {
  args: {},
  render: () => {
    return <Switch disabled />;
  },
};

export const Invalid = {
  args: {},
  render: () => {
    return <Switch invalid />;
  },
};
