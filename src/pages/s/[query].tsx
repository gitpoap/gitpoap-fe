import React from 'react';
import { useRouter } from 'next/router';
import { Grid } from '@mantine/core';
import { Page } from '../_app';
import { Layout } from '../../components/Layout';
import { SEO } from '../../components/SEO';
import { SearchResults } from '../../components/search/v2/SearchResults';

const Search: Page = () => {
  const router = useRouter();
  const searchQuery = router.query.query as string;

  console.log('query', searchQuery);

  return (
    <>
      <SEO
        title={`Search | GitPOAP`}
        description={
          'View search results on GitPOAP - a decentralized reputation platform that represents off-chain accomplishments and contributions on chain as POAPs.'
        }
        image={'https://gitpoap.io/og-image-512x512.png'}
        url={`https://gitpoap.io/s`}
      />
      <Grid justify="center">
        <Grid.Col xs={11} sm={11} md={11} lg={10} xl={10}>
          <SearchResults searchQuery={searchQuery} />
        </Grid.Col>
      </Grid>
    </>
  );
};

/* Custom layout function for this page */
Search.getLayout = (page: React.ReactNode) => {
  return <Layout>{page}</Layout>;
};

export default Search;

/* TODO:
(3) get profiles showing up -> max 10
(6) Move all queries to the top level SearchPage component.
(7) Add autocomplete to that search box
(8) Figure out if we want
(9) Pressing Enter in the top search box takes you to the results page with specified query
(10) if no query is entereed, remove the param from the URL.
*/
