import 'jest-styled-components';
import { LoadingBar } from '../../src/components/LoadingBar';
import { renderWithTheme } from '../__utils__/renderWithTheme';

describe('LoadingBar', () => {
  it('renders a LoadingBar', () => {
    const { container } = renderWithTheme(<LoadingBar />);
    const loadingBar = container.firstChild;

    expect(loadingBar).toBeInTheDocument();
    expect(loadingBar).toMatchSnapshot();
  });
});
