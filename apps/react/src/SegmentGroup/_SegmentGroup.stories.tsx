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
        <SegmentGroup.Item value="react">
          <SegmentGroup.ItemControl></SegmentGroup.ItemControl>
          <SegmentGroup.ItemText>react</SegmentGroup.ItemText>
          <SegmentGroup.ItemHiddenInput />
        </SegmentGroup.Item>
        <SegmentGroup.Item value="vue">
          <SegmentGroup.ItemControl></SegmentGroup.ItemControl>
          <SegmentGroup.ItemText>vue</SegmentGroup.ItemText>
          <SegmentGroup.ItemHiddenInput />
        </SegmentGroup.Item>
        <SegmentGroup.Item value="svelte">
          <SegmentGroup.ItemControl></SegmentGroup.ItemControl>
          <SegmentGroup.ItemText>svelte</SegmentGroup.ItemText>
          <SegmentGroup.ItemHiddenInput />
        </SegmentGroup.Item>
        <SegmentGroup.Item value="solid">
          <SegmentGroup.ItemControl></SegmentGroup.ItemControl>
          <SegmentGroup.ItemText>solid</SegmentGroup.ItemText>
          <SegmentGroup.ItemHiddenInput />
        </SegmentGroup.Item>
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
        <SegmentGroup.Item value="react">
          <SegmentGroup.ItemControl></SegmentGroup.ItemControl>
          <SegmentGroup.ItemText>react</SegmentGroup.ItemText>
          <SegmentGroup.ItemHiddenInput />
        </SegmentGroup.Item>
        <SegmentGroup.Item value="vue">
          <SegmentGroup.ItemControl></SegmentGroup.ItemControl>
          <SegmentGroup.ItemText>vue</SegmentGroup.ItemText>
          <SegmentGroup.ItemHiddenInput />
        </SegmentGroup.Item>
        <SegmentGroup.Item value="svelte">
          <SegmentGroup.ItemControl></SegmentGroup.ItemControl>
          <SegmentGroup.ItemText>svelte</SegmentGroup.ItemText>
          <SegmentGroup.ItemHiddenInput />
        </SegmentGroup.Item>
        <SegmentGroup.Item value="solid">
          <SegmentGroup.ItemControl></SegmentGroup.ItemControl>
          <SegmentGroup.ItemText>solid</SegmentGroup.ItemText>
          <SegmentGroup.ItemHiddenInput />
        </SegmentGroup.Item>
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
        <div className="trds-w-72 trds-flex trds-flex-col trds-gap-4">
          <SegmentGroup.Root size="sm" defaultValue="item1">
            <SegmentGroup.Item value="item1">
              <SegmentGroup.ItemControl />
              <SegmentGroup.ItemText>item1</SegmentGroup.ItemText>
              <SegmentGroup.ItemHiddenInput />
            </SegmentGroup.Item>
            <SegmentGroup.Item value="item2">
              <SegmentGroup.ItemControl />
              <SegmentGroup.ItemText>item2</SegmentGroup.ItemText>
              <SegmentGroup.ItemHiddenInput />
            </SegmentGroup.Item>
            <SegmentGroup.Indicator />
          </SegmentGroup.Root>
          <hr />
          <SegmentGroup.Root size="md" defaultValue="item1">
            <SegmentGroup.Item value="item1">
              <SegmentGroup.ItemControl />
              <SegmentGroup.ItemText>item1</SegmentGroup.ItemText>
              <SegmentGroup.ItemHiddenInput />
            </SegmentGroup.Item>
            <SegmentGroup.Item value="item2">
              <SegmentGroup.ItemControl />
              <SegmentGroup.ItemText>item2</SegmentGroup.ItemText>
              <SegmentGroup.ItemHiddenInput />
            </SegmentGroup.Item>
            <SegmentGroup.Indicator />
          </SegmentGroup.Root>
          <hr />
          <SegmentGroup.Root size="lg" defaultValue="item1">
            <SegmentGroup.Item value="item1">
              <SegmentGroup.ItemControl />
              <SegmentGroup.ItemText>item1</SegmentGroup.ItemText>
              <SegmentGroup.ItemHiddenInput />
            </SegmentGroup.Item>
            <SegmentGroup.Item value="item2">
              <SegmentGroup.ItemControl />
              <SegmentGroup.ItemText>item2</SegmentGroup.ItemText>
              <SegmentGroup.ItemHiddenInput />
            </SegmentGroup.Item>
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
        <div className="trds-w-72 trds-flex trds-flex-col trds-gap-4">
          <SegmentGroup.Root defaultValue="item1" disabled>
            <SegmentGroup.Item value="item1">
              <SegmentGroup.ItemControl />
              <SegmentGroup.ItemText>item1</SegmentGroup.ItemText>
              <SegmentGroup.ItemHiddenInput />
            </SegmentGroup.Item>
            <SegmentGroup.Item value="item2">
              <SegmentGroup.ItemControl />
              <SegmentGroup.ItemText>item2</SegmentGroup.ItemText>
              <SegmentGroup.ItemHiddenInput />
            </SegmentGroup.Item>
            <SegmentGroup.Indicator />
          </SegmentGroup.Root>
          <hr />
          <SegmentGroup.Root size="md" defaultValue="item 1">
            <SegmentGroup.Item value="item1" disabled>
              <SegmentGroup.ItemControl />
              <SegmentGroup.ItemText>item1</SegmentGroup.ItemText>
              <SegmentGroup.ItemHiddenInput />
            </SegmentGroup.Item>
            <SegmentGroup.Item value="item2">
              <SegmentGroup.ItemControl />
              <SegmentGroup.ItemText>item2</SegmentGroup.ItemText>
              <SegmentGroup.ItemHiddenInput />
            </SegmentGroup.Item>
            <SegmentGroup.Indicator />
          </SegmentGroup.Root>
        </div>
      </>
    );
  },
};
