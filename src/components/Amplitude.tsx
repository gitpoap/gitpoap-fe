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
import { useWeb3Context, ConnectionStatus } from '../components/wallet/Web3Context';
import { v4 as uuidv4 } from 'uuid';
import { AMPLITUDE_TOKEN, SENTRY_ENVIRONMENT } from '../environment';
import { PRODUCTION_ENVIRONMENT } from '../constants';
import { useUser } from '../hooks/useUser';

export const Amplitude = () => {
  const user = useUser();
  const { connectionStatus } = useWeb3Context();
  const { pathname, asPath, isReady } = useRouter();

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
    if (connectionStatus === ConnectionStatus.CONNECTED_TO_WALLET && user) {
      const trackedUser = {
        address: user.address,
        addressId: user.addressId,
        githubId: user.githubId ?? 'null',
        githubHandle: user.githubHandle ?? 'null',
        ensName: user.ensName ?? 'null',
        hasGithub: user.capabilities.hasGithub,
        hasEmail: user.capabilities.hasEmail,
        isStaff: user.permissions.isStaff,
      };
      const identifyObj = new Identify().set('user', trackedUser);
      identify(identifyObj);
      setUserId(user.address);
    }

    if (connectionStatus === ConnectionStatus.DISCONNECTED) {
      reset();
      setUserId(undefined);
      setDeviceId(uuidv4());
    }
  }, [connectionStatus, user?.address]);

  /* This hook is used to track page views. It is called on every page change, which
   * is detected via changes to pathname
   */
  useEffect(() => {
    if (typeof window !== 'undefined' && isReady) {
      console.log('tracking page view', pathname, asPath);
      trackPageView(pathname, asPath);
    }
    /* Purposely don't include asPath */
  }, [pathname, isReady]);

  return <></>;
};
