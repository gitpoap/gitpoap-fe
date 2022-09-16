import { render } from '@testing-library/react';
import 'jest-styled-components';
import { FaTimes } from 'react-icons/fa';
import { IconCount } from '../../../../src/components/shared/elements';

describe('IconCount', () => {
  it('renders an IconCount', () => {
    const { container } = render(<IconCount count={10} icon={<FaTimes />} />);
    const iconCount = container.firstChild;

    expect(iconCount).toHaveTextContent('10');
    expect(iconCount).toBeInTheDocument();
    expect(iconCount).toMatchSnapshot();
  });
});
