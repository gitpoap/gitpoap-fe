import { render } from '@testing-library/react';
import 'jest-styled-components';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { NextRouter } from 'next/router';
import { Navbar } from '../../src/components/Navbar';
import { Web3ContextProvider } from '../../src/components/wallet/Web3ContextProvider';

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
          <Navbar />
        </Web3ContextProvider>
      </RouterContext.Provider>,
    );
    const navbar = container.firstChild;

    expect(navbar).toBeInTheDocument();
    expect(navbar).toMatchSnapshot();
  });
});
