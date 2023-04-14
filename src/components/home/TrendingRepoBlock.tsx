import React, { useCallback } from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { useRouter } from 'next/router';
import { Text, Group, Stack, Paper } from '@mantine/core';
import { TitleNoHover } from '../shared/elements/Title';
import { BackgroundPanel, BackgroundPanel2, BackgroundPanel3, TextAccent } from '../../colors';
import { IconCount } from '../shared/elements/IconCount';
import { GitPOAP, People, Star } from '../shared/elements/icons';
import { textEllipses } from '../shared/styles';
import { GitPOAPBadge } from '../shared/elements/GitPOAPBadge';
import { useRepoDataQuery } from '../../graphql/generated-gql';
import { TextSkeleton } from '../shared/elements';

type Props = {
  index: number;
  repoId: number;
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
  font-size: ${rem(16)};
  line-height: ${rem(24)};
  text-align: start;
  letter-spacing: ${rem(0.2)};
  color: ${TextAccent};
  width: 100%;
  ${textEllipses(240)};
`;

const Content = styled(Stack)`
  padding: ${rem(15)} 0;
  width: 100%;
`;

const BODY_HEIGHT = 10;

const LastXDaysMintText = styled(Text)`
  font-family: PT Mono;
  font-size: ${rem(14)};
`;

const GitPoapContainer = styled(Group)`
  gap: ${rem(2)};

  > {
    width: 10px;
  }
`;

const StyledGitPOAPBadge = styled(GitPOAPBadge)`
  &:not(:first-child) {
    margin-left: ${rem(-20)};
  }
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

export const TrendingRepoBlock = ({ index, repoId, claimedCount, numDays }: Props) => {
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
    <Paper
      sx={{
        background: BackgroundPanel,
        border: `1px solid ${BackgroundPanel3}`,
        borderRadius: rem(6),
        transition: `150ms ease-in-out`,
        '&:hover': {
          background: BackgroundPanel2,
          borderColor: 'white',
          cursor: 'pointer',
        },
      }}
      onClick={handleClick}
    >
      <Group align="center" noWrap py={rem(8)} px={rem(20)} spacing={24}>
        <Text color="dimmed" size={18} sx={{ cursor: 'default' }}>
          {index}
        </Text>
        {isLoading ? (
          <TrendingRepoInfoHexLoading />
        ) : (
          <Content align="start" spacing="sm">
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

            <Group spacing="xs" noWrap>
              <Text>{`+`}</Text>
              <Text fw={700} fz={16} sx={{ color: TextAccent }}>{`${claimedCount}`}</Text>
              <LastXDaysMintText>{` last ${numDays} days`}</LastXDaysMintText>
            </Group>
          </Content>
        )}
        <GitPoapContainer position="right">
          {gitPoaps?.map((gitPoap) => (
            <StyledGitPOAPBadge
              key={gitPoap.id}
              size="xxxs"
              imgUrl={gitPoap?.imageUrl}
              altText={gitPoap?.name.replace('GitPOAP: ', '') ?? ''}
              disableHoverEffects
            />
          ))}
        </GitPoapContainer>
      </Group>
    </Paper>
  );
};
