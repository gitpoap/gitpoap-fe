import { Stack, Table, ScrollArea } from '@mantine/core';
import { rem } from 'polished';
import React from 'react';

import { TableHeaderItem } from '../../../gitpoap/manage/TableHeaderItem';
import { BackgroundPanel } from '../../../../colors';
import { TeamGitPOAPRequestsRow } from './Row';
import { TeamGitPoapRequestsQuery } from '../../../../graphql/generated-gql';

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
  { label: 'Contributors', key: 'contributors', isSortable: false },
];

type Props = {
  gitPOAPRequests: Exclude<TeamGitPoapRequestsQuery['teamGitPOAPRequests'], null | undefined>;
};

export const TeamGitPOAPRequestsList = ({ gitPOAPRequests }: Props) => {
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
              gitPOAPRequests.map((gitPOAPRequest, i) => {
                return (
                  <TeamGitPOAPRequestsRow
                    key={gitPOAPRequest.id}
                    gitPOAPRequest={gitPOAPRequest}
                    index={i + 1}
                  />
                );
              })}
          </tbody>
        </Table>
      </ScrollArea>
    </Stack>
  );
};
