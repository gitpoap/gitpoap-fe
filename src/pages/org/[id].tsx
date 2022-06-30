import React from 'react';
import styled from 'styled-components';
import { rgba, rem } from 'polished';
import { useRouter } from 'next/router';
import { NextPageContext } from 'next';
import { withUrqlClient, initUrqlClient } from 'next-urql';
import { ssrExchange, dedupExchange, cacheExchange, fetchExchange } from 'urql';

import { Page } from '../_app';
import { Layout } from '../../components/Layout';
import { Grid, Loader } from '@mantine/core';
import { MidnightBlue } from '../../colors';
import { SEO } from '../../components/SEO';
import { BREAKPOINTS } from '../../constants';
import { Header } from '../../components/shared/elements/Header';
import { BackgroundHexes } from '../../components/organization/BackgroundHexes';
import { Header as PageHeader } from '../../components/organization/Header';
import { ProjectList } from '../../components/organization/ProjectList';
import { OrganizationDataQuery, OrganizationDataDocument } from '../../graphql/generated-gql';
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
    to right,
    ${rgba(MidnightBlue, 0)} 0%,
    ${rgba(MidnightBlue, 1)} 20%,
    ${rgba(MidnightBlue, 1)} 80%,
    ${rgba(MidnightBlue, 0)} 100%
  );
`;

const OrgNotFound = styled(Header)`
  margin-top: ${rem(284)};
`;

const Loading = styled(Loader)`
  margin-top: ${rem(284)};
`;

const ContentWrapper = styled.div`
  margin: ${rem(100)} ${rem(48)};
  display: flex;

  @media (max-width: ${BREAKPOINTS.md}px) {
    margin: ${rem(50)} ${rem(24)};
    flex-direction: column-reverse;
  }
`;

const ProjectsWrapper = styled.div`
  flex: 1;

  @media (max-width: ${BREAKPOINTS.md}px) {
    justify-content: center;
    width: 100%;
    margin: auto;
  }
`;

const Error = styled(Header)`
  position: fixed;
  top: ${rem(333)};
  left: 50%;
  transform: translate(-50%, -50%);
`;

type PageProps = {
  data: OrganizationDataQuery;
};

const Project: Page<PageProps> = (props) => {
  const router = useRouter();
  const { id } = router.query;

  if (typeof id !== 'string') {
    return <></>;
  }

  const orgId = parseInt(id);

  if (isNaN(orgId)) {
    return <Error>{'404'}</Error>;
  }

  const org = props.data.organizationData;

  return (
    <Grid justify="center" style={{ zIndex: 1 }}>
      <SEO
        title={`${org?.name ?? 'GitPOAP'} | GitPOAP`}
        description={
          'GitPOAP is a decentralized reputation platform that represents off-chain accomplishments and contributions on chain as POAPs.'
        }
        image={'https://gitpoap.io/og-image-512x512.png'}
        url={`https://gitpoap.io/org/${orgId}`}
      />
      <Background />
      {org ? (
        <>
          <Grid.Col style={{ zIndex: 1 }}>
            <PageHeader org={org} />
          </Grid.Col>

          <Grid.Col>
            <ContentWrapper>
              <ProjectsWrapper>
                <ProjectList orgId={orgId} />
              </ProjectsWrapper>
            </ContentWrapper>
          </Grid.Col>
        </>
      ) : (
        <OrgNotFound>Organization Not Found</OrgNotFound>
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
  const orgId = parseInt(context.query.id as string);
  const results = await client!
    .query<OrganizationDataQuery>(OrganizationDataDocument, {
      orgId,
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
