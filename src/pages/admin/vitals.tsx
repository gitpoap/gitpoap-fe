import React from 'react';
import { rem } from 'polished';
import { NextPageWithLayout } from '../_app';
import Head from 'next/head';
import { Grid } from '@mantine/core';
import { ConnectGitHub } from '../../components/admin/ConnectGitHub';
import { VitalsDashboard } from '../../components/admin/VitalsDashboard';
import { useIsStaff } from '../../hooks/useIsStaff';

const ReposDashboard: NextPageWithLayout = () => {
  const isStaff = useIsStaff();

  return (
    <div>
      <Head>
        <title>{'Vitals Dashboard | GitPOAP'}</title>
        <meta name="description" content="GitPOAP Admin" />
      </Head>
      <Grid justify="center" style={{ marginTop: rem(20), marginBottom: rem(20) }}>
        <Grid.Col xs={10} sm={10} md={10} lg={10} xl={10}>
          {isStaff ? (
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
