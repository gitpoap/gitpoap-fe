import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { useRouter } from 'next/router';

import { Page } from '../_app';
import { OrganizationPage } from '../../components/organization/OrganizationPage';
import { Layout } from '../../components/Layout';
import { Header } from '../../components/shared/elements/Header';

const Error = styled(Header)`
  position: fixed;
  top: ${rem(333)};
  left: 50%;
  transform: translate(-50%, -50%);
`;

const Project: Page = () => {
  const router = useRouter();
  const { id } = router.query;

  if (typeof id !== 'string') {
    return <></>;
  }

  const orgId = parseInt(id);

  if (isNaN(orgId)) {
    return <Error>{'404'}</Error>;
  }

  return <OrganizationPage orgId={orgId} />;
};

/* Custom layout function for this page */
Project.getLayout = (page: React.ReactNode) => {
  return <Layout>{page}</Layout>;
};

export default Project;
