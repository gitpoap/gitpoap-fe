import { Box, BoxProps } from '@mantine/core';
import styled from 'styled-components';
import { rem } from 'polished';
import { BackgroundPanel3, TextLight } from '../../../colors';

export const Badge = styled(Box)<BoxProps>`
  display: inline-flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: ${rem(0.5)} ${rem(4)};
  background: ${BackgroundPanel3};
  border-radius: ${rem(4)};

  font-family: PT Mono;
  font-style: normal;
  font-weight: bold;
  font-size: ${rem(11)};
  line-height: ${rem(18)};
  letter-spacing: ${rem(1.2)};
  text-transform: uppercase;
  color: ${TextLight};
`;
