import { render, screen } from '@testing-library/react';
import 'jest-styled-components';
import { EmptyState } from '../../../../src/components/shared/compounds/ItemListEmptyState';

describe('ItemListEmptyState', () => {
  it('should render a icon', () => {
    render(
      <EmptyState icon={<img src="/test/test.png" />}>
        <div>test</div>
      </EmptyState>,
    );
    const icon = screen.getByRole('img');
    expect(icon).toBeInTheDocument();
    expect(icon).toMatchSnapshot();
  });

  it('should render a children', () => {
    render(
      <EmptyState icon={<img src="/test/test.png" />}>
        <div>test1</div>
        <div>test2</div>
      </EmptyState>,
    );
    const test1 = screen.getByText('test1');
    expect(test1).toBeInTheDocument();
    expect(test1).toMatchSnapshot();
    const test2 = screen.getByText('test2');
    expect(test2).toBeInTheDocument();
    expect(test2).toMatchSnapshot();
  });
});
