import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { Grid } from '@mantine/core';
import { isAddress } from 'ethers/lib/utils';
import { GetStaticPropsContext } from 'next';
import { NextPageWithLayout } from '../_app';
import { AllPOAPs } from '../../components/profile/AllPOAPs';
import { GitPOAPs } from '../../components/profile/GitPOAPs';
import { ProfileSidebar } from '../../components/profile/ProfileSidebar';
import { FeaturedPOAPs } from '../../components/profile/FeaturedPOAPs';
import { FeaturedPOAPsProvider } from '../../components/profile/FeaturedPOAPsContext';
import { ProfileProvider } from '../../components/profile/ProfileContext';
import { truncateAddress } from '../../helpers';
import { BackgroundHexes } from '../../components/home/BackgroundHexes';
import { BREAKPOINTS } from '../../constants';
import { SEO } from '../../components/shared/compounds/SEO';

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
  addressOrEns: string;
};

const Profile: NextPageWithLayout<PageProps> = (props) => {
  const seoTitle = isAddress(props.addressOrEns)
    ? truncateAddress(props.addressOrEns ?? '', 8, 4)
    : props.addressOrEns;
  return (
    <>
      <SEO
        title={`${seoTitle} | GitPOAP`}
        description={`View ${seoTitle}'s profile on GitPOAP - a decentralized reputation platform that represents off-chain accomplishments and contributions on chain as POAPs.`}
        image={'https://gitpoap.io/og-image-512x512.png'}
        url={`https://gitpoap.io/p/${props.addressOrEns}`}
      />
      <ProfileProvider addressOrEns={props.addressOrEns}>
        <FeaturedPOAPsProvider>
          <Grid justify="center" style={{ marginTop: rem(40), zIndex: 1 }}>
            <Background />
            <ProfileSidebarWrapper lg={2}>
              <ProfileSidebar />
            </ProfileSidebarWrapper>
            <Grid.Col lg={8} xl={9} style={{ zIndex: 1 }}>
              <Grid justify="center">
                <Grid.Col xs={11} md={10} style={{ marginTop: rem(60) }}>
                  <FeaturedPOAPs />
                </Grid.Col>
                <Grid.Col xs={11} md={10}>
                  <GitPOAPs address={props.addressOrEns} />
                </Grid.Col>
                <Grid.Col xs={11} md={10} style={{ marginBottom: rem(50) }}>
                  <AllPOAPs address={props.addressOrEns} />
                </Grid.Col>
              </Grid>
            </Grid.Col>
          </Grid>
        </FeaturedPOAPsProvider>
      </ProfileProvider>
    </>
  );
};

export const getStaticProps = (context: GetStaticPropsContext<{ id: string }>) => {
  return {
    props: {
      addressOrEns: context.params?.id,
    },
  };
};

// This function gets called at build time on server-side.
// It may be called again, on a serverless function, if
// the path has not been generated.
export const getStaticPaths = () => {
  return { paths: [], fallback: 'blocking' };
};

export default Profile;
