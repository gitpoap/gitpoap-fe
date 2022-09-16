import { render } from '@testing-library/react';
import 'jest-styled-components';
import { Loader } from '../../../../src/components/shared/elements';

describe('Loader', () => {
  it('renders an Loader', () => {
    const { container } = render(<Loader />);
    const loader = container.firstChild;

    expect(loader).toBeInTheDocument();
    expect(loader).toMatchSnapshot();
  });
});
