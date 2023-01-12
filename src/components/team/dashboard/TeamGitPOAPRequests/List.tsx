import { Table } from '@mantine/core';
import React from 'react';

import { TeamGitPOAPRequestsRow } from './Row';
import { TeamGitPoapRequestsQuery } from '../../../../graphql/generated-gql';
import { HeaderItem, TableHeaderItem, TableWrapper } from '../../../shared/elements/Table';

const HEADERS: HeaderItem[] = [
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
    <TableWrapper>
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
    </TableWrapper>
  );
};
