import React from 'react';
import { Grid } from '@mantine/core';
import { InfoHexProfileDetail } from './InfoHexProfileDetail';
import { truncateAddress } from '../../helpers';
import { useProfileContext } from './ProfileContext';

type Props = {
  ensName: string | null;
  address: string | null;
};

export const ProfileSidebar = ({ ensName }: Props) => {
  const { profileData, avatarURI, showEditProfileButton, setIsUpdateModalOpen } =
    useProfileContext();

  const sidebarAddress = profileData?.address;

  if (!sidebarAddress) {
    return null;
  }

  return (
    <Grid.Col span={12}>
      <InfoHexProfileDetail
        imgSrc={avatarURI}
        name={ensName ?? truncateAddress(sidebarAddress, 10)}
        address={sidebarAddress}
        bio={profileData?.bio}
        twitterHref={
          profileData?.twitterHandle
            ? `https://twitter.com/${profileData.twitterHandle}`
            : undefined
        }
        websiteHref={profileData?.personalSiteUrl}
        onClickEditProfile={() => setIsUpdateModalOpen(true)}
        showEditProfileButton={showEditProfileButton}
      />
    </Grid.Col>
  );
};
