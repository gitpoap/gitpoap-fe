import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { Center, Grid, Group } from '@mantine/core';
import { Page } from './_app';
import { BackgroundPanel2, TextLight } from '../colors';
import { BannerStats } from '../components/home/BannerStats';
import { Layout } from '../components/Layout';
import { MostClaimed } from '../components/home/MostClaimed';
import { LeaderBoard } from '../components/home/LeaderBoard';
import { RecentlyAdded } from '../components/home/RecentlyAdded';
import { SuggestionForm } from '../components/home/SuggestionForm';
import { BackgroundHexes } from '../components/home/BackgroundHexes';
import { useFeatures } from '../components/FeaturesContext';
import { Divider } from '@mantine/core';
import { SEO } from '../components/SEO';

const HeaderStyled = styled.span`
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  font-family: PT Mono;
  font-style: normal;
  font-weight: bold;
  font-size: ${rem(24)};
  line-height: ${rem(30)};
  text-align: center;
  letter-spacing: ${rem(1)};
  color: ${TextLight};
  margin-bottom: ${rem(60)};
  margin-top: ${rem(75)};
`;

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

const Home: Page = () => {
  const features = useFeatures();

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
        <Grid.Col span={8} style={{ zIndex: 0 }}>
          <HeaderStyled>{'Mint POAPs for open source contributions'}</HeaderStyled>
        </Grid.Col>
        <Grid.Col span={8}>
          <BannerStats />
        </Grid.Col>
      </Grid>

      <Grid columns={24} justify="center" style={{ marginTop: rem(100), marginBottom: rem(100) }}>
        <Grid.Col xs={22} md={13} xl={14} style={{ zIndex: 0 }}>
          <MostClaimed />
        </Grid.Col>
        <Grid.Col xs={20} md={7} xl={6} style={{ zIndex: 0 }}>
          <LeaderBoard />
        </Grid.Col>
      </Grid>

      {features.hasHomePageRecentProjects && (
        <Grid justify="center" style={{ zIndex: 0, marginBottom: rem(100) }}>
          <Grid.Col span={10}>
            <RecentlyAdded />
          </Grid.Col>
        </Grid>
      )}
      <Grid align="center" justify="center" style={{ zIndex: 0, marginBottom: rem(100) }}>
        <Grid.Col span={10}>
          <Group direction="column" position="center" align="center">
            <Divider style={{ width: '75%', borderTopColor: BackgroundPanel2 }} />
            <Center style={{ marginTop: rem(30) }}>
              <SuggestionForm />
            </Center>
          </Group>
        </Grid.Col>
      </Grid>
    </>
  );
};

/* Custom layout function for this Home page */
Home.getLayout = (page: React.ReactNode) => {
  return <Layout>{page}</Layout>;
};

export default Home;
