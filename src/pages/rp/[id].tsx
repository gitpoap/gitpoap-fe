import React from 'react';
import styled from 'styled-components';
import { rgba, rem } from 'polished';
import { useRouter } from 'next/router';

import { Grid } from '@mantine/core';

import { Page } from '../_app';
import { MidnightBlue } from '../../colors';
import { BackgroundHexes } from '../../components/project/BackgroundHexes';
import { GitPOAPs } from '../../components/project/GitPOAPs';
import { ProjectLeaderBoard } from '../../components/project/ProjectLeaderBoard';
import { Header as PageHeader } from '../../components/project/Header';
import { Layout } from '../../components/Layout';
import { Header } from '../../components/shared/elements/Header';
import { BREAKPOINTS } from '../../constants';

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

const Project: Page = () => {
  const router = useRouter();
  const { id } = router.query;

  if (typeof id !== 'string') {
    return <></>;
  }

  const repoId = parseInt(id);

  if (isNaN(repoId)) {
    return <Error>{'404'}</Error>;
  }

  return (
    <Grid justify="center" style={{ zIndex: 1 }}>
      <Background />
      <Grid.Col style={{ zIndex: 1 }}>
        <PageHeader repoId={repoId} />
      </Grid.Col>

      <Grid.Col>
        <ContentWrapper>
          <GitPOAPsWrapper>
            <GitPOAPs repoId={repoId} />
          </GitPOAPsWrapper>
          <ProjectLeaderBoardWrapper>
            <ProjectLeaderBoard repoId={repoId} />
          </ProjectLeaderBoardWrapper>
        </ContentWrapper>
      </Grid.Col>
    </Grid>
  );
};

/* Custom layout function for this page */
Project.getLayout = (page: React.ReactNode) => {
  return <Layout>{page}</Layout>;
};

export default Project;
