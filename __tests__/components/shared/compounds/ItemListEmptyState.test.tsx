import { render, screen } from '@testing-library/react';
import 'jest-styled-components';
import { EmptyState } from '../../../../src/components/shared/compounds/ItemListEmptyState';

describe('ItemListEmptyState', () => {
  it('should render a icon', () => {
    render(
      <EmptyState icon={<img src="/test/test.png" />}>
        <div>{'test'}</div>
      </EmptyState>,
    );
    const icon = screen.getByRole('img');
    expect(icon).toBeInTheDocument();
    expect(icon).toMatchSnapshot();
  });

  it('should render a children', () => {
    const { container } = render(
      <EmptyState icon={<img src="/test/test.png" />}>
        <div>{'test1'}</div>
        <div>{'test2'}</div>
      </EmptyState>,
    );
    const emptyState = container.firstChild;

    expect(emptyState).toBeInTheDocument();
    expect(emptyState).toHaveTextContent('test1');
    expect(emptyState).toHaveTextContent('test2');
    expect(emptyState).toMatchSnapshot();
  });
});
