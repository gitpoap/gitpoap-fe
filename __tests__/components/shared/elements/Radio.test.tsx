import { Radio } from '@mantine/core';
import { render } from '@testing-library/react';
import 'jest-styled-components';
import { RadioGroup } from '../../../../src/components/shared/elements';

describe('Radio', () => {
  it('renders a RadioGroup', () => {
    const { container } = render(
      <RadioGroup>
        <Radio value="radio-test" />
      </RadioGroup>,
    );
    const radioGroup = container.firstChild;

    expect(radioGroup).toBeInTheDocument();
    expect(radioGroup).toMatchSnapshot();
  });
});
