import React from 'react';
import { Grid } from '@mantine/core';
import { NextPageWithLayout } from '../_app';
import { GitPOAPList } from '../../components/gitpoaps/GitPOAPList';
import { SEO } from '../../components/shared/compounds/SEO';

const GitPOAPs: NextPageWithLayout = () => {
  return (
    <>
      <SEO
        title={`GitPOAPs | GitPOAP`}
        description={
          'View all GitPOAPs on GitPOAP - a decentralized reputation platform that represents off-chain accomplishments and contributions on chain as POAPs.'
        }
        image={'https://gitpoap.io/og-image-512x512.png'}
        url={`https://gitpoap.io/gitpoaps`}
      />
      <Grid justify="center">
        <Grid.Col xs={11} md={10}>
          <GitPOAPList />
        </Grid.Col>
      </Grid>
    </>
  );
};

export default GitPOAPs;
