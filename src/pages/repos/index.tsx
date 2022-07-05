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
          'View all repos supported on GitPOAP - a decentralized reputation platform that represents off-chain accomplishments and contributions on chain as POAPs.'
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

/*
todo:

lata:
1. add back gitpoaps, contributors, & claims to RepoHex
9. fix issue with search on repo page?
1. add minted gitpoap count as a sort option for repos.
13. change icons so that if they're not clickable, they don't have hover effects.
14. add sorting by contributor count & gitpoap count for organizations
15. create query for totalOrgs
16. create search route for orgs too.
*/
