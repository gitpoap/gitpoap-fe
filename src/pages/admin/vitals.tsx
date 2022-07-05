import React from 'react';
import { rem } from 'polished';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Grid } from '@mantine/core';
import { useAuthContext } from '../../components/github/AuthContext';
import { ConnectGitHub } from '../../components/admin/ConnectGitHub';
import { VitalsDashboard } from '../../components/admin/VitalsDashboard';

const ReposDashboard: NextPage = () => {
  const { isLoggedIntoGitHub } = useAuthContext();

  return (
    <>
      <Head>
        <title>{'Vitals Dashboard | GitPOAP'}</title>
        <meta name="description" content="GitPOAP Admin" />
      </Head>
      <Grid justify="center" style={{ marginTop: rem(20), marginBottom: rem(20) }}>
        <Grid.Col span={10}>
          {isLoggedIntoGitHub ? (
            <>
              <VitalsDashboard />
            </>
          ) : (
            <ConnectGitHub />
          )}
        </Grid.Col>
      </Grid>
    </>
  );
};

export default ReposDashboard;
