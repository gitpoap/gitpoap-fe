import styled from 'styled-components';
import { rem } from 'polished';
import { TextLight } from '../../../colors';
import { BREAKPOINTS } from '../../../constants';

export const Header = styled.span`
  font-family: VT323;
  font-style: normal;
  font-weight: normal;
  font-size: ${rem(48)};
  line-height: ${rem(48)};
  color: ${TextLight};

  @media (max-width: ${rem(BREAKPOINTS.md)}) {
    font-size: ${rem(40)};
  }
`;
