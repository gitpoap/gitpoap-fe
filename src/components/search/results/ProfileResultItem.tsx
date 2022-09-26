import React from 'react';
import { useProfileQuery } from '../../../graphql/generated-gql';
import { InfoHexSummary } from '../../gitpoap/InfoHexSummary';

type Props = {
  addressOrEns: string | null;
};

export const ProfileResultItem = ({ addressOrEns }: Props) => {
  const [result] = useProfileQuery({
    variables: {
      address: addressOrEns ?? '',
    },
  });

  const profileData = result.data?.profileData;
  const sidebarAddress = profileData?.address ?? null;
  const ensName = profileData?.ensName ?? null;
  const bio = profileData?.bio ?? null;
  const ensAvatarUrl = profileData?.ensAvatarImageUrl ?? null;

  return (
    <InfoHexSummary
      address={sidebarAddress ?? ''}
      bio={bio}
      twitterHandle={profileData?.twitterHandle}
      githubHandle={profileData?.githubHandle ?? ''}
      personalSiteUrl={profileData?.personalSiteUrl}
      ensAvatarUrl={ensAvatarUrl}
      ensName={ensName}
    />
  );
};
