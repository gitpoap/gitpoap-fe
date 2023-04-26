import { render } from '@testing-library/react';
import 'jest-styled-components';
import { FeatureHeart } from '../../../../src/components/shared/compounds/FeatureHeart';
import {
  FeaturedPOAPsContext,
  FeaturedPOAPsDispatchContext,
} from '../../../../src/components/profile/FeaturedPOAPsContext';
import { AuthContextProvider } from '../../../../src/components/wallet/AuthContext';

const addFeaturedPOAP = () => {};
const removeFeaturedPOAP = () => {};
const renderFeatureHeart = ({
  showHearts,
  loadingIds,
}: {
  showHearts: boolean;
  loadingIds: Record<string, true>;
}) => {
  return render(
    <AuthContextProvider>
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
    </AuthContextProvider>,
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
