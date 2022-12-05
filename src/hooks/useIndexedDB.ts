import { useState, useEffect, useCallback } from 'react';
import { createStore, get, set } from 'idb-keyval';
import { SignatureType } from '../types';

export enum IndexDBStatus {
  UNINITIALIZED,
  LOADING,
  LOADED,
}

// create gitpoap store in indexedDB
const getStore = () => createStore('gitpoap', 'signature');

/**
 * This hook is used to get and set key/value pair in indexedDB
 * We store signature data into indexedDB
 */
export const useIndexedDB = (key: string, defaultValue: SignatureType | null) => {
  const [storedValue, setStoredValue] = useState<SignatureType | null>(defaultValue);
  const [status, setStatus] = useState<IndexDBStatus>(IndexDBStatus.UNINITIALIZED);

  const setValue = useCallback(
    (value: SignatureType | null) => {
      setStoredValue(value);
      void set(key, value, getStore());
    },
    [key],
  );

  const getValue = useCallback(
    async (key: string) => {
      if (status === IndexDBStatus.UNINITIALIZED) {
        setStatus(IndexDBStatus.LOADING);
        const currentValue = await get(key, getStore());
        setStoredValue(currentValue ?? defaultValue);
        setStatus(IndexDBStatus.LOADED);
      }
    },
    [setStoredValue, defaultValue, status, setStatus],
  );

  useEffect(() => {
    if (status !== IndexDBStatus.LOADING) setStatus(IndexDBStatus.UNINITIALIZED);
  }, [key]);

  useEffect(() => {
    if (key) {
      void getValue(key);
    }
  }, [key, getValue]);

  return { value: storedValue, setValue, status };
};
