import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { AdminClaimsQuery } from '../../graphql/generated-gql';
import { Link } from '../Link';
import { BackgroundPanel2 } from '../../colors';
import { Avatar } from '../shared/elements/Avatar';
import { IconCount } from '../shared/elements/IconCount';
import { GitPOAP } from '../shared/elements/icons/GitPOAP';
import { GitPOAPBadge } from '../shared/elements/GitPOAPBadge';
import { LineClamp } from '../shared/compounds/GitPOAP';
import { Divider as DividerUI } from '@mantine/core';
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
  height: ${rem(40)};
  width: ${rem(40)};
`;

const JazzIcon = styled(JazzIconReact)`
  height: ${rem(40)};
  width: ${rem(40)};
`;

const TitleStyled = styled(Title)`
  margin-top: ${rem(10)};
  text-align: center;
  ${LineClamp(3)};
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
`;

const ClaimInfo = styled.div`
  display: inline-flex;
  align-items: start;
  flex-direction: column;
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
          <GitPOAPBadge href={`/gp/${gitPOAP.id}`} size="sm" imgUrl={gitPOAP.imageUrl} />
          <ClaimInfo>
            <Link href={`/gp/${gitPOAP.id}`} passHref>
              <TitleStyled>
                {gitPOAP.name.startsWith('GitPOAP: ') ? gitPOAP.name.slice(8) : gitPOAP.name}
              </TitleStyled>
            </Link>
            <UserInfo>
              {'minted by'}
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
        <p>2 days ago</p>
      </Item>
      <Divider />
    </>
  );
};
