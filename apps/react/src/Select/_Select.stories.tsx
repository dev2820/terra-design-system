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
const languages = ['Javascript', 'Typescript'] as const;

export const Default = {
  args: {
    className: 'trds-w-96',
  },
  render: (props: SelectProps['root']) => {
    return (
      <div className="trds-flex trds-w-48 trds-h-24">
        <Select.Root
          {...props}
          items={[...frameworks, ...languages, 'None']}
          placeholder="Select one"
        >
          <Select.Item item="None">None</Select.Item>
          <Select.ItemGroup label="frameworks">
            {frameworks.map(fw => (
              <Select.Item item={fw} key={fw}>
                {fw}
              </Select.Item>
            ))}
          </Select.ItemGroup>
          <Select.ItemGroup label="language">
            {languages.map(lang => (
              <Select.Item item={lang} key={lang}>
                {lang}
              </Select.Item>
            ))}
          </Select.ItemGroup>
        </Select.Root>
      </div>
    );
  },
};

export const MultiSelect = {
  args: {
    className: 'trds-w-96',
  },
  render: (props: SelectProps['root']) => {
    return (
      <div className="trds-flex trds-w-48 trds-h-96">
        <Select.Root
          {...props}
          items={[...frameworks, ...languages, 'None']}
          placeholder="Select one"
          multiple
        >
          <Select.Item item="None">None</Select.Item>
          <Select.ItemGroup label="frameworks">
            {frameworks.map(fw => (
              <Select.Item item={fw} key={fw}>
                {fw}
              </Select.Item>
            ))}
          </Select.ItemGroup>
          <Select.ItemGroup label="language">
            {languages.map(lang => (
              <Select.Item item={lang} key={lang}>
                {lang}
              </Select.Item>
            ))}
          </Select.ItemGroup>
        </Select.Root>
      </div>
    );
  },
};
