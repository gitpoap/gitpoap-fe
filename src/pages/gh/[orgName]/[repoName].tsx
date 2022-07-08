import React from 'react';
import { useRouter } from 'next/router';
import { NextPageContext } from 'next';
import { withUrqlClient, initUrqlClient } from 'next-urql';
import { ssrExchange, dedupExchange, cacheExchange, fetchExchange } from 'urql';

import { Grid } from '@mantine/core';

import { Page } from '../../_app';
import { RepoPage } from '../../../components/repo/RepoPage';
import { Layout } from '../../../components/Layout';
import { ONE_HOUR } from '../../../constants';
import { RepoDataByNameQuery, RepoDataByNameDocument } from '../../../graphql/generated-gql';
import { SEO } from '../../../components/SEO';

type PageProps = {
  data: RepoDataByNameQuery;
};

const Project: Page<PageProps> = (props) => {
  const router = useRouter();
  const { orgName, repoName } = router.query;

  if (typeof orgName !== 'string' || typeof repoName !== 'string') {
    return <></>;
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
        url={`https://gitpoap.io/gh/${repo?.organization?.name}/${repo?.name}`}
      />
      <RepoPage repo={repo} />
    </Grid>
  );
};

export async function getServerSideProps(context: NextPageContext) {
  context.res?.setHeader(
    'Cache-Control',
    `public, s-maxage=${ONE_HOUR}, stale-while-revalidate=${2 * ONE_HOUR}`,
  );

  const ssrCache = ssrExchange({ isClient: false });
  const client = initUrqlClient(
    {
      url: `${process.env.NEXT_PUBLIC_GITPOAP_API_URL}/graphql`,
      exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange],
    },
    false,
  );
  const orgName = context.query.orgName;
  const repoName = context.query.repoName;
  const results = await client!
    .query<RepoDataByNameQuery>(RepoDataByNameDocument, {
      orgName,
      repoName,
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
Project.getLayout = (page: React.ReactNode) => {
  return <Layout>{page}</Layout>;
};

export default withUrqlClient(
  (_) => ({
    url: `${process.env.NEXT_PUBLIC_GITPOAP_API_URL}/graphql`,
  }),
  { ssr: false }, // Important so we don't wrap our component in getInitialProps
)(Project);
