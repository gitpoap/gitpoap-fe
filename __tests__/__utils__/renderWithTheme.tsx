import { MantineProvider } from '@mantine/core';
import { render } from '@testing-library/react';
import { theme } from '../../src/lib/theme';

export const renderWithTheme = (children: React.ReactNode) =>
  render(
    <MantineProvider theme={theme} withGlobalStyles withNormalizeCSS>
      {children}
    </MantineProvider>,
  );
