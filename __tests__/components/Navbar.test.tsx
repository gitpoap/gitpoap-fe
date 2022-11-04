import 'jest-styled-components';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { NextRouter } from 'next/router';
import { Provider as URQLProvider } from 'urql';
import { Navbar } from '../../src/components/Navbar';
import { Web3ContextProvider } from '../../src/components/wallet/Web3Context';
import { OAuthProvider } from '../../src/components/oauth/OAuthContext';
import { renderWithTheme } from '../__utils__/renderWithTheme';

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

describe('Navbar', () => {
  it('renders a Navbar', () => {
    const { container } = renderWithTheme(
      <RouterContext.Provider value={mockRouter}>
        <Web3ContextProvider>
          <OAuthProvider>
            <URQLProvider value={mockClient}>
              <Navbar />
            </URQLProvider>
          </OAuthProvider>
        </Web3ContextProvider>
      </RouterContext.Provider>,
    );
    const navbar = container.firstChild;

    expect(navbar).toBeInTheDocument();
    expect(navbar).toMatchSnapshot();
  });
});
