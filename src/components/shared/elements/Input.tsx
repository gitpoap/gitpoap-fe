import styled from 'styled-components';
import { rem } from 'polished';
import {
  DarkGray,
  BackgroundPanel,
  BackgroundPanel2,
  ExtraRed,
  TextDarkGray,
} from '../../../colors';
import { TextInput } from '@mantine/core';
import { TextInputLabelStyles } from './Label';

type Props = React.ComponentProps<typeof TextInput> & {
  className?: string;
  placeholder?: string;
  disabled?: boolean;
  value: string;
  inputRef?: React.RefObject<HTMLInputElement>;
};

const StyledInput = styled(TextInput)<{ disabled?: boolean }>`
  display: inline-block;

  .mantine-TextInput-label {
    ${TextInputLabelStyles};
    margin-bottom: ${rem(11)};
  }

  .mantine-TextInput-input {
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
    &.mantine-TextInput-invalid {
      color: ${ExtraRed};
    }
  }

  .mantine-TextInput-error {
    font-family: 'PT Mono', monospace;
    font-size: ${rem(10)};
    letter-spacing: 1.2px;
    padding-left: ${rem(16)};

    /* Must !important since Mantine is using it */
    color: ${ExtraRed} !important;
  }
`;

export const Input = (props: Props) => {
  const { inputRef, ...restProps } = props;
  return <StyledInput {...restProps} ref={inputRef} spellCheck={false} />;
};
