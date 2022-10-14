import { render } from '@testing-library/react';
import 'jest-styled-components';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { NextRouter } from 'next/router';
import { Provider as URQLProvider } from 'urql';
import { Web3ContextProvider } from '../../../src/components/wallet/Web3Context';
import { OAuthProvider } from '../../../src/components/oauth/OAuthContext';
import { GitHub } from '../../../src/components/oauth/GitHub';

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
  /* @ts-ignore */
  push: () => {},
  /* @ts-ignore */
  replace: () => {},
  reload: () => {},
  back: () => {},
  /* @ts-ignore */
  prefetch: () => {},
  beforePopState: () => {},
  events: {
    on: () => {},
    off: () => {},
    emit: () => {},
  },
  isFallback: false,
  isLocaleDomain: false,
};

describe('Github Button', () => {
  it('renders a Button', () => {
    const { container } = render(
      <RouterContext.Provider value={mockRouter}>
        <Web3ContextProvider>
          <OAuthProvider>
            <URQLProvider value={mockClient}>
              <GitHub />
            </URQLProvider>
          </OAuthProvider>
        </Web3ContextProvider>
      </RouterContext.Provider>,
    );
    const button = container.firstChild;

    expect(button).toHaveTextContent('CONNECT TO MINT');

    expect(button).toBeInTheDocument();
    expect(button).toMatchSnapshot();
  });

  it('renders a button and hides the text when hideText is true', () => {
    const { container } = render(
      <RouterContext.Provider value={mockRouter}>
        <Web3ContextProvider>
          <OAuthProvider>
            <URQLProvider value={mockClient}>
              <GitHub hideText />
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