import 'jest-styled-components';
import { Footer } from '../../src/components/Footer';
import { renderWithTheme } from '../__utils__/renderWithTheme';

describe('Footer', () => {
  it('renders a Footer', () => {
    const { container } = renderWithTheme(<Footer />);
    const footer = container.firstChild;

    expect(footer).toBeInTheDocument();
    expect(footer).toMatchSnapshot();
  });
});
