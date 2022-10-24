import 'jest-styled-components';
import { Text, Tooltip } from '../../../../src/components/shared/elements';
import { renderWithTheme } from '../../../__utils__/renderWithTheme';

describe('Tooltip', () => {
  it('renders a Tooltip with an arrow', () => {
    const { container } = renderWithTheme(
      <Tooltip label="Tooltip" withArrow={true}>
        <Text>{'Tooltip'}</Text>
      </Tooltip>,
    );
    const tooltip = container.firstChild;

    expect(tooltip).toBeInTheDocument();
    expect(tooltip).toMatchSnapshot();
  });
  it('renders a Tooltip without an arrow', () => {
    const { container } = renderWithTheme(
      <Tooltip label="Tooltip" withArrow={false}>
        <Text>{'Tooltip'}</Text>
      </Tooltip>,
    );
    const tooltip = container.firstChild;

    expect(tooltip).toBeInTheDocument();
    expect(tooltip).toMatchSnapshot();
  });
});
