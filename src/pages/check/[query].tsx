import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Grid } from '@mantine/core';
import { Page } from '../_app';
import { CheckEligibility } from '../../components/check/CheckEligibility';

const Search: Page = () => {
  const router = useRouter();
  const searchQuery = router.query.query as string;

  return (
    <>
      <Head>
        <title>{`${searchQuery ?? 'Check Eligibility '} | GitPOAP`}</title>
        <meta
          name="GitPOAP is a decentralized reputation platform that represents off-chain accomplishments and contributions on chain as POAPs."
          content="GitPOAP Eligibility Check"
        />
      </Head>
      <Grid justify="center">
        <Grid.Col xs={11} sm={11} md={11} lg={10} xl={10}>
          <CheckEligibility />
        </Grid.Col>
      </Grid>
    </>
  );
};

export default Search;
