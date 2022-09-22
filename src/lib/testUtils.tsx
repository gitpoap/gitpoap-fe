import { MantineProvider } from '@mantine/core';
import { render, RenderOptions } from '@testing-library/react';
import { ReactElement } from 'react';
import { theme } from './theme';

const Providers = ({ children }: { children: ReactElement }) => {
  return (
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
      {children}
    </MantineProvider>
  );
};

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: Providers, ...options });

export * from '@testing-library/react';
export { customRender as render };
