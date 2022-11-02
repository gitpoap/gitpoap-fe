import 'jest-styled-components';
import { HexagonPath } from '../../../../src/components/shared/elements';
import { renderWithTheme } from '../../../__utils__/renderWithTheme';

describe('HexagonPath', () => {
  it('renders an HexagonPath', () => {
    const { container } = renderWithTheme(<HexagonPath />);
    const hex = container.querySelector('svg');

    expect(hex).toBeInTheDocument();
    expect(hex).toMatchSnapshot();
  });
});
