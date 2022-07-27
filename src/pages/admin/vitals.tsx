import React from 'react';
import { rem } from 'polished';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Grid } from '@mantine/core';
import { useAuthContext } from '../../components/github/AuthContext';
import { ConnectGitHub } from '../../components/admin/ConnectGitHub';
import { VitalsDashboard } from '../../components/admin/VitalsDashboard';

const ReposDashboard: NextPage = () => {
  const { isDev, isLoggedIntoGitHub, tokens } = useAuthContext();
  const isClient = typeof window !== 'undefined';

  return (
    <div>
      <Head>
        <title>{'Vitals Dashboard | GitPOAP'}</title>
        <meta name="description" content="GitPOAP Admin" />
      </Head>
      <Grid justify="center" style={{ marginTop: rem(20), marginBottom: rem(20) }}>
        <Grid.Col xs={10} sm={10} md={10} lg={10} xl={10}>
          {(isLoggedIntoGitHub || isDev) && isClient ? (
            <>
              <VitalsDashboard accessToken={tokens?.accessToken ?? null} />
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
