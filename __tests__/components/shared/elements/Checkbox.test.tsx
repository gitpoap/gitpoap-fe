import { render } from '@testing-library/react';
import 'jest-styled-components';
import { Checkbox } from '../../../../src/components/shared/elements';

describe('Checkbox', () => {
  it('renders an Checkbox and label', () => {
    const { container } = render(<Checkbox label="Test label" />);
    const checkbox = container.querySelector('input[type="checkbox"]');
    const label = container.querySelector('label');

    expect(checkbox).toBeInTheDocument();
    expect(checkbox).toMatchSnapshot();

    expect(label).toBeInTheDocument();
    expect(label).toHaveTextContent('Test label');
  });
});
