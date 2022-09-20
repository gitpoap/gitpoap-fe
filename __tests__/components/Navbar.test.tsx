import { render } from '@testing-library/react';
import 'jest-styled-components';
import { RouterContext } from 'next/dist/shared/lib/router-context';
import { Navbar } from '../../src/components/Navbar';
import { Web3ContextProvider } from '../../src/components/wallet/Web3ContextProvider';
import { mockRouter } from '../../.storybook/decorators/withProviders';

describe('Navbar', () => {
  it('renders a Navbar', () => {
    const { container } = render(
      <RouterContext.Provider value={mockRouter}>
        <Web3ContextProvider>
          <Navbar />
        </Web3ContextProvider>
      </RouterContext.Provider>
    );
    const navbar = container.firstChild;

    expect(navbar).toBeInTheDocument();
    expect(navbar).toMatchSnapshot();
  });
});
