import React from 'react';
import styled from 'styled-components';
import { Checkbox as CheckboxUI, CheckboxProps } from '@mantine/core';
import {
  BackgroundPanel,
  BackgroundPanel2,
  ExtraHover,
  ExtraPressed,
  PrimaryBlue,
} from '../../../colors';
import { TextInputLabelStyles } from './Label';

const StyledCheckbox = styled(CheckboxUI)<CheckboxProps & { disabled?: boolean }>`
  .mantine-Checkbox-input {
    &:not(:disabled) {
      /* Unchecked Styles */
      background-color: ${BackgroundPanel};
      border-color: ${BackgroundPanel};
      cursor: pointer;

      &:hover {
        background-color: ${BackgroundPanel2};
        border-color: ${BackgroundPanel2};
      }
      &:active {
        background-color: ${BackgroundPanel};
        border-color: ${BackgroundPanel};
      }

      /* Checked Styles */
      &:checked {
        background-color: ${PrimaryBlue};
        border-color: ${PrimaryBlue};

        &:hover {
          background-color: ${ExtraHover};
          border-color: ${ExtraHover};
        }
        &:active {
          background-color: ${ExtraPressed};
          border-color: ${ExtraPressed};
        }
      }
    }
  }

  .mantine-Checkbox-labelWrapper {
    display: flex;
    align-items: center;
  }

  .mantine-Checkbox-label {
    ${TextInputLabelStyles}
    ${(props) => !props.disabled && `cursor: pointer`};
  }
`;

export const Checkbox = (props: CheckboxProps) => {
  return <StyledCheckbox transitionDuration={150} {...props} />;
};
