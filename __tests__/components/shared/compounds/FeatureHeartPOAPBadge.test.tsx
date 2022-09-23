import { render, screen } from '@testing-library/react';
import 'jest-styled-components';
import { FeaturedHeartPOAPBadge } from '../../../../src/components/shared/compounds/FeatureHeartPOAPBadge';
import { FeaturedPOAPsProvider } from '../../../../src/components/profile/FeaturedPOAPsContext';
import { Web3ContextProvider } from '../../../../src/components/wallet/Web3ContextProvider';

const renderFeaturedHeartPOAPBadge = ({ isFeaturedLoading }: { isFeaturedLoading: boolean }) => {
  return render(
    <Web3ContextProvider>
      <FeaturedPOAPsProvider>
        <FeaturedHeartPOAPBadge
          poapTokenId="test"
          isFeatured={true}
          isFeaturedLoading={isFeaturedLoading}
        />
      </FeaturedPOAPsProvider>
    </Web3ContextProvider>,
  );
};

describe('FeatureHeartPOAPBadge', () => {
  it('should render a heart icon', () => {
    const { container } = renderFeaturedHeartPOAPBadge({
      isFeaturedLoading: false,
    });
    const faHeart = container.firstChild;

    expect(faHeart).toBeInTheDocument();
    expect(faHeart).toMatchSnapshot();
  });

  it('should render a loader', () => {
    const { container } = renderFeaturedHeartPOAPBadge({
      isFeaturedLoading: true,
    });
    const faHeart = container.firstChild;

    expect(faHeart).toBeNull();
    expect(faHeart).toMatchSnapshot();
  });
});
