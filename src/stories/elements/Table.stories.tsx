import { ActionIcon, Button, Group, Table, Text } from '@mantine/core';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { MdKeyboardArrowLeft, MdKeyboardArrowRight, MdRefresh } from 'react-icons/md';
import {
  HeaderItem,
  TableHeaderItem,
  TableRow,
  TableWrapper,
} from '../../components/shared/elements/Table';
import { userMemberships } from '../data';

const HEADERS: HeaderItem[] = [
  { label: '', key: 'index', isSortable: false },
  { label: 'Name', key: 'teamName', isSortable: false },
  { label: 'Role', key: 'role', isSortable: false },
  { label: 'Status', key: 'acceptanceStatus', isSortable: false },
  { label: 'Joined On', key: 'joinedOn', isSortable: true },
  { label: 'Created At', key: 'createdAt', isSortable: true },
  { label: '', key: 'actions', isSortable: false },
];

const ExampleTable = () => (
  <TableWrapper
    headerControls={
      <Group position="apart" p={16} pr={8} sx={{ width: '100%' }}>
        <ActionIcon>{<MdRefresh size="20" />}</ActionIcon>
        <Group>
          <Text color="dimmed">
            {`${1}-${userMemberships.memberships.length} of ${userMemberships.memberships.length}`}
          </Text>
          <ActionIcon>
            <MdKeyboardArrowLeft size="20" />
          </ActionIcon>
          <ActionIcon>
            <MdKeyboardArrowRight size="20" />
          </ActionIcon>
        </Group>
      </Group>
    }
  >
    <Table>
      <thead>
        <tr>
          {HEADERS.map((header, i) => (
            <TableHeaderItem
              key={`header-${i}`}
              isSortable={header.isSortable}
              isSorted={false}
              isReversed={false}
            >
              {header.label}
            </TableHeaderItem>
          ))}
        </tr>
      </thead>
      <tbody>
        {userMemberships.memberships.map((item, i) => {
          return (
            <TableRow key={`row-${i}`}>
              <td>
                <Text>{i + 1}</Text>
              </td>
              <td>
                <Text>{item.team.name}</Text>
              </td>
              <td>
                <Text>{item.role}</Text>
              </td>
              <td>
                <Text>{item.acceptanceStatus}</Text>
              </td>
              <td>
                <Text>{item.joinedOn}</Text>
              </td>
              <td>
                <Text>{item.createdAt}</Text>
              </td>
              <td>
                <Group>
                  <Button compact>Copy</Button>
                </Group>
              </td>
            </TableRow>
          );
        })}
      </tbody>
    </Table>
  </TableWrapper>
);

export default {
  title: 'Elements/Table',
  component: TableWrapper,
} as ComponentMeta<typeof TableWrapper>;

const Template: ComponentStory<typeof TableWrapper> = () => <ExampleTable />;

export const Default = Template.bind({});
