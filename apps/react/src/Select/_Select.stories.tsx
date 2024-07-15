import { css } from '../../styled-system/css';
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
  argTypes: {},
  args: {},
};

const frameworks = ['React', 'Vue', 'Svelte', 'Solid'] as const;
const languages = ['Javascript', 'Typescript'] as const;

export const Default = {
  args: {
    className: css({ width: 400 }),
  },
  render: (props: SelectProps['root']) => {
    return (
      <div
        className={css({ display: 'flex', width: '200px', height: '500px' })}
      >
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
    className: css({ width: 400 }),
  },
  render: (props: SelectProps['root']) => {
    return (
      <div
        className={css({ display: 'flex', width: '200px', height: '500px' })}
      >
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
