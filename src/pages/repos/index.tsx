import React from 'react';
import { Grid } from '@mantine/core';
import { Page } from '../_app';
import { RepoList } from '../../components/repos/RepoList';
import { Layout } from '../../components/Layout';
import { SEO } from '../../components/shared/compounds/SEO';

const Repos: Page = () => {
  return (
    <>
      <SEO
        title={`Repos | GitPOAP`}
        description={
          'View all repos supported on GitPOAP - a decentralized reputation platform that represents off-chain accomplishments and contributions on chain as POAPs.'
        }
        image={'https://gitpoap.io/og-image-512x512.png'}
        url={`https://gitpoap.io/repos`}
      />
      <Grid justify="center">
        <Grid.Col xs={11} md={10}>
          <RepoList />
        </Grid.Col>
      </Grid>
    </>
  );
};

export default Repos;
