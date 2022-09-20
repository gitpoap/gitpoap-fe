import { render } from '@testing-library/react';
import 'jest-styled-components';
import { Footer } from '../../src/components/Footer';

describe('Footer', () => {
  it('renders a Footer', () => {
    const { container } = render(<Footer />);
    const footer = container.firstChild;

    expect(footer).toBeInTheDocument();
    expect(footer).toMatchSnapshot();
  });
});
