import { Table, type TableProps } from './index';

export default {
  title: 'Components/Table',
  component: Table.Root,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      options: ['sm', 'md'],
      control: { type: 'select' },
    },
    variant: {
      options: ['outline', 'plain'],
      control: { type: 'select' },
    },
  },
  args: {
    size: 'md',
    variant: 'plain',
  },
};

export const Default = {
  args: {},
  render: (props: TableProps['root']) => {
    return (
      <Table.Root {...props}>
        <Table.Header>
          <Table.Row>
            <Table.Head>ID</Table.Head>
            <Table.Head>Name</Table.Head>
            <Table.Head>Age</Table.Head>
            <Table.Head>City</Table.Head>
            <Table.Head>Purchase Amount</Table.Head>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {exampleData.map(d => (
            <Table.Row key={d.ID}>
              <Table.Cell>{d.ID}</Table.Cell>
              <Table.Cell>{d.Name}</Table.Cell>
              <Table.Cell>{d.Age}</Table.Cell>
              <Table.Cell>{d.City}</Table.Cell>
              <Table.Cell align="right">${d['Purchase Amount']}</Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
        <Table.Footer>
          <Table.Row>
            <Table.Cell colSpan={4}>total</Table.Cell>
            <Table.Cell align="right">
              ${exampleData.reduce((acc, d) => acc + d['Purchase Amount'], 0)}
            </Table.Cell>
          </Table.Row>
        </Table.Footer>
        <Table.Caption>Example of Table</Table.Caption>
      </Table.Root>
    );
  },
};

export const Variants = {
  args: {},
  render: () => {
    return (
      <>
        <div>
          <Table.Root variant="outline">
            <Table.Header>
              <Table.Row>
                <Table.Head>ID</Table.Head>
                <Table.Head>Name</Table.Head>
                <Table.Head>Age</Table.Head>
                <Table.Head>City</Table.Head>
                <Table.Head>Purchase Amount</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {exampleData.map(d => (
                <Table.Row key={d.ID}>
                  <Table.Cell>{d.ID}</Table.Cell>
                  <Table.Cell>{d.Name}</Table.Cell>
                  <Table.Cell>{d.Age}</Table.Cell>
                  <Table.Cell>{d.City}</Table.Cell>
                  <Table.Cell align="right">${d['Purchase Amount']}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
            <Table.Footer>
              <Table.Row>
                <Table.Cell colSpan={4}>total</Table.Cell>
                <Table.Cell align="right">
                  $
                  {exampleData.reduce(
                    (acc, d) => acc + d['Purchase Amount'],
                    0,
                  )}
                </Table.Cell>
              </Table.Row>
            </Table.Footer>
            <Table.Caption>Outline</Table.Caption>
          </Table.Root>
          <Table.Root variant="plain">
            <Table.Header>
              <Table.Row>
                <Table.Head>ID</Table.Head>
                <Table.Head>Name</Table.Head>
                <Table.Head>Age</Table.Head>
                <Table.Head>City</Table.Head>
                <Table.Head>Purchase Amount</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {exampleData.map(d => (
                <Table.Row key={d.ID}>
                  <Table.Cell>{d.ID}</Table.Cell>
                  <Table.Cell>{d.Name}</Table.Cell>
                  <Table.Cell>{d.Age}</Table.Cell>
                  <Table.Cell>{d.City}</Table.Cell>
                  <Table.Cell align="right">${d['Purchase Amount']}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
            <Table.Footer>
              <Table.Row>
                <Table.Cell colSpan={4}>total</Table.Cell>
                <Table.Cell align="right">
                  $
                  {exampleData.reduce(
                    (acc, d) => acc + d['Purchase Amount'],
                    0,
                  )}
                </Table.Cell>
              </Table.Row>
            </Table.Footer>
            <Table.Caption>Plain</Table.Caption>
          </Table.Root>
        </div>
      </>
    );
  },
};

export const Sizes = {
  args: {},
  render: () => {
    return (
      <>
        <div>
          <Table.Root size="sm">
            <Table.Header>
              <Table.Row>
                <Table.Head>ID</Table.Head>
                <Table.Head>Name</Table.Head>
                <Table.Head>Age</Table.Head>
                <Table.Head>City</Table.Head>
                <Table.Head>Purchase Amount</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {exampleData.map(d => (
                <Table.Row key={d.ID}>
                  <Table.Cell>{d.ID}</Table.Cell>
                  <Table.Cell>{d.Name}</Table.Cell>
                  <Table.Cell>{d.Age}</Table.Cell>
                  <Table.Cell>{d.City}</Table.Cell>
                  <Table.Cell align="right">${d['Purchase Amount']}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
            <Table.Footer>
              <Table.Row>
                <Table.Cell colSpan={4}>total</Table.Cell>
                <Table.Cell align="right">
                  $
                  {exampleData.reduce(
                    (acc, d) => acc + d['Purchase Amount'],
                    0,
                  )}
                </Table.Cell>
              </Table.Row>
            </Table.Footer>
            <Table.Caption>sm</Table.Caption>
          </Table.Root>
          <Table.Root size="md">
            <Table.Header>
              <Table.Row>
                <Table.Head>ID</Table.Head>
                <Table.Head>Name</Table.Head>
                <Table.Head>Age</Table.Head>
                <Table.Head>City</Table.Head>
                <Table.Head>Purchase Amount</Table.Head>
              </Table.Row>
            </Table.Header>
            <Table.Body>
              {exampleData.map(d => (
                <Table.Row key={d.ID}>
                  <Table.Cell>{d.ID}</Table.Cell>
                  <Table.Cell>{d.Name}</Table.Cell>
                  <Table.Cell>{d.Age}</Table.Cell>
                  <Table.Cell>{d.City}</Table.Cell>
                  <Table.Cell align="right">${d['Purchase Amount']}</Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
            <Table.Footer>
              <Table.Row>
                <Table.Cell colSpan={4}>total</Table.Cell>
                <Table.Cell align="right">
                  $
                  {exampleData.reduce(
                    (acc, d) => acc + d['Purchase Amount'],
                    0,
                  )}
                </Table.Cell>
              </Table.Row>
            </Table.Footer>
            <Table.Caption>md</Table.Caption>
          </Table.Root>
        </div>
      </>
    );
  },
};

const exampleData = [
  {
    ID: '001',
    Name: 'Alice',
    Age: 28,
    City: 'New York',
    'Purchase Amount': 150.0,
  },
  {
    ID: '002',
    Name: 'Bob',
    Age: 34,
    City: 'Los Angeles',
    'Purchase Amount': 230.5,
  },
  {
    ID: '003',
    Name: 'Charlie',
    Age: 22,
    City: 'Chicago',
    'Purchase Amount': 99.99,
  },
  {
    ID: '004',
    Name: 'David',
    Age: 45,
    City: 'Houston',
    'Purchase Amount': 320.75,
  },
  {
    ID: '005',
    Name: 'Eva',
    Age: 31,
    City: 'Phoenix',
    'Purchase Amount': 205.6,
  },
];
