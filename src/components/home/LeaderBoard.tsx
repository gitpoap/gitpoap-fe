import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import Link from 'next/link';
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

export type LeaderBoardItemProps = {
  claimsCount: number;
  profile: {
    address: string;
    id: number;
  };
};

const Wrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
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
  font-size: ${rem(30)};
  line-height: ${rem(48)};
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

const LeadersQuery = gql`
  query leaders {
    mostHonoredContributors(count: 6) {
      profile {
        address
        id
      }
      claimsCount
      ensName
    }
  }
`;

const LeaderBoardItem = ({ profile, claimsCount }: LeaderBoardItemProps) => {
  const { web3Provider, infuraProvider } = useWeb3Context();
  const ensName = useEns(web3Provider ?? infuraProvider, profile.address);
  const avatarURI = useEnsAvatar(web3Provider ?? infuraProvider, ensName);

  return (
    <>
      <Item>
        <UserInfo>
          {avatarURI ? <AvatarStyled src={avatarURI} /> : <JazzIcon address={profile.address} />}
          <Link href={`/p/${profile.address}`} passHref>
            <Name>{ensName ?? truncateAddress(profile.address, 6)}</Name>
          </Link>
        </UserInfo>
        <IconCount icon={<GitPOAP />} count={claimsCount} />
      </Item>
      <Divider />
    </>
  );
};

export const LeaderBoard = () => {
  const [result] = useQuery<{
    mostHonoredContributors: LeaderBoardItemProps[];
  }>({
    query: LeadersQuery,
  });

  return (
    <Wrapper>
      <HeaderStyled>{'Most honored contributors'}</HeaderStyled>
      <List>
        {result.data?.mostHonoredContributors.map((item: LeaderBoardItemProps) => (
          <LeaderBoardItem key={item.profile.id} {...item} />
        ))}
      </List>
    </Wrapper>
  );
};
