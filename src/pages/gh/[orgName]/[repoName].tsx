import React from 'react';
import { useRouter } from 'next/router';
import { GetStaticPropsContext } from 'next';
import { withUrqlClient, initUrqlClient } from 'next-urql';
import { ssrExchange, dedupExchange, cacheExchange, fetchExchange } from 'urql';
import { Grid } from '@mantine/core';
import { Page } from '../../_app';
import { RepoPage, RepoNotFound } from '../../../components/repo/RepoPage';
import { Layout } from '../../../components/Layout';
import {
  RepoSeoByNameQuery,
  RepoSeoByNameDocument,
  ReposGetStaticPathsQuery,
  ReposGetStaticPathsDocument,
} from '../../../graphql/generated-gql';
import { SEO } from '../../../components/SEO';

type PageProps = {
  data: RepoSeoByNameQuery;
};

const Repo: Page<PageProps> = (props) => {
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
        url={`https://gitpoap.io/${repo && `gh/${repo.organization.name}/${repo.name}`}`}
      />
      {repo?.id ? <RepoPage repoId={repo.id} /> : <RepoNotFound>{'Repo Not Found'}</RepoNotFound>}
    </Grid>
  );
};

/* Based on the path objects generated in getStaticPaths, statically generate pages for all
 * unique repo pages id at built time.
 *
 * Revalidation isn't necessary since metadata is not changing - namely the id, repo name & organization name.
 */
export const getStaticProps = async (
  context: GetStaticPropsContext<{ orgName: string; repoName: string }>,
) => {
  const ssrCache = ssrExchange({ isClient: false });
  const client = initUrqlClient(
    {
      url: `${process.env.NEXT_PUBLIC_GITPOAP_API_URL}/graphql`,
      exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange],
    },
    false,
  );
  const orgName = context.params?.orgName as string;
  const repoName = context.params?.repoName as string;
  const results = await client!
    .query<RepoSeoByNameQuery>(RepoSeoByNameDocument, {
      orgName,
      repoName,
    })
    .toPromise();

  return {
    props: {
      urqlState: ssrCache.extractData(),
      /* coalesce to null if no data is returned -> nextJS doesn't like 'undefined' */
      data: results.data ?? null,
    },
  };
};

/* Statically generate all repo pages at build time - collect all sets of unique paths
 * paths: { params: { orgName: string, repoName: string } }[]
 */
export const getStaticPaths = async () => {
  const ssrCache = ssrExchange({ isClient: false });
  const client = initUrqlClient(
    {
      url: `${process.env.NEXT_PUBLIC_GITPOAP_API_URL}/graphql`,
      exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange],
    },
    false,
  );

  const results = await client!
    .query<ReposGetStaticPathsQuery>(ReposGetStaticPathsDocument, {})
    .toPromise();

  const paths = results.data?.repos.map((repo) => ({
    params: { orgName: repo.organization.name, repoName: repo.name },
  }));

  return {
    paths,
    fallback: 'blocking',
  };
};

export default withUrqlClient(
  (_) => ({
    url: `${process.env.NEXT_PUBLIC_GITPOAP_API_URL}/graphql`,
  }),
  { ssr: false }, // Important so we don't wrap our component in getInitialProps
)(Repo);
