import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { Link } from '../Link';
import { useQuery, gql } from 'urql';
import { Header } from '../shared/elements/Header';
import { BackgroundPanel2 } from '../../colors';
import { Avatar } from '../shared/elements/Avatar';
import { IconCount } from '../shared/elements/IconCount';
import { GitPOAP } from '../shared/elements/icons/GitPOAP';
import { Divider as DividerUI } from '@mantine/core';
import { Title } from '../shared/elements/Title';
import { truncateAddress } from '../../helpers';
import { useWeb3Context } from '../wallet/Web3ContextProvider';
import { Jazzicon as JazzIconReact } from '@ukstv/jazzicon-react';
import { useEns } from '../../hooks/useEns';
import { useEnsAvatar } from '../../hooks/useEnsAvatar';
import { BREAKPOINTS } from '../../constants';
import { useFeatures } from '../FeaturesContext';
import { InfoHexBase } from '../shared/elements/InfoHexBase';

export type LeaderBoardItemProps = {
  claimsCount: number;
  profile: {
    address: string;
    id: number;
  };
};

const Wrapper = styled(InfoHexBase)`
  display: inline-flex;
  flex-direction: column;
  width: ${rem(348)};

  @media (max-width: ${BREAKPOINTS.md}px) {
    display: flex;
    margin: auto;
  }
`;

const Content = styled.div`
  padding: ${rem(13)} ${rem(18)};
`;

const Name = styled(Title)`
  font-family: VT323;
  font-style: normal;
  font-weight: normal;
  font-size: ${rem(22)};
  margin-left: ${rem(10)};
`;

const AvatarStyled = styled(Avatar)`
  height: ${rem(40)};
  width: ${rem(40)};
`;

const JazzIcon = styled(JazzIconReact)`
  height: ${rem(40)};
  width: ${rem(40)};
`;

const Item = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${rem(16)} ${rem(20)};
`;

const HeaderStyled = styled(Header)`
  display: block;
  width: 100%;
  text-align: center;
  font-size: ${rem(30)};
  line-height: ${rem(48)};

  @media (max-width: ${BREAKPOINTS.md}px) {
    font-size: ${rem(48)};
  }
`;

const UserInfo = styled.div`
  display: inline-flex;
  align-items: center;
  flex-direction: row;
`;

const Divider = styled(DividerUI)`
  border-top-color: ${BackgroundPanel2};

  &:last-child {
    display: none;
  }
`;

const List = styled.div`
  margin-top: ${rem(30)};
`;

const TopContributorsQuery = gql`
  query topContributors($repoId: Float!) {
    repoMostHonoredContributors(count: 6, repoId: $repoId) {
      profile {
        address
        id
      }
      claimsCount
    }
  }
`;

const LeaderBoardItem = ({ profile, claimsCount }: LeaderBoardItemProps) => {
  const { infuraProvider } = useWeb3Context();
  const ensName = useEns(infuraProvider, profile.address);
  const avatarURI = useEnsAvatar(infuraProvider, ensName);
  const { hasEnsAvatar } = useFeatures();

  return (
    <>
      <Item>
        <UserInfo>
          <Link href={`/p/${ensName ?? profile.address}`} passHref>
            {avatarURI && hasEnsAvatar ? (
              <AvatarStyled src={avatarURI} useDefaultImageTag />
            ) : (
              <JazzIcon address={profile.address} />
            )}
          </Link>
          <Link href={`/p/${ensName ?? profile.address}`} passHref>
            <Name>{ensName ?? truncateAddress(profile.address, 6)}</Name>
          </Link>
        </UserInfo>
        <IconCount icon={<GitPOAP />} count={claimsCount} />
      </Item>
      <Divider />
    </>
  );
};

export type TopContributorsProps = {
  repoId: number;
};

export const TopContributors = ({ repoId }: TopContributorsProps) => {
  const [result] = useQuery<{
    repoMostHonoredContributors: LeaderBoardItemProps[];
  }>({
    query: TopContributorsQuery,
    variables: {
      repoId,
    },
  });

  return (
    <Wrapper>
      <Content>
        <HeaderStyled>{'Top contributors'}</HeaderStyled>
        <List>
          {result.data?.repoMostHonoredContributors.map((item: LeaderBoardItemProps) => (
            <LeaderBoardItem key={item.profile.id} {...item} />
          ))}
        </List>
      </Content>
    </Wrapper>
  );
};
