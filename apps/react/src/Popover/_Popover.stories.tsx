import { XIcon } from 'lucide-react';

import { Button } from '../Button';
import { IconButton } from '../IconButton';
import { Portal } from '../index';
import { Popover, type PopoverProps } from './index';

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
  render: (props: PopoverProps['Root']) => {
    return (
      <div className="trds-w-[600px] trds-h-[500px]">
        <Popover.Root {...props}>
          <Popover.Trigger asChild>
            <Button>Open Popover</Button>
          </Popover.Trigger>
          <Popover.Positioner>
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
          </Popover.Positioner>
        </Popover.Root>
      </div>
    );
  },
};

export const Portalled = {
  args: {
    portalled: true,
  },
  render: (props: PopoverProps['Root']) => {
    return (
      <div className="trds-w-[600px] trds-h-[500px]">
        <Popover.Root {...props}>
          <Popover.Trigger asChild>
            <Button>Open Popover</Button>
          </Popover.Trigger>
          <Portal>
            <Popover.Positioner>
              <Popover.Content>
                <Popover.Title>Lorem Ipsum</Popover.Title>
                <Popover.Description>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </Popover.Description>
                <Popover.CloseTrigger asChild>
                  <IconButton variant="ghost" size="sm">
                    <XIcon size={16} />
                  </IconButton>
                </Popover.CloseTrigger>
              </Popover.Content>
            </Popover.Positioner>
          </Portal>
        </Popover.Root>
      </div>
    );
  },
};

export const WithArrow = {
  args: {},
  render: (props: PopoverProps['Root']) => {
    return (
      <div className="trds-w-[600px] trds-h-[500px]">
        <Popover.Root {...props}>
          <Popover.Trigger asChild>
            <Button>Open Popover</Button>
          </Popover.Trigger>
          <Popover.Positioner>
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
          </Popover.Positioner>
        </Popover.Root>
      </div>
    );
  },
};
