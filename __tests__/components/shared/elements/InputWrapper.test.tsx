import { render } from '@testing-library/react';
import 'jest-styled-components';
import { InputWrapper } from '../../../../src/components/shared/elements';

describe('InputWrapper', () => {
  it('renders an InputWrapper', () => {
    const { container } = render(
      <InputWrapper>
        <div />
      </InputWrapper>,
    );
    const wrapper = container.firstChild;

    expect(wrapper).toBeInTheDocument();
    expect(wrapper).toMatchSnapshot();
  });
});
