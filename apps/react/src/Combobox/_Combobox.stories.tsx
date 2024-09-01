import { Combobox, type ComboboxProps } from './index';

/**
 * based on https://ark-ui.com/react/docs/components/combobox
 *
 */
export default {
  title: 'Components/Combobox',
  component: Combobox.Root,
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
    className: 'trds-w-[600px]',
  },
  render: (props: ComboboxProps['root']) => {
    return (
      <div className="trds-flex trds-w-[600px] trds-h-[500px]">
        <Combobox.Root
          {...props}
          items={[...frameworks, ...languages, 'None']}
          placeholder="Combobox one"
        >
          <Combobox.Item item="None">None</Combobox.Item>
          <Combobox.ItemGroup label="frameworks">
            {frameworks.map(fw => (
              <Combobox.Item item={fw} key={fw}>
                {fw}
              </Combobox.Item>
            ))}
          </Combobox.ItemGroup>
          <Combobox.ItemGroup label="language">
            {languages.map(lang => (
              <Combobox.Item item={lang} key={lang}>
                {lang}
              </Combobox.Item>
            ))}
          </Combobox.ItemGroup>
        </Combobox.Root>
      </div>
    );
  },
};

export const MultiCombobox = {
  args: {
    className: 'trds-w-[600px]',
  },
  render: (props: ComboboxProps['root']) => {
    return (
      <div className="trds-flex trds-w-[600px] trds-h-[500px]">
        <Combobox.Root
          {...props}
          items={[...frameworks, ...languages, 'None']}
          placeholder="Combobox one"
          multiple
        >
          <Combobox.Item item="None">None</Combobox.Item>
          <Combobox.ItemGroup label="frameworks">
            {frameworks.map(fw => (
              <Combobox.Item item={fw} key={fw}>
                {fw}
              </Combobox.Item>
            ))}
          </Combobox.ItemGroup>
          <Combobox.ItemGroup label="language">
            {languages.map(lang => (
              <Combobox.Item item={lang} key={lang}>
                {lang}
              </Combobox.Item>
            ))}
          </Combobox.ItemGroup>
        </Combobox.Root>
      </div>
    );
  },
};
