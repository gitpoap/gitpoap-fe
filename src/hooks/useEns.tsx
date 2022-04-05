import { useEffect, useState } from 'react';
import { JsonRpcProvider } from '@ethersproject/providers';

/* Map address -> ENS name */
export const useEns = (web3Provider: JsonRpcProvider | null, address: string | null) => {
  const [ensName, setEnsName] = useState<string | null>(null);

  /* This hook is used to set the address and/or ENS name resolved from the URL */
  useEffect(() => {
    const lookupName = async (address: string) => {
      const ensName = await web3Provider?.lookupAddress(address);
      if (ensName) {
        setEnsName(ensName);
      } else {
        setEnsName(null);
      }
    };

    if (web3Provider && address) {
      lookupName(address);
    }
  }, [ensName, web3Provider, address]);

  return ensName;
};
