import React from 'react';
import { rem } from 'polished';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Grid } from '@mantine/core';
import { useAuthContext } from '../../../components/github/AuthContext';
import { ConnectGitHub } from '../../../components/admin/ConnectGitHub';
import { useAdminClaimsQuery, useGetAllStatsQuery } from '../../../graphql/generated-gql';
import { DateTime } from 'luxon';
import { truncateAddress } from '../../../helpers';
import TableDashboard from '../../../components/admin/TableDashboard';

type RowData = {
  'Claim ID': number;
  'Github User': string;
  'User ID': number;
  Repo: string;
  Status: string;
  'Poap Token ID': string;
  Address: string;
  'Claimed At': string;
  'Created At': string;
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

  const data = result.data?.claims.map((claim) => {
    return {
      'Claim ID': claim.id,
      'Github User': claim.user.githubHandle,
      'User ID': claim.user.id,
      Repo: claim.gitPOAP.repo.name,
      Status: claim.status,
      'Poap Token ID': claim.poapTokenId ?? '',
      Address: truncateAddress(claim.address ?? '', 6),
      'Claimed At': DateTime.fromISO(claim.claimedAt).toFormat('dd LLL yyyy hh:mm'),
      'Created At': DateTime.fromISO(claim.createdAt).toFormat('dd LLL yyyy hh:mm'),
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
                  name="Admin - Repos Dashboard"
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
