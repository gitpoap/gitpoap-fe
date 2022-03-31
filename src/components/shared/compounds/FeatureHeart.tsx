import React from 'react';
import styled from 'styled-components';
import { rem } from 'polished';
import { Loader } from '@mantine/core';
import { FaHeart } from 'react-icons/fa';
import { ExtraHover, ExtraPressed, TextAccent, TextLight } from '../../../colors';
import { useFeaturedPOAPs, useFeaturedPOAPsDispatch } from '../../profile/FeaturedPOAPsContext';

type Props = {
  className?: string;
  poapTokenId: string;
};

const HeartWrapper = styled.div<{ isFeatured: boolean }>`
  > svg {
    fill: ${({ isFeatured }) => (isFeatured ? TextAccent : TextLight)};
  }
`;

const FeatureHeartStyled = styled(FaHeart)`
  color: ${TextLight};
  height: ${rem(18)};
  width: ${rem(18)};
  transition: 150ms fill ease;
  fill: ${TextLight};

  &:hover {
    fill: ${ExtraHover};
    cursor: pointer;
  }
  &:active {
    fill: ${ExtraPressed};
  }
`;

export const FeatureHeart = ({ className, poapTokenId }: Props) => {
  const {
    featuredPOAPsState: { featuredPOAPTokenIDs },
    showHearts,
    loadingIds,
  } = useFeaturedPOAPs();
  const { addFeaturedPOAP, removeFeaturedPOAP } = useFeaturedPOAPsDispatch();
  const isFeatured: boolean = !!featuredPOAPTokenIDs && !!featuredPOAPTokenIDs[poapTokenId];
  const isFeaturedLoading = !!loadingIds && !!loadingIds[poapTokenId];

  if (!showHearts) {
    return null;
  }

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
