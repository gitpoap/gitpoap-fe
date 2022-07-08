import { rgba, rem } from 'polished';
import React from 'react';
import styled from 'styled-components';

import { Grid } from '@mantine/core';

import { MidnightBlue } from '../../colors';
import { Header } from '../../components/shared/elements/Header';
import { BackgroundHexes } from './BackgroundHexes';
import { GitPOAPs } from './GitPOAPs';
import { RepoLeaderBoard } from './RepoLeaderBoard';
import { Header as PageHeader } from './Header';
import { BREAKPOINTS } from '../../constants';
import { RepoDataByIdQuery } from '../../graphql/generated-gql';

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

const RepoNotFound = styled(Header)`
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

const GitPOAPsWrapper = styled.div`
  flex: 1;
  margin-right: ${rem(48)};

  @media (max-width: ${BREAKPOINTS.md}px) {
    justify-content: center;
    width: 100%;
    margin: auto;
  }
`;

const RepoLeaderBoardWrapper = styled.div`
  width: ${rem(348)};

  @media (max-width: ${BREAKPOINTS.md}px) {
    justify-content: center;
    width: 100%;
    margin: auto;
    margin-bottom: ${rem(100)};
    max-width: 100%;
  }
`;

type Props = {
  repo: RepoDataByIdQuery['repoData'];
};

export const RepoPage = ({ repo }: Props) => (
  <>
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
            <RepoLeaderBoardWrapper>
              <RepoLeaderBoard repoId={repo.id} />
            </RepoLeaderBoardWrapper>
          </ContentWrapper>
        </Grid.Col>
      </>
    ) : (
      <RepoNotFound>{'Repo Not Found'}</RepoNotFound>
    )}
  </>
);
