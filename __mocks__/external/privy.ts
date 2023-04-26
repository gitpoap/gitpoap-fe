import { boolean } from 'zod';

jest.mock('@privy-io/react-auth', () => {
  const privy = {
    usePrivy: jest.fn().mockReturnValue({
      ready: boolean,
      authenticated: boolean,
      user: {
        wallet: {
          address: '',
        },
        email: {
          address: '',
        },
        discord: {
          discordHandle: '',
        },
      },
      login: jest.fn(),
      getAccessToken: jest.fn(),
      logout: jest.fn(),
      getEthereumProvider: jest.fn().mockReturnValue({
        on: jest.fn(),
      }),
      setActiveWallet: jest.fn(),
      linkWallet: jest.fn(),
    }),
  };

  return privy;
});

export {};
