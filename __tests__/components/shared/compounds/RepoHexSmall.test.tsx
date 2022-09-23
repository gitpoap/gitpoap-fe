import { render } from '@testing-library/react';
import 'jest-styled-components';
import { RepoHexSmall } from '../../../../src/components/shared/compounds/RepoHexSmall';

describe('RepoHexSmall', () => {
  it('should render with a link', () => {
    const { container } = render(<RepoHexSmall name={'testRepoHexSmall'} orgName={'testOrg'} />);
    const link = container.querySelector('a');
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/gh/testOrg/testRepoHexSmall');
    expect(link).toMatchSnapshot();
  });

  it('should render with name and orgName', () => {
    const { container } = render(<RepoHexSmall name={'testRepoHexSmall'} orgName={'testOrg'} />);
    const repoHexSmallContainer = container.firstChild;
    expect(repoHexSmallContainer).toBeInTheDocument();
    expect(repoHexSmallContainer).toHaveTextContent('testRepoHexSmall');
    expect(repoHexSmallContainer).toHaveTextContent('testOrg');
    expect(repoHexSmallContainer).toMatchSnapshot();
  });

  it('should render with memberCount', () => {
    const { container } = render(
      <RepoHexSmall name={'testRepoHexSmall'} orgName={'testOrg'} memberCount={10} />,
    );
    const repoHexSmallContainer = container.firstChild;
    expect(repoHexSmallContainer).toBeInTheDocument();
    expect(repoHexSmallContainer).toHaveTextContent('10');
    expect(repoHexSmallContainer).toMatchSnapshot();
  });

  it('should render with gitPoapCount', () => {
    const { container } = render(
      <RepoHexSmall name={'testRepoHexSmall'} orgName={'testOrg'} gitPoapCount={5} />,
    );
    const repoHexSmallContainer = container.firstChild;
    expect(repoHexSmallContainer).toBeInTheDocument();
    expect(repoHexSmallContainer).toHaveTextContent('5');
    expect(repoHexSmallContainer).toMatchSnapshot();
  });

  it('should render with stars', () => {
    const { container } = render(
      <RepoHexSmall name={'testRepoHexSmall'} orgName={'testOrg'} gitPoapCount={15} />,
    );
    const repoHexSmallContainer = container.firstChild;
    expect(repoHexSmallContainer).toBeInTheDocument();
    expect(repoHexSmallContainer).toHaveTextContent('15');
    expect(repoHexSmallContainer).toMatchSnapshot();
  });
});
