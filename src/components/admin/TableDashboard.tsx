import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { Group, Table as TableUI } from '@mantine/core';
import { Header, Text } from '../../components/shared/elements';
import { Divider } from '../../components/shared/elements';
import { TextLight } from '../../colors';

const RowItem = (props: { children: React.ReactNode }) => {
  return (
    <td>
      <Text>{props.children}</Text>
    </td>
  );
};

const Table = styled(TableUI)`
  thead th {
    font-family: PT Mono;
    font-style: normal;
    font-weight: normal;
    font-size: ${rem(14)};
    line-height: ${rem(20)};
    letter-spacing: ${rem(0.2)};
    color: ${TextLight} !important;
  }
`;

type Props<T> = {
  name: string;
  data: T;
  topRowData: Record<string, string | number>;
};

export const TableDashboard = <T extends Record<string, string | number>[]>({
  data,
  topRowData,
  name,
}: Props<T>) => {
  return (
    <Group direction="row" position="center">
      <Group direction="column">
        <Group position="apart" align="flex-end" style={{ width: '100%' }}>
          <Header>{name}</Header>
          {Object.entries(topRowData).map(([key, value]) => (
            <Text key={key} style={{ verticalAlign: 'text-bottom' }}>{`${key}: ${value}`}</Text>
          ))}
        </Group>
        <Divider style={{ width: '100%', marginTop: rem(10), marginBottom: rem(10) }} />
        <Table>
          <thead>
            <tr>
              {Object.keys(data[0]).map((key) => (
                <th key={key}>{key}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row: T[number], i: number) => (
              <tr key={i}>
                {Object.entries(row).map(([key, value], i: number) => (
                  <RowItem key={`${key}-${i}`}>{value}</RowItem>
                ))}
              </tr>
            ))}
          </tbody>
        </Table>
      </Group>
    </Group>
  );
};

export default TableDashboard;
