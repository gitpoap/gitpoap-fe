import React from 'react';
import styled from 'styled-components';
import { rgba, rem } from 'polished';
import { NextPageContext } from 'next';
import { useRouter } from 'next/router';
import { withUrqlClient, initUrqlClient } from 'next-urql';
import { ssrExchange, dedupExchange, cacheExchange, fetchExchange } from 'urql';
import { Grid } from '@mantine/core';

import { Page } from '../_app';
import { MidnightBlue } from '../../colors';
import { BackgroundHexes } from '../../components/gitpoap/BackgroundHexes';
import { GitPOAPHolders } from '../../components/gitpoap/GitPOAPHolders';
import { Header as PageHeader } from '../../components/gitpoap/Header';
import { Layout } from '../../components/Layout';
import { Header } from '../../components/shared/elements/Header';
import { GitPoapEventDocument, GitPoapEventQuery } from '../../graphql/generated-gql';
import { SEO } from '../../components/SEO';
import { ONE_DAY } from '../../constants';

const Background = styled(BackgroundHexes)`
  position: fixed;
  top: 0;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 0;
  width: ${rem(1840)};

  mask-image: linear-gradient(
    to bottom,
    ${rgba(MidnightBlue, 0)} 0%,
    ${rgba(MidnightBlue, 1)} 20%,
    ${rgba(MidnightBlue, 1)} 80%,
    ${rgba(MidnightBlue, 0)} 100%
  );
`;

const Error = styled(Header)`
  position: fixed;
  top: ${rem(333)};
  left: 50%;
  transform: translate(-50%, -50%);
`;

type PageProps = {
  gitpoap: GitPoapEventQuery;
};

const GitPOAP: Page<PageProps> = (props) => {
  const router = useRouter();
  const { id } = router.query;

  if (typeof id !== 'string') {
    return <></>;
  }

  const gitPOAPId = parseInt(id);

  if (isNaN(gitPOAPId)) {
    return <Error>{'404'}</Error>;
  }

  const event = props.gitpoap.gitPOAPEvent?.event;

  return (
    <>
      <SEO
        title={`${event?.name.replace('GitPOAP: ', '') ?? 'GitPOAP'} | GitPOAP`}
        description={event?.description ?? 'GitPOAP'}
        image={event?.image_url ?? 'https://gitpoap.io/og-image-512x512.png'}
        url={`https://gitpoap.io/gp/${id}`}
      />
      <Grid justify="center" style={{ zIndex: 1 }}>
        <Background />
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

export async function getServerSideProps(context: NextPageContext) {
  context.res?.setHeader(
    'Cache-Control',
    `public, s-maxage=${ONE_DAY}, stale-while-revalidate=${ONE_DAY}`,
  );

  const ssrCache = ssrExchange({ isClient: false });
  const client = initUrqlClient(
    {
      url: `${process.env.NEXT_PUBLIC_GITPOAP_API_URL}/graphql`,
      exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange],
    },
    false,
  );
  const id = parseInt(context.query.id as string);
  const results = await client!
    .query<GitPoapEventQuery>(GitPoapEventDocument, {
      id,
    })
    .toPromise();

  return {
    props: {
      // urqlState is a keyword here so withUrqlClient can pick it up.
      urqlState: ssrCache.extractData(),
      gitpoap: results.data,
      revalidate: 600,
    },
  };
}

/* Custom layout function for this page */
GitPOAP.getLayout = (page: React.ReactNode) => {
  return <Layout>{page}</Layout>;
};

export default withUrqlClient(
  (_) => ({
    url: `${process.env.NEXT_PUBLIC_GITPOAP_API_URL}/graphql`,
  }),
  { ssr: false }, // Important so we don't wrap our component in getInitialProps
)(GitPOAP);
