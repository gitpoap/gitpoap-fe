import styled, { css } from 'styled-components';
import { rem } from 'polished';
import {
  TextGray,
  DarkGray,
  BackgroundPanel,
  TextLight,
  BackgroundPanel2,
  ExtraRed,
  TextDarkGray,
} from '../../../colors';
import { NumberInput as NumberInputUI } from '@mantine/core';
import React from 'react';

type Props = React.ComponentProps<typeof NumberInputUI> & {
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  inputRef?: React.RefObject<HTMLInputElement>;
};

export const NumberInputLabelStyles = css<{ disabled?: boolean }>`
  font-family: 'PT Mono', monospace;
  color: ${TextLight};
  font-weight: 700;
  font-size: ${rem(11)};
  text-transform: uppercase;
  letter-spacing: ${rem(1.2)};
  line-height: ${rem(18)};
  margin-bottom: ${rem(11)};
  ${(props) => props.disabled && `color: ${TextGray}`};
`;

const StyledInput = styled(NumberInputUI)<{ disabled?: boolean }>`
  display: inline-block;

  .mantine-NumberInput-label {
    ${NumberInputLabelStyles};
  }

  .mantine-NumberInput-input {
    border-radius: ${rem(6)};
    font-family: 'PT Mono', monospace;
    font-weight: 400;
    font-size: ${rem(14)};
    color: white;
    background-color: ${BackgroundPanel};
    transition: 150ms background-color ease;
    letter-spacing: ${rem(0.2)};
    border: ${rem(1)} solid transparent;

    &:hover:not(:disabled):not(:focus) {
      background-color: ${BackgroundPanel2};
    }
    &:focus {
      background-color: ${BackgroundPanel};
      /* Must use !important since Mantine is using it */
      border: ${rem(1)} solid ${DarkGray} !important;
    }
    &::placeholder {
      color: ${TextDarkGray};
    }
    &.mantine-NumberInput-invalid {
      color: ${ExtraRed};
    }
  }

  .mantine-NumberInput-error {
    font-family: 'PT Mono', monospace;
    font-size: ${rem(10)};
    letter-spacing: 1.2px;
    padding-left: ${rem(16)};

    /* Must !important since Mantine is using it */
    color: ${ExtraRed} !important;
  }
`;

export function NumberInput(props: Props) {
  const { inputRef, ...selectedProps } = props;
  return <StyledInput {...selectedProps} ref={props.inputRef} spellCheck={false} />;
}
