import React from 'react';
import { useRouter } from 'next/router';
import { InfoHexProfileDetail } from './InfoHexProfileDetail';
import { truncateAddress } from '../../helpers';
import { useProfileContext } from './ProfileContext';
import { useUser } from '../../hooks/useUser';

const getName = (ensName: string | null, address: string | null) => {
  if (ensName) {
    return ensName;
  } else if (address) {
    return truncateAddress(address, 10);
  } else {
    return null;
  }
};

export const ProfileSidebar = () => {
  const { profileData, showEditProfileButton, isLoading } = useProfileContext();
  const router = useRouter();
  const user = useUser();

  const sidebarAddress = profileData?.address ?? null;
  const ensName = profileData?.ensName ?? null;
  const bio = profileData?.bio ?? null;
  const name = getName(ensName, sidebarAddress);
  const ensAvatarUrl = profileData?.ensAvatarImageUrl ?? null;
  const githubHandle = user?.githubHandle ?? profileData?.githubHandle;

  return (
    <InfoHexProfileDetail
      isLoading={isLoading}
      ensAvatarUrl={ensAvatarUrl}
      name={name}
      address={sidebarAddress}
      bio={bio}
      twitterHref={
        profileData?.twitterHandle ? `https://twitter.com/${profileData.twitterHandle}` : undefined
      }
      githubHref={githubHandle ? `https://github.com/${githubHandle}` : undefined}
      websiteHref={profileData?.personalSiteUrl}
      onClickEditProfile={() => router.push('/settings')}
      showEditProfileButton={showEditProfileButton}
    />
  );
};
