import { render } from '@testing-library/react';
import 'jest-styled-components';
import { RepoList } from '../../../../src/components/shared/compounds/RepoList';

describe('RepoList', () => {
  it('should render children', () => {
    const { container } = render(
      <RepoList>
        <div>{'test1'}</div>
        <div>{'test2'}</div>
      </RepoList>,
    );
    const repoListContainer = container.firstChild;
    expect(repoListContainer).toBeInTheDocument();
    expect(repoListContainer).toHaveTextContent('test1');
    expect(repoListContainer).toHaveTextContent('test2');
    expect(repoListContainer).toMatchSnapshot();
  });
});
