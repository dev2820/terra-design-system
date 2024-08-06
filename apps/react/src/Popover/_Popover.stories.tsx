import { ChevronDownIcon, XIcon } from 'lucide-react';

import { css } from '../../styled-system/css';
import { flex, spacer } from '../../styled-system/patterns';
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
      <div className={css({ width: '600px', height: '500px' })}>
        <Popover.Root {...props}>
          <Popover.Trigger asChild>
            <Button>Open Popover</Button>
          </Popover.Trigger>
          <Popover.Content className={css({ position: 'relative' })}>
            <Popover.Title className={css({ mb: 4 })}>
              Lorem Ipsum
            </Popover.Title>
            <Popover.Description>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </Popover.Description>
            <Popover.CloseTrigger
              className={css({ position: 'absolute', right: 2, top: 2 })}
              asChild
            >
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
      <div className={css({ width: '600px', height: '500px' })}>
        <Popover.Root {...props}>
          <Popover.Trigger asChild>
            <Button>Open Popover</Button>
          </Popover.Trigger>
          <Popover.Content className={css({ position: 'relative' })}>
            <Popover.Title className={css({ mb: 4 })}>
              Lorem Ipsum
            </Popover.Title>
            <Popover.Description>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </Popover.Description>
            <Popover.CloseTrigger
              className={css({ position: 'absolute', right: 2, top: 2 })}
              asChild
            >
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
      <div className={css({ width: '600px', height: '500px' })}>
        <Popover.Root {...props}>
          <Popover.Trigger asChild>
            <Button>Open Popover</Button>
          </Popover.Trigger>
          <Popover.Content className={css({ position: 'relative' })}>
            <Popover.Arrow />
            <Popover.Title className={css({ mb: 4 })}>
              Lorem Ipsum
            </Popover.Title>
            <Popover.Description>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry.
            </Popover.Description>
            <Popover.CloseTrigger
              className={css({ position: 'absolute', right: 2, top: 2 })}
              asChild
            >
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
