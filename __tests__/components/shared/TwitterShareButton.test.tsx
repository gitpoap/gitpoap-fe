import { render, screen } from '@testing-library/react';
import 'jest-styled-components';
import { TwitterShareButton } from '../../../src/components/shared/elements';
import { ClaimStatus, OpenClaimsQuery } from '../../../src/graphql/generated-gql';

const CLAIMS: Exclude<OpenClaimsQuery['userClaims'], null | undefined> = [
  {
    claim: {
      id: 1,
      status: ClaimStatus.Claimed,
      gitPOAP: { id: 1 },
    },
    event: {
      name: 'test_event1',
      image_url: 'https://test.test.com/1',
      description: 'test_event1_description',
    },
  },
  {
    claim: {
      id: 2,
      status: ClaimStatus.Claimed,
      gitPOAP: { id: 2 },
    },
    event: {
      name: 'test_event2',
      image_url: 'https://test.test.com/2',
      description: 'test_event2_description',
    },
  },
];

const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

describe('TwitterShareButton', () => {
  it('renders a button - NO claims', () => {
    render(
      <TwitterShareButton ensName={null} address={ZERO_ADDRESS} claims={[]} claimedCount={1} />,
    );

    /* Use screen.getByRole to get the anchor tag - The component has an <a> at the top level */
    const button = screen.getByRole<HTMLAnchorElement>('link', { name: 'Tweet My Mints' });

    expect(button).toHaveTextContent('Tweet My Mints');
    expect(button).toBeInTheDocument();
    expect(button).toMatchSnapshot();
  });

  describe('when an ETH wallet is connected', () => {
    it('renders a button & has the correct href - SINGLE claim', () => {
      render(
        <TwitterShareButton
          ensName={null}
          address={ZERO_ADDRESS}
          claims={CLAIMS.slice(0, 1)}
          claimedCount={1}
        />,
      );

      /* Use screen.getByRole to get the anchor tag - The component has an <a> at the top level */
      const button = screen.getByRole<HTMLAnchorElement>('link', { name: 'Tweet My Mints' });

      expect(button).toHaveTextContent('Tweet My Mints');
      expect(button.href).toEqual(
        'https://twitter.com/intent/tweet?text=I+was+awarded+a+GitPOAP+for+contributions+to+open+source%21%0Ahttps%3A%2F%2Fgitpoap.io%2Fgp%2F1%0A+%23poap+%23gitpoap',
      );
      expect(button).toBeInTheDocument();
      expect(button).toMatchSnapshot();
    });

    it('renders a button & has the correct href - MULTIPLE claims', () => {
      render(
        <TwitterShareButton
          ensName={null}
          address={ZERO_ADDRESS}
          claims={CLAIMS}
          claimedCount={2}
        />,
      );

      /* Use screen.getByRole to get the anchor tag - The component has an <a> at the top level */
      const button = screen.getByRole<HTMLAnchorElement>('link', { name: 'Tweet My Mints' });
      expect(button.href).toEqual(
        `https://twitter.com/intent/tweet?text=I+was+awarded+2+GitPOAPs+for+contributions+to+open+source%21%0Ahttps%3A%2F%2Fgitpoap.io%2Fp%2F${ZERO_ADDRESS}%0A+%23poap+%23gitpoap`,
      );
      expect(button).toHaveTextContent('Tweet My Mints');
      expect(button).toBeInTheDocument();
      expect(button).toMatchSnapshot();
    });
  });

  describe('when an ETH wallet is NOT connected', () => {
    it('renders a button & has the correct href - SINGLE claim', () => {
      render(
        <TwitterShareButton
          ensName={null}
          address={null}
          claims={CLAIMS.slice(0, 1)}
          claimedCount={1}
        />,
      );

      /* Use screen.getByRole to get the anchor tag - The component has an <a> at the top level */
      const button = screen.getByRole<HTMLAnchorElement>('link', { name: 'Tweet My Mints' });

      expect(button).toHaveTextContent('Tweet My Mints');
      expect(button.href).toEqual(
        'https://twitter.com/intent/tweet?text=I+was+awarded+a+GitPOAP+for+contributions+to+open+source%21%0Ahttps%3A%2F%2Fgitpoap.io%2Fgp%2F1%0A+%23poap+%23gitpoap',
      );
      expect(button).toBeInTheDocument();
      expect(button).toMatchSnapshot();
    });

    it('renders a button & has the correct href - MULTIPLE claims', () => {
      render(<TwitterShareButton ensName={null} address={null} claims={CLAIMS} claimedCount={2} />);

      /* Use screen.getByRole to get the anchor tag - The component has an <a> at the top level */
      const button = screen.getByRole<HTMLAnchorElement>('link', { name: 'Tweet My Mints' });
      expect(button.href).toEqual(
        'https://twitter.com/intent/tweet?text=I+was+awarded+2+GitPOAPs+for+contributions+to+open+source%21%0Ahttps%3A%2F%2Fgitpoap.io%2Fgp%2F1%0A+%23poap+%23gitpoap',
      );
      expect(button).toHaveTextContent('Tweet My Mints');
      expect(button).toBeInTheDocument();
      expect(button).toMatchSnapshot();
    });
  });
});
