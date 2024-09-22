import { ChevronDownIcon } from 'lucide-react';

import { Collapsible, type CollapsibleProps } from './index';

/**
 * based on https://ark-ui.com/react/docs/components/collapsible
 */
export default {
  title: 'Components/Collapsible',
  component: Collapsible.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
};

export const Default = {
  args: {},
  render: (props: CollapsibleProps['root']) => {
    return (
      <div className="w-[600px] h-[500px]">
        <Collapsible.Root {...props}>
          <Collapsible.Trigger className="flex items-center">
            <span>Loream Ipsume</span>
            <div className="flex-1"></div>
            <ChevronDownIcon size={24} />
          </Collapsible.Trigger>
          <Collapsible.Content>
            <div className="p-4">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </div>
          </Collapsible.Content>
        </Collapsible.Root>
      </div>
    );
  },
};

export const Disabled = {
  args: {
    disabled: true,
  },
  render: (props: CollapsibleProps['root']) => {
    return (
      <div className="w-[600px] h-[500px]">
        <Collapsible.Root {...props}>
          <Collapsible.Trigger className="flex items-center">
            <span>Loream Ipsume</span>
            <div className="flex-1"></div>
            <ChevronDownIcon size={24} />
          </Collapsible.Trigger>
          <Collapsible.Content>
            <div className="p-4">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </div>
          </Collapsible.Content>
        </Collapsible.Root>
      </div>
    );
  },
};
