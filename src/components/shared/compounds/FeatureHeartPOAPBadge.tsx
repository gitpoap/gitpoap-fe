import React from 'react';
import { Loader } from '../elements/Loader';
import { useFeaturedPOAPsDispatch } from '../../profile/FeaturedPOAPsContext';
import { HeartWrapper, FeatureHeartStyled } from './FeatureHeart';

type Props = {
  className?: string;
  poapTokenId: string;
  isFeatured: boolean;
  isFeaturedLoading: boolean;
};

export const FeaturedHeartPOAPBadge = ({
  className,
  poapTokenId,
  isFeatured,
  isFeaturedLoading,
}: Props) => {
  const { addFeaturedPOAP, removeFeaturedPOAP } = useFeaturedPOAPsDispatch();
  return (
    <HeartWrapper isFeatured={isFeatured}>
      {isFeaturedLoading ? (
        <Loader className={className} size={18} />
      ) : (
        <FeatureHeartStyled
          className={className}
          onClick={() => {
            if (isFeatured) {
              removeFeaturedPOAP(poapTokenId);
            } else {
              addFeaturedPOAP(poapTokenId);
            }
          }}
        />
      )}
    </HeartWrapper>
  );
};
