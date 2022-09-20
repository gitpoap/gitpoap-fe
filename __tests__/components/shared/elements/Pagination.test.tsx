import { render } from '@testing-library/react';
import 'jest-styled-components';
import { Pagination } from '../../../../src/components/shared/elements';

describe('Pagination', () => {
  it('renders a Pagination', () => {
    const { container } = render(<Pagination total={10} />);
    const pagination = container.firstChild;

    expect(pagination).toBeInTheDocument();
    expect(pagination).toMatchSnapshot();
  });
});
