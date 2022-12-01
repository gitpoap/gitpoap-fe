import { useState, useEffect, useCallback } from 'react';
import { createStore, get, set } from 'idb-keyval';
import { SignatureType } from '../types';

// create gitpoap store into indexedDB
const getStore = () => createStore('gitpoap', 'signature');

/**
 * This hook is used to get and set key/value pair into indexedDB
 * We store signature data into indexedDB
 */
export const useIndexedDB = (key: string, defaultValue: SignatureType | null) => {
  const [storedValue, setStoredValue] = useState<SignatureType | null>(defaultValue);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  const setValue = useCallback(
    (value: SignatureType | null) => {
      setStoredValue(value);
      void set(key, value, getStore());
    },
    [key],
  );

  const getValue = useCallback(
    async (key: string) => {
      setIsLoaded(false);
      const currentValue = await get(key, getStore());
      setStoredValue(currentValue ?? defaultValue);
      setIsLoaded(true);
    },
    [setStoredValue, defaultValue],
  );

  useEffect(() => {
    if (!key) return;

    void getValue(key);
  }, [key, getValue]);

  return { value: storedValue, setValue, isLoaded };
};
