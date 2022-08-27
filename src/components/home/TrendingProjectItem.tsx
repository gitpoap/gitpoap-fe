import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { Text, Group, Stack } from '@mantine/core';
import { Badge } from '../shared/elements/Badge';
import { TitleNoHover } from '../shared/elements/Title';
import { TextAccent } from '../../colors';
import { IconCount } from '../shared/elements/IconCount';
import { GitPOAP, People, Star } from '../shared/elements/icons';
import { textEllipses } from '../shared/styles';
import { ExtraHover, ExtraPressed, TextGray } from '../../colors';
import { Body, BodyAsAnchor, InfoHexBase } from '../shared/elements/InfoHexBase';
import { GitPOAPBadge } from '../shared/elements/GitPOAPBadge';
import { BREAKPOINTS } from '../../constants';
import { useRepoDataQuery } from '../../graphql/generated-gql';

type Props = {
  repoId: number;
  index: number;
  claimedCount: number;
  numDays: number;
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

const Content = styled(Stack)`
  align-items: center;
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
  display: inline-flex;
  flex-direction: row;
  align-items: center;
  justify-content: start;
  padding: ${rem(16)} ${rem(20)};

  @media (max-width: ${BREAKPOINTS.sm}px) {
    display: flex;
    flex-direction: column;
  }
`;

const GitPoapContainer = styled.div`
  display: inline-flex;
  align-items: center;
  flex-direction: row;
`;

const MintInfo = styled(Stack)`
  padding: ${rem(16)} ${rem(20)};
  align-items: start;
  margin-left: ${rem(50)};

  @media (max-width: ${BREAKPOINTS.sm}px) {
    margin-left: ${rem(10)};
    align-items: center;
  }
`;

const LastXDaysMintInfo = styled(Group)`
  font-size: ${rem(20)};

  @media (max-width: ${BREAKPOINTS.sm}px) {
    flex-direction: column;
  }
`;

const LastXDaysMintText = styled(Text)`
  font-family: VT323;
`;

const SubText = styled(Text)`
  font-family: VT323;
  color: ${TextGray};
  font-size: ${rem(18)};
`;

const IndexText = styled(Text)`
  font-family: VT323;
  color: ${TextGray};
  font-size: ${rem(28)};
  margin-right: ${rem(50)};

  @media (max-width: ${BREAKPOINTS.sm}px) {
    margin-right: ${rem(10)};
  }
`;

export const TrendingProjectItem = ({ repoId, index, claimedCount, numDays }: Props) => {
  const [result] = useRepoDataQuery({ variables: { repoId } });
  const repo = result?.data?.repoData;
  const gitPoaps = result?.data?.repoData?.project?.gitPOAPs;
  const starCount = result?.data?.repoStarCount;

  return (
    <Item>
      <IndexText>{index}</IndexText>
      <InfoHexBaseStyled hoverEffects>
        <Content>
          <TitleStyled>{repo?.name}</TitleStyled>
          <Icons>
            {repo?.contributorCount !== undefined && (
              <IconCount count={repo?.contributorCount} icon={<People width="13" height="11" />} />
            )}
            {repo?.gitPOAPCount !== undefined && (
              <IconCount count={repo?.gitPOAPCount} icon={<GitPOAP width="14" height="12" />} />
            )}
            {starCount !== undefined && (
              <IconCount count={starCount} icon={<Star width="13" height="11" />} />
            )}
          </Icons>
          <BadgeStyled>{repo?.organization?.name}</BadgeStyled>
          <GitPoapContainer>
            {gitPoaps &&
              gitPoaps.map((gitPoap) => (
                <GitPOAPBadge
                  key={gitPoap.id}
                  size="xxxs"
                  imgUrl={gitPoap?.imageUrl}
                  altText={''}
                />
              ))}
          </GitPoapContainer>
        </Content>
      </InfoHexBaseStyled>
      <MintInfo>
        <LastXDaysMintInfo>
          <IconCount count={claimedCount} icon={<GitPOAP width="14" height="12" />} />
          <LastXDaysMintText>{`minted last ${numDays} days`}</LastXDaysMintText>
        </LastXDaysMintInfo>
        <SubText>{`${repo?.mintedGitPOAPCount} minted total`}</SubText>
      </MintInfo>
    </Item>
  );
};
