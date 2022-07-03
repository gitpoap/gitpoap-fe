import React from 'react';
import styled from 'styled-components';
import { rgba, rem } from 'polished';
import { useRouter } from 'next/router';
import { NextPageContext } from 'next';
import { withUrqlClient, initUrqlClient } from 'next-urql';
import { ssrExchange, dedupExchange, cacheExchange, fetchExchange } from 'urql';

import { Grid } from '@mantine/core';

import { Page } from '../../_app';
import { MidnightBlue } from '../../../colors';
import { BackgroundHexes } from '../../../components/project/BackgroundHexes';
import { GitPOAPs } from '../../../components/project/GitPOAPs';
import { ProjectLeaderBoard } from '../../../components/project/ProjectLeaderBoard';
import { Header as PageHeader } from '../../../components/project/Header';
import { Layout } from '../../../components/Layout';
import { Header } from '../../../components/shared/elements/Header';
import { BREAKPOINTS, ONE_DAY } from '../../../constants';
import { RepoDataQuery, RepoDataDocument } from '../../../graphql/generated-gql';
import { SEO } from '../../../components/SEO';

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
    to right,
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

const ContentWrapper = styled.div`
  margin: ${rem(100)} ${rem(48)};
  display: flex;

  @media (max-width: ${BREAKPOINTS.md}px) {
    margin: ${rem(50)} ${rem(24)};
    flex-direction: column-reverse;
  }
`;

const GitPOAPsWrapper = styled.div`
  flex: 1;
  margin-right: ${rem(48)};

  @media (max-width: ${BREAKPOINTS.md}px) {
    justify-content: center;
    width: 100%;
    margin: auto;
  }
`;

const ProjectLeaderBoardWrapper = styled.div`
  width: ${rem(348)};

  @media (max-width: ${BREAKPOINTS.md}px) {
    justify-content: center;
    width: 100%;
    margin: auto;
    margin-bottom: ${rem(100)};
    max-width: 100%;
  }
`;

const ProjectNotFound = styled(Header)`
  margin-top: ${rem(284)};
`;

type PageProps = {
  data: RepoDataQuery;
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
        title={`${repoName} | GitPOAP`}
        description={
          'GitPOAP is a decentralized reputation platform that represents off-chain accomplishments and contributions on chain as POAPs.'
        }
        image={'https://gitpoap.io/og-image-512x512.png'}
        url={`https://gitpoap.io/gh/${orgName}/${repoName}`}
      />
      <Background />
      {repo ? (
        <>
          <Grid.Col style={{ zIndex: 1 }}>
            <PageHeader repo={repo} />
          </Grid.Col>

          <Grid.Col>
            <ContentWrapper>
              <GitPOAPsWrapper>
                <GitPOAPs repoId={repo.id} />
              </GitPOAPsWrapper>
              <ProjectLeaderBoardWrapper>
                <ProjectLeaderBoard repoId={repo.id} />
              </ProjectLeaderBoardWrapper>
            </ContentWrapper>
          </Grid.Col>
        </>
      ) : (
        <ProjectNotFound>Project Not Found</ProjectNotFound>
      )}
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
  const orgName = context.query.orgName;
  const repoName = context.query.repoName;
  const results = await client!
    .query<RepoDataQuery>(RepoDataDocument, {
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
