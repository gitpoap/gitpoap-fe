import 'jest-styled-components';
import { CollapsibleAddress } from '../../../../src/components/shared/elements';
import { truncateAddress } from '../../../../src/helpers';
import { renderWithTheme } from '../../../__utils__/renderWithTheme';

const zeroAddress = '0x0000000000000000000000000000000000000000';

describe('CollapsibleAddress', () => {
  it('renders an CollapsibleAddress - NOT collapsed', () => {
    const { container } = renderWithTheme(
      <CollapsibleAddress address={zeroAddress} isCollapsed={false} />,
    );
    const collapse = container.firstChild;

    expect(collapse).toBeInTheDocument();
    expect(collapse).toHaveTextContent(zeroAddress);
    expect(collapse).toMatchSnapshot();
  });

  it('renders an CollapsibleAddress - collapsed', () => {
    const { container } = renderWithTheme(<CollapsibleAddress address={zeroAddress} isCollapsed />);
    const collapse = container.firstChild;

    expect(collapse).toBeInTheDocument();
    expect(collapse).toHaveTextContent(truncateAddress(zeroAddress));
    expect(collapse).toMatchSnapshot();
  });
});
