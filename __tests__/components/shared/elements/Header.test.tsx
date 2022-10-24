import 'jest-styled-components';
import { Header } from '../../../../src/components/shared/elements';
import { renderWithTheme } from '../../../__utils__/renderWithTheme';

describe('Header', () => {
  it('renders an Header', () => {
    const { container } = renderWithTheme(<Header />);
    const header = container.querySelector('div');

    expect(header).toBeInTheDocument();
    expect(header).toMatchSnapshot();
  });
});
