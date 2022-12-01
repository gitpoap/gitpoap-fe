import { useState, useEffect, useCallback } from 'react';
import { createStore, get, set } from 'idb-keyval';

const getStore = () => createStore('gitpoap', 'signature');

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
