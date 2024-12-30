import { Switch, SwitchProps } from './index';

const sizes = ['sm', 'md', 'lg'] as SwitchProps['Root']['size'][];

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
  render: (props: SwitchProps['Root']) => {
    return (
      <Switch.Root {...props}>
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
        <Switch.Label>Switch</Switch.Label>
        <Switch.HiddenInput />
      </Switch.Root>
    );
  },
};

export const Sizes = {
  args: {},
  render: (props: SwitchProps['Root']) => {
    return (
      <div className="trds-flex trds-flex-col trds-items-center trds-gap-4 trds-w-36 trds-h-48">
        <Switch.Root {...props} size="sm">
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Switch.HiddenInput />
        </Switch.Root>
        <Switch.Root {...props} size="md">
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Switch.HiddenInput />
        </Switch.Root>
        <Switch.Root {...props} size="lg">
          <Switch.Control>
            <Switch.Thumb />
          </Switch.Control>
          <Switch.HiddenInput />
        </Switch.Root>
      </div>
    );
  },
};

export const Disabled = {
  args: {
    disabled: true,
  },
  render: (props: SwitchProps['Root']) => {
    return (
      <Switch.Root {...props} size="lg">
        <Switch.Control>
          <Switch.Thumb />
        </Switch.Control>
        <Switch.HiddenInput />
      </Switch.Root>
    );
  },
};
