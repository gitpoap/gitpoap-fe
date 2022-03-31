import { useEffect, useState } from 'react';
import { JsonRpcProvider } from '@ethersproject/providers';
import { AvatarResolver } from '@ensdomains/ens-avatar';

export const useEns = (web3Provider: JsonRpcProvider | null, address: string) => {
  const [avatarURI, setAvatarURI] = useState<string | null>(null);
  const [ensName, setEnsName] = useState<string | null>(null);

  /* This hook is used to set the address and/or ENS name resolved from the URL */
  useEffect(() => {
    const lookupName = async () => {
      const ensName = await web3Provider?.lookupAddress(address);
      if (ensName) {
        setEnsName(ensName);
      }
    };

    if (web3Provider && address) {
      lookupName();
    }
  }, [ensName, web3Provider, address]);

  /* Hook to fetch the avatar URI record based on a ENS name */
  useEffect(() => {
    const getAvatar = async () => {
      try {
        if (web3Provider && ensName) {
          const avt = new AvatarResolver(web3Provider);
          const resolvedAvatarURI = await avt.getAvatar(ensName, {});

          if (resolvedAvatarURI) {
            setAvatarURI(resolvedAvatarURI);
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

  return { ensName, avatarURI };
};
