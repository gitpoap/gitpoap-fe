import 'jest-styled-components';
import { Badge } from '../../../../src/components/shared/elements';
import { renderWithTheme } from '../../../__utils__/renderWithTheme';

describe('Badge', () => {
  it('renders an Badge', () => {
    const { container } = renderWithTheme(<Badge />);
    const badge = container.firstChild;

    expect(badge).toBeInTheDocument();
    expect(badge).toMatchSnapshot();
  });
});
