import React from 'react';
import { Grid } from '@mantine/core';
import { Page } from '../_app';
import { RepoList } from '../../components/repos/RepoList';
import { Layout } from '../../components/Layout';
import { SEO } from '../../components/SEO';

const Repos: Page = () => {
  return (
    <>
      <SEO
        title={`Repos | GitPOAP`}
        description={
          'GitPOAP is a decentralized reputation platform that represents off-chain accomplishments and contributions on chain as POAPs.'
        }
        image={'https://gitpoap.io/og-image-512x512.png'}
        url={`https://gitpoap.io/repos`}
      />
      <Grid justify="center">
        <Grid.Col span={10}>
          <RepoList />
        </Grid.Col>
      </Grid>
    </>
  );
};

/* Custom layout function for this page */
Repos.getLayout = (page: React.ReactNode) => {
  return <Layout>{page}</Layout>;
};

export default Repos;
