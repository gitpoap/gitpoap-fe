import { render } from '@testing-library/react';
import 'jest-styled-components';
import { Divider } from '../../../../src/components/shared/elements';

describe('Divider', () => {
  it('renders an Divider', () => {
    const { container } = render(<Divider />);
    const divider = container.firstChild;

    expect(divider).toBeInTheDocument();
    expect(divider).toMatchSnapshot();
  });
});
