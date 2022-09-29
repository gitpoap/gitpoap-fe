import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { DateTime } from 'luxon';
import { AdminClaimsQuery, useProfileQuery } from '../../graphql/generated-gql';
import { Link } from '../shared/compounds/Link';
import { BackgroundPanel2, TextGray } from '../../colors';
import { Avatar } from '../shared/elements/Avatar';
import { ProfileImageSkeleton } from '../shared/elements/Skeletons';
import { GitPOAPBadge } from '../shared/elements/GitPOAPBadge';
import { Divider as DividerUI, Text } from '@mantine/core';
import { Title } from '../shared/elements/Title';
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

const AvatarStyled = styled(Avatar)`
  height: ${rem(20)};
  width: ${rem(20)};
`;

const JazzIcon = styled(JazzIconReact)`
  height: ${rem(20)};
  width: ${rem(20)};
`;

const TitleStyled = styled(Title)`
  margin-top: ${rem(10)};
  text-align: start;
  font-family: 'PT Mono';
  font-style: normal;
  font-weight: bold;
  font-size: ${rem(15)};
  letter-spacing: ${rem(0.1)};
  line-height: ${rem(17)};
  width: 100%;
  ${textEllipses(250)};

  @media (max-width: ${BREAKPOINTS.sm}px) {
    ${textEllipses(200)}
  }
`;

const Item = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${rem(16)} ${rem(20)};
`;

const MintInfo = styled.div`
  display: inline-flex;
  align-items: center;
  flex-direction: row;
  margin-right: ${rem(50)};
`;

const ClaimInfo = styled.div`
  display: inline-flex;
  align-items: start;
  flex-direction: column;
  margin-left: ${rem(20)};
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

const Wrapper = styled.div`
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const BadgeWrapper = styled(Wrapper)`
  position: relative;
`;

const StyledText = styled(Text)`
  font-family: PT Mono;
  font-style: normal;
  font-weight: normal;
  font-size: ${rem(15)};
  white-space: nowrap;
`;

const MintedByText = styled(StyledText)`
  font-family: PT Mono;
  color: ${TextGray};
  margin-right: ${rem(10)};
`;

const dateToTimeAgo = (date: string): string => {
  const startDate = DateTime.fromISO(date);
  return startDate.toRelative() ?? '';
};

export const LatestMintItem = ({
  gitPOAP,
  mintedAt,
  mintedAddress,
}: AdminClaimsQuery['claims'][number]) => {
  const userAddress = mintedAddress?.ethAddress ?? '';
  const [result] = useProfileQuery({
    variables: {
      address: mintedAddress?.ethAddress ?? '',
    },
  });

  const profileData = result?.data?.profileData;

  return (
    <>
      <Item>
        <MintInfo>
          <BadgeWrapper>
            <GitPOAPBadge
              href={`/gp/${gitPOAP.id}`}
              size="xxs"
              imgUrl={gitPOAP.imageUrl}
              altText={gitPOAP?.name.replace('GitPOAP: ', '') ?? ''}
            />
          </BadgeWrapper>
          <ClaimInfo>
            <Link href={`/gp/${gitPOAP.id}`} passHref>
              <TitleStyled>
                {gitPOAP.name.startsWith('GitPOAP: ') ? gitPOAP.name.slice(8) : gitPOAP.name}
              </TitleStyled>
            </Link>
            <UserInfo>
              <MintedByText>{`minted by`}</MintedByText>
              <Link href={`/p/${profileData?.ensName ?? userAddress}`} passHref>
                {!profileData ? (
                  <ProfileImageSkeleton height={rem(20)} width={rem(20)} />
                ) : profileData && profileData?.ensAvatarImageUrl ? (
                  <AvatarStyled src={profileData?.ensAvatarImageUrl} />
                ) : (
                  <JazzIcon address={userAddress} />
                )}
              </Link>
              <Link href={`/p/${profileData?.ensName ?? userAddress}`} passHref>
                <Name>{profileData?.ensName ?? truncateAddress(userAddress, 6)}</Name>
              </Link>
            </UserInfo>
          </ClaimInfo>
        </MintInfo>
        <StyledText>{dateToTimeAgo(mintedAt)}</StyledText>
      </Item>
      <Divider />
    </>
  );
};
