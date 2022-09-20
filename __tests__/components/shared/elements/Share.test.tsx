import { render } from '@testing-library/react';
import 'jest-styled-components';
import { Share } from '../../../../src/components/shared/elements';

describe('Share', () => {
  it('renders a Share', () => {
    const { container } = render(<Share textToCopy="textToCopy" />);
    const share = container.firstChild;

    expect(share).toBeInTheDocument();
    expect(share).toMatchSnapshot();
  });
});
