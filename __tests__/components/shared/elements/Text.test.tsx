import { render } from '@testing-library/react';
import 'jest-styled-components';
import { Text } from '../../../../src/components/shared/elements';

describe('Text', () => {
  it('renders a Text', () => {
    const { container } = render(<Text>{'Text'}</Text>);
    const text = container.firstChild;

    expect(text).toBeInTheDocument();
    expect(text).toMatchSnapshot();
  });
});
