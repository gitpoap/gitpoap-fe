import React from 'react';
import { NextPageWithLayout } from '../../_app';
import Head from 'next/head';
import { ConnectGitHub } from '../../../components/admin/ConnectGitHub';
import { AdminGitPOAPRequestContainer } from '../../../components/admin/requests';
import { useUser } from '../../../hooks/useUser';

const AdminGitPOAPRequests: NextPageWithLayout = () => {
  const user = useUser();

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
