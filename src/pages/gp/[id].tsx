import React from 'react';
import styled from 'styled-components';
import { rgba, rem } from 'polished';
import Head from 'next/head';
import { useRouter } from 'next/router';

import { Grid } from '@mantine/core';

import { Page } from '../_app';
import { MidnightBlue } from '../../colors';
import { BackgroundHexes } from '../../components/gitpoap/BackgroundHexes';
import { GitPOAPHolders } from '../../components/gitpoap/GitPOAPHolders';
import { Header as PageHeader } from '../../components/gitpoap/Header';
import { Layout } from '../../components/Layout';
import { Header } from '../../components/shared/elements/Header';

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

const GitPOAP: Page = () => {
  const router = useRouter();
  const { id } = router.query;

  if (typeof id !== 'string') {
    return <></>;
  }

  const gitPOAPId = parseInt(id);

  if (isNaN(gitPOAPId)) {
    return <Error>404</Error>;
  }

  return (
    <>
      <Head>
        <title>{'GitPOAP | GitPOAP'}</title>
      </Head>
      <Grid justify="center" style={{ zIndex: 1 }}>
        <Background />
        <Grid.Col span={8} style={{ zIndex: 1 }}>
          <PageHeader gitPOAPId={gitPOAPId} />
        </Grid.Col>
        <Grid.Col span={11}>
          <GitPOAPHolders gitPOAPId={gitPOAPId} />
        </Grid.Col>
      </Grid>
    </>
  );
};

/* Custom layout function for this page */
GitPOAP.getLayout = (page: React.ReactNode) => {
  return <Layout>{page}</Layout>;
};

export default GitPOAP;
