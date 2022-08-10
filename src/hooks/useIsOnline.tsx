import { useEffect, useState } from 'react';

export type IsOnlineOutput = {
  isOnline: boolean;
  error: string | null;
};

export const useIsOnline = (): IsOnlineOutput => {
  const isBrowserEnv = typeof window !== 'undefined';
  const isNavigatorPresent = typeof navigator !== 'undefined';
  const NOT_BROWSER_ENV_ERROR = 'useIsOnline only works in a browser environment.';

  const [isOnline, setOnlineStatus] = useState(isBrowserEnv ? window.navigator.onLine : false);

  useEffect(() => {
    if (isBrowserEnv) {
      const toggleOnlineStatus = () => setOnlineStatus(window.navigator.onLine);

      window.addEventListener('online', toggleOnlineStatus);
      window.addEventListener('offline', toggleOnlineStatus);

      return () => {
        window.removeEventListener('online', toggleOnlineStatus);
        window.removeEventListener('offline', toggleOnlineStatus);
      };
    }
  }, [isOnline, isBrowserEnv]);

  if (!isBrowserEnv || !isNavigatorPresent) {
    return {
      error: NOT_BROWSER_ENV_ERROR,
      isOnline: false,
    };
  }

  return {
    isOnline,
    error: null,
  };
};
