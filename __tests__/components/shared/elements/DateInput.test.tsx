import { render } from '@testing-library/react';
import 'jest-styled-components';
import { DateInput } from '../../../../src/components/shared/elements';

describe('DateInput', () => {
  it('renders an DateInput and label', () => {
    const { container } = render(<DateInput label="Test label" />);
    const dateInput = container.firstChild;
    const label = container.querySelector('label');

    expect(dateInput).toBeInTheDocument();
    expect(dateInput).toMatchSnapshot();

    expect(label).toBeInTheDocument();
    expect(label).toHaveTextContent('Test label');
  });
});
