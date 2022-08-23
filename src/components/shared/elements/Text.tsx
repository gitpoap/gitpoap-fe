import styled from 'styled-components';
import { rem } from 'polished';
import { Text as TextUI, TextProps } from '@mantine/core';
import { TextLight } from '../../../colors';

export const Text = styled(TextUI)<TextProps & React.ComponentPropsWithoutRef<'div'>>`
  font-family: PT Mono;
  font-style: normal;
  font-weight: normal;
  font-size: ${rem(14)};
  line-height: ${rem(20)};
  letter-spacing: ${rem(0.2)};
  color: ${TextLight};
`;
