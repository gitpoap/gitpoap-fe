import styled from 'styled-components';
import { rem } from 'polished';
import { BREAKPOINTS } from '../../../constants';
import { Text, TextProps } from '@mantine/core';

export const Header = styled(Text)<TextProps>`
  font-family: VT323;
  font-size: ${rem(48)};
  line-height: ${rem(48)};

  @media (max-width: ${rem(BREAKPOINTS.md)}) {
    font-size: ${rem(40)};
  }
`;
