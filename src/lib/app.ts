import * as sentry from '@sentry/browser';
import { PRODUCTION_ENVIRONMENT } from '../constants';
import { SENTRY_ENVIRONMENT, SENTRY_DSN } from '../environment';

export const setupExternalServiceClients = () => {
  sentry.init({
    dsn: SENTRY_DSN,
    environment: SENTRY_ENVIRONMENT,
    /* Only enable Sentry if the app is in production mode */
    enabled: SENTRY_ENVIRONMENT === PRODUCTION_ENVIRONMENT,
    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
    beforeSend(event, hint) {
      const error = hint?.originalException;

      if (error) {
        if (event.user?.ip_address) {
          delete event.user.ip_address;
        }
        if (event.user?.email) {
          delete event.user.email;
        }
      }

      return event;
    },
  });
};
