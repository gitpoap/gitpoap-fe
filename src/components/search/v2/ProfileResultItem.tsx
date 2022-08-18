import React from 'react';
import { useWeb3Context } from '../../../components/wallet/Web3ContextProvider';
import { useProfileQuery } from '../../../graphql/generated-gql';
import { useEnsAvatar } from '../../../hooks/useEnsAvatar';
import { InfoHexProfileDetail } from '../../../components/profile/InfoHexProfileDetail';
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
    <InfoHexProfileDetail
      isLoading={result.fetching}
      imgSrc={avatarURI}
      name={name}
      address={sidebarAddress}
      bio={bio}
      twitterHref={
        profileData?.twitterHandle ? `https://twitter.com/${profileData.twitterHandle}` : undefined
      }
      githubHref={
        profileData?.githubHandle ? `https://github.com/${profileData.githubHandle}` : undefined
      }
      websiteHref={profileData?.personalSiteUrl}
      onClickEditProfile={() => {}}
      showEditProfileButton={false}
    />
  );
};
