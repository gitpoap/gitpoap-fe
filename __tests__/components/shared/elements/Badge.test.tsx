import { render } from '@testing-library/react';
import 'jest-styled-components';
import { Badge } from '../../../../src/components/shared/elements';

describe('Badge', () => {
  it('renders an Badge', () => {
    const { container } = render(<Badge />);
    const badge = container.firstChild;

    expect(badge).toBeInTheDocument();
    expect(badge).toMatchSnapshot();
  });
});
