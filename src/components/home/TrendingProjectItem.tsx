import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { Text } from '@mantine/core';
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

type Props = {
  repoId: number;
  index: number;
  claimedCount: number;
};

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

const VerticalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const HorizontalContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Content = styled(VerticalContainer)`
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

const MintInfo = styled(VerticalContainer)`
  padding: ${rem(16)} ${rem(20)};
`;

export const TrendingProjectItem = ({ repoId, index, claimedCount }: Props) => {
  const [result] = useRepoDataQuery({ variables: { repoId } });
  const repo = result?.data?.repoData;
  const gitPoaps = result?.data?.repoData?.project?.gitPOAPs;
  const starCount = result?.data?.repoStarCount;

  console.log('repo', repo, gitPoaps, starCount);

  return (
    <Item>
      <Text>{index}</Text>
      <InfoHexBaseStyled hoverEffects>
        <Content>
          <TitleStyled>{repo?.name}</TitleStyled>
          <Icons>
            {repo?.contributorCount && (
              <IconCount count={repo?.contributorCount} icon={<People width="13" height="11" />} />
            )}
            {repo?.gitPOAPCount && (
              <IconCount count={repo?.gitPOAPCount} icon={<GitPOAP width="14" height="12" />} />
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
      <MintInfo>
        <HorizontalContainer>
          <IconCount count={claimedCount} icon={<GitPOAP width="14" height="12" />} />
          <Text>minted last {7} days</Text>
        </HorizontalContainer>
        <Text>{repo?.mintedGitPOAPCount} minted total</Text>
      </MintInfo>
    </Item>
  );
};
