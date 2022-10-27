import 'jest-styled-components';
import { Pagination } from '../../../../src/components/shared/elements';
import { renderWithTheme } from '../../../__utils__/renderWithTheme';

describe('Pagination', () => {
  it('renders a Pagination', () => {
    const { container } = renderWithTheme(<Pagination total={10} />);
    const pagination = container.firstChild;

    expect(pagination).toBeInTheDocument();
    expect(pagination).toMatchSnapshot();
  });
});
