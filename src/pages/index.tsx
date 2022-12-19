import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { Grid } from '@mantine/core';
import { NextPageWithLayout } from './_app';
import { BannerStats } from '../components/home/BannerStats';
import { MostClaimed } from '../components/home/MostClaimed';
import { LeaderBoard } from '../components/home/LeaderBoard';
import { RecentlyAdded } from '../components/home/RecentlyAdded';
import { BackgroundHexes } from '../components/home/BackgroundHexes';
import { SEO } from '../components/shared/compounds/SEO';
import { FurtherInfoFor } from '../components/home/FurtherInfoFor';
import { FurtherInfoHow } from '../components/home/FurtherInfoHow';
import { Banner } from '../components/home/Banner';
import { LatestMint } from '../components/home/LatestMints';
import { TrendingRepos } from '../components/home/TrendingRepos';
import { CreateGitPOAPsBanner } from '../components/home/HomeBanners';

const Background = styled(BackgroundHexes)`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: absolute;
  z-index: -1;
  width: 100%;
  min-width: ${rem(1200)};
`;

const CenteredCol = styled(Grid.Col)`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Home: NextPageWithLayout = () => {
  return (
    <>
      <SEO
        title={'Home | GitPOAP'}
        description={
          'GitPOAP is a decentralized reputation platform that represents off-chain accomplishments and contributions on chain as POAPs.'
        }
        image={'https://gitpoap.io/og-image-512x512.png'}
        url={'https://gitpoap.io/'}
      />

      <Grid justify="center" style={{ zIndex: 0, position: 'relative' }}>
        <Background />
        <CenteredCol span={11} lg={10} xl={10} style={{ zIndex: 0 }}>
          <CreateGitPOAPsBanner />
          <Banner />
        </CenteredCol>
        <Grid.Col xs={11} md={8}>
          <BannerStats />
        </Grid.Col>
      </Grid>

      <Grid columns={24} justify="center" style={{ marginTop: rem(100), marginBottom: rem(50) }}>
        <CenteredCol xs={22} sm={22} md={11} lg={11} xl={10} style={{ zIndex: 0 }}>
          <TrendingRepos />
        </CenteredCol>
        <CenteredCol xs={20} sm={20} md={9} lg={11} xl={10} style={{ zIndex: 0 }}>
          <LatestMint />
        </CenteredCol>
      </Grid>

      <Grid columns={24} justify="center" style={{ marginBottom: rem(50) }}>
        <Grid.Col xs={22} md={13} xl={14} style={{ zIndex: 0 }}>
          <MostClaimed />
        </Grid.Col>
        <Grid.Col xs={20} md={7} xl={6} style={{ zIndex: 0 }}>
          <LeaderBoard />
        </Grid.Col>
      </Grid>

      <Grid justify="center" style={{ zIndex: 0, marginBottom: rem(50) }}>
        <Grid.Col xs={10} span={10}>
          <RecentlyAdded />
        </Grid.Col>
      </Grid>

      <Grid justify="center" gutter={40} style={{ zIndex: 0, marginBottom: rem(75) }}>
        <FurtherInfoHow />
      </Grid>

      <Grid justify="center" gutter={40} style={{ zIndex: 0, marginBottom: rem(75) }}>
        <FurtherInfoFor />
      </Grid>
    </>
  );
};

export default Home;
