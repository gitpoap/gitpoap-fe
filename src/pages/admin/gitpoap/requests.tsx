import React from 'react';
import { rem } from 'polished';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Grid } from '@mantine/core';
import { Header } from '../../../components/shared/elements';
import { useAuthContext } from '../../../components/github/AuthContext';
import { ConnectGitHub } from '../../../components/admin/ConnectGitHub';
import { GitPOAPRequestList } from '../../../components/admin/GitPOAPRequestList';

const GitPoapRequestsDashboard: NextPage = () => {
  const { isLoggedIntoGitHub, isDev } = useAuthContext();

  return (
    <>
      <Head>
        <title>{'GitPoap Requests | GitPOAP'}</title>
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
        <Header>{'Approve CGs'}</Header>
        <Grid.Col xs={12} sm={12} md={12} lg={12} xl={12}>
          {isLoggedIntoGitHub || isDev ? <GitPOAPRequestList /> : <ConnectGitHub />}
        </Grid.Col>
      </Grid>
    </>
  );
};

export default GitPoapRequestsDashboard;
