import React from 'react';
import styled from 'styled-components';
import { rgba, rem } from 'polished';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { Grid } from '@mantine/core';

import { Page } from '../_app';
import { RepoList } from '../../components/repos/RepoList';
import { OrganizationList } from '../../components/repos/OrganizationList';
import { Layout } from '../../components/Layout';

const Repos: Page = () => {
  return (
    <>
      <Head>
        <title>{'GitPOAP | GitPOAP'}</title>
      </Head>
      <div style={{ margin: `0 ${rem(45)}` }}>
        <RepoList />
        <OrganizationList />
      </div>
    </>
  );
};

/* Custom layout function for this page */
Repos.getLayout = (page: React.ReactNode) => {
  return <Layout>{page}</Layout>;
};

export default Repos;
