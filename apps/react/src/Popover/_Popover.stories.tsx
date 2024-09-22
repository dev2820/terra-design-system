import { XIcon } from 'lucide-react';

import { Button } from '../Button';
import { IconButton } from '../IconButton';
import { Popover, type PopoverProps } from './index';

/**
 * based on https://ark-ui.com/react/docs/components/popover
 */
export default {
  title: 'Components/Popover',
  component: Popover.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
};

export const Default = {
  args: {},
  render: (props: PopoverProps['root']) => {
    return (
      <div className="w-[600px] h-[500px]">
        <Popover.Root {...props}>
          <Popover.Trigger asChild>
            <Button>Open Popover</Button>
          </Popover.Trigger>
          <Popover.Content>
            <Popover.Title>Lorem Ipsum</Popover.Title>
            <Popover.Description>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </Popover.Description>
            <Popover.CloseTrigger asChild>
              <IconButton variant="ghost" size="sm">
                <XIcon size={16} />
              </IconButton>
            </Popover.CloseTrigger>
          </Popover.Content>
        </Popover.Root>
      </div>
    );
  },
};

export const Portalled = {
  args: {
    portalled: true,
  },
  render: (props: PopoverProps['root']) => {
    return (
      <div className="w-[600px] h-[500px]">
        <Popover.Root {...props}>
          <Popover.Trigger asChild>
            <Button>Open Popover</Button>
          </Popover.Trigger>
          <Popover.Content>
            <Popover.Title>Lorem Ipsum</Popover.Title>
            <Popover.Description>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </Popover.Description>
            <Popover.CloseTrigger asChild>
              <IconButton variant="ghost" size="sm">
                <XIcon size={16} />
              </IconButton>
            </Popover.CloseTrigger>
          </Popover.Content>
        </Popover.Root>
      </div>
    );
  },
};

export const WithArrow = {
  args: {},
  render: (props: PopoverProps['root']) => {
    return (
      <div className="w-[600px] h-[500px]">
        <Popover.Root {...props}>
          <Popover.Trigger asChild>
            <Button>Open Popover</Button>
          </Popover.Trigger>
          <Popover.Content>
            <Popover.Arrow />
            <Popover.Title>Lorem Ipsum</Popover.Title>
            <Popover.Description>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </Popover.Description>
            <Popover.CloseTrigger asChild>
              <IconButton variant="ghost" size="sm">
                <XIcon size={16} />
              </IconButton>
            </Popover.CloseTrigger>
          </Popover.Content>
        </Popover.Root>
      </div>
    );
  },
};
