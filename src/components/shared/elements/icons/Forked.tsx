import styled from 'styled-components';
import { VscRepoForked } from 'react-icons/vsc';
import { IconStyles } from './BaseIcon';
import { TextGray } from '../../../../colors';

export const Forked = styled(VscRepoForked)`
  ${IconStyles};
  path {
    fill: ${TextGray};
  }
`;
