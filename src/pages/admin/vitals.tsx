import React from 'react';
import { rem } from 'polished';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Grid } from '@mantine/core';
import { ConnectGitHub } from '../../components/admin/ConnectGitHub';
import { VitalsDashboard } from '../../components/admin/VitalsDashboard';
import { useIsAdmin } from '../../hooks/useIsAdmin';

const ReposDashboard: NextPage = () => {
  const isAdmin = useIsAdmin();

  return (
    <div>
      <Head>
        <title>{'Vitals Dashboard | GitPOAP'}</title>
        <meta name="description" content="GitPOAP Admin" />
      </Head>
      <Grid justify="center" style={{ marginTop: rem(20), marginBottom: rem(20) }}>
        <Grid.Col xs={10} sm={10} md={10} lg={10} xl={10}>
          {isAdmin ? (
            <>
              <VitalsDashboard />
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
