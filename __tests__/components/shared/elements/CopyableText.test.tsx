import 'jest-styled-components';
import { CopyableText } from '../../../../src/components/shared/elements';
import { renderWithTheme } from '../../../__utils__/renderWithTheme';

describe('CopyableText', () => {
  it('renders a CopyableText', () => {
    const { container } = renderWithTheme(
      <CopyableText text="visible placeholder" textToCopy="text to copy" />,
    );
    const copyableText = container.firstChild;

    expect(copyableText).toBeInTheDocument();
    expect(copyableText).toHaveTextContent('visible placeholder');
    expect(copyableText).toMatchSnapshot();
  });
});
