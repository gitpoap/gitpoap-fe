import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { Group, Table as TableUI, Stack } from '@mantine/core';
import { Header, Text } from '../../components/shared/elements';
import { Divider } from '../../components/shared/elements';
import { BackgroundPanel2, TextLight } from '../../colors';
import { Link } from '../Link';
import { LinkHoverStyles } from '../shared/elements/NavLink';

const StyledTD = styled.td`
  a {
    color: ${TextLight};
    ${LinkHoverStyles}
  }
`;

const RowItem = (props: { children: React.ReactNode; className?: string }) => {
  return (
    <td>
      <Text className={props.className}>{props.children}</Text>
    </td>
  );
};

const RowItemLink = (props: { children: React.ReactNode; className?: string; href: string }) => {
  return (
    <StyledTD>
      <Link href={props.href}>
        <Text className={props.className}>{props.children}</Text>
      </Link>
    </StyledTD>
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

const TableRow = styled.tr`
  &:hover {
    background-color: ${BackgroundPanel2};
  }
`;

/* Table Data Type */
export type TD<V> = {
  value: V;
  href?: string;
};

type Props<T> = {
  name: string;
  data: T;
  topRowData: Record<string, string | number>;
};

export const TableDashboard = <T extends Record<string, TD<string | number>>[]>({
  data,
  topRowData,
  name,
}: Props<T>) => {
  return (
    <Group position="center">
      <Stack>
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
              <TableRow key={i}>
                {Object.entries(row).map(([key, td], i: number) => {
                  /* If it's a link, render with Link */
                  if (td.href) {
                    return (
                      <RowItemLink key={`${key}-${i}`} href={td.href}>
                        {td.value}
                      </RowItemLink>
                    );
                  }

                  return <RowItem key={`${key}-${i}`}>{td.value}</RowItem>;
                })}
              </TableRow>
            ))}
          </tbody>
        </Table>
      </Stack>
    </Group>
  );
};

export default TableDashboard;
