import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Grid, Group, Table as TableUI } from '@mantine/core';
import { DateTime } from 'luxon';
import { Header, Text } from '../../components/shared/elements';
import { Divider } from '../../components/shared/elements';
import { useAuthContext } from '../../components/github/AuthContext';
import { ConnectGitHub } from '../../components/admin/ConnectGitHub';
import { useAllReposQuery, useGetAllStatsQuery } from '../../graphql/generated-gql';
import { TextLight } from '../../colors';

const RepoRowItem = (props: { children: React.ReactNode }) => {
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

const ReposDashboard: NextPage = () => {
  const { isLoggedIntoGitHub } = useAuthContext();
  const [result] = useAllReposQuery({
    variables: {
      count: 20,
    },
  });
  const [resultStats] = useGetAllStatsQuery();

  return (
    <div>
      <Head>
        <title>{'Repos Dashboard | GitPOAP'}</title>
        <meta name="description" content="GitPOAP Admin" />
      </Head>
      <Grid justify="center" style={{ marginTop: rem(20) }}>
        <Grid.Col xs={10} sm={10} md={10} lg={10} xl={10}>
          {isLoggedIntoGitHub ? (
            <Group direction="row" position="center">
              <Group direction="column">
                <Group position="apart" align="flex-end" style={{ width: '100%' }}>
                  <Header>{'Admin - Repos Dashboard'}</Header>
                  <Text
                    style={{ verticalAlign: 'text-bottom' }}
                  >{`Total Added Repos: ${resultStats.data?.totalRepos}`}</Text>
                </Group>
                <Divider style={{ width: '100%', marginTop: rem(10), marginBottom: rem(10) }} />
                <Table>
                  <thead>
                    <tr>
                      <th>{'Repo ID'}</th>
                      <th>{'Name'}</th>
                      <th>{'Organization'}</th>
                      <th>{'GitPOAPs'}</th>
                      <th>{'Created At'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.data?.repos.map((repo) => (
                      <tr key={repo.id}>
                        <RepoRowItem key="id">
                          <Text>{repo.id}</Text>
                        </RepoRowItem>
                        <RepoRowItem key="repoName">{repo.name}</RepoRowItem>
                        <RepoRowItem key="organizationName">{repo.organization.name}</RepoRowItem>
                        <RepoRowItem key="gitPOAPCount">{repo.gitPOAPs.length}</RepoRowItem>
                        <RepoRowItem key="createdAt">
                          {DateTime.fromISO(repo.createdAt).toFormat('dd LLL yyyy hh:mm')}
                        </RepoRowItem>
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

export default ReposDashboard;
