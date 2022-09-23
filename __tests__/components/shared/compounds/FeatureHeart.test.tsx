import { render } from '@testing-library/react';
import 'jest-styled-components';
import { FeatureHeart } from '../../../../src/components/shared/compounds/FeatureHeart';
import {
  FeaturedPOAPsContext,
  FeaturedPOAPsDispatchContext,
} from '../../../../src/components/profile/FeaturedPOAPsContext';
import { Web3ContextProvider } from '../../../../src/components/wallet/Web3ContextProvider';

const addFeaturedPOAP = (poapTokenId: string) => {};
const removeFeaturedPOAP = (poapTokenId: string) => {};
const renderFeatureHeart = ({
  showHearts,
  loadingIds,
}: {
  showHearts: boolean;
  loadingIds: Record<string, true>;
}) => {
  return render(
    <Web3ContextProvider>
      <FeaturedPOAPsContext.Provider
        value={{
          featuredPOAPsState: {
            featuredPOAPTokenIDs: {
              test: true,
            },
            featuredPOAPsFull: [],
          },
          isLoading: false,
          hasFetched: true,
          showHearts,
          loadingIds,
        }}
      >
        <FeaturedPOAPsDispatchContext.Provider value={{ addFeaturedPOAP, removeFeaturedPOAP }}>
          <FeatureHeart poapTokenId="test" />
        </FeaturedPOAPsDispatchContext.Provider>
      </FeaturedPOAPsContext.Provider>
    </Web3ContextProvider>,
  );
};

describe('FeatureHeart', () => {
  it('should render a heart icon', () => {
    const { container } = renderFeatureHeart({
      showHearts: true,
      loadingIds: {},
    });
    const faHeart = container.firstChild;

    expect(faHeart).toBeInTheDocument();
    expect(faHeart).toMatchSnapshot();
  });

  it('should not render a heart icon', () => {
    const { container } = renderFeatureHeart({
      showHearts: false,
      loadingIds: {},
    });
    const faHeart = container.firstChild;

    expect(faHeart).toBeNull();
    expect(faHeart).toMatchSnapshot();
  });

  it('should render a loader', () => {
    const { container } = renderFeatureHeart({
      showHearts: true,
      loadingIds: {
        test: true,
      },
    });
    const loader = container.firstChild;

    expect(loader).toBeInTheDocument();
    expect(loader).toMatchSnapshot();
  });
});
