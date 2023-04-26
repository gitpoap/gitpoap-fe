import 'jest-styled-components';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { NextRouter } from 'next/router';
import { Provider as URQLProvider } from 'urql';
import { Navbar } from '../../src/components/Navbar';
import { AuthContextProvider } from '../../src/components/wallet/AuthContext';
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
        <AuthContextProvider>
          <URQLProvider value={mockClient}>
            <Navbar />
          </URQLProvider>
        </AuthContextProvider>
      </RouterContext.Provider>,
    );
    const navbar = container.firstChild;

    expect(navbar).toBeInTheDocument();
    expect(navbar).toMatchSnapshot();
  });
});
