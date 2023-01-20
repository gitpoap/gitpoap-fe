import styled, { css } from 'styled-components';
import { rem } from 'polished';
import { TextGray, TextLight } from '../../../colors';
import { Input as InputUI } from '@mantine/core';

export const TextInputLabelStyles = css<{ disabled?: boolean }>`
  font-family: 'PT Mono', monospace;
  color: ${TextLight};
  font-weight: 700;
  font-size: ${rem(11)};
  text-transform: uppercase;
  letter-spacing: ${rem(1.2)};
  line-height: ${rem(18)};
  ${(props) => props.disabled && `color: ${TextGray}`};
`;

export const Label = styled(InputUI.Label)`
  ${TextInputLabelStyles};
`;
