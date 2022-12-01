import { useState, useEffect, useCallback } from 'react';
import { createStore, get, set } from 'idb-keyval';

// create gitpoap store into indexedDB
const getStore = () => createStore('gitpoap', 'signature');

export type SingatureType = {
  signature: string;
  message: string;
  createdAt: number;
};

/**
 * This hook is used to get and set key/value pair into indexedDB
 * We store signature data into indexedDB
 */
export const useIndexedDB = (key: string, defaultValue: SingatureType | null) => {
  const [value, setValue] = useState<SingatureType | null>(defaultValue);

  const getValue = useCallback(async () => {
    if (!key) return;

    const currentValue = await get(key, getStore());
    setValue(currentValue ?? defaultValue);
  }, [key, defaultValue]);

  useEffect(() => {
    void getValue();
  }, [getValue]);

  useEffect(() => {
    if (!key) return;

    void set(key, value, getStore());
  }, [value, key]);

  return { value, setValue };
};
