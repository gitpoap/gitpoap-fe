import { render } from '@testing-library/react';
import 'jest-styled-components';
import { Title } from '../../../../src/components/shared/elements';

describe('Title', () => {
  it('renders a Title', () => {
    const { container } = render(<Title>{'A great title, one of the best'}</Title>);
    const title = container.firstChild;

    expect(title).toBeInTheDocument();
    expect(title).toMatchSnapshot();
  });
});
