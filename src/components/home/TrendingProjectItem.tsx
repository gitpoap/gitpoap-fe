// import { rgba, rem } from 'polished';
// import React from 'react';
// import styled from 'styled-components';
// import { Grid } from '@mantine/core';
// import { MidnightBlue } from '../../colors';
// import { Header } from '../../components/shared/elements/Header';
// import { BackgroundHexes } from './BackgroundHexes';
// import { GitPOAPs } from '../repo/GitPOAPs';
// import { RepoLeaderBoard } from '../repo/RepoLeaderBoard';
// import { Header as PageHeader } from '../repo/Header';
// import { BREAKPOINTS } from '../../constants';

import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { Badge } from '../shared/elements/Badge';
import { TitleNoHover } from '../shared/elements/Title';
import { TextAccent } from '../../colors';
import { IconCount } from '../shared/elements/IconCount';
import { GitPOAP, People, Star } from '../shared/elements/icons';
import { textEllipses } from '../shared/styles';
import { ExtraHover, ExtraPressed } from '../../colors';
import { Body, BodyAsAnchor, InfoHexBase } from '../shared/elements/InfoHexBase';
import { GitPOAPBadge } from '../shared/elements/GitPOAPBadge';
import { BREAKPOINTS } from '../../constants';
import { useRepoDataQuery, useRepoStarCountQuery } from '../../graphql/generated-gql';
// const Background = styled(BackgroundHexes)`
//   position: fixed;
//   top: 0;
//   display: flex;
//   flex-direction: row;
//   align-items: center;
//   justify-content: center;
//   position: absolute;
//   z-index: 0;
//   width: ${rem(1840)};

//   mask-image: linear-gradient(
//     to right,
//     ${rgba(MidnightBlue, 0)} 0%,
//     ${rgba(MidnightBlue, 1)} 20%,
//     ${rgba(MidnightBlue, 1)} 80%,
//     ${rgba(MidnightBlue, 0)} 100%
//   );
// `;

// export const RepoNotFound = styled(Header)`
//   margin-top: ${rem(284)};
// `;

// const ContentWrapper = styled.div`
//   margin: ${rem(100)} ${rem(48)};
//   display: flex;

//   @media (max-width: ${BREAKPOINTS.md}px) {
//     margin: ${rem(50)} ${rem(24)};
//     flex-direction: column-reverse;
//   }
// `;

// const GitPOAPsWrapper = styled.div`
//   flex: 1;
//   margin-right: ${rem(48)};

//   @media (max-width: ${BREAKPOINTS.md}px) {
//     justify-content: center;
//     width: 100%;
//     margin: auto;
//   }
// `;

// const RepoLeaderBoardWrapper = styled.div`
//   width: ${rem(348)};

//   @media (max-width: ${BREAKPOINTS.md}px) {
//     justify-content: center;
//     width: 100%;
//     margin: auto;
//     margin-bottom: ${rem(100)};
//     max-width: 100%;
//   }
// `;

type Props = {
  repoId: number;
};

// export const TrendingProjectItem = ({ repoId }: Props) => {
//   const [result] = useRepoDataQuery({ variables: { repoId } });
//   const repo = result?.data?.repoData;

//   return (
//     <>
//       <Background />
//       {repo ? (
//         <>
//           <Grid.Col style={{ zIndex: 1 }}>
//             <PageHeader repo={repo} />
//           </Grid.Col>

//           <Grid.Col>
//             <ContentWrapper>
//               <GitPOAPsWrapper>
//                 <GitPOAPs repoId={repo.id} />
//               </GitPOAPsWrapper>
//               <RepoLeaderBoardWrapper>
//                 <RepoLeaderBoard repoId={repo.id} />
//               </RepoLeaderBoardWrapper>
//             </ContentWrapper>
//           </Grid.Col>
//         </>
//       ) : (
//         !repo && !result.fetching && <RepoNotFound>{'Repo Not Found'}</RepoNotFound>
//       )}
//     </>
//   );
// };

const Icons = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;

  > *:not(:last-child) {
    margin-right: ${rem(10)};
  }
`;

const TitleStyled = styled(TitleNoHover)`
  font-family: PT Mono;
  font-style: normal;
  font-weight: bold;
  font-size: ${rem(15)};
  line-height: ${rem(24)};
  text-align: center;
  letter-spacing: ${rem(0.2)};
  color: ${TextAccent};
  width: 100%;
  ${textEllipses(170)};
`;

const BadgeStyled = styled(Badge)`
  margin-top: ${rem(7)};
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${rem(15)} ${rem(20)};
  width: 100%;
`;

const RepoName = styled(TitleNoHover)`
  font-size: ${rem(20)};
  line-height: ${rem(26)};
  ${textEllipses(230)}
`;

const BODY_HEIGHT = 10;

const InfoHexBaseStyled = styled(InfoHexBase)`
  ${Body}, ${BodyAsAnchor} {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: ${rem(BODY_HEIGHT)};
    margin-bottom: ${rem(BODY_HEIGHT)};
    min-height: unset;

    &:before {
      height: ${rem(BODY_HEIGHT)};
      top: ${rem(-BODY_HEIGHT)};
    }
    &:after {
      height: ${rem(BODY_HEIGHT)};
      bottom: ${rem(-BODY_HEIGHT)};
    }

    &:hover {
      ${RepoName} {
        color: ${ExtraHover};
      }
    }

    &:active {
      ${RepoName} {
        color: ${ExtraPressed};
      }
    }
  }
`;

const Item = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${rem(16)} ${rem(20)};
`;

const GitPoapContainer = styled.div`
  display: inline-flex;
  align-items: center;
  flex-direction: row;
`;

export const TrendingProjectItem = ({ repoId }: Props) => {
  const [result] = useRepoDataQuery({ variables: { repoId } });
  const repo = result?.data?.repoData;
  const gitPoaps = result?.data?.repoData?.project?.gitPOAPs;
  const starCount = result?.data?.repoStarCount;

  console.log('repo', repo, gitPoaps, starCount);

  return (
    <Item>
      <InfoHexBaseStyled hoverEffects>
        <Content>
          <TitleStyled>{repo?.name}</TitleStyled>
          <Icons>
            {repo?.contributorCount && (
              <IconCount count={repo?.contributorCount} icon={<People width="13" height="11" />} />
            )}
            {repo?.mintedGitPOAPCount && (
              <IconCount
                count={repo?.mintedGitPOAPCount}
                icon={<GitPOAP width="14" height="12" />}
              />
            )}
            {starCount && <IconCount count={starCount} icon={<Star width="13" height="11" />} />}
          </Icons>
          <BadgeStyled>{repo?.organization?.name}</BadgeStyled>
          <GitPoapContainer>
            {gitPoaps &&
              gitPoaps.map((gitPoap) => (
                <GitPOAPBadge key={gitPoap.id} size="xxxs" imgUrl={gitPoap?.imageUrl} />
              ))}
          </GitPoapContainer>
        </Content>
      </InfoHexBaseStyled>
    </Item>
  );
};
