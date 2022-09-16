import { render } from '@testing-library/react';
import 'jest-styled-components';
import { HexagonPath } from '../../../../src/components/shared/elements';

describe('HexagonPath', () => {
  it('renders an HexagonPath', () => {
    const { container } = render(<HexagonPath />);
    const hex = container.querySelector('svg');

    expect(hex).toBeInTheDocument();
    expect(hex).toMatchSnapshot();
  });
});
