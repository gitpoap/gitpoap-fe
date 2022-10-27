import 'jest-styled-components';
import { Checkbox } from '../../../../src/components/shared/elements';
import { renderWithTheme } from '../../../__utils__/renderWithTheme';

describe('Checkbox', () => {
  it('renders an Checkbox and label', () => {
    const { container } = renderWithTheme(<Checkbox label="Test label" />);
    const checkbox = container.querySelector('input[type="checkbox"]');
    const label = container.querySelector('label');

    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toMatchSnapshot();

    expect(label).toBeInTheDocument();
    expect(label).toHaveTextContent('Test label');
  });
});
