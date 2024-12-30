import { ChevronDownIcon } from 'lucide-react';

import { Portal } from '../index';
import { Select, type SelectProps } from './index';

/**
 * based on https://ark-ui.com/react/docs/components/select
 *
 */
export default {
  title: 'Components/Select',
  component: Select.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    disabled: {
      control: { type: 'boolean' },
    },
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'select' },
    },
  },
  args: {
    disabled: false,
    size: 'md',
  },
};

const frameworks = ['React', 'Vue', 'Svelte', 'Solid'] as const;

export const Default = {
  args: {
    className: 'trds-w-96',
    items: frameworks,
  },
  render: (props: SelectProps['Root']) => {
    return (
      <div className="trds-flex trds-w-48 trds-h-24">
        <Select.Root {...props}>
          <Select.Label>Framework</Select.Label>
          <Select.Control className="trds-w-48">
            <Select.Trigger>
              <Select.ValueText placeholder="Select a Framework" />
              <Select.Indicator>
                <ChevronDownIcon />
              </Select.Indicator>
            </Select.Trigger>
          </Select.Control>
          <Portal>
            <Select.Positioner>
              <Select.Content>
                <Select.ItemGroup>
                  <Select.ItemGroupLabel>Frameworks</Select.ItemGroupLabel>
                  {frameworks.map(item => (
                    <Select.Item key={item} item={item}>
                      <Select.ItemText>{item}</Select.ItemText>
                      <Select.ItemIndicator>✓</Select.ItemIndicator>
                    </Select.Item>
                  ))}
                </Select.ItemGroup>
              </Select.Content>
            </Select.Positioner>
          </Portal>
          <Select.HiddenSelect />
        </Select.Root>
      </div>
    );
  },
};

export const MultiSelect = {
  args: {
    className: 'trds-w-96',
    multiple: true,
    items: frameworks,
  },
  render: (props: SelectProps['Root']) => {
    return (
      <div className="trds-flex trds-w-48 trds-h-96">
        <Select.Root {...props}>
          <Select.Label>Framework</Select.Label>
          <Select.Control className="trds-w-48">
            <Select.Trigger>
              <Select.ValueText placeholder="Select a Framework" />
              <Select.Indicator>
                <ChevronDownIcon />
              </Select.Indicator>
            </Select.Trigger>
          </Select.Control>
          <Portal>
            <Select.Positioner>
              <Select.Content>
                <Select.ItemGroup>
                  <Select.ItemGroupLabel>Frameworks</Select.ItemGroupLabel>
                  {frameworks.map(item => (
                    <Select.Item key={item} item={item}>
                      <Select.ItemText>{item}</Select.ItemText>
                      <Select.ItemIndicator>✓</Select.ItemIndicator>
                    </Select.Item>
                  ))}
                </Select.ItemGroup>
              </Select.Content>
            </Select.Positioner>
          </Portal>
          <Select.HiddenSelect />
        </Select.Root>
      </div>
    );
  },
};
