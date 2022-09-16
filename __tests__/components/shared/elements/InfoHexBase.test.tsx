import { render } from '@testing-library/react';
import 'jest-styled-components';
import { InfoHexBase } from '../../../../src/components/shared/elements';

describe('InfoHexBase', () => {
  it('renders an InfoHexBase WITHOUT href', () => {
    const { container } = render(
      <InfoHexBase>
        <div>{'test'}</div>
      </InfoHexBase>,
    );
    const hex = container.firstChild;

    expect(hex).toHaveTextContent('test');
    expect(hex).toBeInTheDocument();
    expect(hex).toMatchSnapshot();
  });

  it('renders an InfoHexBase WITH href', () => {
    const { container } = render(
      <InfoHexBase href="/repos">
        <div>{'test'}</div>
      </InfoHexBase>,
    );

    const link = container.querySelector('a');
    expect(link).toHaveAttribute('href', '/repos');

    const hex = container.firstChild;
    expect(hex).toHaveTextContent('test');
    expect(hex).toBeInTheDocument();
    expect(hex).toMatchSnapshot();
  });
});
