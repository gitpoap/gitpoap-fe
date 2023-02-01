import { Center, Text } from '@mantine/core';
import { GetStaticPaths, GetStaticPropsContext } from 'next';
import { SSRData } from 'next-urql';
import Head from 'next/head';
import React from 'react';
import { ConnectGitHub } from '../../../../components/admin/ConnectGitHub';
import { SingleRequestPage } from '../../../../components/admin/requests/SingleRequestPage';
import { GitPoapRequestDocument, GitPoapRequestQuery } from '../../../../graphql/generated-gql';
import { useUser } from '../../../../hooks/useUser';
import { createSSRUrqlClient } from '../../../../lib/urql';
import { NextPageWithLayout } from '../../../_app';

type PageProps = {
  urqlState: SSRData;
  gitPOAPRequest: GitPoapRequestQuery['gitPOAPRequest'];
};

const AdminGitPOAPRequests: NextPageWithLayout<PageProps> = ({ gitPOAPRequest }) => {
  const user = useUser();

  if (!gitPOAPRequest) {
    return (
      <Center>
        <Text>{'Request not found'}</Text>
      </Center>
    );
  }

  return (
    <>
      <Head>
        <title>{'Requests | GitPOAP'}</title>
        <meta name="description" content="GitPOAP Admin" />
      </Head>
      {user?.permissions.isStaff ? (
        <SingleRequestPage gitPOAPRequest={gitPOAPRequest} />
      ) : (
        <ConnectGitHub />
      )}
    </>
  );
};

/* Based on the path objects generated in getStaticPaths, statically generate pages for all
 * unique org names at built time.
 */
export const getStaticProps = async (
  context: GetStaticPropsContext<{ id: string }>,
): Promise<{ props: PageProps }> => {
  const { client, ssrCache } = createSSRUrqlClient();
  const gitPOAPRequestId = context.params?.id as string;
  const results = await client
    ?.query<GitPoapRequestQuery>(GitPoapRequestDocument, {
      gitPOAPRequestId,
    })
    .toPromise();

  return {
    props: {
      urqlState: ssrCache.extractData(),
      /* coalesce to null if no data is returned -> nextJS doesn't like 'undefined' */
      gitPOAPRequest: results?.data?.gitPOAPRequest,
    },
  };
};

export const getStaticPaths: GetStaticPaths<{ slug: string }> = async () => {
  return {
    paths: [], // indicates that no page needs be created at build time
    fallback: 'blocking', // indicates the type of fallback
  };
};

export default AdminGitPOAPRequests;
