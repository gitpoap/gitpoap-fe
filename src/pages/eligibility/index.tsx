import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Grid } from '@mantine/core';
import { NextPageWithLayout } from '../_app';
import { CheckEligibility } from '../../components/eligibility/CheckEligibility';

const CheckEligibilityPage: NextPageWithLayout = () => {
  const router = useRouter();
  const searchQuery = router.query.search as string | undefined;

  return (
    <>
      <Head>
        <title>{`${
          searchQuery ? `${searchQuery} - Check Eligibility` : 'Check Eligibility'
        } | GitPOAP`}</title>
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

export default CheckEligibilityPage;
