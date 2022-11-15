import { useCallback, useEffect, useState } from 'react';
import { EmailReturnType } from '../lib/api/email';
import { Notifications } from '../notifications';
import { useApi } from './useApi';
import { useUser } from './useUser';

type UseGetEmailProps = {
  showNotification?: boolean;
};

export const useGetEmail = (
  { showNotification }: UseGetEmailProps = { showNotification: true },
) => {
  const [emailAddress, setEmailAddress] = useState<EmailReturnType>(null);
  const api = useApi();
  const user = useUser();

  const fetchEmailAddress = useCallback(async () => {
    const data = await api.email.get();

    if (!data) {
      if (showNotification) {
        Notifications.error('Error - Request to fetch email failed');
      }
      return;
    }

    setEmailAddress(data.email);
  }, [api.email]);

  useEffect(() => {
    if (user?.address) {
      void fetchEmailAddress();
    } else {
      setEmailAddress(null);
    }
  }, [user?.address]);

  return emailAddress;
};
