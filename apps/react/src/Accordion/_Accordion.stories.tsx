import { CircleChevronDownIcon } from 'lucide-react';

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
  },
  render: (props: AccordionProps['Root']) => {
    return (
      <div className="w-96">
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
      </div>
    );
  },
};

export const Indicator = {
  args: {
    defaultValue: [exampleList[0]],
    indicator: <CircleChevronDownIcon size={20} />,
  },
  render: (props: AccordionProps['Root']) => {
    return (
      <div className="w-96">
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
      </div>
    );
  },
};

export const Disabled = {
  args: {
    defaultValue: [exampleList[0]],
  },
  render: (props: AccordionProps['Root']) => {
    return (
      <div className="w-96">
        <Accordion.Root {...props}>
          {exampleList.map((item, i) => (
            <Accordion.Item key={item} value={item} disabled={i === 1}>
              <Accordion.Trigger>{item}</Accordion.Trigger>
              <Accordion.Content>
                {item} is a JavaScript library for building user interfaces.
              </Accordion.Content>
            </Accordion.Item>
          ))}
        </Accordion.Root>
      </div>
    );
  },
};

export const Multiple = {
  args: {
    defaultValue: [exampleList[0], exampleList[1]],
    multiple: true,
  },
  render: (props: AccordionProps['Root']) => {
    return (
      <div className="w-96">
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
      </div>
    );
  },
};
