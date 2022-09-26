import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import { Grid } from '@mantine/core';
import { Page } from '../_app';
import { SearchResults } from '../../components/search/results/SearchResults';

const Search: Page = () => {
  const router = useRouter();
  const searchQuery = router.query.query as string;

  return (
    <>
      <Head>
        <title>{`${searchQuery ?? 'Search'} | GitPOAP`}</title>
        <meta
          name="GitPOAP is a decentralized reputation platform that represents off-chain accomplishments and contributions on chain as POAPs."
          content="GitPOAP Search"
        />
      </Head>
      <Grid justify="center">
        <Grid.Col xs={11} sm={11} md={11} lg={10} xl={10}>
          <SearchResults searchQuery={searchQuery} />
        </Grid.Col>
      </Grid>
    </>
  );
};

export default Search;
