import styled from 'styled-components';
import { rem } from 'polished';
import { Radio } from '@mantine/core';
import {
  BackgroundPanel,
  BackgroundPanel2,
  ExtraHover,
  ExtraPressed,
  TextAccent,
} from '../../../colors';

export const RadioGroup = styled(Radio.Group)`
  .mantine-Radio-radio {
    transition: 150ms border-color ease;
    background-color: ${BackgroundPanel};
    border: ${rem(1)} solid ${BackgroundPanel2};
    &::before {
      transition: 150ms background-color ease;
      background-color: ${TextAccent};
    }

    &:hover:not(.mantine-Radio-radioDisabled) {
      cursor: pointer;
    }
  }

  .mantine-Radio-label {
    transition: 150ms color ease;
    font-family: PT Mono;
    font-style: normal;
    font-weight: normal;
    font-size: ${rem(14)};
    line-height: ${rem(18)};
    letter-spacing: ${rem(0.2)};

    &:hover:not(.mantine-Radio-labelDisabled) {
      color: ${ExtraHover};
      cursor: pointer;
      .mantine-Radio-radio {
        border-color: ${ExtraHover};
      }
    }

    &:active:not(.mantine-Radio-labelDisabled) {
      color: ${ExtraPressed};
      .mantine-Radio-radio {
        border-color: ${ExtraPressed};
        &::before {
          background-color: ${ExtraPressed};
        }
      }
    }
  }
`;
