import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { BackgroundPanel, TextGray, TextLight } from '../../colors';
import Link from 'next/link';
import { Text } from '@mantine/core';
import { useRepoGitPoapsQuery } from '../../graphql/generated-gql';
import { BaseSkeleton, GitPOAPBadge } from '../shared/elements';
import { textEllipses } from '../shared/styles';
import { Jazzicon as JazzIconReact } from '@ukstv/jazzicon-react';
import { truncateAddress } from '../../helpers';

type BaseSearchItemProps = {
  text: string;
  subText?: string;
  href: string;
  className?: string;
  onClick?: React.MouseEventHandler;
};

const Item = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;
  text-decoration: none;
  color: ${TextGray};
  padding: ${rem(6)} ${rem(10)};
  transition: 150ms background-color ease;
  height: ${rem(50)};
  width: 100%;
  &:hover {
    background-color: ${BackgroundPanel};
  }
`;

const ItemText = styled(Text)`
  text-align: start;
  font-family: 'PT Mono';
  font-style: normal;
  font-weight: bold;
  font-size: ${rem(15)};
  letter-spacing: ${rem(0.1)};
  color: ${TextLight};
  line-height: ${rem(17)};
  width: 100%;
  ${textEllipses(300)};
`;

const TextContent = styled.div`
  font-family: 'PT Mono';
  font-style: normal;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  margin-left: ${rem(10)};
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const SubText = styled(Text)`
  font-size: ${rem(12)};
  letter-spacing: ${rem(0.1)};
`;

const JazzIcon = styled(JazzIconReact)`
  height: ${rem(30)};
  width: ${rem(30)};
  /* Necessary to align the JazzIcon with the GitPOAPBadges */
  margin-left: ${rem(2)};
`;

const Art = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  min-height: ${rem(38)};
  min-width: ${rem(38)};
`;

export const NoResultsSearchItem = ({ className }: { className?: string }) => {
  return (
    <Item className={className} style={{ pointerEvents: 'none' }}>
      <TextContent>
        <ItemText>{'No results found'}</ItemText>
      </TextContent>
    </Item>
  );
};

type ProfileSearchItemProps = {
  address: string;
  ensName?: string;
  href: string;
  className?: string;
  onClick?: React.MouseEventHandler;
};

export const ProfileSearchItem = ({
  className,
  onClick,
  href,
  address,
  ensName,
}: ProfileSearchItemProps) => {
  return (
    <Link passHref href={href}>
      <Item className={className} onClick={onClick}>
        <JazzIcon address={address} />
        <TextContent>
          <ItemText>{ensName ?? truncateAddress(address, 10)}</ItemText>
          {ensName && <SubText>{truncateAddress(address, 10)}</SubText>}
        </TextContent>
      </Item>
    </Link>
  );
};

export const GitPOAPBadgeSearchItem = ({
  className,
  onClick,
  text,
  subText,
  href,
  repoId,
}: BaseSearchItemProps & {
  repoId: number;
}) => {
  const [result] = useRepoGitPoapsQuery({
    variables: {
      repoId,
      page: 1,
      perPage: 1,
    },
  });

  const gitPOAPItem = result.data?.repoGitPOAPs?.gitPOAPs[0];
  return (
    <Link passHref href={href} style={{ width: '100%' }}>
      <Item className={className} onClick={onClick}>
        <Art>
          {gitPOAPItem ? (
            <GitPOAPBadge size="xxxs" imgUrl={gitPOAPItem.event.image_url} disableHoverEffects />
          ) : (
            <BaseSkeleton height={rem(38)} circle />
          )}
        </Art>
        <TextContent>
          <ItemText>{text}</ItemText>
          <SubText>{subText}</SubText>
        </TextContent>
      </Item>
    </Link>
  );
};
