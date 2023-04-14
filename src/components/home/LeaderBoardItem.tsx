import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { LeadersQuery } from '../../graphql/generated-gql';
import { Link } from '../shared/compounds/Link';
import { BackgroundPanel2 } from '../../colors';
import { Avatar } from '../shared/elements/Avatar';
import { IconCount } from '../shared/elements/IconCount';
import { GitPOAP } from '../shared/elements/icons/GitPOAP';
import { Divider as DividerUI, Group, Title as TitleUI } from '@mantine/core';
import { Title } from '../shared/elements';
import { truncateAddress } from '../../helpers';
import { Jazzicon as JazzIconReact } from '@ukstv/jazzicon-react';
import { BREAKPOINTS } from '../../constants';
import { textEllipses } from '../shared/styles';

const Name = styled(Title)`
  font-family: VT323;
  font-style: normal;
  font-weight: normal;
  font-size: ${rem(22)};
  margin-left: ${rem(10)};

  @media (max-width: ${BREAKPOINTS.sm}px) {
    ${textEllipses(145)}
  }
`;

const JazzIcon = styled(JazzIconReact)`
  height: ${rem(40)};
  width: ${rem(40)};
`;

const Item = styled.div`
  display: flex;
  flex-direction: row;
  flex-grow: 1;
  align-items: center;
  justify-content: space-between;
  padding: ${rem(16)} ${rem(20)};
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

export const Index = styled(TitleUI)`
  font-family: VT323;
  font-weight: normal;
  text-align: center;
  width: ${rem(32)};
`;

type Props = LeadersQuery['mostHonoredContributors'][number] & { index?: number };

export const LeaderBoardItem = ({ profile, claimsCount, index }: Props) => {
  return (
    <>
      <Group spacing={0}>
        {index !== undefined && (
          <Index color="dimmed" sx={{ cursor: 'default' }} order={2}>{`${index}`}</Index>
        )}
        <Item>
          <UserInfo>
            <Link href={`/p/${profile.address.ensName ?? profile.address.ethAddress}`} passHref>
              {profile.address.ensAvatarImageUrl ? (
                <Avatar src={profile.address.ensAvatarImageUrl} size={40} />
              ) : (
                <JazzIcon address={profile.address.ethAddress} />
              )}
            </Link>
            <Link href={`/p/${profile.address.ensName ?? profile.address.ethAddress}`} passHref>
              <Name>
                {profile.address.ensName ?? truncateAddress(profile.address.ethAddress, 6)}
              </Name>
            </Link>
          </UserInfo>
          <IconCount icon={<GitPOAP />} count={claimsCount} />
        </Item>
      </Group>
      <Divider />
    </>
  );
};
