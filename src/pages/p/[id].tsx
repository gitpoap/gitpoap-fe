import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { Grid } from '@mantine/core';
import { isAddress } from 'ethers/lib/utils';
import { NextPageContext } from 'next';
import { Page } from '../_app';
import { Layout } from '../../components/Layout';
import { AllPOAPs } from '../../components/profile/AllPOAPs';
import { GitPOAPs } from '../../components/profile/GitPOAPs';
import { ProfileSidebar } from '../../components/profile/ProfileSidebar';
import { FeaturedPOAPs } from '../../components/profile/FeaturedPOAPs';
import { FeaturedPOAPsProvider } from '../../components/profile/FeaturedPOAPsContext';
import { ProfileProvider } from '../../components/profile/ProfileContext';
import { truncateAddress } from '../../helpers';
import { BackgroundHexes } from '../../components/home/BackgroundHexes';
import { BREAKPOINTS } from '../../constants';
import { SEO } from '../../components/SEO';

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

const Profile: Page<PageProps> = (props) => {
  return (
    <>
      <SEO
        title={`${
          isAddress(props.addressOrEns)
            ? truncateAddress(props.addressOrEns ?? '', 4)
            : props.addressOrEns
        } | GitPOAP`}
        description={
          'GitPOAP is a decentralized reputation platform that represents off-chain accomplishments and contributions on chain as POAPs.'
        }
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
            <Grid.Col lg={8} style={{ zIndex: 1 }}>
              <Grid justify="center">
                <Grid.Col span={10} style={{ marginTop: rem(60) }}>
                  <FeaturedPOAPs />
                </Grid.Col>
                <Grid.Col span={10}>
                  <GitPOAPs address={props.addressOrEns} />
                </Grid.Col>
                <Grid.Col span={10} style={{ marginBottom: rem(150) }}>
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

export async function getServerSideProps(context: NextPageContext): Promise<{ props: PageProps }> {
  const addressOrEns = context.query.id as string;

  return {
    props: {
      addressOrEns,
    },
  };
}

/* Custom layout function for this page */
Profile.getLayout = (page: React.ReactNode) => {
  return <Layout>{page}</Layout>;
};

export default Profile;
