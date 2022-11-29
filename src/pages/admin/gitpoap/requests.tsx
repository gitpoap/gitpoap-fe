import React from 'react';
import { rem } from 'polished';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Grid } from '@mantine/core';
import { ConnectGitHub } from '../../../components/admin/ConnectGitHub';
import { GitPOAPRequestList } from '../../../components/admin/requests/AdminGitPOAPRequestList';
import { useIsStaff } from '../../../hooks/useIsStaff';

const AdminGitPOAPRequests: NextPage = () => {
  const isStaff = useIsStaff();

  return (
    <>
      <Head>
        <title>{'Requests | GitPOAP'}</title>
        <meta name="description" content="GitPOAP Admin" />
      </Head>
      <Grid justify="center" mt={rem(20)} mb={rem(20)} style={{ flex: 1 }}>
        <Grid.Col xs={10} sm={10} md={10} lg={10} xl={10}>
          {isStaff ? <GitPOAPRequestList /> : <ConnectGitHub />}
        </Grid.Col>
      </Grid>
    </>
  );
};

export default AdminGitPOAPRequests;
