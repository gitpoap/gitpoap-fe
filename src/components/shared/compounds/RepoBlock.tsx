import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { BackgroundPanel, BackgroundPanel2, ExtraHover, ExtraPressed } from '../../../colors';
import { Body, InfoHexBase } from '../elements/InfoHexBase';
import { GitPOAP, People, Star } from '../elements/icons';
import { Text } from '../elements/Text';
import { TitleNoHover } from '../elements/Title';
import { useRepoStarCountQuery } from '../../../graphql/generated-gql';
import { textEllipses } from '../styles';
import { Group, Paper, Stack } from '@mantine/core';
import { useRouter } from 'next/router';
import { Link } from './Link';
import { TextSkeleton } from '../elements';

const RepoName = styled(TitleNoHover)`
  text-align: center;
  font-size: ${rem(18)};
  line-height: ${rem(22)};
  margin-bottom: ${rem(-2)};
  ${textEllipses(260)}
`;

const OrgName = styled(Text)`
  text-align: center;
  ${textEllipses(260)}

  &:hover {
    color: ${ExtraHover};
  }
  &:active {
    color: ${ExtraPressed};
  }
`;

const BODY_HEIGHT = 20;

export const InfoHexBaseStyled = styled(InfoHexBase)`
  ${Body} {
    display: flex;
    align-items: center;
    justify-content: center;

    margin-top: ${rem(BODY_HEIGHT)};
    margin-bottom: ${rem(BODY_HEIGHT)};

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

export const RepoBlockSkeleton = ({ className }: { className?: string }) => {
  return (
    <Paper
      className={className}
      sx={{
        background: BackgroundPanel,
        border: `1px solid ${BackgroundPanel}`,
        borderRadius: rem(6),
        transition: `150ms ease-in-out`,
        '&:hover': {
          background: BackgroundPanel2,
          borderColor: 'white',
          cursor: 'pointer',
        },
      }}
    >
      <Stack align="center" py={rem(24)} px={rem(20)} spacing={12} className={className}>
        <RepoName>
          <TextSkeleton height={rem(26)} />
        </RepoName>
        <OrgName>
          <TextSkeleton height={rem(18)} width={rem(140)} />
        </OrgName>
        <Group position="center">
          <TextSkeleton height={rem(18)} width={rem(140)} />
        </Group>
      </Stack>
    </Paper>
  );
};

type Repo = {
  id: number;
  name: string;
  contributorCount?: number;
  mintedGitPOAPCount?: number;
  organization: {
    name: string;
  };
};

type Props = {
  repo: Repo;
  className?: string;
  starredCount?: number;
  totalContributors?: number;
};

export const RepoBlock = ({ className, repo }: Props) => {
  // @TODO: Add back claimCount, uniqueContributorCount once backend changes are in
  const { id, name, contributorCount, mintedGitPOAPCount, organization } = repo;

  const router = useRouter();
  const [resultStarCount] = useRepoStarCountQuery({ variables: { repoId: id } });
  const starCount = resultStarCount?.data?.repoStarCount;

  return (
    <Paper
      className={className}
      sx={{
        background: BackgroundPanel,
        border: `1px solid ${BackgroundPanel}`,
        borderRadius: rem(6),
        transition: `150ms ease-in-out`,
        '&:hover': {
          background: BackgroundPanel2,
          borderColor: 'white',
          cursor: 'pointer',
        },
      }}
      onClick={() => router.push(`/gh/${repo.organization.name}/${repo.name}`)}
    >
      <Stack align="center" py={rem(24)} px={rem(20)} spacing={12} className={className}>
        <RepoName>{name}</RepoName>
        <Link href={`/gh/${repo.organization.name}`} passHref>
          <OrgName>{organization.name}</OrgName>
        </Link>
        {/* @TODO: Add back once backend changes are ready - Jay (Jul 3 2022) */}
        <Group position="center">
          <Group spacing={4}>
            <People />
            <Text>{contributorCount ?? 0}</Text>
          </Group>
          <Group spacing={4}>
            <GitPOAP />
            <Text>{mintedGitPOAPCount ?? 0}</Text>
          </Group>
          <Group spacing={4}>
            <Star />
            <Text>{starCount ?? 0}</Text>
          </Group>
        </Group>
      </Stack>
    </Paper>
  );
};
