import { render } from '@testing-library/react';
import 'jest-styled-components';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { NextRouter } from 'next/router';
import { Provider as URQLProvider } from 'urql';
import { Navbar } from '../../src/components/Navbar';
import { Web3ContextProvider } from '../../src/components/wallet/Web3ContextProvider';

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

describe('Navbar', () => {
  it('renders a Navbar', () => {
    const { container } = render(
      <RouterContext.Provider value={mockRouter}>
        <Web3ContextProvider>
          <URQLProvider value={mockClient}>
            <Navbar />
          </URQLProvider>
        </Web3ContextProvider>
      </RouterContext.Provider>,
    );
    const navbar = container.firstChild;

    expect(navbar).toBeInTheDocument();
    expect(navbar).toMatchSnapshot();
  });
});
