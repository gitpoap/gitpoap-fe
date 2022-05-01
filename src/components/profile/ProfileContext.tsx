import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
  Dispatch,
  SetStateAction,
} from 'react';
import { useProfileQuery, ProfileQuery } from '../../graphql/generated-gql';
import { useWeb3Context } from '../../components/wallet/Web3ContextProvider';
import { EditProfileModal } from '../../components/profile/EditProfileModal';
import { GITPOAP_API_URL } from '../../constants';
import { useAuthContext } from '../github/AuthContext';
import { showNotification } from '@mantine/notifications';
import { NotificationFactory } from '../../notifications';
import { useEnsAvatar } from '../../hooks/useEnsAvatar';
import { MetaMaskError, MetaMaskErrors } from '../../types';

export type EditableProfileData = Partial<
  Pick<
    Exclude<ProfileQuery['profileData'], null | undefined>,
    'bio' | 'githubHandle' | 'personalSiteUrl' | 'twitterHandle'
  >
>;

type ProfileContext = {
  profileData?: ProfileQuery['profileData'];
  setProfileData: Dispatch<SetStateAction<ProfileQuery['profileData']>>;
  setIsUpdateModalOpen: Dispatch<SetStateAction<boolean>>;
  avatarURI: string | null;
  showEditProfileButton: boolean;
  isSaveSuccessful: boolean;
  setIsSaveSuccessful: Dispatch<SetStateAction<boolean>>;
};

const ProfileContext = createContext<ProfileContext>({} as ProfileContext);

export const useProfileContext = () => {
  return useContext(ProfileContext);
};

type Props = {
  children: React.ReactNode;
  address: string | null;
  ensName: string | null;
};

export const ProfileProvider = ({ children, address, ensName }: Props) => {
  const { tokens } = useAuthContext();
  const { infuraProvider, web3Provider, address: connectedWalletAddress } = useWeb3Context();
  const signer = web3Provider?.getSigner();
  const [profileData, setProfileData] = useState<ProfileQuery['profileData']>();
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const [isSaveLoading, setIsSaveLoading] = useState<boolean>(false);
  const avatarURI = useEnsAvatar(infuraProvider, ensName);
  const [isSaveSuccessful, setIsSaveSuccessful] = useState<boolean>(false);
  const [result, refetch] = useProfileQuery({
    variables: {
      address: address ?? ensName ?? '',
    },
  });

  const showEditProfileButton =
    address?.toLocaleLowerCase() === connectedWalletAddress?.toLocaleLowerCase();

  /* Hook to set profile data to state */
  useEffect(() => {
    setProfileData(result.data?.profileData);
  }, [result.data]);

  useEffect(() => {
    if (isSaveSuccessful) {
      setTimeout(() => {
        setIsSaveSuccessful(false);
      }, 3000);
    }
  }, [isSaveSuccessful]);

  const updateProfile = useCallback(
    async (newProfileData: EditableProfileData) => {
      setIsSaveLoading(true);
      const timestamp = Date.now();
      const data = {
        bio: newProfileData.bio,
        personalSiteUrl: newProfileData.personalSiteUrl,
        githubHandle: newProfileData.githubHandle,
        twitterHandle: newProfileData.twitterHandle,
      };

      try {
        const signature = await signer?.signMessage(
          JSON.stringify({
            site: 'gitpoap.io',
            method: 'POST /profiles',
            createdAt: timestamp,
            data,
          }),
        );

        const res = await fetch(`${GITPOAP_API_URL}/profiles`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tokens?.accessToken}`,
          },
          body: JSON.stringify({
            address: connectedWalletAddress,
            data,
            signature: {
              data: signature,
              createdAt: timestamp,
            },
          }),
        });

        if (res.status === 200) {
          refetch({ requestPolicy: 'network-only' });
        }
        setIsSaveSuccessful(true);
        setIsSaveLoading(false);
        setIsUpdateModalOpen(false);
      } catch (err) {
        if ((err as MetaMaskError)?.code !== MetaMaskErrors.UserRejectedRequest) {
          console.warn(err);
          showNotification(
            NotificationFactory.createError(
              'Error - Request to update profile failed',
              'Oops, something went wrong! 🤥',
            ),
          );
        }
        setIsSaveLoading(false);
        setIsSaveSuccessful(false);
      }
    },
    [signer, tokens?.accessToken, refetch, connectedWalletAddress],
  );

  return (
    <ProfileContext.Provider
      value={{
        profileData,
        setProfileData,
        avatarURI,
        showEditProfileButton,
        setIsUpdateModalOpen,
        isSaveSuccessful,
        setIsSaveSuccessful,
      }}
    >
      {children}
      {result.data && (
        <EditProfileModal
          bio={profileData?.bio}
          personalSiteUrl={profileData?.personalSiteUrl}
          githubHandle={profileData?.githubHandle}
          twitterHandle={profileData?.twitterHandle}
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          onClickSave={updateProfile}
          isSaveLoading={isSaveLoading}
        />
      )}
    </ProfileContext.Provider>
  );
};
