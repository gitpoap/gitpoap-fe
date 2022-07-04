import styled from 'styled-components';
import { FiGlobe } from 'react-icons/fi';
import { IconStyles } from './BaseIcon';
import { ExtraHover, ExtraPressed, TextGray } from '../../../../colors';

export const Globe = styled(FiGlobe)`
  ${IconStyles};
  stroke: ${TextGray};
  path {
    fill: unset;
  }
  &:hover {
    stroke: ${ExtraHover};
    path {
      fill: unset;
    }
  }
  &:active {
    stroke: ${ExtraPressed};
    path {
      fill: unset;
    }
  }
`;

export const GlobeNoHover = styled(Globe)`
  ${IconStyles};
  stroke: ${TextGray};
`;
