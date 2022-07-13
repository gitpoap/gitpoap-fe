import React from 'react';
import { rem } from 'polished';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Grid } from '@mantine/core';
import { DateTime } from 'luxon';
import { useAuthContext } from '../../components/github/AuthContext';
import { ConnectGitHub } from '../../components/admin/ConnectGitHub';
import { useAllReposQuery, useGetAllStatsQuery } from '../../graphql/generated-gql';
import TableDashboard, { TD } from '../../components/admin/TableDashboard';

type RowData = {
  'Repo ID': TD<number>;
  Name: TD<string>;
  Organization: TD<string>;
  GitPOAPs: TD<number>;
  'Created At': TD<string>;
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
      'Repo ID': { value: repo.id, href: `/gh/${repo.organization.name}/${repo.name}` },
      Name: { value: repo.name, href: `https://github.com/${repo.organization.name}/${repo.name}` },
      Organization: {
        value: repo.organization.name,
        href: `https://github.com/${repo.organization.name}/`,
      },
      GitPOAPs: { value: repo.gitPOAPs.length },
      'Created At': { value: DateTime.fromISO(repo.createdAt).toFormat('dd LLL yyyy hh:mm') },
    };
  });

  return (
    <div>
      <Head>
        <title>{'Repos Dashboard | GitPOAP'}</title>
        <meta name="description" content="GitPOAP Admin" />
      </Head>
      <Grid justify="center" style={{ marginTop: rem(20), marginBottom: rem(20) }}>
        <Grid.Col xs={10} sm={10} md={10} lg={10} xl={10}>
          {!isLoggedIntoGitHub ? (
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
