import React from 'react';
import { rem } from 'polished';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Grid } from '@mantine/core';
import { useAuthContext } from '../../../components/github/AuthContext';
import { ConnectGitHub } from '../../../components/admin/ConnectGitHub';
import { useAdminClaimsQuery, useGetAllStatsQuery } from '../../../graphql/generated-gql';
import { DateTime } from 'luxon';
import { truncateAddress, truncateString } from '../../../helpers';
import TableDashboard, { TD } from '../../../components/admin/TableDashboard';

type RowData = {
  'Claim ID': TD<number>;
  'Github User': TD<string>;
  'User ID': TD<number>;
  Repo: TD<string>;
  Status: TD<string>;
  'Poap Token ID': TD<string>;
  Address: TD<string>;
  'Claimed At': TD<string>;
  'Created At': TD<string>;
};

const ClaimsDashboard: NextPage = () => {
  const { isLoggedIntoGitHub } = useAuthContext();
  const [result] = useAdminClaimsQuery({
    variables: {
      count: 200,
    },
  });
  const [resultStats] = useGetAllStatsQuery();

  const topRowData = {
    'Total Completed Claims': resultStats.data?.totalClaims ?? '',
  };

  const data: RowData[] | undefined = result.data?.claims.map((claim) => {
    return {
      'Claim ID': { value: claim.id },
      'Github User': {
        value: claim.user.githubHandle,
        href: `https://github.com/${claim.user.githubHandle}`,
      },
      'User ID': { value: claim.user.id },
      Org: {
        value: claim.gitPOAP.repo.organization.name,
        href: `https://github.com/${claim.gitPOAP.repo.organization.name}`,
      },
      Repo: {
        value: truncateString(claim.gitPOAP.repo.name, 22),
        href: `https://github.com/${claim.gitPOAP.repo.organization.name}/${claim.gitPOAP.repo.name}`,
      },
      Status: { value: claim.status },
      'GitPOAP ID': { value: claim.gitPOAP.id, href: `/gp/${claim.gitPOAP.id}` },
      Year: { value: claim.gitPOAP.year },
      'Poap Token ID': { value: claim.poapTokenId ?? '' },
      Address: {
        value: truncateAddress(claim.address ?? '', 6) ?? '',
        href: `/p/${claim.address}`,
      },
      'Claimed At': { value: DateTime.fromISO(claim.mintedAt).toFormat('dd LLL yyyy hh:mm') },
      'Created At': { value: DateTime.fromISO(claim.createdAt).toFormat('dd LLL yyyy hh:mm') },
    };
  });

  return (
    <div>
      <Head>
        <title>{'Claims Dashboard | GitPOAP'}</title>
        <meta name="description" content="GitPOAP Admin" />
      </Head>
      <Grid justify="center" style={{ marginTop: rem(20), marginBottom: rem(20) }}>
        <Grid.Col xs={10} sm={10} md={10} lg={10} xl={10}>
          {isLoggedIntoGitHub ? (
            <>
              {data && (
                <TableDashboard<RowData[]>
                  name="Admin - Claims Dashboard"
                  data={data}
                  topRowData={topRowData}
                />
              )}
            </>
          ) : (
            <ConnectGitHub />
          )}
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default ClaimsDashboard;
