import { Radio } from '@mantine/core';
import 'jest-styled-components';
import { RadioGroup } from '../../../../src/components/shared/elements';
import { renderWithTheme } from '../../../__utils__/renderWithTheme';

describe('Radio', () => {
  it('renders a RadioGroup', () => {
    const { container } = renderWithTheme(
      <RadioGroup>
        <Radio value="radio-test" />
      </RadioGroup>,
    );
    const radioGroup = container.firstChild;

    expect(radioGroup).toBeInTheDocument();
    expect(radioGroup).toMatchSnapshot();
  });
});
