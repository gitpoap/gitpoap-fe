import { render } from '@testing-library/react';
import 'jest-styled-components';
import { CopyableText } from '../../../../src/components/shared/elements';

describe('CopyableText', () => {
  it('renders a CopyableText', () => {
    const { container } = render(
      <CopyableText text="visible placeholder" textToCopy="text to copy" />,
    );
    const copyableText = container.firstChild;

    expect(copyableText).toBeInTheDocument();
    expect(copyableText).toHaveTextContent('visible placeholder');
    expect(copyableText).toMatchSnapshot();
  });
});
