import React from 'react';
import { NextPageWithLayout } from '../../_app';
import Head from 'next/head';
import { ConnectGitHub } from '../../../components/admin/ConnectGitHub';
import { AdminGitPOAPRequestContainer } from '../../../components/admin/requests';
import { useAuthContext } from '../../../hooks/useAuthContext';

const AdminGitPOAPRequests: NextPageWithLayout = () => {
  const { user } = useAuthContext();

  return (
    <>
      <Head>
        <title>{'Requests | GitPOAP'}</title>
        <meta name="description" content="GitPOAP Admin" />
      </Head>
      {user?.permissions.isStaff ? <AdminGitPOAPRequestContainer /> : <ConnectGitHub />}
    </>
  );
};

export default AdminGitPOAPRequests;
