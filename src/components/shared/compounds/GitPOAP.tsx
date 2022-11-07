import { Link } from './Link';
import React from 'react';
import styled, { css } from 'styled-components';
import { rem } from 'polished';
import { Text, TextProps } from '@mantine/core';
import { GitPOAPBadge } from '../elements/GitPOAPBadge';
import { Title } from '../elements/Title';
import { ExtraHover, ExtraPressed, TextLight } from '../../../colors';
import { FeatureHeart } from './FeatureHeart';
import { Level } from '../../../types';
import { BaseSkeleton, TextSkeleton } from '../elements';

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
  text-align: center;
  ${LineClamp(3)};
`;

const RepoName = styled.div<{ isLink?: boolean }>`
  font-family: PT Mono;
  font-style: normal;
  font-weight: bold;
  font-size: ${rem(11)};
  line-height: ${rem(18)};
  text-align: center;
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

export const GitPOAPSkeleton = () => {
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

export const GitPOAP = ({
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
  return (
    <Wrapper className={className}>
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
      <Info>
        <Link href={`/gp/${gitPOAPId}`} passHref>
          <TitleStyled onClick={onClick}>{name?.replace('GitPOAP: ', '')}</TitleStyled>
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
      </Info>
    </Wrapper>
  );
};
