import { render } from '@testing-library/react';
import 'jest-styled-components';
import { NumberInput } from '../../../../src/components/shared/elements';

describe('NumberInput', () => {
  it('renders an NumberInput and label', () => {
    const { container } = render(<NumberInput label="Test label" />);
    const numberInput = container.firstChild;
    const label = container.querySelector('label');

    expect(numberInput).toBeInTheDocument();
    expect(numberInput).toMatchSnapshot();

    expect(label).toBeInTheDocument();
    expect(label).toHaveTextContent('Test label');
  });
});
