import { Grid } from '@mantine/core';
import { GetStaticPropsContext } from 'next';
import { SSRData, withUrqlClient } from 'next-urql';
import { useRouter } from 'next/router';
import { rem } from 'polished';
import React from 'react';
import styled from 'styled-components';
import { BackgroundHexes } from '../../../components/gitpoap/BackgroundHexes';
import { GitPOAPHolders } from '../../../components/gitpoap/GitPOAPHolders';
import { Header as PageHeader } from '../../../components/gitpoap/Header';
import { SEO } from '../../../components/shared/compounds/SEO';
import { Header } from '../../../components/shared/elements/Header';
import { ONE_HOUR_IN_S } from '../../../constants';
import {
  AllGitPoapIdsDocument,
  AllGitPoapIdsQuery,
  GitPoapEventDocument,
  GitPoapEventQuery,
} from '../../../graphql/generated-gql';
import { createSSRUrqlClient, urqlClientOptions } from '../../../lib/urql';
import { NextPageWithLayout } from '../../_app';

const Error = styled(Header)`
  position: fixed;
  top: ${rem(333)};
  left: 50%;
  transform: translate(-50%, -50%);
`;

type PageProps = {
  gitPOAPEvent: GitPoapEventQuery['gitPOAPEvent'];
  urqlState: SSRData;
};

const GitPOAP: NextPageWithLayout<PageProps> = ({ gitPOAPEvent }) => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <>
      <SEO
        title={`${gitPOAPEvent?.event.name.replace('GitPOAP: ', '') ?? 'GitPOAP'} | GitPOAP`}
        description={gitPOAPEvent?.event.description ?? 'GitPOAP'}
        image={gitPOAPEvent?.event.image_url ?? 'https://gitpoap.io/og-image-512x512.png'}
        url={`https://gitpoap.io/gp/${id}`}
      />
      {gitPOAPEvent ? (
        <Grid justify="center" style={{ zIndex: 1 }}>
          <BackgroundHexes />
          <Grid.Col style={{ zIndex: 1 }}>
            <PageHeader gitPOAPEvent={gitPOAPEvent} />
          </Grid.Col>
          <Grid.Col span={11}>
            <GitPOAPHolders gitPOAPId={gitPOAPEvent.gitPOAP.id} />
          </Grid.Col>
        </Grid>
      ) : (
        <Error>{'GitPOAP Not Found'}</Error>
      )}
    </>
  );
};

/* Based on the path objects generated in getStaticPaths, statically generate pages for all
 * unique GitPOAP ids at built time.
 *
 * Revalidation isn't necessary since metadata is not changing - namely the name, description, and img_url.
 */
export const getStaticProps = async (
  context: GetStaticPropsContext<{ id: string }>,
): Promise<{
  props: PageProps;
  revalidate: number;
}> => {
  const { client, ssrCache } = createSSRUrqlClient();
  const id = parseInt(context.params?.id as string);
  const results = await client
    ?.query<GitPoapEventQuery>(GitPoapEventDocument, {
      id,
    })
    .toPromise();

  return {
    props: {
      urqlState: ssrCache.extractData(),
      gitPOAPEvent: results?.data?.gitPOAPEvent,
    },
    revalidate: ONE_HOUR_IN_S,
  };
};

export const getStaticPaths = async () => {
  const { client } = createSSRUrqlClient();
  const results = await client?.query<AllGitPoapIdsQuery>(AllGitPoapIdsDocument, {}).toPromise();
  const paths =
    results?.data?.gitPOAPS.map((gitpoap) => ({
      params: { id: gitpoap.id.toString() },
    })) ?? [];

  return {
    paths,
    fallback: 'blocking',
  };
};

export default withUrqlClient(() => urqlClientOptions, { ssr: false, staleWhileRevalidate: true })(
  GitPOAP,
);
