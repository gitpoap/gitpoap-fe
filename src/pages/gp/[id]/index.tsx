import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { GetStaticPropsContext } from 'next';
import { useRouter } from 'next/router';
import { withUrqlClient, SSRData } from 'next-urql';
import { Grid } from '@mantine/core';
import { NextPageWithLayout } from '../../_app';
import { BackgroundHexes } from '../../../components/gitpoap/BackgroundHexes';
import { GitPOAPHolders } from '../../../components/gitpoap/GitPOAPHolders';
import { Header as PageHeader } from '../../../components/gitpoap/Header';
import { Header } from '../../../components/shared/elements/Header';
import {
  AllGitPoapIdsDocument,
  AllGitPoapIdsQuery,
  GitPoapEventDocument,
  GitPoapEventQuery,
} from '../../../graphql/generated-gql';
import { SEO } from '../../../components/shared/compounds/SEO';
import { ONE_WEEK_IN_S } from '../../../constants';
import { createSSRUrqlClient, urqlClientOptions } from '../../../lib/urql';

const Error = styled(Header)`
  position: fixed;
  top: ${rem(333)};
  left: 50%;
  transform: translate(-50%, -50%);
`;

type PageProps = {
  urqlState: SSRData;
  gitpoap: GitPoapEventQuery | null;
};

const GitPOAP: NextPageWithLayout<PageProps> = (props) => {
  const router = useRouter();
  const { id } = router.query;

  if (typeof id !== 'string') {
    return <></>;
  }

  const gitPOAPId = parseInt(id);

  if (isNaN(gitPOAPId)) {
    return <Error>{'404'}</Error>;
  }

  const event = props.gitpoap?.gitPOAPEvent?.event;

  return (
    <>
      <SEO
        title={`${event?.name.replace('GitPOAP: ', '') ?? 'GitPOAP'} | GitPOAP`}
        description={event?.description ?? 'GitPOAP'}
        image={event?.image_url ?? 'https://gitpoap.io/og-image-512x512.png'}
        url={`https://gitpoap.io/gp/${id}`}
      />
      <Grid justify="center" style={{ zIndex: 1 }}>
        <BackgroundHexes />
        <Grid.Col style={{ zIndex: 1 }}>
          <PageHeader gitPOAPId={gitPOAPId} />
        </Grid.Col>
        <Grid.Col span={11}>
          <GitPOAPHolders gitPOAPId={gitPOAPId} />
        </Grid.Col>
      </Grid>
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
      gitpoap: results?.data ?? null,
    },
    revalidate: ONE_WEEK_IN_S,
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
