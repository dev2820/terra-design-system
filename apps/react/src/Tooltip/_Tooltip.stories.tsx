import { InfoIcon } from 'lucide-react';

import { Portal } from '../index';
import { Tooltip, type TooltipProps } from './index';

export default {
  title: 'Components/Tooltip',
  component: Tooltip.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
};

export const Default = {
  args: {},
  render: (props: TooltipProps['Root']) => {
    return (
      <Tooltip.Root {...props}>
        <Tooltip.Trigger className="trds-inline-flex trds-items-center trds-gap-1">
          <InfoIcon size={16} /> Hover me
        </Tooltip.Trigger>
        <Tooltip.Positioner>
          <Tooltip.Content>I am a Tooltip</Tooltip.Content>
        </Tooltip.Positioner>
      </Tooltip.Root>
    );
  },
};

export const WithArrow = {
  args: {},
  render: (props: TooltipProps['Root']) => {
    return (
      <Tooltip.Root {...props}>
        <Tooltip.Trigger className="trds-inline-flex trds-items-center trds-gap-1">
          <InfoIcon size={16} /> Hover me
        </Tooltip.Trigger>
        <Tooltip.Positioner>
          <Tooltip.Content>
            <Tooltip.Arrow>
              <Tooltip.ArrowTip />
            </Tooltip.Arrow>
            I am a Tooltip
          </Tooltip.Content>
        </Tooltip.Positioner>
      </Tooltip.Root>
    );
  },
};

export const WithPortal = {
  args: {},
  render: (props: TooltipProps['Root']) => {
    return (
      <Tooltip.Root {...props}>
        <Tooltip.Trigger className="trds-inline-flex trds-items-center trds-gap-1">
          <InfoIcon size={16} /> Hover me
        </Tooltip.Trigger>
        <Portal>
          <Tooltip.Positioner>
            <Tooltip.Content>I am a Tooltip</Tooltip.Content>
          </Tooltip.Positioner>
        </Portal>
      </Tooltip.Root>
    );
  },
};
export const Theme = {
  args: {},
  render: () => {
    return (
      <div>
        <Tooltip.Root theme="neutral">
          <Tooltip.Trigger className="trds-inline-flex trds-items-center trds-gap-1 trds-mr-4">
            <InfoIcon size={16} /> Neutral (Default)
          </Tooltip.Trigger>
          <Tooltip.Positioner>
            <Tooltip.Content>I am a Tooltip</Tooltip.Content>
          </Tooltip.Positioner>
        </Tooltip.Root>
        <Tooltip.Root theme="primary">
          <Tooltip.Trigger className="trds-inline-flex trds-items-center trds-gap-1 trds-mr-4">
            <InfoIcon size={16} /> Primary
          </Tooltip.Trigger>
          <Tooltip.Positioner>
            <Tooltip.Content>I am a Tooltip</Tooltip.Content>
          </Tooltip.Positioner>
        </Tooltip.Root>
      </div>
    );
  },
};
