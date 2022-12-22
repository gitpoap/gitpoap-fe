import { initUrqlClient } from 'next-urql';
import { dedupExchange, cacheExchange, fetchExchange, ssrExchange, ClientOptions } from 'urql';
import { getAccessToken } from '../hooks/useTokens';

export const urqlClientOptions: ClientOptions = {
  url: `${process.env.NEXT_PUBLIC_GITPOAP_API_URL}/graphql`,
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
