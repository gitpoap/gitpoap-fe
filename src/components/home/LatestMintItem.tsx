import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { AdminClaimsQuery } from '../../graphql/generated-gql';
import { Link } from '../Link';
import { BackgroundPanel2, TextGray } from '../../colors';
import { Avatar } from '../shared/elements/Avatar';
import { IconCount } from '../shared/elements/IconCount';
import { GitPOAP } from '../shared/elements/icons/GitPOAP';
import { GitPOAPBadge } from '../shared/elements/GitPOAPBadge';
import { LineClamp } from '../shared/compounds/GitPOAP';
import { Divider as DividerUI, Text } from '@mantine/core';
import { Title } from '../shared/elements/Title';
import { truncateAddress } from '../../helpers';
import { useWeb3Context } from '../wallet/Web3ContextProvider';
import { Jazzicon as JazzIconReact } from '@ukstv/jazzicon-react';
import { useEns } from '../../hooks/useEns';
import { useEnsAvatar } from '../../hooks/useEnsAvatar';
import { useFeatures } from '../FeaturesContext';
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
  font-family: VT323;
  font-style: normal;
  font-weight: normal;
  font-size: ${rem(18)};
`;

const MintedByText = styled(StyledText)`
  color: ${TextGray};
  margin-right: ${rem(10)};
`;

const dateToTimeAgo = (date: string): string => {
  const past = new Date(date);
  const now = new Date(Date.now());
  const difftime = now.getTime() - past.getTime();
  if (difftime < 0) {
    return '';
  }
  const diffDate = new Date(difftime - 5.5 * 60 * 60 * 1000);
  const [sec, min, hr, day, month] = [
    diffDate.getSeconds(),
    diffDate.getMinutes(),
    diffDate.getHours(),
    diffDate.getDate() - 1,
    diffDate.getMonth(),
  ];

  const f = (property: number, end: string) => {
    return `${property} ${end}${property > 1 ? 's' : ''} ago`;
  };

  return month >= 1
    ? f(month, 'month')
    : day >= 1
    ? f(day, 'day')
    : hr >= 1
    ? f(hr, 'hr')
    : min >= 1
    ? f(min, 'min')
    : day >= 1
    ? f(sec, 'sec')
    : '';
};

export const LatestMintItem = ({
  gitPOAP,
  mintedAt,
  address,
}: AdminClaimsQuery['claims'][number]) => {
  const userAddress = address ?? '';
  const { infuraProvider } = useWeb3Context();
  const ensName = useEns(infuraProvider, userAddress);
  const avatarURI = useEnsAvatar(infuraProvider, ensName);
  const { hasEnsAvatar } = useFeatures();

  return (
    <>
      <Item>
        <MintInfo>
          <BadgeWrapper>
            <GitPOAPBadge href={`/gp/${gitPOAP.id}`} size="xxs" imgUrl={gitPOAP.imageUrl} />
          </BadgeWrapper>
          <ClaimInfo>
            <Link href={`/gp/${gitPOAP.id}`} passHref>
              <TitleStyled>
                {gitPOAP.name.startsWith('GitPOAP: ') ? gitPOAP.name.slice(8) : gitPOAP.name}
              </TitleStyled>
            </Link>
            <UserInfo>
              <MintedByText>minted by</MintedByText>
              <Link href={`/p/${ensName ?? userAddress}`} passHref>
                {avatarURI && hasEnsAvatar ? (
                  <AvatarStyled src={avatarURI} useDefaultImageTag />
                ) : (
                  <JazzIcon address={userAddress} />
                )}
              </Link>
              <Link href={`/p/${ensName ?? userAddress}`} passHref>
                <Name>{ensName ?? truncateAddress(userAddress, 6)}</Name>
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
