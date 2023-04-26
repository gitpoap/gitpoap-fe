import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { trackPageView } from '../lib/tracking/events';
import {
  init,
  identify,
  reset,
  setDeviceId,
  setUserId,
  Types,
  Identify,
} from '@amplitude/analytics-browser';
import { v4 as uuidv4 } from 'uuid';
import { AMPLITUDE_TOKEN, SENTRY_ENVIRONMENT } from '../environment';
import { PRODUCTION_ENVIRONMENT } from '../constants';
import { useAuthContext } from '../hooks/useAuthContext';

export const Amplitude = () => {
  const { authenticated, ready, user } = useAuthContext();
  const { pathname, asPath, isReady } = useRouter();
  const address = user?.address ?? '';

  useEffect(() => {
    if (isReady) {
      init(AMPLITUDE_TOKEN, undefined, {
        logLevel:
          SENTRY_ENVIRONMENT !== PRODUCTION_ENVIRONMENT
            ? Types.LogLevel.Verbose
            : Types.LogLevel.None,
      });
    }
  }, [isReady]);

  useEffect(() => {
    if (authenticated && user) {
      const trackedUser = {
        address: user.address ?? 'null',
        addressId: user.addressId ?? 'null',
        githubId: user.githubId ?? 'null',
        githubHandle: user.githubHandle ?? 'null',
        ensName: user.ensName ?? 'null',
        hasGithub: user.capabilities.hasGithub,
        hasEmail: user.capabilities.hasEmail,
        isStaff: user.permissions.isStaff,
      };
      const identifyObj = new Identify().set('user', trackedUser);
      identify(identifyObj);
      setUserId(user.address ?? 'null');
    }

    if (ready && !authenticated) {
      reset();
      setUserId(undefined);
      setDeviceId(uuidv4());
    }
  }, [authenticated, ready, address]);

  /* This hook is used to track page views. It is called on every page change, which
   * is detected via changes to pathname
   */
  useEffect(() => {
    if (typeof window !== 'undefined' && isReady) {
      trackPageView(pathname, asPath);
    }
    /* Purposely don't include asPath */
  }, [pathname, isReady]);

  return <></>;
};
