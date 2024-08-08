import { css } from '../../styled-system/css';
import { SegmentGroup, type SegmentGroupProps } from './index';

const sizes = ['sm', 'md', 'lg'] as SegmentGroupProps['Root']['size'][];

export default {
  title: 'Components/SegmentGroup',
  component: SegmentGroup.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      options: sizes,
      control: { type: 'select' },
    },
  },
  args: {
    size: sizes[1],
  },
};

export const Default = {
  args: {
    defaultValue: 'react',
  },
  render: (props: SegmentGroupProps) => {
    return (
      <SegmentGroup.Root {...props}>
        <SegmentGroup.Item value="react">React</SegmentGroup.Item>
        <SegmentGroup.Item value="vue">Vue</SegmentGroup.Item>
        <SegmentGroup.Item value="svelte">Svelte</SegmentGroup.Item>
        <SegmentGroup.Item value="solid">Solid</SegmentGroup.Item>
        <SegmentGroup.Indicator />
      </SegmentGroup.Root>
    );
  },
};

export const Horizontal = {
  args: {
    defaultValue: 'react',
    orientation: 'horizontal',
  },
  render: (props: SegmentGroupProps) => {
    return (
      <SegmentGroup.Root {...props}>
        <SegmentGroup.Item value="react">React</SegmentGroup.Item>
        <SegmentGroup.Item value="vue">Vue</SegmentGroup.Item>
        <SegmentGroup.Item value="svelte">Svelte</SegmentGroup.Item>
        <SegmentGroup.Item value="solid">Solid</SegmentGroup.Item>
        <SegmentGroup.Indicator />
      </SegmentGroup.Root>
    );
  },
};

export const Sizes = {
  args: {},
  render: () => {
    return (
      <>
        <div
          className={css({
            width: 400,
            display: 'flex',
            flexDir: 'column',
            gap: 4,
          })}
        >
          <SegmentGroup.Root size="sm" defaultValue="item 1">
            <SegmentGroup.Item value="item 1">item 1</SegmentGroup.Item>
            <SegmentGroup.Item value="item 2">item 2</SegmentGroup.Item>
            <SegmentGroup.Indicator />
          </SegmentGroup.Root>
          <hr />
          <SegmentGroup.Root size="md" defaultValue="item 1">
            <SegmentGroup.Item value="item 1">item 1</SegmentGroup.Item>
            <SegmentGroup.Item value="item 2">item 2</SegmentGroup.Item>
            <SegmentGroup.Indicator />
          </SegmentGroup.Root>
        </div>
      </>
    );
  },
};

export const Disabled = {
  args: {},
  render: () => {
    return (
      <>
        <div
          className={css({
            width: 400,
            display: 'flex',
            flexDir: 'column',
            gap: 4,
          })}
        >
          <SegmentGroup.Root defaultValue="item 1" disabled>
            <SegmentGroup.Item value="item 1">item 1</SegmentGroup.Item>
            <SegmentGroup.Item value="item 2">item 2</SegmentGroup.Item>
            <SegmentGroup.Indicator />
          </SegmentGroup.Root>
          <hr />
          <SegmentGroup.Root size="md" defaultValue="item 1">
            <SegmentGroup.Item value="item 1" disabled>
              item 1
            </SegmentGroup.Item>
            <SegmentGroup.Item value="item 2">item 2</SegmentGroup.Item>
            <SegmentGroup.Indicator />
          </SegmentGroup.Root>
        </div>
      </>
    );
  },
};
