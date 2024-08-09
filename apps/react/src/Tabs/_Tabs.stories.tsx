import { css } from '../../styled-system/css';
import { Tabs, type TabsProps } from './index';

export default {
  title: 'Components/Tabs',
  component: Tabs.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'select' },
    },
    variant: {
      options: ['enclosed', 'line', 'outline'],
      control: { type: 'select' },
    },
  },
  args: {
    size: 'md',
    variant: 'line',
  },
};

export const Default = {
  args: {
    defaultValue: 'react',
  },
  render: (props: TabsProps['root']) => {
    return (
      <Tabs.Root {...props}>
        <Tabs.List>
          <Tabs.Trigger value="react">React</Tabs.Trigger>
          <Tabs.Trigger value="vue">Vue</Tabs.Trigger>
          <Tabs.Trigger value="svelte">Svelte</Tabs.Trigger>
          <Tabs.Trigger value="solid">Solid</Tabs.Trigger>
          <Tabs.Indicator />
        </Tabs.List>
        <Tabs.Content value="react">React is awesome</Tabs.Content>
        <Tabs.Content value="vue">Vue is awesome</Tabs.Content>
        <Tabs.Content value="svelte">Svelte is awesome</Tabs.Content>
        <Tabs.Content value="solid">Solid is awesome</Tabs.Content>
      </Tabs.Root>
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
          <Tabs.Root size="sm">
            <Tabs.List>
              <Tabs.Trigger value="react">React</Tabs.Trigger>
              <Tabs.Trigger value="vue">Vue</Tabs.Trigger>
              <Tabs.Indicator />
            </Tabs.List>
            <Tabs.Content value="react">React is awesome</Tabs.Content>
            <Tabs.Content value="vue">Vue is awesome</Tabs.Content>
          </Tabs.Root>
          <Tabs.Root size="md">
            <Tabs.List>
              <Tabs.Trigger value="react">React</Tabs.Trigger>
              <Tabs.Trigger value="vue">Vue</Tabs.Trigger>
              <Tabs.Indicator />
            </Tabs.List>
            <Tabs.Content value="react">React is awesome</Tabs.Content>
            <Tabs.Content value="vue">Vue is awesome</Tabs.Content>
          </Tabs.Root>
          <Tabs.Root size="lg">
            <Tabs.List>
              <Tabs.Trigger value="react">React</Tabs.Trigger>
              <Tabs.Trigger value="vue">Vue</Tabs.Trigger>
              <Tabs.Indicator />
            </Tabs.List>
            <Tabs.Content value="react">React is awesome</Tabs.Content>
            <Tabs.Content value="vue">Vue is awesome</Tabs.Content>
          </Tabs.Root>
        </div>
      </>
    );
  },
};

export const Variants = {
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
          <Tabs.Root variant="enclosed" defaultValue="react">
            <Tabs.List>
              <Tabs.Trigger value="react">React</Tabs.Trigger>
              <Tabs.Trigger value="vue">Vue</Tabs.Trigger>
              <Tabs.Indicator />
            </Tabs.List>
            <Tabs.Content value="react">React is awesome</Tabs.Content>
            <Tabs.Content value="vue">Vue is awesome</Tabs.Content>
          </Tabs.Root>
          <Tabs.Root variant="line" defaultValue="react">
            <Tabs.List>
              <Tabs.Trigger value="react">React</Tabs.Trigger>
              <Tabs.Trigger value="vue">Vue</Tabs.Trigger>
              <Tabs.Indicator />
            </Tabs.List>
            <Tabs.Content value="react">React is awesome</Tabs.Content>
            <Tabs.Content value="vue">Vue is awesome</Tabs.Content>
          </Tabs.Root>
          <Tabs.Root variant="outline" defaultValue="react">
            <Tabs.List>
              <Tabs.Trigger value="react">React</Tabs.Trigger>
              <Tabs.Trigger value="vue">Vue</Tabs.Trigger>
              <Tabs.Indicator />
            </Tabs.List>
            <Tabs.Content value="react">React is awesome</Tabs.Content>
            <Tabs.Content value="vue">Vue is awesome</Tabs.Content>
          </Tabs.Root>
        </div>
      </>
    );
  },
};
