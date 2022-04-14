import { useEffect, useState } from 'react';
import { InfuraProvider } from '@ethersproject/providers';

/* Map address -> ENS name */
export const useEns = (infuraProvider: InfuraProvider | null, address: string | null) => {
  const [ensName, setEnsName] = useState<string | null>(null);
  const [ensAddress, setEnsAddress] = useState<string | null>(null);

  /* This hook is used to set the address and/or ENS name resolved from the URL */
  useEffect(() => {
    const lookupName = async (address: string) => {
      const ensName = await infuraProvider?.lookupAddress(address);
      if (ensName) {
        setEnsName(ensName);
      } else {
        setEnsName(null);
      }
      setEnsAddress(address);
    };

    if (infuraProvider && address) {
      if (address !== ensAddress) {
        lookupName(address);
      }
    }
  }, [ensName, infuraProvider, address, ensAddress]);

  return ensName;
};
