import { render, screen } from '@testing-library/react';
import 'jest-styled-components';
import { ClaimBlock } from '../../../../src/components/shared/compounds/ClaimBlock';

describe('ClaimBlock', () => {
  it('should render a button with "Minted" text', () => {
    render(
      <ClaimBlock
        gitPOAPId={1}
        imgSrc="https://poap.gallery/static/media/test_gitpoap.1b1b1b1b.png"
        name={'GitPOAP={2017 OpenZeppelin Contracts Contributor'}
        orgName={'Polygon'}
        description={'To the creators of Polygon Network'}
        isClaimingAll={false}
        onClickClaim={() => {}}
        isClaimed={true}
      />,
    );
    const button = screen.getByRole('button', { name: 'Minted' });

    expect(button).toHaveTextContent('Minted');
    expect(button).toBeDisabled();
    expect(button).toBeInTheDocument();
    expect(button).toMatchSnapshot();
  });

  it('should render a button with "Mint" text', () => {
    render(
      <ClaimBlock
        gitPOAPId={1}
        imgSrc="https://poap.gallery/static/media/test_gitpoap.1b1b1b1b.png"
        name={'GitPOAP={2017 OpenZeppelin Contracts Contributor'}
        orgName={'Polygon'}
        description={'To the creators of Polygon Network'}
        isClaimingAll={true}
        onClickClaim={() => {}}
        isClaimed={false}
      />,
    );
    const button = screen.getByRole('button', { name: 'Mint' });

    expect(button).toHaveTextContent('Mint');
    expect(button).toBeDisabled();
    expect(button).toBeInTheDocument();
    expect(button).toMatchSnapshot();
  });
});
