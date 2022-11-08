import { render } from '@testing-library/react';
import 'jest-styled-components';
import { ClaimItem, Claim } from '../../../src/components/eligibility/ClaimItem';

const CLAIM: Claim = {
  id: 1,
  issuedAddress: null,
  githubUser: {
    githubHandle: 'peebeejay',
  },
  gitPOAP: {
    id: 1,
    name: 'GitPOAP: Test Name of the GitPOAP',
    description: 'Test description',
    imageUrl: 'https://test.com',
    project: {
      repos: [
        {
          name: 'test-repo',
          organization: {
            name: 'test-org',
          },
        },
      ],
    },
  },
};

describe('ClaimItem', () => {
  it('should render correctly', () => {
    const { container } = render(<ClaimItem claim={CLAIM} />);
    expect(container).toMatchSnapshot();

    const item = container.firstChild;
    expect(item).toBeInTheDocument();
  });

  it('should render the correct text', () => {
    const { getByText } = render(<ClaimItem claim={CLAIM} />);
    expect(getByText('peebeejay')).toBeInTheDocument();
    expect(getByText('Test Name of the GitPOAP')).toBeInTheDocument();
    expect(getByText('Test description')).toBeInTheDocument();
  });

  /* There is the eventuality that the claim doesn't have an associated project / repo / org. */
  it('should render the org and repo name if specified', () => {
    const { getByText } = render(<ClaimItem claim={CLAIM} />);
    expect(getByText('test-org/test-repo')).toBeInTheDocument();

    expect(getByText('test-org/test-repo').closest('a')).toHaveAttribute(
      'href',
      '/gh/test-org/test-repo',
    );
  });
});
