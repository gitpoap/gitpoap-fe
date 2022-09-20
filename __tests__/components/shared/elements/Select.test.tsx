import { render } from '@testing-library/react';
import 'jest-styled-components';
import { Select } from '../../../../src/components/shared/elements';

describe('Select', () => {
  it('renders a Select', () => {
    const { container } = render(
      <Select
        data={[
          { value: 'total', label: 'Total Poaps' },
          { value: 'claim', label: 'Mint Date' },
          { value: 'name', label: 'Name' },
        ]}
        value="total"
      />,
    );
    const select = container.firstChild;

    expect(select).toBeInTheDocument();
    expect(select).toMatchSnapshot();
  });
});
