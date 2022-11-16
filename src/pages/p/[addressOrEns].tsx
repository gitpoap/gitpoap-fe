import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { Grid } from '@mantine/core';
import { GetStaticPropsContext } from 'next';
import { Page } from '../_app';
import { AllPOAPs } from '../../components/profile/AllPOAPs';
import { GitPOAPs } from '../../components/profile/GitPOAPs';
import { ProfileSidebar } from '../../components/profile/ProfileSidebar';
import { FeaturedPOAPs } from '../../components/profile/FeaturedPOAPs';
import { FeaturedPOAPsProvider } from '../../components/profile/FeaturedPOAPsContext';
import { ProfileProvider } from '../../components/profile/ProfileContext';
import { truncateAddress } from '../../helpers';
import { BackgroundHexes } from '../../components/home/BackgroundHexes';
import { BREAKPOINTS, ONE_WEEK_IN_S } from '../../constants';
import { SEO } from '../../components/shared/compounds/SEO';
import { initUrqlClient, SSRData, withUrqlClient } from 'next-urql';
import { ssrExchange, dedupExchange, cacheExchange, fetchExchange } from 'urql';
import {
  AllProfilesWithAnyDataDocument,
  AllProfilesWithAnyDataQuery,
  ProfileDataForSsrDocument,
  ProfileDataForSsrQuery,
} from '../../graphql/generated-gql';

const Background = styled(BackgroundHexes)`
  position: fixed;
  top: ${rem(50)};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: 0;
  width: ${rem(1840)};
`;

const ProfileSidebarWrapper = styled(Grid.Col)`
  @media (max-width: ${BREAKPOINTS.lg}px) {
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;

type PageProps = {
  urqlState: SSRData;
  profile: ProfileDataForSsrQuery['profiles'][number] | null;
};

const Profile: Page<PageProps> = (props) => {
  const address = props.profile?.address.ethAddress;
  const ensName = props.profile?.address.ensName;
  const ensAvatarImageUrl = props.profile?.address.ensAvatarImageUrl;
  const identifier = ensName ?? address ?? null;

  const seoTitle = ensName ?? truncateAddress(address ?? '', 8, 4);
  const seoDescription = `View ${seoTitle}'s profile on GitPOAP - a decentralized reputation platform that represents off-chain accomplishments and contributions on chain as POAPs.`;

  return (
    <>
      <SEO
        title={`${seoTitle} | GitPOAP`}
        description={seoDescription}
        image={ensAvatarImageUrl ?? 'https://gitpoap.io/og-image-512x512.png'}
        url={`https://gitpoap.io/p/${identifier}`}
      />
      <ProfileProvider addressOrEns={identifier}>
        <FeaturedPOAPsProvider>
          <Grid justify="center" mt={rem(40)} style={{ zIndex: 1 }}>
            <Background />
            <ProfileSidebarWrapper lg={2}>
              <ProfileSidebar />
            </ProfileSidebarWrapper>
            <Grid.Col lg={8} xl={9} style={{ zIndex: 1 }}>
              <Grid justify="center">
                <Grid.Col xs={11} md={10} mt={rem(60)}>
                  <FeaturedPOAPs />
                </Grid.Col>
                {identifier && (
                  <>
                    <Grid.Col xs={11} md={10}>
                      <GitPOAPs address={identifier ?? null} />
                    </Grid.Col>
                    <Grid.Col xs={11} md={10} mb={rem(50)}>
                      <AllPOAPs address={identifier ?? null} />
                    </Grid.Col>
                  </>
                )}
              </Grid>
            </Grid.Col>
          </Grid>
        </FeaturedPOAPsProvider>
      </ProfileProvider>
    </>
  );
};

type GetStaticPathsReturnType = {
  paths: { params: { addressOrEns: string } }[];
  fallback: string;
};

export const getStaticProps = async (
  context: GetStaticPropsContext<GetStaticPathsReturnType['paths'][number]['params']>,
): Promise<{
  props: PageProps;
  revalidate: number;
}> => {
  const ssrCache = ssrExchange({ isClient: false });
  const client = initUrqlClient(
    {
      url: `${process.env.NEXT_PUBLIC_GITPOAP_API_URL}/graphql`,
      exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange],
    },
    false,
  );
  const addressOrEns = context.params?.addressOrEns;
  const results = await client
    ?.query<ProfileDataForSsrQuery>(ProfileDataForSsrDocument, {
      addressOrEns: addressOrEns,
    })
    .toPromise();

  return {
    props: {
      urqlState: ssrCache.extractData(),
      profile: results?.data?.profiles[0] ?? null,
    },
    revalidate: ONE_WEEK_IN_S,
  };
};

export const getStaticPaths = async (): Promise<GetStaticPathsReturnType> => {
  const ssrCache = ssrExchange({ isClient: false });
  const client = initUrqlClient(
    {
      url: `${process.env.NEXT_PUBLIC_GITPOAP_API_URL}/graphql`,
      exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange],
    },
    false,
  );

  const results = await client
    ?.query<AllProfilesWithAnyDataQuery>(AllProfilesWithAnyDataDocument, {})
    .toPromise();
  const paths =
    results?.data?.profiles.map((profile) => ({
      params: { addressOrEns: profile.address.ethAddress.toString() },
    })) ?? [];

  return {
    paths,
    fallback: 'blocking',
  };
};

export default withUrqlClient(
  () => ({
    url: `${process.env.NEXT_PUBLIC_GITPOAP_API_URL}/graphql`,
  }),
  { ssr: false, staleWhileRevalidate: true },
)(Profile);
