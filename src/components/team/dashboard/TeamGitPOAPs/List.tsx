import { Table } from '@mantine/core';
import React from 'react';

import { TeamGitPOAPsRow } from './Row';
import { TeamGitPoaPsQuery } from '../../../../graphql/generated-gql';
import { HeaderItem, TableHeaderItem, TableWrapper } from '../../../shared/elements/Table';

const HEADERS: HeaderItem[] = [
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
          {gitPOAPs &&
            gitPOAPs.length > 0 &&
            gitPOAPs.map((gitPOAP, i) => {
              return <TeamGitPOAPsRow key={gitPOAP.id} gitPOAP={gitPOAP} index={i + 1} />;
            })}
        </tbody>
      </Table>
    </TableWrapper>
  );
};
