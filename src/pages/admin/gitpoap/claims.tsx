import React from 'react';
import { rem } from 'polished';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Grid, Group, Table as TableUI } from '@mantine/core';
import { Header, Text } from '../../../components/shared/elements';
import { Divider } from '../../../components/shared/elements';
import { useAuthContext } from '../../../components/github/AuthContext';
import { ConnectGitHub } from '../../../components/admin/ConnectGitHub';
import { useAdminClaimsQuery, useGetAllStatsQuery } from '../../../graphql/generated-gql';
import { DateTime } from 'luxon';
import { truncateAddress } from '../../../helpers';
import styled from 'styled-components';
import { TextLight } from '../../../colors';

const ClaimRowItem = (props: { children: React.ReactNode }) => {
  return (
    <td>
      <Text>{props.children}</Text>
    </td>
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

const ClaimsDashboard: NextPage = () => {
  const { isLoggedIntoGitHub } = useAuthContext();
  const [result] = useAdminClaimsQuery({
    variables: {
      count: 20,
    },
  });
  const [resultStats] = useGetAllStatsQuery();

  return (
    <div>
      <Head>
        <title>{'Claims Dashboard | GitPOAP'}</title>
        <meta name="description" content="GitPOAP Admin" />
      </Head>
      <Grid justify="center" style={{ marginTop: rem(20) }}>
        <Grid.Col xs={10} sm={10} md={10} lg={10} xl={10}>
          {isLoggedIntoGitHub ? (
            <Group direction="row" position="center">
              <Group direction="column">
                <Group position="apart" align="flex-end" style={{ width: '100%' }}>
                  <Header>{'Admin - Claims Dashboard'}</Header>
                  <Text
                    style={{ verticalAlign: 'text-bottom' }}
                  >{`Total Completed Claims: ${resultStats.data?.totalClaims}`}</Text>
                </Group>
                <Divider style={{ width: '100%', marginTop: rem(10), marginBottom: rem(10) }} />
                <Table>
                  <thead>
                    <tr>
                      <th>{'Claim ID'}</th>
                      <th>{'Github User'}</th>
                      <th>{'User ID'}</th>
                      <th>{'Repo'}</th>
                      <th>{'Status'}</th>
                      <th>{'Poap Token ID'}</th>
                      <th>{'Address'}</th>
                      <th>{'Claimed At'}</th>
                      <th>{'Created At'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.data?.claims.map((claim) => (
                      <tr key={claim.id}>
                        <ClaimRowItem key="id">
                          <Text>{claim.id}</Text>
                        </ClaimRowItem>
                        <ClaimRowItem key="githubUser">{claim.user.githubHandle}</ClaimRowItem>
                        <ClaimRowItem key="githubUser">{claim.user.id}</ClaimRowItem>
                        <ClaimRowItem key="repoName">{claim.gitPOAP.repo.name}</ClaimRowItem>
                        <ClaimRowItem key="status">{claim.status}</ClaimRowItem>
                        <ClaimRowItem key="poapTokenId">{claim.poapTokenId}</ClaimRowItem>
                        <ClaimRowItem key="address">
                          {truncateAddress(claim.address ?? '', 6)}
                        </ClaimRowItem>
                        <ClaimRowItem key="claimedAt">
                          {DateTime.fromISO(claim.claimedAt).toFormat('dd LLL yyyy hh:mm')}
                        </ClaimRowItem>
                        <ClaimRowItem key="createdAt">
                          {DateTime.fromISO(claim.createdAt).toFormat('dd LLL yyyy hh:mm')}
                        </ClaimRowItem>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Group>
            </Group>
          ) : (
            <ConnectGitHub />
          )}
        </Grid.Col>
      </Grid>
    </div>
  );
};

export default ClaimsDashboard;
