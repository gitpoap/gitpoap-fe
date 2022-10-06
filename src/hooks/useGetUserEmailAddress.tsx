import { showNotification } from '@mantine/notifications';
import { useEffect, useState } from 'react';

import { GITPOAP_API_URL } from '../constants';
import { NotificationFactory } from '../notifications';

export type EmailReturnType = {
  id: number;
  emailAddress: string;
  isValidated: boolean;
  tokenExpiresAt: Date;
} | null;

export const useGetUserEmailAddress = (ethAddress: string): EmailReturnType => {
  const [emailAddress, setEmailAddress] = useState<EmailReturnType>(null);

  const fetchEmailAddress = async (ethAddress: string) => {
    try {
      const res = await fetch(`${GITPOAP_API_URL}/email/${ethAddress}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });

      if (res.ok) {
        const data = (await res.json()) as { email: EmailReturnType };

        setEmailAddress(data.email);
      } else {
        throw res;
      }
    } catch (err) {
      console.warn(err);
      showNotification(NotificationFactory.createError('Error - Request to fetch email failed'));
    }
  };

  useEffect(() => {
    if (ethAddress) {
      fetchEmailAddress(ethAddress);
    } else {
      setEmailAddress(null);
    }
  }, [ethAddress]);

  return emailAddress;
};
