import React from 'react';
import { Grid } from '@mantine/core';
import { Page } from '../_app';
import { OrgList } from '../../components/orgs/OrgList';
import { Layout } from '../../components/Layout';
import { SEO } from '../../components/shared/compounds/SEO';

const Orgs: Page = () => {
  return (
    <>
      <SEO
        title={`Organizations | GitPOAP`}
        description={
          'View all organizations supported on GitPOAP - a decentralized reputation platform that represents off-chain accomplishments and contributions on chain as POAPs.'
        }
        image={'https://gitpoap.io/og-image-512x512.png'}
        url={`https://gitpoap.io/orgs`}
      />

      <Grid justify="center">
        <Grid.Col xs={11} md={9}>
          <OrgList />
        </Grid.Col>
      </Grid>
    </>
  );
};

export default Orgs;
