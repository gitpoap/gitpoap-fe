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
import { useWeb3Context } from '../wallet/Web3Context';
import { EditProfileModal } from '../../components/profile/EditProfileModal';
import { GITPOAP_API_URL } from '../../constants';
import { showNotification } from '@mantine/notifications';
import { NotificationFactory } from '../../notifications';
import { MetaMaskError, MetaMaskErrors } from '../../types';
import { useTokens } from '../../hooks/useTokens';

export type EditableProfileData = Partial<
  Pick<
    Exclude<ProfileQuery['profileData'], null | undefined>,
    'bio' | 'githubHandle' | 'personalSiteUrl' | 'twitterHandle' | 'isVisibleOnLeaderboard'
  >
>;

type ProfileContext = {
  profileData?: ProfileQuery['profileData'];
  setProfileData: Dispatch<SetStateAction<ProfileQuery['profileData']>>;
  setIsUpdateModalOpen: Dispatch<SetStateAction<boolean>>;
  updateProfile: (newProfileData: EditableProfileData) => void;
  showEditProfileButton: boolean;
  isSaveLoading: boolean;
  isSaveSuccessful: boolean;
  setIsSaveSuccessful: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
};

const ProfileContext = createContext<ProfileContext>({} as ProfileContext);

export const useProfileContext = () => {
  return useContext(ProfileContext);
};

type Props = {
  children: React.ReactNode;
  addressOrEns: string | null;
};

export const ProfileProvider = ({ children, addressOrEns }: Props) => {
  const { tokens } = useTokens();
  const { address: connectedWalletAddress } = useWeb3Context();
  const [profileData, setProfileData] = useState<ProfileQuery['profileData']>();
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const [isSaveLoading, setIsSaveLoading] = useState<boolean>(false);
  const [isSaveSuccessful, setIsSaveSuccessful] = useState<boolean>(false);
  const [result, refetch] = useProfileQuery({
    variables: {
      address: addressOrEns ?? '',
    },
  });

  const showEditProfileButton =
    profileData?.address?.toLocaleLowerCase() === connectedWalletAddress?.toLocaleLowerCase();

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
      const data: EditableProfileData = {
        bio: newProfileData.bio,
        personalSiteUrl: newProfileData.personalSiteUrl,
        githubHandle: newProfileData.githubHandle,
        twitterHandle: newProfileData.twitterHandle,
        isVisibleOnLeaderboard: newProfileData.isVisibleOnLeaderboard,
      };

      try {
        const res = await fetch(`${GITPOAP_API_URL}/profiles`, {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${tokens?.accessToken}`,
          },
          body: JSON.stringify({ data }),
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
    [tokens?.accessToken, refetch],
  );

  return (
    <ProfileContext.Provider
      value={{
        profileData,
        setProfileData,
        showEditProfileButton,
        updateProfile,
        setIsUpdateModalOpen,
        isSaveLoading,
        isSaveSuccessful,
        setIsSaveSuccessful,
        isLoading: result.fetching,
      }}
    >
      {children}
      {result.data && (
        <EditProfileModal
          bio={profileData?.bio}
          personalSiteUrl={profileData?.personalSiteUrl}
          githubHandle={profileData?.githubHandle}
          twitterHandle={profileData?.twitterHandle}
          isVisibleOnLeaderboard={profileData?.isVisibleOnLeaderboard}
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          onClickSave={updateProfile}
          isSaveLoading={isSaveLoading}
        />
      )}
    </ProfileContext.Provider>
  );
};
