import { useEffect, useState } from 'react';
import { JsonRpcProvider } from '@ethersproject/providers';
import { AvatarResolver } from '@ensdomains/ens-avatar';

export const useEnsAvatar = (web3Provider: JsonRpcProvider | null, ensName: string | null) => {
  const [avatarURI, setAvatarURI] = useState<string | null>(null);

  /* Hook to fetch the avatar URI record based on a ENS name */
  useEffect(() => {
    const getAvatar = async () => {
      try {
        if (web3Provider && ensName) {
          const avt = new AvatarResolver(web3Provider);
          const resolvedAvatarURI = await avt.getAvatar(ensName, {});

          if (resolvedAvatarURI) {
            setAvatarURI(resolvedAvatarURI);
          } else {
            setAvatarURI(null);
          }
        }
      } catch (err) {
        console.error(err);
      }
    };

    if (ensName && web3Provider) {
      getAvatar();
    }
  }, [ensName, web3Provider, avatarURI]);

  return avatarURI;
};
