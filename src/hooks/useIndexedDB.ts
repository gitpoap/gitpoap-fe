import { useState, useEffect, useCallback } from 'react';
import { createStore, get, set } from 'idb-keyval';

// create gitpoap store into indexedDB
const getStore = () => createStore('gitpoap', 'signature');

/**
 * This hook is used to get and set key/value pair into indexedDB
 * We store signature data into indexedDB
 */
export const useIndexedDB = (key: string, defaultValue = '') => {
  const [storedValue, setStoredValue] = useState<string | number>(defaultValue);

  const getValue = useCallback(async () => {
    const currentValue = await get(key, getStore());
    setStoredValue(currentValue ?? defaultValue);
  }, [key, defaultValue]);

  useEffect(() => {
    void getValue();
  }, [getValue]);

  const setValue = (value: string | number) => {
    setStoredValue(value);
    void set(key, value, getStore());
  };

  return { value: storedValue, setValue };
};
