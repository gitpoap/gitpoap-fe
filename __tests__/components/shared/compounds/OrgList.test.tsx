import { render } from '@testing-library/react';
import 'jest-styled-components';
import { OrgList } from '../../../../src/components/shared/compounds/OrgList';

describe('OrgList', () => {
  it('should render children', () => {
    const { container } = render(
      <OrgList>
        <div>{'test1'}</div>
        <div>{'test2'}</div>
      </OrgList>,
    );
    const orgListContainer = container.firstChild;
    expect(orgListContainer).toBeInTheDocument();
    expect(orgListContainer).toHaveTextContent('test1');
    expect(orgListContainer).toHaveTextContent('test2');
    expect(orgListContainer).toMatchSnapshot();
  });
});
