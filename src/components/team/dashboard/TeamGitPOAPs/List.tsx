import { Stack, Table, ScrollArea } from '@mantine/core';
import { rem } from 'polished';
import React from 'react';

import { TableHeaderItem } from '../../../gitpoap/manage/TableHeaderItem';
import { BackgroundPanel } from '../../../../colors';
import { TeamGitPOAPsRow } from './Row';
import { TeamGitPoaPsQuery } from '../../../../graphql/generated-gql';

const HEADERS: {
  label: string;
  key: string;
  isSortable: boolean;
}[] = [
  { label: '', key: 'index', isSortable: false },
  { label: 'Status', key: 'status', isSortable: false },
  { label: 'Image', key: 'image', isSortable: false },
  { label: 'Name', key: 'name', isSortable: false },
  { label: 'Description', key: 'description', isSortable: false },
  { label: 'Creation Date', key: 'createdAt', isSortable: false },
  { label: 'Claims', key: 'claims', isSortable: false },
];

type Props = {
  gitPOAPs: Exclude<TeamGitPoaPsQuery['teamGitPOAPs'], null | undefined>;
};

export const TeamGitPOAPsList = ({ gitPOAPs }: Props) => {
  return (
    <Stack
      align="center"
      justify="flex-start"
      spacing="sm"
      py={0}
      sx={{ background: BackgroundPanel, borderRadius: `${rem(6)} ${rem(6)} 0 0`, width: '100%' }}
    >
      <ScrollArea style={{ width: '100%' }}>
        <Table highlightOnHover horizontalSpacing="md" verticalSpacing="xs" fontSize="sm">
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
            {gitPOAPs &&
              gitPOAPs.length > 0 &&
              gitPOAPs.map((gitPOAP, i) => {
                return <TeamGitPOAPsRow key={gitPOAP.id} gitPOAP={gitPOAP} index={i + 1} />;
              })}
          </tbody>
        </Table>
      </ScrollArea>
    </Stack>
  );
};
