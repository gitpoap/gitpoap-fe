import React from 'react';
import { rem } from 'polished';
import type { NextPage } from 'next';
import Head from 'next/head';
import { Box } from '@mantine/core';
import { ConnectGitHub } from '../../../components/admin/ConnectGitHub';
import { AdminGitPOAPRequestContainer } from '../../../components/admin/requests';
import { useUser } from '../../../hooks/useUser';

const AdminGitPOAPRequests: NextPage = () => {
  const user = useUser();

  return (
    <>
      <Head>
        <title>{'Requests | GitPOAP'}</title>
        <meta name="description" content="GitPOAP Admin" />
      </Head>
      <Box my={rem(20)} px={rem(32)}>
        {user?.permissions.isStaff ? <AdminGitPOAPRequestContainer /> : <ConnectGitHub />}
      </Box>
    </>
  );
};

export default AdminGitPOAPRequests;
