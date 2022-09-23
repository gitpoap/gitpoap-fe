import { render, screen } from '@testing-library/react';
import 'jest-styled-components';
import { GitPOAP } from '../../../../src/components/shared/compounds/GitPOAP';

describe('GitPOAP', () => {
  it('should render with name', () => {
    render(
      <GitPOAP
        gitPOAPId={1}
        imgSrc="https://poap.gallery/static/media/test_gitpoap.1b1b1b1b.png"
        name={'GitPOAP: 2017 OpenZeppelin Contracts Contributor'}
        repoName={'testRepo'}
        orgName={'Polygon'}
        description={'To the creators of Polygon Network'}
      />,
    );
    const nameText = screen.getByText('2017 OpenZeppelin Contracts Contributor');
    expect(nameText).toBeInTheDocument();
    expect(nameText).toMatchSnapshot();
  });

  it('should render with description', () => {
    render(
      <GitPOAP
        gitPOAPId={1}
        imgSrc="https://poap.gallery/static/media/test_gitpoap.1b1b1b1b.png"
        name={'GitPOAP: 2017 OpenZeppelin Contracts Contributor'}
        repoName={'testRepo'}
        orgName={'Polygon'}
        description={'To the creators of Polygon Network'}
      />,
    );
    const descriptionText = screen.getByText('To the creators of Polygon Network');
    expect(descriptionText).toBeInTheDocument();
    expect(descriptionText).toMatchSnapshot();
  });

  it('should render with repoName and orgName', () => {
    render(
      <GitPOAP
        gitPOAPId={1}
        imgSrc="https://poap.gallery/static/media/test_gitpoap.1b1b1b1b.png"
        name={'GitPOAP: 2017 OpenZeppelin Contracts Contributor'}
        repoName={'testRepo'}
        orgName={'Polygon'}
        description={'To the creators of Polygon Network'}
      />,
    );
    const repoNameLink = screen.getByRole('link', { name: 'testRepo' });
    expect(repoNameLink).toBeInTheDocument();
    expect(repoNameLink).toHaveAttribute('href', '/gh/Polygon/testRepo');
    expect(repoNameLink).toMatchSnapshot();
  });

  it('should render with repoId', () => {
    render(
      <GitPOAP
        gitPOAPId={1}
        imgSrc="https://poap.gallery/static/media/test_gitpoap.1b1b1b1b.png"
        name={'GitPOAP: 2017 OpenZeppelin Contracts Contributor'}
        repoName={'testRepo'}
        repoId={22}
        description={'To the creators of Polygon Network'}
      />,
    );
    const repoNameLink = screen.getByRole('link', { name: 'testRepo' });
    expect(repoNameLink).toBeInTheDocument();
    expect(repoNameLink).toHaveAttribute('href', '/rp/22');
    expect(repoNameLink).toMatchSnapshot();
  });

  it('should render without repoId and orgName', () => {
    render(
      <GitPOAP
        gitPOAPId={1}
        imgSrc="https://poap.gallery/static/media/test_gitpoap.1b1b1b1b.png"
        name={'GitPOAP: 2017 OpenZeppelin Contracts Contributor'}
        repoName={'testRepo'}
        description={'To the creators of Polygon Network'}
      />,
    );
    const repoNameText = screen.getByText('testRepo');
    expect(repoNameText).toBeInTheDocument();

    const repoNameLink = screen.queryByRole('link', { name: 'testRepo' });
    expect(repoNameLink).not.toBeInTheDocument();
    expect(repoNameLink).toMatchSnapshot();
  });
});
