import React, {
  createContext,
  useState,
  useContext,
  useEffect,
  useCallback,
  Dispatch,
  SetStateAction,
} from 'react';
import { useQuery, gql } from 'urql';
import { useWeb3Context } from '../../components/wallet/Web3ContextProvider';
import { EditProfileModal } from '../../components/profile/EditProfileModal';
import { GITPOAP_API_URL } from '../../constants';
import { useAuthContext } from '../github/AuthContext';
import { showNotification } from '@mantine/notifications';
import { NotificationFactory } from '../../notifications';
import { useEnsAvatar } from '../../hooks/useEnsAvatar';

const ProfileQuery = gql`
  query profile($address: String!) {
    profileData(address: $address) {
      id
      bio
      name
      twitterHandle
      personalSiteUrl
      address
    }
  }
`;

export type ProfileData = {
  id: string;
  address: string | null;
  bio?: string;
  name: string;
  twitterHandle?: string;
  personalSiteUrl?: string;
};

export type UserPOAPsQueryRes = {
  profileData: ProfileData;
};

type ProfileContext = {
  profileData?: UserPOAPsQueryRes['profileData'];
  setProfileData: Dispatch<SetStateAction<UserPOAPsQueryRes['profileData'] | undefined>>;
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
  const { web3Provider, address: connectedWalletAddress } = useWeb3Context();
  const signer = web3Provider?.getSigner();
  const [profileData, setProfileData] = useState<UserPOAPsQueryRes['profileData']>();
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState<boolean>(false);
  const [isSaveLoading, setIsSaveLoading] = useState<boolean>(false);
  const avatarURI = useEnsAvatar(web3Provider, ensName);
  const [isSaveSuccessful, setIsSaveSuccessful] = useState<boolean>(false);
  const [result, refetch] = useQuery<UserPOAPsQueryRes>({
    query: ProfileQuery,
    variables: {
      address: address ?? ensName,
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
    async (
      newProfileData: Partial<Pick<ProfileData, 'bio' | 'personalSiteUrl' | 'twitterHandle'>>,
    ) => {
      setIsSaveLoading(true);
      const timestamp = Date.now();
      const data = {
        bio: newProfileData.bio,
        personalSiteUrl: newProfileData.personalSiteUrl,
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
      } catch (err) {
        console.warn(err);
        showNotification(
          NotificationFactory.createError(
            'Error - Request Failed',
            'Oops, something went wrong! 🤥',
          ),
        );
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
