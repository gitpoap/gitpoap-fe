import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { useRouter } from 'next/router';
import { NextPageContext } from 'next';
import { withUrqlClient, initUrqlClient } from 'next-urql';
import { ssrExchange, dedupExchange, cacheExchange, fetchExchange } from 'urql';

import { Grid } from '@mantine/core';

import { Page } from '../_app';
import { RepoPage } from '../../components/repo/RepoPage';
import { SEO } from '../../components/SEO';
import { Layout } from '../../components/Layout';
import { Header } from '../../components/shared/elements/Header';
import { ONE_DAY } from '../../constants';
import { RepoDataQuery, RepoDataDocument } from '../../graphql/generated-gql';

const Error = styled(Header)`
  position: fixed;
  top: ${rem(333)};
  left: 50%;
  transform: translate(-50%, -50%);
`;

type PageProps = {
  data: RepoDataQuery;
};

const Repo: Page<PageProps> = (props) => {
  const router = useRouter();
  const { id } = router.query;

  if (typeof id !== 'string') {
    return <></>;
  }

  const repoId = parseInt(id);

  if (isNaN(repoId)) {
    return <Error>{'404'}</Error>;
  }

  const repo = props.data.repoData;

  return (
    <Grid justify="center" style={{ zIndex: 1 }}>
      <SEO
        title={`${repo?.name ?? 'GitPOAP'} | GitPOAP`}
        description={
          'GitPOAP is a decentralized reputation platform that represents off-chain accomplishments and contributions on chain as POAPs.'
        }
        image={'https://gitpoap.io/og-image-512x512.png'}
        url={`https://gitpoap.io/rp/${repo?.id}`}
      />
      <RepoPage repo={repo} />
    </Grid>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  context.res?.setHeader(
    'Cache-Control',
    `public, s-maxage=${ONE_DAY}, stale-while-revalidate=${2 * ONE_DAY}`,
  );

  const ssrCache = ssrExchange({ isClient: false });
  const client = initUrqlClient(
    {
      url: `${process.env.NEXT_PUBLIC_GITPOAP_API_URL}/graphql`,
      exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange],
    },
    false,
  );
  const repoId = parseInt(context.query.id as string);
  const results = await client!
    .query<RepoDataQuery>(RepoDataDocument, {
      repoId,
    })
    .toPromise();

  return {
    props: {
      // urqlState is a keyword here so withUrqlClient can pick it up.
      urqlState: ssrCache.extractData(),
      data: results.data,
      revalidate: 600,
    },
  };
}

/* Custom layout function for this page */
Repo.getLayout = (page: React.ReactNode) => {
  return <Layout>{page}</Layout>;
};

export default withUrqlClient(
  (_) => ({
    url: `${process.env.NEXT_PUBLIC_GITPOAP_API_URL}/graphql`,
  }),
  { ssr: false }, // Important so we don't wrap our component in getInitialProps
)(Repo);
