import { useClipboard } from '@mantine/hooks';
import { useEffect } from 'react';
import { Notifications } from '../notifications';

type Props = {
  errorMessage?: string;
  successMessage?: string;
  timeout?: number;
};

export const useClipboardWithNotification = ({
  errorMessage = 'Error - Copy Failed',
  successMessage = 'Success - Copied!',
  timeout,
}: Props = {}) => {
  const clipboard = useClipboard({ timeout });

  useEffect(() => {
    if (clipboard.error) {
      Notifications.error(errorMessage);
    } else if (clipboard.copied) {
      Notifications.success(successMessage);
    }
  }, [clipboard.error, clipboard.copied, errorMessage, successMessage]);

  return clipboard;
};
