import { Link } from '../shared/compounds/Link';
import React from 'react';
import styled, { css } from 'styled-components';
import { rem } from 'polished';
import { Group, Paper, Stack, Text, TextProps } from '@mantine/core';
import { GitPOAPBadge } from '../shared/elements/GitPOAPBadge';
import { Title } from '../shared/elements/Title';
import { ExtraHover, ExtraPressed, TextLight } from '../../colors';
import { FeatureHeart } from '../shared/compounds/FeatureHeart';
import { Level } from '../../types';
import { BaseSkeleton, TextSkeleton } from '../shared/elements';
import { BackgroundPanel } from '../../colors';
import { BackgroundPanel2 } from '../../colors';
import { BackgroundPanel3 } from '../../colors';
import { useRouter } from 'next/router';

type Props = {
  gitPOAPId: number;
  imgSrc: string;
  name?: string;
  repoName?: string;
  repoId?: number;
  orgName?: string;
  description?: string;
  className?: string;
  poapTokenId?: string | null;
  onClick?: () => void;
  level?: Level;
  size?: 'sm' | 'md';
};

export const LineClamp = (lines: number) => css`
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: ${lines};
  -webkit-box-orient: vertical;
`;

const Wrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  max-width: ${rem(150)};
`;

const TitleStyled = styled(Title)`
  margin-top: ${rem(10)};
  text-align: start;
  ${LineClamp(3)};
`;

const RepoName = styled.div<{ isLink?: boolean }>`
  font-family: PT Mono;
  font-style: normal;
  font-weight: bold;
  font-size: ${rem(11)};
  line-height: ${rem(18)};
  text-align: start;
  letter-spacing: ${rem(1.2)};
  text-transform: uppercase;
  color: ${TextLight};
  margin-top: ${rem(8)};
  transition: color 200ms ease-in-out;

  ${({ isLink }) =>
    isLink &&
    css`
      &:hover {
        color: ${ExtraHover};
      }
      &:active {
        color: ${ExtraPressed};
      }
    `}
`;

const Description = styled(Text)<TextProps>`
  font-size: ${rem(11)};
  line-height: ${rem(14)};
  text-align: center;
  letter-spacing: ${rem(-0.1)};
  ${LineClamp(2)};
`;

const Heart = styled(FeatureHeart)`
  position: absolute;
  bottom: ${rem(0)};
  right: ${rem(10)};
`;

const BadgeWrapper = styled(Wrapper)`
  position: relative;
`;

export const GitPOAPBlockSkeleton = () => {
  return (
    <Wrapper>
      <BadgeWrapper>
        <BaseSkeleton height={rem(140)} circle />
      </BadgeWrapper>
      <Info>
        <TextSkeleton height={rem(26)} width={rem(160)} mt={rem(10)} />
        <TextSkeleton height={rem(18)} width={rem(140)} mt={rem(10)} />
      </Info>
    </Wrapper>
  );
};

export const GitPOAPBlock = ({
  className,
  poapTokenId,
  gitPOAPId,
  imgSrc,
  name,
  repoName,
  repoId,
  description,
  onClick,
  orgName,
  level,
  size = 'sm',
}: Props) => {
  const router = useRouter();
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
      onClick={() => router.push(`/gp/${gitPOAPId}`)}
    >
      <Group
        align="center"
        spacing={0}
        py={rem(16)}
        px={rem(20)}
        noWrap={true}
        className={className}
      >
        <BadgeWrapper>
          <GitPOAPBadge
            href={`/gp/${gitPOAPId}`}
            size={size}
            imgUrl={imgSrc}
            altText={name ?? ''}
            onClick={onClick}
            level={level}
          />
          {poapTokenId && <Heart poapTokenId={poapTokenId} />}
        </BadgeWrapper>
        <Stack ml={rem(20)} align="start" spacing={0}>
          <Link href={`/gp/${gitPOAPId}`} passHref>
            <TitleStyled>{name?.replace('GitPOAP: ', '')}</TitleStyled>
          </Link>
          {orgName && repoName ? (
            <Link href={`/gh/${orgName}/${repoName}`} passHref>
              <RepoName isLink>{repoName}</RepoName>
            </Link>
          ) : repoId ? (
            <Link href={`/rp/${repoId}`} passHref>
              <RepoName isLink>{repoName}</RepoName>
            </Link>
          ) : (
            <RepoName>{repoName}</RepoName>
          )}
          {description && <Description mt={rem(8)}>{description}</Description>}
        </Stack>
      </Group>
    </Paper>
  );
};
