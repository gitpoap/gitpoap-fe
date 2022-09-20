import { render } from '@testing-library/react';
import 'jest-styled-components';
import { TextArea } from '../../../../src/components/shared/elements';

describe('TextArea', () => {
  it('renders a TextArea', () => {
    const { container } = render(<TextArea value="" />);
    const textArea = container.firstChild;

    expect(textArea).toBeInTheDocument();
    expect(textArea).toMatchSnapshot();
  });
});
