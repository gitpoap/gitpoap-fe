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
import { TableDashboard, TD } from '../../../components/admin/TableDashboard';

const LoaderContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

type RowData = {
  'Claim ID': TD<number>;
  'Github User': TD<string>;
  'PR #': TD<string>;
  'User ID': TD<number>;
  Repo: TD<string>;
  GitPOAP: TD<number>;
  Year: TD<number>;
  'Poap ID': TD<string>;
  Address: TD<string>;
  'Minted At': TD<string>;
  'Created At': TD<string>;
};

const ClaimsDashboard: NextPage = () => {
  const { isLoggedIntoGitHub, isDev } = useAuthContext();
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
    const repo = claim.pullRequestEarned?.repo;
    const org = repo?.organization;
    const ghPullNumber = claim.pullRequestEarned?.githubPullNumber;

    return {
      'Claim ID': { value: claim.id },
      'Github User': {
        value: truncateString(claim.user.githubHandle, 12),
        href: `https://github.com/${claim.user.githubHandle}`,
      },
      'PR #': {
        value: ghPullNumber ? `#${ghPullNumber}` : '',
        href: ghPullNumber
          ? `https://github.com/${org?.name}/${repo?.name}/pull/${claim.pullRequestEarned?.githubPullNumber}`
          : '',
      },
      'User ID': { value: claim.user.id },
      Org: {
        value: truncateString(org?.name ?? '', 12),
        href: `https://gitpoap.io/org/${org?.id}`,
      },
      Repo: {
        value: truncateString(repo?.name ?? '', 18),
        href: `https://gitpoap.io/rp/${repo?.id}`,
      },
      GitPOAP: { value: claim.gitPOAP.id, href: `/gp/${claim.gitPOAP.id}` },
      Year: { value: claim.gitPOAP.year },
      'Poap ID': { value: claim.poapTokenId ?? '' },
      Address: {
        value: truncateAddress(claim.mintedAddress?.ethAddress ?? '', 6) ?? '',
        href: `/p/${claim.mintedAddress?.ethAddress}`,
      },
      'Minted At': { value: DateTime.fromISO(claim.mintedAt).toFormat('dd LLL yy HH:mm') },
      'Created At': { value: DateTime.fromISO(claim.createdAt).toFormat('dd LLL yy HH:mm') },
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
        <Grid.Col xs={12} sm={12} md={12} lg={12} xl={12}>
          {isLoggedIntoGitHub || isDev ? (
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
