import { render } from '@testing-library/react';
import 'jest-styled-components';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { NextRouter } from 'next/router';
import { Provider as URQLProvider } from 'urql';
import { Web3ContextProvider } from '../../../src/components/wallet/Web3Context';
import { OAuthProvider } from '../../../src/components/oauth/OAuthContext';
import { ConnectionButton } from '../../../src/components/oauth/ConnectionButton';

const mockClient = {
  executeQuery: jest.fn(() => {}),
  executeMutation: jest.fn(() => {}),
  executeSubscription: jest.fn(() => {}),
  /* eslint-disable @typescript-eslint/no-explicit-any */
} as any;

const mockRouter: NextRouter = {
  basePath: '',
  pathname: '/',
  route: '/',
  asPath: '/',
  query: {},
  push: () => {},
  replace: () => {},
  reload: () => {},
  back: () => {},
  prefetch: () => {},
  beforePopState: () => {},
  events: {
    on: () => {},
    off: () => {},
    emit: () => {},
  },
  isFallback: false,
  isLocaleDomain: false,
} as any;

describe('ConnectionButton Button', () => {
  it('renders a Button', () => {
    const { container } = render(
      <RouterContext.Provider value={mockRouter}>
        <Web3ContextProvider>
          <OAuthProvider>
            <URQLProvider value={mockClient}>
              <ConnectionButton />
            </URQLProvider>
          </OAuthProvider>
        </Web3ContextProvider>
      </RouterContext.Provider>,
    );
    const button = container.firstChild;

    expect(button).toHaveTextContent('Check Eligibility');

    expect(button).toBeInTheDocument();
    expect(button).toMatchSnapshot();
  });

  it('renders a button and hides the text when hideText is true', () => {
    const { container } = render(
      <RouterContext.Provider value={mockRouter}>
        <Web3ContextProvider>
          <OAuthProvider>
            <URQLProvider value={mockClient}>
              <ConnectionButton hideText />
            </URQLProvider>
          </OAuthProvider>
        </Web3ContextProvider>
      </RouterContext.Provider>,
    );
    const button = container.firstChild;

    /* Expect it to have no text */
    expect(button).toHaveTextContent('');
    expect(button).toBeInTheDocument();
    expect(button).toMatchSnapshot();
  });
});
