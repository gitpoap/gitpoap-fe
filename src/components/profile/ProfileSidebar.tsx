import React from 'react';
import { InfoHexProfileDetail } from './InfoHexProfileDetail';
import { truncateAddress } from '../../helpers';
import { useProfileContext } from './ProfileContext';

export const ProfileSidebar = () => {
  const { profileData, avatarURI, showEditProfileButton, setIsUpdateModalOpen } =
    useProfileContext();

  const sidebarAddress = profileData?.address;
  const ensName = profileData?.ensName;

  if (!sidebarAddress) {
    return null;
  }

  return (
    <InfoHexProfileDetail
      imgSrc={avatarURI}
      name={ensName ?? truncateAddress(sidebarAddress, 10)}
      address={sidebarAddress}
      bio={profileData?.bio}
      twitterHref={
        profileData?.twitterHandle ? `https://twitter.com/${profileData.twitterHandle}` : undefined
      }
      githubHref={
        profileData?.githubHandle ? `https://github.com/${profileData.githubHandle}` : undefined
      }
      websiteHref={profileData?.personalSiteUrl}
      onClickEditProfile={() => setIsUpdateModalOpen(true)}
      showEditProfileButton={showEditProfileButton}
    />
  );
};
