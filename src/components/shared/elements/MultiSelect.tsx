import styled, { css } from 'styled-components';
import { rem } from 'polished';
import {
  DarkGray,
  BackgroundPanel,
  TextLight,
  BackgroundPanel2,
  ExtraRed,
  TextDarkGray,
} from '../../../colors';
import { MultiSelect as BaseMultiSelect, MultiSelectProps } from '@mantine/core';

type Props = MultiSelectProps;

export const MultiSelectLabelStyles = css`
  font-family: 'PT Mono', monospace;
  color: ${TextLight};
  font-weight: 700;
  font-size: ${rem(11)};
  text-transform: uppercase;
  letter-spacing: ${rem(1.2)};
  line-height: ${rem(18)};
`;

const StyledMultiSelect = styled(BaseMultiSelect)`
  display: inline-block;

  .mantine-MultiSelect-label {
    ${MultiSelectLabelStyles};
    margin-bottom: ${rem(11)};
  }

  .mantine-MultiSelect-input {
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
    &.mantine-MultiSelect-invalid {
      color: ${ExtraRed};
    }
  }

  .mantine-MultiSelect-error {
    font-family: 'PT Mono', monospace;
    font-size: ${rem(10)};
    letter-spacing: 1.2px;
    padding-left: ${rem(16)};

    /* Must !important since Mantine is using it */
    color: ${ExtraRed} !important;
  }
`;

export const MultiSelect = (props: Props) => {
  return <StyledMultiSelect {...props} />;
};
