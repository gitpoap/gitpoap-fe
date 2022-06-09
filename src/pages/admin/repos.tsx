import React from 'react';
import { rem } from 'polished';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Grid } from '@mantine/core';
import { DateTime } from 'luxon';
import { useAuthContext } from '../../components/github/AuthContext';
import { ConnectGitHub } from '../../components/admin/ConnectGitHub';
import { useAllReposQuery, useGetAllStatsQuery } from '../../graphql/generated-gql';
import TableDashboard from '../../components/admin/TableDashboard';

type RowData = {
  'Repo ID': number;
  Name: string;
  Organization: string;
  GitPOAPs: number;
  'Created At': string;
};

const ReposDashboard: NextPage = () => {
  const { isLoggedIntoGitHub } = useAuthContext();
  const [result] = useAllReposQuery({
    variables: {
      count: 200,
    },
  });
  const [resultStats] = useGetAllStatsQuery();

  const topRowData = {
    'Total Added Repos': resultStats.data?.totalRepos ?? '',
  };

  const data = result.data?.repos.map((repo) => {
    return {
      'Repo ID': repo.id,
      Name: repo.name,
      Organization: repo.organization.name,
      GitPOAPs: repo.gitPOAPs.length,
      'Created At': DateTime.fromISO(repo.createdAt).toFormat('dd LLL yyyy hh:mm'),
    };
  });

  return (
    <div>
      <Head>
        <title>{'Repos Dashboard | GitPOAP'}</title>
        <meta name="description" content="GitPOAP Admin" />
      </Head>
      <Grid justify="center" style={{ marginTop: rem(20) }}>
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

export default ReposDashboard;
