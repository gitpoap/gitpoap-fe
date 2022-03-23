import React from 'react';
import styled from 'styled-components';
import { rgba, rem } from 'polished';
import Head from 'next/head';
import { useRouter } from 'next/router';
import Image from 'next/image';

import { Grid } from '@mantine/core';
import { Page } from '../_app';
import { Layout } from '../../components/Layout';
import { GitPOAP as GitPOAPUI } from '../../components/shared/compounds/GitPOAP';
import { GitPOAPHolders } from '../../components/gitpoap/GitPOAPHolders';
import { Header } from '../../components/gitpoap/Header';
import { BackgroundHexes } from '../../components/gitpoap/BackgroundHexes';
import { default as BackgroundHexesSVG } from '../../components/gitpoap/BackgroundHexes.svg';
import { MidnightBlue } from '../../colors';

const GitPOAPBadge = styled(GitPOAPUI)`
  margin-right: ${rem(36)};
  margin-bottom: ${rem(36)};
`;

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

const GitPOAP: Page = () => {
  const router = useRouter();
  const { id } = router.query;

  return id ? (
    <>
      <Head>
        <title>{'GitPOAP | GitPOAP'}</title>
      </Head>
      <Grid justify="center" style={{ zIndex: 1 }}>
        <Background />
        <Grid.Col span={8} style={{ zIndex: 1 }}>
          <Header gitPOAPId={parseInt(id[0])} />
        </Grid.Col>
        <Grid.Col span={11}>
          <GitPOAPHolders gitPOAPId={parseInt(id[0])} />
        </Grid.Col>
      </Grid>
    </>
  ) : (
    <div>FAIL</div>
  );
};

/* Custom layout function for this page */
GitPOAP.getLayout = (page: React.ReactNode) => {
  return <Layout>{page}</Layout>;
};

export default GitPOAP;
