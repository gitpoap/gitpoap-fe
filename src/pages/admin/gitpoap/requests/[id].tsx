import { Container, Title } from '@mantine/core';
import { GetStaticPaths, GetStaticPropsContext } from 'next';
import { SSRData, withUrqlClient } from 'next-urql';
import Head from 'next/head';
import React from 'react';
import { ConnectGitHub } from '../../../../components/admin/ConnectGitHub';
import { SingleRequestPage } from '../../../../components/admin/requests/SingleRequestPage';
import { GitPoapRequestDocument, GitPoapRequestQuery } from '../../../../graphql/generated-gql';
import { useUser } from '../../../../hooks/useUser';
import { createSSRUrqlClient, urqlClientOptions } from '../../../../lib/urql';
import { NextPageWithLayout } from '../../../_app';

type PageProps = {
  urqlState: SSRData;
  gitPOAPRequest: GitPoapRequestQuery['gitPOAPRequest'] | null;
};

const AdminGitPOAPRequest: NextPageWithLayout<PageProps> = ({ gitPOAPRequest }) => {
  const user = useUser();
  return (
    <>
      <Head>
        <title>{'Requests | GitPOAP'}</title>
        <meta name="description" content="GitPOAP Admin" />
      </Head>
      {gitPOAPRequest ? (
        user?.permissions.isStaff ? (
          <Container>
            <SingleRequestPage gitPOAPRequest={gitPOAPRequest} />
          </Container>
        ) : (
          <ConnectGitHub />
        )
      ) : (
        <Container mt={64}>
          <Title>{'Request not found'}</Title>
        </Container>
      )}
    </>
  );
};

/* Based on the path objects generated in getStaticPaths, statically generate pages for all
 * unique org names at built time.
 */
export const getStaticProps = async (
  context: GetStaticPropsContext<{ id: string }>,
): Promise<{ props: PageProps; revalidate: number }> => {
  const { client, ssrCache } = createSSRUrqlClient();
  const gitPOAPRequestId = parseInt(context.params?.id as string);
  const results = await client
    ?.query<GitPoapRequestQuery>(GitPoapRequestDocument, {
      gitPOAPRequestId,
    })
    .toPromise();

  return {
    props: {
      urqlState: ssrCache.extractData(),
      /* coalesce to null if no data is returned -> nextJS doesn't like 'undefined' */
      gitPOAPRequest: results?.data?.gitPOAPRequest ?? null,
    },
    revalidate: 1,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [],
    fallback: 'blocking', // indicates the type of fallback
  };
};

export default withUrqlClient(
  () => urqlClientOptions,
  { ssr: false }, // Important so we don't wrap our component in getInitialProps
)(AdminGitPOAPRequest);
