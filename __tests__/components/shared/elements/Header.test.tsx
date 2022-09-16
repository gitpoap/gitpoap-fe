import { render } from '@testing-library/react';
import 'jest-styled-components';
import { Header } from '../../../../src/components/shared/elements';

describe('Header', () => {
  it('renders an Header', () => {
    const { container } = render(<Header />);
    const header = container.querySelector('span');

    expect(header).toBeInTheDocument();
    expect(header).toMatchSnapshot();
  });
});
