import React, { useCallback } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { useRouter } from 'next/router';
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
import { TextSkeleton } from '../shared/elements';

type Props = {
  repoId: number;
  index: number;
  claimedCount: number;
  numDays: number;
};

const Icons = styled(Group)`
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
    gap: ${rem(7)};
    width: ${rem(300)};

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

const Item = styled(Group)`
  padding: ${rem(16)} ${rem(20)};

  @media (max-width: ${BREAKPOINTS.sm}px) {
    display: flex;
    flex-direction: column;
  }
`;

const MintInfo = styled(Stack)`
  padding: ${rem(16)} ${rem(20)};

  @media (max-width: ${BREAKPOINTS.sm}px) {
    margin-left: ${rem(10)};
    align-items: center;
  }
`;

const LastXDaysMintInfo = styled(Group)`
  @media (max-width: ${BREAKPOINTS.sm}px) {
    flex-direction: column;
  }
`;

const LastXDaysMintText = styled(Text)`
  font-family: PT Mono;
  font-size: ${rem(14)};
`;

const SubText = styled(Text)`
  font-family: PT Mono;
  color: ${TextGray};
  font-size: ${rem(14)};
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

const GitPoapContainer = styled(Group)`
  gap: ${rem(2)};
`;

export const TrendingRepoInfoHexLoading = () => {
  return (
    <Content align="center" spacing="xs">
      <TextSkeleton width={rem(170)} height={rem(22)} />
      <Icons spacing="xs">
        <TextSkeleton width={rem(150)} height={rem(26)} />
      </Icons>
      <TextSkeleton width={rem(80)} height={rem(18)} />
      <GitPoapContainer position="center">
        <TextSkeleton width={rem(150)} height={rem(30)} />
      </GitPoapContainer>
    </Content>
  );
};

export const TrendingRepoItem = ({ repoId, index, claimedCount, numDays }: Props) => {
  const router = useRouter();
  const [result] = useRepoDataQuery({ variables: { repoId } });
  const isLoading = result.fetching;
  const repo = result?.data?.repoData;
  const gitPoaps = result?.data?.repoData?.project?.gitPOAPs;
  const repoName = result?.data?.repoData?.name ?? '';
  const orgName = result?.data?.repoData?.organization?.name ?? '';
  const starCount = result?.data?.repoStarCount;

  const handleClick = useCallback(() => {
    void router.push(`/gh/${orgName}/${repoName}`);
  }, [router, orgName, repoName]);

  return (
    <Item position="center" spacing="xl">
      <IndexText>{index}</IndexText>
      <InfoHexBaseStyled onClick={handleClick} hoverEffects>
        {isLoading ? (
          <TrendingRepoInfoHexLoading />
        ) : (
          <Content align="center" spacing="xs">
            <TitleStyled>{repo?.name}</TitleStyled>
            <Icons spacing="xs">
              {repo?.contributorCount !== undefined && (
                <IconCount
                  count={repo?.contributorCount}
                  icon={<People width="13" height="11" />}
                />
              )}
              {repo?.gitPOAPCount !== undefined && (
                <IconCount count={repo?.gitPOAPCount} icon={<GitPOAP width="14" height="12" />} />
              )}
              {starCount !== undefined && (
                <IconCount count={starCount} icon={<Star width="13" height="11" />} />
              )}
            </Icons>
            <BadgeStyled>{repo?.organization?.name}</BadgeStyled>
            <GitPoapContainer position="center">
              {gitPoaps?.map((gitPoap) => (
                <GitPOAPBadge
                  key={gitPoap.id}
                  size="xxxs"
                  imgUrl={gitPoap?.imageUrl}
                  altText={gitPoap?.name.replace('GitPOAP: ', '') ?? ''}
                  disableHoverEffects
                />
              ))}
            </GitPoapContainer>
          </Content>
        )}
      </InfoHexBaseStyled>
      <MintInfo align="start">
        <LastXDaysMintInfo spacing="xs">
          <LastXDaysMintText>{`${claimedCount} minted in last ${numDays} days`}</LastXDaysMintText>
        </LastXDaysMintInfo>
        {isLoading ? (
          <TextSkeleton width={rem(100)} height={rem(22)} />
        ) : (
          <SubText>{`${repo?.mintedGitPOAPCount} minted total`}</SubText>
        )}
      </MintInfo>
    </Item>
  );
};
