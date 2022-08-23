import React from 'react';
import styled from 'styled-components';
import { FiGlobe } from 'react-icons/fi';
import { IconStyles } from './BaseIcon';
import { ExtraHover, ExtraPressed, TextGray } from '../../../../colors';

const FiGlobalForwardRef = React.forwardRef((props, ref) => {
  return <FiGlobe {...props} />;
});

export const Globe = styled(FiGlobalForwardRef)`
  ${IconStyles};
  stroke: ${TextGray};
  path {
    fill: unset !important;
  }
  &:hover {
    stroke: ${ExtraHover};
    path {
      fill: unset !important;
    }
  }
  &:active {
    stroke: ${ExtraPressed};
    path {
      fill: unset !important;
    }
  }
`;

export const GlobeNoHover = styled(Globe)`
  ${IconStyles};
  stroke: ${TextGray};
`;
