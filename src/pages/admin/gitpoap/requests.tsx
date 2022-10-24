import React from 'react';
import { rem } from 'polished';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Grid } from '@mantine/core';
import { Header } from '../../../components/shared/elements';
import { ConnectGitHub } from '../../../components/admin/ConnectGitHub';
import { GitPOAPRequestList } from '../../../components/admin/GitPOAPRequestList';
import { useUser } from '../../../hooks/useUser';
import { useIsDev } from '../../../hooks/useIsDev';

const GitPoapRequestsDashboard: NextPage = () => {
  const user = useUser();
  const isDev = useIsDev();

  return (
    <>
      <Head>
        <title>{'Requests | GitPOAP'}</title>
        <meta name="description" content="GitPOAP Admin" />
      </Head>
      <Grid
        justify="center"
        mt={rem(20)}
        mb={rem(20)}
        style={{
          flex: 1,
        }}
      >
        <Header>{'Approve CGs'}</Header>
        <Grid.Col xs={12} sm={12} md={12} lg={12} xl={12}>
          {user || isDev ? <GitPOAPRequestList /> : <ConnectGitHub />}
        </Grid.Col>
      </Grid>
    </>
  );
};

export default GitPoapRequestsDashboard;
