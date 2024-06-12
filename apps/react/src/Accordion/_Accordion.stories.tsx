import { css } from '../../styled-system/css';
import { Accordion, type AccordionProps } from './index';

/**
 * based on https://ark-ui.com/react/docs/components/accordion
 */
export default {
  title: 'Components/Accordion',
  component: Accordion.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
  args: {},
};

const exampleList = ['React', 'Vue', 'Solid'];

export const Default = {
  args: {
    defaultValue: [exampleList[0]],
    className: css({ width: '400px', height: '200px' }),
  },
  render: (props: AccordionProps['Root']) => {
    return (
      <Accordion.Root {...props}>
        {exampleList.map(item => (
          <Accordion.Item key={item} value={item}>
            <Accordion.Trigger>{item}</Accordion.Trigger>
            <Accordion.Content>
              {item} is a JavaScript library for building user interfaces.
            </Accordion.Content>
          </Accordion.Item>
        ))}
      </Accordion.Root>
    );
  },
};
