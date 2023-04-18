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
import { Divider as DividerUI, Group, Stack, Text } from '@mantine/core';
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

const Divider = styled(DividerUI)`
  border-top-color: ${BackgroundPanel2};

  &:last-child {
    display: none;
  }
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
      <Group align="center" position="apart" spacing={0} py={rem(16)} px={rem(20)} noWrap={true}>
        <Group align="center" mr={rem(50)} spacing={0} noWrap={true}>
          <Stack
            align="center"
            justify="center"
            spacing={0}
            sx={{ position: 'relative', display: 'inline-flex' }}
          >
            <GitPOAPBadge
              href={`/gp/${gitPOAP.id}`}
              size="xxs"
              imgUrl={gitPOAP.imageUrl}
              altText={gitPOAP?.name.replace('GitPOAP: ', '') ?? ''}
            />
          </Stack>
          <Stack ml={rem(20)} align="start" spacing={0}>
            <Link href={`/gp/${gitPOAP.id}`} passHref>
              <TitleStyled>{gitPOAP.name.replace('GitPOAP: ', '')}</TitleStyled>
            </Link>
            <Group align="center" sx={{ display: 'inline-flex' }} spacing={0} noWrap={true}>
              <Text
                size={15}
                mr={rem(10)}
                sx={{ whiteSpace: 'nowrap', color: TextGray }}
              >{`minted by`}</Text>
              <Link href={`/p/${profileData?.ensName ?? userAddress}`} passHref>
                {!profileData ? (
                  <ProfileImageSkeleton height={rem(20)} width={rem(20)} />
                ) : profileData?.ensAvatarImageUrl ? (
                  <Avatar src={profileData?.ensAvatarImageUrl} size={20} />
                ) : (
                  <JazzIcon address={userAddress} />
                )}
              </Link>
              <Link href={`/p/${profileData?.ensName ?? userAddress}`} passHref>
                <Name>{profileData?.ensName ?? truncateAddress(userAddress, 6)}</Name>
              </Link>
            </Group>
          </Stack>
        </Group>
        <Text size={15} sx={{ whiteSpace: 'nowrap' }}>
          {dateToTimeAgo(mintedAt)}
        </Text>
      </Group>
      <Divider />
    </>
  );
};
