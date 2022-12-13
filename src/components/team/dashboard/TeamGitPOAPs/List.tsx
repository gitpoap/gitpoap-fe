import { Stack, Table, ScrollArea } from '@mantine/core';
import { rem } from 'polished';
import React from 'react';

import { TableHeaderItem } from '../../../gitpoap/manage/TableHeaderItem';
import { BackgroundPanel } from '../../../../colors';
import { TeamGitPOAPsRow } from './Row';
import { UserGitPoapRequestsQuery } from '../../../../graphql/generated-gql';

const HEADERS: {
  label: string;
  key: string;
  isSortable: boolean;
}[] = [
  { label: 'Status', key: 'status', isSortable: false },
  { label: 'Image', key: 'image', isSortable: false },
  { label: 'Name', key: 'name', isSortable: false },
  { label: 'Description', key: 'description', isSortable: false },
  { label: 'Creation Date', key: 'createdAt', isSortable: false },
  { label: 'Start Date', key: 'startDate', isSortable: false },
  { label: 'End Date', key: 'endDate', isSortable: false },
  { label: 'Contributors', key: 'contributors', isSortable: false },
];

type Props = {
  gitPOAPRequests: Exclude<UserGitPoapRequestsQuery['gitPOAPRequests'], null | undefined>;
};

export const TeamGitPOAPsList = ({ gitPOAPRequests }: Props) => {
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
            {gitPOAPRequests &&
              gitPOAPRequests.length > 0 &&
              gitPOAPRequests.map((gitPOAPRequest) => {
                return <TeamGitPOAPsRow key={gitPOAPRequest.id} gitPOAPRequest={gitPOAPRequest} />;
              })}
          </tbody>
        </Table>
      </ScrollArea>
    </Stack>
  );
};
