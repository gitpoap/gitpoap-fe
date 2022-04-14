import { useEffect, useState } from 'react';
import { InfuraProvider } from '@ethersproject/providers';
import { AvatarResolver } from '@ensdomains/ens-avatar';

export const useEnsAvatar = (infuraProvider: InfuraProvider | null, ensName: string | null) => {
  const [avatarURI, setAvatarURI] = useState<string | null>(null);
  const [ensForAvatarUri, setEnsForAvatarUri] = useState<string | null>(null);

  /* Hook to fetch the avatar URI record based on a ENS name */
  useEffect(() => {
    const getAvatar = async () => {
      try {
        if (infuraProvider && ensName) {
          const avt = new AvatarResolver(infuraProvider);
          const resolvedAvatarURI = await avt.getAvatar(ensName, {});

          if (resolvedAvatarURI) {
            setAvatarURI(resolvedAvatarURI);
          } else {
            setAvatarURI(null);
          }
          setEnsForAvatarUri(ensName);
        }
      } catch (err) {
        console.error(err);
      }
    };

    if (ensName && infuraProvider && ensForAvatarUri !== ensName) {
      // TODO: enable eventually
      // getAvatar();
    }
  }, [ensName, infuraProvider, avatarURI, ensForAvatarUri]);

  return avatarURI;
};
