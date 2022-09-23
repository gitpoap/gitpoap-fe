import { render } from '@testing-library/react';
import 'jest-styled-components';
import { POAPList } from '../../../../src/components/shared/compounds/POAPList';

describe('POAPList', () => {
  it('should render children', () => {
    const { container } = render(
      <POAPList>
        <div>{'test1'}</div>
        <div>{'test2'}</div>
      </POAPList>,
    );
    const poapListContainer = container.firstChild;
    expect(poapListContainer).toBeInTheDocument();
    expect(poapListContainer).toHaveTextContent('test1');
    expect(poapListContainer).toHaveTextContent('test2');
    expect(poapListContainer).toMatchSnapshot();
  });
});
