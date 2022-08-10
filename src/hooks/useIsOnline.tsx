import { useEffect, useState } from 'react';

export const useIsOnline = (): boolean => {
  const isBrowser = typeof window !== 'undefined';
  const hasNavigator = typeof navigator !== 'undefined';
  const [isOnline, setIsOnline] = useState(isBrowser ? window.navigator.onLine : false);

  useEffect(() => {
    if (isBrowser) {
      const handleOnline = () => setIsOnline(true);
      const handleOffline = () => setIsOnline(false);

      window.addEventListener('online', handleOnline);
      window.addEventListener('offline', handleOffline);

      return () => {
        window.removeEventListener('online', handleOnline);
        window.removeEventListener('offline', handleOffline);
      };
    }
  }, [isOnline, isBrowser]);

  if (!isBrowser || !hasNavigator) {
    return false;
  }

  return isOnline;
};
