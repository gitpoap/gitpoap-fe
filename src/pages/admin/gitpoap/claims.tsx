import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Grid, Loader } from '@mantine/core';
import { useAuthContext } from '../../../components/github/AuthContext';
import { ConnectGitHub } from '../../../components/admin/ConnectGitHub';
import { useAdminClaimsQuery, useGetAllStatsQuery } from '../../../graphql/generated-gql';
import { DateTime } from 'luxon';
import { truncateAddress, truncateString } from '../../../helpers';
import TableDashboard, { TD } from '../../../components/admin/TableDashboard';

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

type RowData = {
  'Claim ID': TD<number>;
  'Github User': TD<string>;
  'User ID': TD<number>;
  Repo: TD<string>;
  Status: TD<string>;
  'Poap Token ID': TD<string>;
  Address: TD<string>;
  'Minted At': TD<string>;
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
        href: `https://gitpoap.io/org/${claim.gitPOAP.repo.organization.id}`,
      },
      Repo: {
        value: truncateString(claim.gitPOAP.repo.name, 22),
        href: `https://gitpoap.io/rp/${claim.gitPOAP.repo.id}`,
      },
      Status: { value: claim.status },
      'GitPOAP ID': { value: claim.gitPOAP.id, href: `/gp/${claim.gitPOAP.id}` },
      Year: { value: claim.gitPOAP.year },
      'Poap Token ID': { value: claim.poapTokenId ?? '' },
      Address: {
        value: truncateAddress(claim.address ?? '', 6) ?? '',
        href: `/p/${claim.address}`,
      },
      'Minted At': { value: DateTime.fromISO(claim.mintedAt).toFormat('dd LLL yyyy hh:mm') },
      'Created At': { value: DateTime.fromISO(claim.createdAt).toFormat('dd LLL yyyy hh:mm') },
    };
  });

  return (
    <>
      <Head>
        <title>{'Claims Dashboard | GitPOAP'}</title>
        <meta name="description" content="GitPOAP Admin" />
      </Head>
      <Grid
        justify="center"
        style={{
          flex: 1,
          marginTop: rem(20),
          marginBottom: rem(20),
        }}
      >
        <Grid.Col xs={10} sm={10} md={10} lg={10} xl={10}>
          {isLoggedIntoGitHub ? (
            <>
              {result.fetching && (
                <LoaderContainer>
                  <Loader size="xl" variant="dots" />
                </LoaderContainer>
              )}
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
    </>
  );
};

export default ClaimsDashboard;
