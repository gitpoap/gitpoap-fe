declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NEXT_PUBLIC_SENTRY_DSN: string;
      NEXT_PUBLIC_SENTRY_ENVIRONMENT: string;
      SENTRY_AUTH_TOKEN?: string;
      NEXT_PUBLIC_INFURA_ID: string;
      NEXT_PUBLIC_REACT_APP_CLIENT_ID: string;
      NEXT_PUBLIC_GITPOAP_API_URL: string;
    }
  }
}

export {};
