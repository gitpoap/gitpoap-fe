import { initUrqlClient } from 'next-urql';
import {
  dedupExchange,
  cacheExchange,
  fetchExchange,
  ssrExchange,
  ClientOptions,
  createClient,
} from 'urql';
import { GITPOAP_API_URL } from '../environment';
import { getAccessToken } from '../hooks/useTokens';

export const urqlClientOptions: ClientOptions = {
  url: `${GITPOAP_API_URL}/graphql`,
  fetchOptions: () => {
    const accessToken = getAccessToken();
    return {
      headers: {
        Authorization: `Bearer ${accessToken ?? null}`,
      },
    };
  },
};

export const createSSRUrqlClient = () => {
  const ssrCache = ssrExchange({ isClient: false });
  const client = initUrqlClient(
    {
      ...urqlClientOptions,
      exchanges: [dedupExchange, cacheExchange, ssrCache, fetchExchange],
    },
    false,
  );

  return { client, ssrCache };
};

export const client = createClient(urqlClientOptions);
