import 'jest-styled-components';
import { FaTimes } from 'react-icons/fa';
import { IconCount } from '../../../../src/components/shared/elements';
import { renderWithTheme } from '../../../__utils__/renderWithTheme';

describe('IconCount', () => {
  it('renders an IconCount', () => {
    const { container } = renderWithTheme(<IconCount count={10} icon={<FaTimes />} />);
    const iconCount = container.firstChild;

    expect(iconCount).toHaveTextContent('10');
    expect(iconCount).toBeInTheDocument();
    expect(iconCount).toMatchSnapshot();
  });
});
