import { render } from '@testing-library/react';
import 'jest-styled-components';
import { LoadingBar } from '../../src/components/LoadingBar';

describe('LoadingBar', () => {
  it('renders a LoadingBar', () => {
    const { container } = render(<LoadingBar />);
    const loadingBar = container.firstChild;

    expect(loadingBar).toBeInTheDocument();
    expect(loadingBar).toMatchSnapshot();
  });
});
