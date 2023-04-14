import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import {
  BackgroundPanel,
  BackgroundPanel2,
  BackgroundPanel3,
  ExtraHover,
  ExtraPressed,
  Slate1,
} from '../../colors';
import { Body, InfoHexBase } from '../shared/elements/InfoHexBase';
import { GitPOAP, People, Star } from '../shared/elements/icons';
import { Text } from '../shared/elements/Text';
import { TitleNoHover } from '../shared/elements/Title';
import { useRepoStarCountQuery } from '../../graphql/generated-gql';
import { OrgRepo } from './OrgRepoList';
import { textEllipses } from '../shared/styles';
import { Paper, Stack } from '@mantine/core';
import { useRouter } from 'next/router';

const OrgName = styled(TitleNoHover)`
  font-size: ${rem(18)};
  line-height: ${rem(26)};
  ${textEllipses(230)}
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
      ${OrgName} {
        color: ${ExtraHover};
      }
    }

    &:active {
      ${OrgName} {
        color: ${ExtraPressed};
      }
    }
  }
`;

const Stats = styled.div`
  align-items: center;
  display: inline-flex;
  margin-top: ${rem(10)};

  svg {
    height: ${rem(16)};
    fill: ${Slate1};
    margin-right: ${rem(4)};

    &:not(:first-child) {
      margin-left: ${rem(10)};
    }
  }
`;

type Props = {
  repo: OrgRepo;
  className?: string;
  starredCount?: number;
  totalContributors?: number;
};

export const OrgRepoBlock = ({ className, repo }: Props) => {
  const { id, name, contributorCount, mintedGitPOAPCount } = repo;

  const router = useRouter();
  const [resultStarCount] = useRepoStarCountQuery({ variables: { repoId: id } });
  const starCount = resultStarCount?.data?.repoStarCount;

  return (
    <Paper
      className={className}
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
      onClick={() => router.push(`/gh/${repo.organization.name}/${repo.name}`)}
    >
      <Stack align="center" py={rem(24)} px={rem(20)} className={className}>
        <OrgName>{name}</OrgName>
        <Stats>
          <People />
          <Text>{contributorCount}</Text>
          <GitPOAP />
          <Text>{mintedGitPOAPCount}</Text>
          <Star />
          <Text>{starCount ?? ''}</Text>
        </Stats>
      </Stack>
    </Paper>
  );
};
