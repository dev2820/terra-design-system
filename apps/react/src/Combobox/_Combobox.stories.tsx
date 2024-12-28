import { ChevronsUpDownIcon, XIcon } from 'lucide-react';

import { Input, Portal } from '../index';
import { Combobox, type ComboboxProps } from './index';

/**
 * based on https://ark-ui.com/react/docs/components/combobox
 *
 */
export default {
  title: 'Components/Combobox',
  component: Combobox.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
};

const frameworks = ['React', 'Vue', 'Svelte', 'Solid'] as const;
const languages = ['Javascript', 'Typescript'] as const;

export const Default = {
  args: {
    className: 'trds-w-[600px]',
    items: [...frameworks, ...languages, 'None'],
  },
  render: (props: ComboboxProps['Root']) => {
    return (
      <div className="trds-flex trds-w-[600px] trds-h-[500px]">
        <Combobox.Root
          positioning={{ sameWidth: true }}
          lazyMount
          unmountOnExit
          {...props}
        >
          <Combobox.Control>
            <Combobox.Input placeholder="Select a Framework" asChild>
              <Input />
            </Combobox.Input>
            <Combobox.Trigger asChild>
              <button aria-label="open">
                <ChevronsUpDownIcon size={20} />
              </button>
            </Combobox.Trigger>
          </Combobox.Control>
          <Portal>
            <Combobox.Positioner>
              <Combobox.Content>
                <Combobox.Item item="None">
                  <Combobox.ItemText>None</Combobox.ItemText>
                  <Combobox.ItemIndicator />
                </Combobox.Item>
                <Combobox.ItemGroup>
                  <Combobox.ItemGroupLabel>Framework</Combobox.ItemGroupLabel>
                  <Combobox.Item item="React">
                    <Combobox.ItemText>React</Combobox.ItemText>
                    <Combobox.ItemIndicator />
                  </Combobox.Item>
                  <Combobox.Item item="Vue">
                    <Combobox.ItemText>Vue</Combobox.ItemText>
                    <Combobox.ItemIndicator />
                  </Combobox.Item>
                  <Combobox.Item item="Solid">
                    <Combobox.ItemText>Solid</Combobox.ItemText>
                    <Combobox.ItemIndicator />
                  </Combobox.Item>
                </Combobox.ItemGroup>
                <Combobox.ItemGroup>
                  <Combobox.ItemGroupLabel>Language</Combobox.ItemGroupLabel>
                  <Combobox.Item item="Javascript">
                    <Combobox.ItemText>Javascript</Combobox.ItemText>
                    <Combobox.ItemIndicator />
                  </Combobox.Item>
                  <Combobox.Item item="Typescript">
                    <Combobox.ItemText>Typescript</Combobox.ItemText>
                    <Combobox.ItemIndicator />
                  </Combobox.Item>
                </Combobox.ItemGroup>
              </Combobox.Content>
            </Combobox.Positioner>
          </Portal>
        </Combobox.Root>
      </div>
    );
  },
};

export const MultiCombobox = {
  args: {
    className: 'trds-w-[600px]',
    items: [...frameworks, ...languages, 'None'],
    multiple: true,
  },
  render: (props: ComboboxProps['Root']) => {
    return (
      <div className="trds-flex trds-w-[600px] trds-h-[500px]">
        <Combobox.Root
          positioning={{ sameWidth: true }}
          lazyMount
          unmountOnExit
          {...props}
        >
          <Combobox.Control>
            <Combobox.Input placeholder="Select a Framework" asChild>
              <Input />
            </Combobox.Input>
            <Combobox.Trigger asChild>
              <button aria-label="open">
                <ChevronsUpDownIcon size={20} />
              </button>
            </Combobox.Trigger>
            <Combobox.ClearTrigger asChild>
              <button>
                <XIcon size={20} />
              </button>
            </Combobox.ClearTrigger>
          </Combobox.Control>
          <Portal>
            <Combobox.Positioner>
              <Combobox.Content>
                <Combobox.Item item="None">
                  <Combobox.ItemText>None</Combobox.ItemText>
                  <Combobox.ItemIndicator />
                </Combobox.Item>
                <Combobox.ItemGroup>
                  <Combobox.ItemGroupLabel>Framework</Combobox.ItemGroupLabel>
                  <Combobox.Item item="React">
                    <Combobox.ItemText>React</Combobox.ItemText>
                    <Combobox.ItemIndicator />
                  </Combobox.Item>
                  <Combobox.Item item="Vue">
                    <Combobox.ItemText>Vue</Combobox.ItemText>
                    <Combobox.ItemIndicator />
                  </Combobox.Item>
                  <Combobox.Item item="Solid">
                    <Combobox.ItemText>Solid</Combobox.ItemText>
                    <Combobox.ItemIndicator />
                  </Combobox.Item>
                </Combobox.ItemGroup>
                <Combobox.ItemGroup>
                  <Combobox.ItemGroupLabel>Language</Combobox.ItemGroupLabel>
                  <Combobox.Item item="Javascript">
                    <Combobox.ItemText>Javascript</Combobox.ItemText>
                    <Combobox.ItemIndicator />
                  </Combobox.Item>
                  <Combobox.Item item="Typescript">
                    <Combobox.ItemText>Typescript</Combobox.ItemText>
                    <Combobox.ItemIndicator />
                  </Combobox.Item>
                </Combobox.ItemGroup>
              </Combobox.Content>
            </Combobox.Positioner>
          </Portal>
        </Combobox.Root>
      </div>
    );
  },
};
