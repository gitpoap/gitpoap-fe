import React from 'react';
import { useWeb3Context } from '../..//wallet/Web3ContextProvider';
import { useProfileQuery } from '../../../graphql/generated-gql';
import { useEnsAvatar } from '../../../hooks/useEnsAvatar';
import { InfoHexSummary } from '../../gitpoap/InfoHexSummary';
import { truncateAddress } from '../../../helpers';

type Props = {
  addressOrEns: string | null;
};

const getName = (ensName: string | null, address: string | null) => {
  if (ensName) {
    return ensName;
  } else if (address) {
    return truncateAddress(address, 10);
  } else {
    return null;
  }
};

export const ProfileResultItem = ({ addressOrEns }: Props) => {
  const { infuraProvider } = useWeb3Context();
  const [result] = useProfileQuery({
    variables: {
      address: addressOrEns ?? '',
    },
  });

  const profileData = result.data?.profileData;
  const avatarURI = useEnsAvatar(infuraProvider, profileData?.ensName ?? null); // temporarily
  const sidebarAddress = profileData?.address ?? null;
  const ensName = profileData?.ensName ?? null;
  const bio = profileData?.bio ?? null;
  const name = getName(ensName, sidebarAddress);

  return (
    <InfoHexSummary
      address={sidebarAddress ?? ''}
      bio={bio}
      twitterHandle={profileData?.twitterHandle}
      githubHandle={profileData?.githubHandle ?? ''}
      personalSiteUrl={profileData?.personalSiteUrl}
    />
  );
};
