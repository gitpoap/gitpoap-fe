import 'jest-styled-components';
import { Divider } from '../../../../src/components/shared/elements';
import { renderWithTheme } from '../../../__utils__/renderWithTheme';

describe('Divider', () => {
  it('renders an Divider', () => {
    const { container } = renderWithTheme(<Divider />);
    const divider = container.firstChild;

    expect(divider).toBeInTheDocument();
    expect(divider).toMatchSnapshot();
  });
});
