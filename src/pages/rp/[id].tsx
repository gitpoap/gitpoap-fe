import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { useRouter } from 'next/router';
import { GetStaticPropsContext } from 'next';
import { withUrqlClient, SSRData } from 'next-urql';
import { Grid } from '@mantine/core';
import { NextPageWithLayout } from '../_app';
import { RepoPage, RepoNotFound } from '../../components/repo/RepoPage';
import { SEO } from '../../components/shared/compounds/SEO';
import { Header } from '../../components/shared/elements/Header';
import {
  RepoSeoByIdQuery,
  RepoSeoByIdDocument,
  ReposGetStaticPathsQuery,
  ReposGetStaticPathsDocument,
} from '../../graphql/generated-gql';
import { createSSRUrqlClient, urqlClientOptions } from '../../lib/urql';

const Error = styled(Header)`
  position: fixed;
  top: ${rem(333)};
  left: 50%;
  transform: translate(-50%, -50%);
`;

type PageProps = {
  urqlState: SSRData;
  data: RepoSeoByIdQuery | null;
};

const Repo: NextPageWithLayout<PageProps> = (props) => {
  const router = useRouter();
  const { id } = router.query;

  if (typeof id !== 'string') {
    return <></>;
  }

  const repoId = parseInt(id);

  if (isNaN(repoId)) {
    return <Error>{'404'}</Error>;
  }

  const repo = props.data?.repoData;

  return (
    <Grid justify="center" style={{ zIndex: 1 }}>
      <SEO
        title={`${repo?.name ?? 'GitPOAP'} | GitPOAP`}
        description={
          'GitPOAP is a decentralized reputation platform that represents off-chain accomplishments and contributions on chain as POAPs.'
        }
        image={'https://gitpoap.io/og-image-512x512.png'}
        url={`https://gitpoap.io/gh/${repo?.organization.name}/${repo?.name}`}
      />
      {repo?.id ? <RepoPage repoId={repo.id} /> : <RepoNotFound>{'Repo Not Found'}</RepoNotFound>}
    </Grid>
  );
};

/* Based on the path objects generated in getStaticPaths, statically generate pages for all
 * unique repo pages ids at built time.
 *
 * Revalidation isn't necessary since metadata is not changing - namely the repo name & organization name.
 */
export const getStaticProps = async (
  context: GetStaticPropsContext<{ id: string }>,
): Promise<{ props: PageProps }> => {
  const { client, ssrCache } = createSSRUrqlClient();
  const repoId = parseInt(context.params?.id as string);
  const results = await client
    ?.query<RepoSeoByIdQuery>(RepoSeoByIdDocument, {
      repoId,
    })
    .toPromise();

  return {
    props: {
      urqlState: ssrCache.extractData(),
      /* coalesce to null if no data is returned -> nextJS doesn't like 'undefined' */
      data: results?.data ?? null,
    },
  };
};

/* Statically generate all repo pages at build time - collect all sets of unique paths
 * paths: { params: { id: string } }[]
 */
export const getStaticPaths = async () => {
  const { client } = createSSRUrqlClient();
  const results = await client
    ?.query<ReposGetStaticPathsQuery>(ReposGetStaticPathsDocument, {})
    .toPromise();

  const paths =
    results?.data?.repos.map((repo) => ({
      params: { id: repo.id.toString() },
    })) ?? [];

  return {
    paths,
    fallback: 'blocking',
  };
};

export default withUrqlClient(
  () => urqlClientOptions,
  { ssr: false }, // Important so we don't wrap our component in getInitialProps
)(Repo);
