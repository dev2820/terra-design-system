import { cx } from '../../styled-system/css';
import { flex } from '../../styled-system/patterns';
import { Checkbox, type CheckboxProps } from './index';

/**
 * based on https://ark-ui.com/react/docs/components/checkbox
 */
export default {
  title: 'Components/Checkbox',
  component: Checkbox,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    defaultCheck: {
      options: [true, false, 'indeterminate'],
      control: { type: 'select' },
    },
    checked: {
      options: [true, false, 'indeterminate'],
      control: { type: 'select' },
    },
    disabled: {
      control: { type: 'boolean' },
    },
    readonly: {
      control: { type: 'boolean' },
    },
    invalid: {
      control: { type: 'boolean' },
    },
    size: {
      options: ['sm', 'md', 'lg'],
      control: { type: 'select' },
    },
  },
  args: {
    defaultCheck: false,
    options: false,
    disabled: false,
    readonly: false,
    invalid: false,
    size: 'md',
  },
};

export const Default = {
  args: {
    value: 'on',
  },
  render: (props: CheckboxProps) => {
    return <Checkbox {...props}>Hello</Checkbox>;
  },
};

export const Disabled = {
  args: {
    value: 'on',
  },
  render: (props: CheckboxProps) => {
    return (
      <div className={cx(flex({ direction: 'column', gap: 4 }))}>
        <Checkbox {...props} checked disabled>
          Hello
        </Checkbox>
        <Checkbox {...props} disabled>
          Hello
        </Checkbox>
      </div>
    );
  },
};
export const ReadOnly = {
  args: {
    value: 'on',
  },
  render: (props: CheckboxProps) => {
    return (
      <div className={cx(flex({ direction: 'column', gap: 4 }))}>
        <Checkbox {...props} checked readOnly>
          Hello
        </Checkbox>
        <Checkbox {...props} readOnly>
          Hello
        </Checkbox>
      </div>
    );
  },
};
export const Invalid = {
  args: {
    value: 'on',
  },
  render: (props: CheckboxProps) => {
    return (
      <div className={cx(flex({ direction: 'column', gap: 4 }))}>
        <Checkbox {...props} checked invalid>
          Hello
        </Checkbox>
        <Checkbox {...props} invalid>
          Hello
        </Checkbox>
      </div>
    );
  },
};
export const Indeterminated = {
  args: {
    value: 'on',
  },
  render: (props: CheckboxProps) => {
    return (
      <Checkbox {...props} checked="indeterminate">
        Hello
      </Checkbox>
    );
  },
};

export const Size = {
  args: {
    value: 'on',
  },
  render: (props: CheckboxProps) => {
    const sizes = ['sm', 'md', 'lg'] as CheckboxProps['size'][];
    return (
      <div className={cx(flex({ direction: 'column', gap: 4 }))}>
        {sizes.map(size => (
          <Checkbox {...props} size={size} key={size}>
            Hello
          </Checkbox>
        ))}
      </div>
    );
  },
};
